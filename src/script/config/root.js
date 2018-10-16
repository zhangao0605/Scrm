/**
 * Created by digvita on 2017/7/12.
 */
app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
    //.when('/page1',{templateUrl:'tpl/page1.html',controller:'page1C'})
        .when('/page1', {templateUrl: 'view/page1.html', controller: 'page1C'})
        .when('/page2', {templateUrl: 'view/page2.html', controller: 'page2C'})
        .when('/page3', {templateUrl: 'view/page3.html', controller: 'page3C'})
        .when('/page4', {templateUrl: 'view/page4.html', controller: 'page4C'})
        .when('/page5', {templateUrl: 'view/page5.html', controller: 'page5C'})
        // .when('/page6', {templateUrl: 'view/page6.html', controller: 'page6C'})
        .otherwise({redirectTo: '/page1'});
}]);