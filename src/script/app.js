var app = angular.module('myApp', ['ngRoute']);
app.run(["$rootScope", "$location", "$http", "$timeout", function ($rootScope, $location, $http, $timeout) {
    $rootScope.link = 'http://'+window.location.host+'';
    // $rootScope.link = 'http://192.168.1.115:8080';
    $rootScope.loginTrueFalse=true;
    $rootScope.states = function (e) {
        var a = ''
        if (e == 1) {
            a = '任务异常'
        } else {
            a = '任务完成'
        }
        return a;
    }
    $rootScope.page2Colors = function (e) {
        var a = ''
        if (e == 1) {
            a = 'page2-red'
        } else {
            a = 'page2-green'
        }
        return a;
    }
    $rootScope.page4Sex = function (e) {
        var a = ''
        if (e == 0) {
            a = '未知'
        } else if (e == 1) {
            a = '男'
        } else {
            a = '女'
        }
        return a;
    }
    $rootScope.page4NmeSlice = function (e) {
        var Page4Nmame = ''
        if (e.length >= 8) {
            Page4Nmame = e.slice(0, 8) + '...'
        } else {
            Page4Nmame = e
        }
        return Page4Nmame
    }
    $rootScope.page5NmeSlice = function (e) {
        var Page4Nmame1 = ''
        if (e.length >= 8) {
            Page4Nmame1 = e.slice(0, 6) + '...'
        } else {
            Page4Nmame1 = e
        }
        return Page4Nmame1
    }

}]);
