/**
 * Created by Administrator on 2017/1/11.
 */
angular.module("mapp")
    .config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
        $urlRouterProvider
            .otherwise("guide");
        $stateProvider
            .state("guide",{
                url: "/guide",
                templateUrl:"views/guide.html",
                controller:"guideCtrl"
            })
            .state("list",{
                url: "/list",
                templateUrl:"views/list.html",
                controller:"listCtrl"
            })
            .state("list.home",{
                url: "/home",
                templateUrl:"views/home.html",
                controller:"homeCtrl"
            })
            .state("list.home.host",{
                url:     "/host",
                templateUrl:"views/host.html",
                controller:"hostCtrl"
            })
            .state("list.home.attention",{
                url: "/attention",
                templateUrl:"views/attention.html"
            })
            .state("list.contrive",{
                url: "/contrive",
                templateUrl:"views/contrive.html"
            })
            .state("list.my",{
                url: "/my",
                templateUrl:"views/my.html"
            })
    }]);
