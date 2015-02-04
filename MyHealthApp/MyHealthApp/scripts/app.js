var app = angular.module("app", ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider.when('/patientList', {
            templateUrl: 'public/patients/views/patientList.html',
            controller: 'ListController'

        })
        .when('/patientDetails', {
            templateUrl: 'public/patients/views/patientDetails.html',
            controller: 'DetailsController'

        })
        .when('/edit/:id', {
            templateUrl: 'public/patients/views/editDetails.html',
            controller: 'EditController'
        });
        

    }]).run(function ($rootScope, $http) {
    $http.get("public/patient.json").success(function (data) {
        $rootScope.patientList = data;
    });

});
app.controller('ListController', function ($scope, $http, $rootScope) {
    $scope.message = "HEllo Gaura Chody";
    
    //$http.get("/serviceClients").success(renderServiceClients);
    $scope.serviceClients = $rootScope.patientList.slice(0);
    
    //console.log($scope.serviceClients);
})
app.controller('EditController', function ($rootScope, $scope, $routeParams, $window) {
    var index = -1; //getting id from route
    
    for (i = 0; i < $rootScope.patientList.length; i++) {
        if ($rootScope.patientList[i].id == $routeParams.id) {
            //getting values of particular record from list 
            $scope.patient = {
                "firstName" : $rootScope.patientList[i].firstName,
                "lastName" : $rootScope.patientList[i].lastName,
                "phoneNo" : $rootScope.patientList[i].phoneNo,
                "lastVisitDate" : $rootScope.patientList[i].lastVisitDate,
                "status": $rootScope.patientList[i].status
            }
            index = i;
            
            break;
        }
    }
    
    //updating record
    $scope.updatePatient = function (patient) {
        $scope.patient.id = $routeParams.id;
        if ($scope.patient.status == undefined) {
            patient.status = false;
        }
        $rootScope.patientList[index] = $scope.patient;

        $window.location = '#/patientList';
    };
})
app.controller('DetailsController', function ($rootScope, $scope, $routeParams) {
    $scope.addPatient = function (patient) {
        if (patient.status == undefined) {
            patient.status = false;
        }
        
        $rootScope.patientList.push(patient);
    };
    
    patient = { "status" : true };
});
