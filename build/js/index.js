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
app.directive('uploadImage1', function () {
    return {
        link: function (scope, elem) {
            elem.on("change", function () {
                var file = this.files[0];
                if (!/image\/\w+/.test(file.type)) {
                    alert("文件必须为图片！");
                    return false;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    //result.innerHTML = '<img src="'+this.result+'" alt=""/>'
                    elem.parent().css({
                        'background': 'url(' + this.result + ') center no-repeat',
                        'backgroundSize': '100%'
                    });
                    scope.$apply();
                };
                scope.pic=file
            });
        }
    }
});

app.controller('mainC', ["$rootScope", "$scope", "$timeout", "$location", "$anchorScroll", "$interval"
    , "$http", function ($rootScope, $scope, $timeout, $location, $anchorScroll, $interval, $http) {
        var getlocalSession1 = localStorage.getItem("sessionId");
        var getlocalUserId1 = localStorage.getItem("userId");
        if (getlocalSession1 == null || getlocalSession1 == undefined || getlocalUserId1 == undefined || getlocalUserId1 == null) {
            window.location.href ='http://'+window.location.host+'/gcsscrm/#/page1'
            $rootScope.loginTrueFalse = true;
        } else {
            $rootScope.loginTrueFalse = false;
        }
        $rootScope.now = new Date();
        var timer = $interval(function () {
            $rootScope.now = new Date();
        }, 1000);
        //============================航栏的视图切导换==============================
        //============================锚点的跳转 回到顶部标题处======================
        $scope.getTop = function (num, arg) {
            $rootScope.showLoads=false;
            $rootScope.Page5showLoads=false;
            var getlocalSession = localStorage.getItem("sessionId");
            var getlocalUserId = localStorage.getItem("userId");
            if (getlocalSession == null || getlocalSession == undefined || getlocalUserId == undefined || getlocalUserId == null) {
                window.location.href = 'http://'+window.location.host+'/gcsscrm/#/page1'
                $rootScope.loginTrueFalse = true;
                // window.location.href = 'http://localhost:9999/#/page1'
            } else {
                $http({
                    method: 'POST',
                    url: $rootScope.link + '/gcsscrm/general/judgeSession',
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    //上传成功的操作
                    if (response.code == 200) {
                        $rootScope.loginTrueFalse = false;
                        $('.reload-yes').removeClass('active')
                        $location.hash('page-top' + num);
                        $anchorScroll();
                        switch (arg) {
                            case 'page1':
                                $location.path('/page1');
                                break;
                            case 'page2':
                                $location.path('/page2');
                                break;
                            case 'page3':
                                $location.path('/page3');
                                break;
                            case 'page4':
                                $location.path('/page4');
                                break;
                            case 'page5':
                                $location.path('/page5');
                                break;
                            case 'page6':
                                $location.path('/page6');
                                break;
                        }
                    } else {
                        window.location.href = 'http://'+window.location.host+'/gcsscrm/#/page1'
                        $rootScope.loginTrueFalse = true;
                        $('.tishi').show().html('登录身份过期请再次登录')
                        // window.location.href = 'http://localhost:9999/#/page1'
                    }
                });

            }
        };
        /*用户名正则判断*/
        var getlocalAll = JSON.parse(localStorage.getItem("remember-me"));
        // console.log(getlocalAll)
        if (getlocalAll == null || getlocalAll.name == undefined || getlocalAll.pas == undefined || getlocalAll.name == null || getlocalAll.pas == null) {
            $('.remember-me-icon').removeClass('on');
            $scope.indexs = 0;
            $scope.nameLogin = '';
            $scope.pasLogin = '';
        } else {

            $('.remember-me-icon').addClass('on')
            $scope.nameLogin = getlocalAll.name
            $scope.pasLogin = getlocalAll.pas
            $scope.indexs = 1
        }
        $scope.rememberLoginIn = function () {
            $scope.indexs++;
            if ($scope.indexs % 2 == 0) {
                $('.remember-me-icon').removeClass('on')
            } else {
                $('.remember-me-icon').addClass('on')
            }
        }
        var uPattern = /^[a-zA-Z0-9_]{4,16}$/;
        $('.Verification-user').blur(function () {
            if (uPattern.test($scope.nameLogin) == true) {
                $('.tishi').hide()
            } else {
                console.log(11, $scope.nameLogin)
                $('.tishi').show().html('用户名由4到16位(字母,数字,下划线,减号)组成')
            }
        })
        var uPattern1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        $('.Verification-password').blur(function () {
            if (uPattern1.test($scope.pasLogin) == true) {
                $('.tishi').hide()
            } else {
                $('.tishi').show().html('密码由6到16位(字母,数字)组成')
            }
        })
        $scope.sendMsg = function () {
            var a = sessionStorage.getItem("za-session");
            if (uPattern1.test($scope.pasLogin) == false || uPattern.test($scope.nameLogin) == false) {
                $('.tishi').show().html('用户名或密码不正确')
            } else {
                var sendObj = new FormData();
                sendObj.append('username', $scope.nameLogin);
                sendObj.append('password', $scope.pasLogin);
                $http({
                    method: 'POST',
                    url: $rootScope.link + '/gcsscrm/general/login',
                    data: sendObj,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    //上传成功的操作
                    if (response.code == 200) {
                        if (response.data.userId == '' || response.data.sessionId == '') {
                            localStorage.removeItem('sessionId');
                            localStorage.removeItem('userId');
                        } else {
                            var loginUserid = response.data.userId;
                            var sessionId = response.data.sessionId;
                            localStorage.setItem("sessionId", sessionId);
                            localStorage.setItem("userId", loginUserid);
                        }
                        if ($('.remember-me-icon').hasClass('on')) {
                            var localAll = JSON.stringify({'name': $scope.nameLogin, 'pas': $scope.pasLogin});
                            localStorage.setItem("remember-me", localAll);
                        } else {
                            localStorage.removeItem('remember-me');
                        }
                        $rootScope.loginTrueFalse = false;
                        window.location.href='http://'+window.location.host+'/gcsscrm/#/page1'
                        // window.location.href = 'http://localhost:9999/#/page1#page-top1'
                    } else {
                        $('.tishi').show().html(response.msg)
                    }
                });
                /*发送验证成功后执行*/
            }
        }
        var pp = window.location.hash;
        if (pp == '') {
            $('.reload-yes').eq(0).addClass('active').siblings().removeClass('active')
        } else {
            var pp1 = pp.charAt(pp.length - 1)
            $('.reload-yes').eq(pp1 - 1).addClass('active').siblings().removeClass('active')
        }
        // setTimeout(function () {
        //  window.location.href='../login.html'
        // },5000)
        // $rootScope.changePas = false;

        /*---------------------------------修改密码-----------------------------------------------*/
        $scope.modifyPassword = function () {
            // $rootScope.changePas = true;
            $('.changePas').css('display', 'block')
        }
        $scope.pas1 = ''
        $scope.pas2 = ''
        $scope.changePasbutton1 = function () {
            // $rootScope.changePas = false;
            $('.changePas').css('display', 'none')
            $scope.pas1 = ''
            $scope.pas2 = ''
            $scope.changePastishi = false;
        }
        $scope.changePastishi = false;
        var uPatternIndex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        $scope.indexpageinout1 = function () {
            if (uPatternIndex.test($scope.pas1) == true) {
                $scope.changePastishi = false;
            } else {
                $scope.changePastishi = true;
                $('.changePas-tishi').html('原密码由6到16位（字母，数字）组成')
            }
        }
        $scope.indexpageinout2 = function () {
            if (uPatternIndex.test($scope.pas2) == true) {
                $scope.changePastishi = false;
            } else {
                $scope.changePastishi = true;
                $('.changePas-tishi').html('新密码由6到16位（字母，数字）组成')
            }
        }
        $scope.changePasbutton2 = function () {

            if (uPatternIndex.test($scope.pas1) != true || uPatternIndex.test($scope.pas2) != true) {
                $scope.changePastishi = true;
                $('.changePas-tishi').html('密码格式不正确')
            } else {
                $http({
                    method: 'POST',
                    url: $rootScope.link + '/gcsscrm/general/judgeSession',
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    //上传成功的操作
                    if (response.code == 200) {
                        var modifyPassword = new FormData();
                        modifyPassword.append('username', getlocalAll.name)
                        modifyPassword.append('oldPassword', $scope.pas1)
                        modifyPassword.append('newPassword', $scope.pas2)
                        $http({
                            method: 'POST',
                            data: modifyPassword,
                            url: $rootScope.link + '/gcsscrm/general/modifyPassword',
                            headers: {'Content-Type': undefined},
                            transformRequest: angular.identity
                        }).success(function (response) {
                            //上传成功的操作
                            if (response.code == 200) {
                                $('.changePas').css('display', 'none')
                                $scope.pas1 = ''
                                $scope.pas2 = ''
                                $scope.changePastishi = false;
                            } else {
                                $scope.changePastishi = true;
                                $('.changePas-tishi').html(response.msg)
                            }
                        });
                    } else {
                        window.location.href ='http://'+window.location.host+'/gcsscrm/#/page1'
                        // window.location.href = 'http://localhost:9999/#/page1'
                    }
                });

            }
        }
        /*----------------------注销登录--------------------*/
        $scope.logoutAll = function () {
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/general/judgeSession',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                } else {
                    window.location.href = 'http://'+window.location.host+'/gcsscrm/#/page1'
                    // window.location.href = 'http://localhost:9999/#/page1'
                }
            });
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/general/logout',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    localStorage.removeItem("userId");
                    localStorage.removeItem('sessionId');
                    $rootScope.loginTrueFalse = true;
                    window.location.href = 'http://'+window.location.host+'/gcsscrm/#/page1'
                    // window.location.href = 'http://localhost:9999/#/page1'
                }
            });

        }
    }]);
app.controller('page1C', ["$rootScope", "$scope", "$http", "$timeout", function ($rootScope, $scope, $http, $timeout) {
    //----------------------------------------------------------------------地图-------------------------------------------------------------------------
    $rootScope.mainShow = true;
    $rootScope.changePas = false;


    var getlocalSession = localStorage.getItem("sessionId");
    var getlocalUserId = localStorage.getItem("userId");
    $scope.page1UserIdImportant = getlocalUserId
    if (getlocalSession == null || getlocalSession == undefined || getlocalUserId == undefined || getlocalUserId == null) {
        window.location.href = 'http://'+window.location.host+'/gcsscrm/#/page1'
        // window.location.href = ' http://localhost:9999/#/page1'
        $rootScope.loginTrueFalse = true;
    } else {
        $http({
            method: 'POST',
            url: $rootScope.link + '/gcsscrm/general/judgeSession',
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            //上传成功的操作
            if (response.code == 200) {
                setTimeout(function () {
                    var sendWechatIds = new FormData();
                    sendWechatIds.append('accountId', $scope.page1UserIdImportant);
                    $http({
                        method: 'POST',
                        url: $rootScope.link + '/gcsscrm/general/getAllWeChat',
                        data: sendWechatIds,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        //上传成功的操作
                        if (response.code == 200) {
                            $scope.sendWechatIdsAll = response.data.weChats

                        } else {
                            $('.alert2').show(300).find('.alertCon').html('页面初始化失败，请刷新页面或再次登陆');
                            setTimeout(function () {
                                $('.alert2').hide(300)
                            }, 2000)
                        }
                    });
                    var sendObj1 = new FormData();
                    sendObj1.append('accountId', $scope.page1UserIdImportant);
                    $http({
                        method: 'POST',
                        url: $rootScope.link + '/gcsscrm/general/getAllMsg',
                        data: sendObj1,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        //上传成功的操作
                        if (response.code == 200) {
                            $scope.dataStatus = response.data.regionList
                            $scope.dataCloud = response.data.listFor
                            $scope.constructor1 = response.data.contactTotal
                            $scope.femalePercentage1 = response.data.femalePercentage
                            $scope.malePercentage1 = response.data.malePercentage
                            $scope.unkonwnPercentage1 = response.data.unkonwnPercentage
                            console.log(response)
                            $scope.page1I = 0;
                            $('.page1-change-block').css('display', 'none');
                            /*----更新好友活跃度----*/
                            $scope.activestatList1 = response.data.activestatList;
                            $scope.activestatList1Arr1 = [];
                            $scope.activestatList1Arr2 = []
                            for (var i = 0; i < $scope.activestatList1.length; i++) {
                                $scope.activestatList1Arr1.push($scope.activestatList1[i].chatcount)
                                $scope.activestatList1Arr2.push($scope.activestatList1[i].thedate.substring(5, 10))
                            }
                            // option3.xAxis.data = $scope.activestatList1Arr2
                            // option3.series[0].data =  $scope.activestatList1Arr1
                            // myChart5.setOption(option3);

                            /*----更新好友来源----*/
                            $scope.fromstatList1 = response.data.fromstatList;
                            $scope.fromstatList1Arr1 = [];
                            $scope.fromstatList1Arr2 = []
                            for (var i = 0; i < $scope.fromstatList1.length; i++) {
                                $scope.fromstatList1Arr1.push($scope.fromstatList1[i].sourcename)
                                // fromstatList1Arr2.push($scope.fromstatList1[i].fromcount)
                                $scope.fromstatList1Arr2.push({
                                    value: $scope.fromstatList1[i].fromcount,
                                    name: $scope.fromstatList1[i].sourcename
                                })
                            }
                            // option1.legend.data = $scope.fromstatList1Arr1
                            // option1.series[0].data = $scope.fromstatList1Arr2
                            // myChart1.setOption(option1);
                            /*----更新地图----*/
                            // $.each($scope.dataStatus, function (i, items) {
                            //     var josnStr = "{" + items.cha + ":'#D2D6DE'}";
                            //     $('#container1').vectorMap('set', 'colors', eval('(' + josnStr + ')'));
                            // });
                            // $scope.dataStatus = response.data.regionList
                            // $.each($scope.dataStatus, function (i, items) {
                            //     if (items.des != 0) {
                            //         var josnStr = "{" + items.cha + ":'#09CDFF'}";
                            //         $('#container1').vectorMap('set', 'colors', eval('(' + josnStr + ')'));
                            //     }
                            // });
                            /*----更新好友分组----*/
                            $scope.from1 = response.data.groupstatList;
                            $scope.groupstatListArr1 = [];
                            $scope.groupstatListArr2 = []
                            for (var i = 0; i < $scope.from1.length; i++) {
                                $scope.groupstatListArr1.push($scope.from1 [i].groupname)
                                $scope.groupstatListArr2.push({
                                    value: $scope.from1 [i].groupmembercount,
                                    name: $scope.from1[i].groupname
                                })
                            }

                        } else {
                            $('.alert2').show(300).find('.alertCon').html('页面初始化失败，请刷新页面或再次登陆');
                            setTimeout(function () {
                                $('.alert2').hide(300)
                            }, 2000)
                        }
                    });
                }, 0)
            } else {
                window.location.href = 'http://localhost:8080/gcsscrm/#/page1'
                localStorage.removeItem('sessionId');
                localStorage.removeItem('userId');
                $rootScope.loginTrueFalse = true;
                $('.tishi').show().html('登录身份过期请再次登录')
            }
        });

    }
    /*---------------------------------------------------------------------------------页面初始化-------------------------------------------------------------------------------*/

    setTimeout(function () {
        $('#container1').vectorMap({
            map: 'china_zh',
            backgroundColor: false,
            scale: 5,
            color: "#D2D6DE",
            hoverColor: false,
            //显示各地区名称和活动
            onLabelShow: function (event, label, code) {
                $.each($scope.dataStatus, function (i, items) {
                    if (code == items.cha) {
                        label.html(items.name + items.des);
                    }
                });
            },
            //鼠标移入省份区域，改变鼠标状态
            onRegionOver: function (event, code) {
                $.each($scope.dataStatus, function (i, items) {
                    if ((code == items.cha) && (items.des != '0')) {
                        $('#container1').css({cursor: 'pointer'});
                    }
                });
            },
            //鼠标移出省份区域，改回鼠标状态
            onRegionOut: function (event, code) {
                $.each($scope.dataStatus, function (i, items) {
                    if ((code == items.cha) && (items.des != '0')) {
                        $('#container1').css({cursor: 'auto'});
                    }
                });
            },
        });
        $('.jvectormap-zoomin').click()
        //改变有活动省份区域的颜色
        $.each($scope.dataStatus, function (i, items) {
            if (items.des != '0') {
                var josnStr = "{" + items.cha + ":'#09CDFF'}";
                $('#container1').vectorMap('set', 'colors', eval('(' + josnStr + ')'));
            }
        });
        //----------------------------------------------------------------------好友来源------------------------------------------------------------------------

        var myChart1 = echarts.init(document.getElementById('chat-one'));
        option1 = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: $scope.fromstatList1Arr1
            },
            series: [
                {
                    name: '好友来源',
                    type: 'pie',
                    radius: '80%',
                    center: ['50%', '55%'],
                    data: $scope.fromstatList1Arr2,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart1.setOption(option1);
        //--------------年龄----------------
        // var myChart2 = echarts.init(document.getElementById('chat-two'));
        // option = {
        //     title: {
        //         text: '好友年龄',
        //         x: "center"
        //     },
        //     tooltip: {
        //         trigger: 'item',
        //         // formatter: "{a} <br/>{b} : {c} ({d}%)"
        //     },
        //     xAxis: {
        //         data: ["哈哈哈", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '好友新增人数',
        //         type: 'bar',
        //         itemStyle: {
        //             normal: {
        //                 //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
        //                 color: function (params) {
        //                     // build a color map as your need.
        //                     var colorList = [
        //                         '#717CC5', '#75CDFA', '#9ACB77', '#F6B970', '#EE7B61',
        //                         '#7ED138', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
        //                         '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
        //                     ];
        //                     return colorList[params.dataIndex]
        //                 },
        //             }
        //         },
        //         barWidth: 40,
        //         data: [105, 20, 36, 10, 10, 20]
        //     }]
        // };
        // myChart2.setOption(option);
        //
        // //--------------好友收入-----------
        //
        // var myChart3 = echarts.init(document.getElementById('chat-sree'));
        // option = {
        //     title: {
        //         text: '好友收入',
        //         x: "center"
        //     },
        //     tooltip: {
        //         trigger: 'axis',
        //     },
        //
        //     xAxis: {
        //         type: 'value',
        //
        //     },
        //     yAxis: {
        //
        //         data: ['0-5', '5-8', '8-9', '9-10', '10-11', '11-15']
        //     },
        //     series: [
        //         {
        //             name: '2011年',
        //             type: 'bar',
        //             itemStyle: {
        //                 normal: {
        //                     //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
        //                     color: function (params) {
        //                         // build a color map as your need.
        //                         var colorList = [
        //                             '#717CC5', '#75CDFA', '#9ACB77', '#F6B970', '#EE7B61',
        //                             '#7ED138', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
        //                             '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
        //                         ];
        //                         return colorList[params.dataIndex]
        //                     },
        //                 }
        //             },
        //             data: [18203, 23489, 29034, 104970, 131744, 630230]
        //         },
        //     ]
        // };
        // myChart3.setOption(option);

        //------------------------------------------------------------------好友分组---------------------------------------------------------
        var myChart4 = echarts.init(document.getElementById('chat-four'));
        option2 = {
            tooltip: {
                trigger: 'item',
                // formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            xAxis: {
                data: $scope.groupstatListArr1
            },
            yAxis: {},
            series: [{
                type: 'bar',
                itemStyle: {
                    normal: {
                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#717CC5', '#75CDFA', '#9ACB77', '#F6B970', '#EE7B61',
                                '#7ED138', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
                barWidth: 40,
                data: $scope.groupstatListArr2
            }]
        };
        myChart4.setOption(option2);//---------------------------------------------------------------好友活跃数--------------------------------------------------------------------
        var myChart5 = echarts.init(document.getElementById('chat-five'));
        option3 = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: $scope.activestatList1Arr2
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '好友活跃人数',
                    type: 'line',
                    color: ['#5098F4'],
                    stack: '总量',
                    data: $scope.activestatList1Arr1
                }
            ]
        };
        myChart5.setOption(option3);

        //-----------------------------------------------------------------标签云---------------------------------------------------
        var dataCloud = $scope.dataCloud
        var string_ = "";
        for (var i = 0; i < dataCloud.length; i++) {
            var string_f = dataCloud[i][0];
            var string_n = dataCloud[i][1];
            string_ += "{text: '" + string_f + "', weight: '" + string_n + "',html: {'class': 'span_list'}},";
            // string_ += "{text: '" + string_f + "', weight: '" + string_n + "',html: {'class': 'span_list',onmouseover:'on_mouseover(this,event)',onmouseout:'on_mouseout()'}},";
        }

        function on_mouseover(e, ev) {
            var txt = $(e).html();
            ev = ev || event;
            $.each(dataCloud, function (i, item) {
                if (txt == item[0]) {
                    var html = item[2];
                    $("#my_favorite_latin_words").after("<div class='append_div' style='left:" + ev.clientX + "px; top:" + ev.clientY + "px; '>" + html + "</div>");
                    return;
                }
            });
        }

        $(function () {
            $("#my_favorite_latin_words").jQCloud(word_list, {
                autoResize: true,
                shape: 'elliptic',
                delay: 80
            });
        });
        var string_list = string_;
        var word_list = eval("[" + string_list + "]");
    }, 500)

    //------------------------------------------------------------------------------------------选择设备---------------------------------------------------
    $(function () {
        $scope.page1I = 0
        $(document).on('click', '.haha', function () {
            $scope.page1I++
            if ($scope.page1I % 2 == 0) {
                $('.page1-change-block').css('display', 'none')


            } else {
                $('.page1-change-block').css('display', 'block')

            }
        })
        //----------------单个点击---------------
        $scope.page1Click = function (e) {
            if ($('.page1-checkbox-one')[e].attributes[1].value == 0) {
                $('.page1-checkbox-one').eq(e).prev().addClass('on')
                $('.page1-checkbox-one')[e].attributes[1].value = 1
            } else {
                $('.page1-checkbox-one').eq(e).prev().removeClass('on')
                $('.page1-checkbox-one')[e].attributes[1].value = 0
            }
        }
        //-----------全选设备逻辑-----------
        $('.checkAllTelephone').click(function () {
                jilu = 0
                $('.checkbox-toggle-change').prev().removeClass('on');
                var importValue = $(this).attr('data')
                var allisChange = $('.isChange')
                console.log(allisChange)
                if (importValue == 0) {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 1
                        $('.isChange').prev().addClass('on')
                    }
                    $(this).attr('data', '1').prev().addClass('on')
                }
                else {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 0
                        $('.isChange').prev().removeClass('on')
                    }
                    $(this).attr('data', '0').prev().removeClass('on')
                }
            }
        )
        var jilu = 0
        //------------------反选设备逻辑--------------------
        $('.checkbox-toggle-change').click(function () {
            jilu++
            if (jilu % 2 == 0) {
                $(this).prev().removeClass('on')
            } else {
                $(this).prev().addClass('on')
            }
            $('.checkAllTelephone').attr('data', '0').prev().removeClass('on');
            var allisChangeNo = $('.isChange')
            for (var i = 0; i < allisChangeNo.length; i++) {
                if (allisChangeNo[i].attributes[1].value == 0) {
                    $('.isChange').eq(i).prev().addClass('on');
                    allisChangeNo[i].attributes[1].value = 1
                } else {
                    $('.isChange').eq(i).prev().removeClass('on');
                    allisChangeNo[i].attributes[1].value = 0
                }
            }
        });
    })

    /*---------------------------------------------------------------------------------选择相关微信号筛选数据-------------------------------------------------------------------------------*/
    $scope.sendMsg = function () {
        var allCheckedSendAll = $('.page1-checkbox-one')
        /*----更新标签云----*/
        for (var i = 0, arr = []; i < allCheckedSendAll.length; i++) {
            if (allCheckedSendAll[i].attributes.data1.value == 1) {
                arr.push(allCheckedSendAll[i].attributes.data.value)
            }
        }
        if (arr.length == 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择相关微信号');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var sendObj = new FormData();
            sendObj.append('weChatIds', JSON.stringify(arr));
            // sendObj.append('weChatIds', JSON.stringify(arr));
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/general/getAllMsg',
                data: sendObj,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $scope.activestatList1Arr1 = [];
                    $scope.activestatList1Arr2 = []
                    $scope.fromstatList1Arr1 = [];
                    $scope.fromstatList1Arr2 = []
                    $scope.groupstatListArr1 = [];
                    $scope.groupstatListArr2 = []
                    $scope.dataStatus = response.data.regionList
                    $scope.dataCloud = response.data.listFor
                    $scope.constructor1 = response.data.contactTotal
                    $scope.femalePercentage1 = response.data.femalePercentage
                    $scope.malePercentage1 = response.data.malePercentage
                    $scope.unkonwnPercentage1 = response.data.unkonwnPercentage
                    console.log(response)
                    $scope.page1I = 0;
                    $('.page1-change-block').css('display', 'none');
                    /*----更新好友活跃度----*/
                    $scope.activestatList1 = response.data.activestatList;
                    for (var i = 0; i < $scope.activestatList1.length; i++) {
                        $scope.activestatList1Arr1.push($scope.activestatList1[i].chatcount)
                        $scope.activestatList1Arr2.push($scope.activestatList1[i].thedate.substring(5, 10))
                    }
                    var myChart5 = echarts.init(document.getElementById('chat-five'));
                    option3.xAxis.data = $scope.activestatList1Arr2
                    option3.series[0].data = $scope.activestatList1Arr1
                    myChart5.setOption(option3);

                    /*----更新好友来源----*/
                    $scope.fromstatList1 = response.data.fromstatList;
                    for (var i = 0; i < $scope.fromstatList1.length; i++) {
                        $scope.fromstatList1Arr1.push($scope.fromstatList1[i].sourcename)
                        $scope.fromstatList1Arr2.push({
                            value: $scope.fromstatList1[i].fromcount,
                            name: $scope.fromstatList1[i].sourcename
                        })
                    }
                    var myChart1 = echarts.init(document.getElementById('chat-one'));
                    option1.legend.data = $scope.fromstatList1Arr1;
                    option1.series[0].data = $scope.fromstatList1Arr2
                    myChart1.setOption(option1);

                    /*----更新地图----*/
                    $.each($scope.dataStatus, function (i, items) {
                        var josnStr = "{" + items.cha + ":'#D2D6DE'}";
                        $('#container1').vectorMap('set', 'colors', eval('(' + josnStr + ')'));
                    });
                    $scope.dataStatus = response.data.regionList
                    $.each($scope.dataStatus, function (i, items) {
                        if (items.des != 0) {
                            var josnStr = "{" + items.cha + ":'#09CDFF'}";
                            $('#container1').vectorMap('set', 'colors', eval('(' + josnStr + ')'));
                        }
                    });
                    /*----更新好友分组----*/
                    $scope.from1 = response.data.groupstatList;
                    for (var i = 0; i < $scope.from1.length; i++) {
                        $scope.groupstatListArr1.push($scope.from1 [i].groupname)
                        $scope.groupstatListArr2.push({
                            value: $scope.from1 [i].groupmembercount,
                            name: $scope.from1[i].groupname
                        })
                    }

                    var myChart4 = echarts.init(document.getElementById('chat-four'));
                    option2.xAxis.data = $scope.groupstatListArr1;
                    option2.series[0].data = $scope.groupstatListArr2;
                    myChart4.setOption(option2);
                    // option2.xAxis.data =  $scope.groupstatListArr1
                    // option2.series[0].data = $scope.groupstatListArr2
                    // myChart4.setOption(option2);
                    // $('.alert1').show(300).find('.alertCon').html('微信号查找数据加载成功');
                    // setTimeout(function () {
                    //     $('.alert1').hide(300)
                    // }, 2000)
                    $('.alert1').show(300).find('.alertCon').html('微信号查找数据加载成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                } else {
                    $('.alert2').show(300).find('.alertCon').html('微信号查找数据加载失败，请稍后再试');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                    // alert(response.msg);
                }
            });
        }
    }
    $scope.data4 = [{id: 1, name: "微信一", state: 0}, {id: 2, name: "微信二", state: 0}, {id: 3, name: "分微信三", state: 0}, {
        id: 4, name: "微信四",
        state: 0
    }, {id: 5, name: '微信五', state: 0}]
}])
;

app.controller('page2C', ["$rootScope", "$scope", "$http", "$timeout", function ($rootScope, $scope, $http, $timeout) {
    $scope.page2UserIdImportant=localStorage.getItem("userId");
    $scope.page2Wechats = [];
    if($scope.page2UserIdImportant==undefined||$scope.page2UserIdImportant==null||$scope.page2UserIdImportant==''){
    }else {
    setTimeout(function () {
        var sendWechatIds = new FormData();
        sendWechatIds.append('accountId', $scope.page2UserIdImportant);
        $http({
            method: 'POST',
            url: $rootScope.link + '/gcsscrm/general/getAllWeChat',
            data: sendWechatIds,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            //上传成功的操作
            if (response.code == 200) {
                $scope.sendWechatIdsAll = response.data.weChats
                for (var i = 0; i < $scope.sendWechatIdsAll.length; i++) {
                    $scope.page2Wechats.push($scope.sendWechatIdsAll[i].id)
                }
            } else {
                $('.alert2').show(300).find('.alertCon').html('页面初始化失败，请刷新页面或再次登陆');
                setTimeout(function () {
                    $('.alert2').hide(300)
                }, 2000)
            }
        });
        var sendObj1 = new FormData();
        sendObj1.append('accountId', $scope.page2UserIdImportant);
        $http({
            method: 'POST',
            url: $rootScope.link + '/gcsscrm/extension/getAllMsg',
            data: sendObj1,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            //上传成功的操作
            if (response.code == 200) {
                $scope.nowPeoples = response.data.contactCount;
                $scope.yestodayPeoples = response.data.timeIntervalCount;
                $scope.addLv1 = ($scope.yestodayPeoples / $scope.nowPeoples) * 100;
                $scope.addLv = $scope.addLv1.toFixed(1)
                $scope.addCount = response.data.timesCount;
                $scope.groupAllNum = response.data.chatRoomCount;
                $scope.yestodayGroupAllNum = response.data.chatRoomStatBeforeInteCount;
                $scope.newAddGroupAllNum1 = ($scope.groupAllNum - $scope.yestodayGroupAllNum) / $scope.yestodayGroupAllNum * 100;
                $scope.newAddGroupAllNum = $scope.newAddGroupAllNum1.toFixed(1)
                $scope.allRenwu = response.data.getAllTask;
                console.log(response)
                /*----更新近一周操作统计----*/
                $scope.activestatList1 = response.data.recentWeekOperationstat;
                $scope.activestatList1Arr1 = [];
                $scope.activestatList1Arr2 = []
                for (var i = 0; i < $scope.activestatList1.length; i++) {
                    $scope.activestatList1Arr1.push($scope.activestatList1[i].operatetypecount)
                    $scope.activestatList1Arr2.push($scope.activestatList1[i].thedate.slice(0,10))
                }
                /*----更新任务类型----*/
                $scope.fromstatList1 = response.data.operationstatList;
                $scope.fromstatList1Arr1 = [];
                $scope.fromstatList1Arr2 = []
                for (var i = 0; i < $scope.fromstatList1.length; i++) {
                    $scope.fromstatList1Arr1.push($scope.fromstatList1[i].operatetype)
                    $scope.fromstatList1Arr2.push($scope.fromstatList1[i].operatetypecount)
                }
                console.log($scope.fromstatList1Arr1)
                console.log($scope.fromstatList1Arr2)
                /*----更新新增好友来源----*/
                $scope.from1 = response.data.getAllFromstat;
                $scope.groupstatListArr1 = [];
                $scope.groupstatListArr2 = []
                for (var i = 0; i < $scope.from1.length; i++) {
                    $scope.groupstatListArr1.push($scope.from1 [i].sourcename)
                    $scope.groupstatListArr2.push($scope.from1 [i].fromcount)
                }

            } else {
                $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或再次登陆');
                setTimeout(function () {
                    $('.alert2').hide(300)
                }, 2000)
            }
        });
    }, 0)
}




    $rootScope.mainShow = true;
    $rootScope.changePas = false;
    setTimeout(function () {

        $('#example2').DataTable({
            // 'paging'      : true,
            // 'lengthChange': false,
            // 'searching'   : false,
            // 'ordering'    : true,
            'info': false,
            // 'autoWidth'   : false
        })
        var myChart5 = echarts.init(document.getElementById('chat-one'));
        option1 = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: $scope.activestatList1Arr2
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '操作总数',
                    type: 'line',
                    color: ['#5098F4'],
                    stack: '总量',
                    data: $scope.activestatList1Arr1
                },
            ]
        };
        myChart5.setOption(option1);

        var myChart2 = echarts.init(document.getElementById('chat-two'));
        option2 = {
            tooltip: {
                trigger: 'item',
                // formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            xAxis: {
                data: $scope.fromstatList1Arr1
            },
            yAxis: {},
            series: [{
                name: '任务类型',
                type: 'bar',
                itemStyle: {
                    normal: {
                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#717CC5', '#75CDFA', '#9ACB77', '#F6B970', '#EE7B61',
                                '#7ED138', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
                barWidth: 40,
                data: $scope.fromstatList1Arr2
            }]
        };
        myChart2.setOption(option2);

        var myChart3 = echarts.init(document.getElementById('chat-sree'));
        option3 = {
            tooltip: {
                trigger: 'item',
                // formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            xAxis: {
                data: $scope.groupstatListArr1
            },
            yAxis: {},
            series: [{
                name: '新增好友来源',
                type: 'bar',
                itemStyle: {
                    normal: {
                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#7ED138', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#717CC5', '#75CDFA', '#9ACB77', '#F6B970', '#EE7B61',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',


                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
                barWidth: 40,
                data: $scope.groupstatListArr2
            }]
        };
        myChart3.setOption(option3);
    }, 500)

    $('#config-demo').daterangepicker({
        startDate: moment().hours(0).minutes(0).seconds(0), //设置开始日期
        endDate: moment(new Date()), //设置结束器日期
        maxDate: moment(new Date()), //设置最大日期
        "opens": "left",
        ranges: {
            // '今天': [moment(), moment()],
            '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '上周': [moment().subtract(6, 'days'), moment()],
            '前30天': [moment().subtract(29, 'days'), moment()],
            '本月': [moment().startOf('month'), moment().endOf('month')],
            '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        showWeekNumbers: true,
        locale: {
            format: "YYYY-MM-DD", //设置显示格式
            applyLabel: '确定', //确定按钮文本
            cancelLabel: '取消', //取消按钮文本
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'
            ],
            firstDay: 1
        },
    }, function (start, end, label) {
        timeRangeChange = [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
        // console.log(timeRangeChange);
    });
    $(function () {
        $scope.page2Jilu = 0
        $(document).on('click', '.haha', function () {
            $scope.page2Jilu++
            if ($scope.page2Jilu % 2 == 0) {
                $('.page1-change-block').css('display', 'none')


            } else {
                $('.page1-change-block').css('display', 'block')

            }
        })
        //----------------单个点击---------------
        $scope.page2Click = function (e) {
            if ($('.page1-checkbox-one')[e].attributes[1].value == 0) {
                $('.page1-checkbox-one').eq(e).prev().addClass('on')
                $('.page1-checkbox-one')[e].attributes[1].value = 1
            } else {
                $('.page1-checkbox-one').eq(e).prev().removeClass('on')
                $('.page1-checkbox-one')[e].attributes[1].value = 0
            }
        }
        //-----------全选设备逻辑-----------
        $('.checkAllTelephone').click(function () {
                jilu = 0
                $('.checkbox-toggle-change').prev().removeClass('on');
                var importValue = $(this).attr('data')
                var allisChange = $('.isChange')
                console.log(allisChange)
                if (importValue == 0) {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 1
                        $('.isChange').prev().addClass('on')
                    }
                    $(this).attr('data', '1').prev().addClass('on')
                }
                else {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 0
                        $('.isChange').prev().removeClass('on')
                    }
                    $(this).attr('data', '0').prev().removeClass('on')
                }
            }
        )
        var jilu = 0
        //------------------反选设备逻辑--------------------
        $('.checkbox-toggle-change').click(function () {
            jilu++
            if (jilu % 2 == 0) {
                $(this).prev().removeClass('on')
            } else {
                $(this).prev().addClass('on')
            }
            $('.checkAllTelephone').attr('data', '0').prev().removeClass('on');
            var allisChangeNo = $('.isChange')
            for (var i = 0; i < allisChangeNo.length; i++) {
                if (allisChangeNo[i].attributes[1].value == 0) {
                    $('.isChange').eq(i).prev().addClass('on');
                    allisChangeNo[i].attributes[1].value = 1
                } else {
                    $('.isChange').eq(i).prev().removeClass('on');
                    allisChangeNo[i].attributes[1].value = 0
                }
            }
        });

    })
    /*-------------------------选择对应微信号确认后------------------------*/

    $scope.sendMsg = function () {
        var allCheckedSendAll = $('.page1-checkbox-one')
        /*----更新标签云----*/
        for (var i = 0, arr = []; i < allCheckedSendAll.length; i++) {
            if (allCheckedSendAll[i].attributes.data1.value == 1) {
                arr.push(allCheckedSendAll[i].attributes.data.value)
            }
        }
        if (arr.length == 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择相关微信号');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var sendObj = new FormData();
            sendObj.append('weChatIds', JSON.stringify(arr));
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/extension/getAllMsg',
                data: sendObj,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $scope.page2Wechats = [];
                    $scope.groupstatListArr1 = [];
                    $scope.groupstatListArr2 = []
                    $scope.fromstatList1Arr1 = [];
                    $scope.fromstatList1Arr2 = []
                    $scope.activestatList1Arr1 = [];
                    $scope.activestatList1Arr2 = []
                    $scope.page2Wechats.push(JSON.stringify(arr))
                    $scope.nowPeoples = response.data.contactCount;
                    $scope.yestodayPeoples = response.data.timeIntervalCount;
                    $scope.addLv1 = ($scope.yestodayPeoples / $scope.nowPeoples) * 100;
                    $scope.addLv = $scope.addLv1.toFixed(1)
                    $scope.addCount = response.data.timesCount;
                    $scope.groupAllNum = response.data.chatRoomCount;
                    $scope.yestodayGroupAllNum = response.data.chatRoomStatBeforeInteCount;
                    $scope.newAddGroupAllNum1 = ($scope.groupAllNum - $scope.yestodayGroupAllNum) / $scope.yestodayGroupAllNum * 100;
                    $scope.newAddGroupAllNum = $scope.newAddGroupAllNum1.toFixed(1)
                    $scope.allRenwu = response.data.getAllTask;
                    console.log(response)
                    /*----更新近一周操作统计----*/
                    $scope.activestatList1 = response.data.recentWeekOperationstat;
                    $scope.activestatList1Arr1 = [];
                    $scope.activestatList1Arr2 = []
                    for (var i = 0; i < $scope.activestatList1.length; i++) {
                        $scope.activestatList1Arr1.push($scope.activestatList1[i].operatetypecount)
                        $scope.activestatList1Arr2.push($scope.activestatList1[i].thedate.slice(0,10))
                    }
                    var myChart5 = echarts.init(document.getElementById('chat-one'));
                    option1.xAxis.data = $scope.activestatList1Arr2
                    option1.series[0].data = $scope.activestatList1Arr1
                    myChart5.setOption(option1);
                    /*----更新任务类型----*/
                    $scope.fromstatList1 = response.data.operationstatList;
                    for (var i = 0; i < $scope.fromstatList1.length; i++) {
                        $scope.fromstatList1Arr1.push($scope.fromstatList1[i].operatetype)
                        $scope.fromstatList1Arr2.push($scope.fromstatList1[i].operatetypecount)
                    }
                    var myChart2 = echarts.init(document.getElementById('chat-two'));
                    option2.xAxis.data = $scope.fromstatList1Arr1
                    option2.series[0].data = $scope.fromstatList1Arr2
                    myChart2.setOption(option2);
                    /*----更新新增好友来源----*/
                    $scope.from1 = response.data.getAllFromstat;
                    for (var i = 0; i < $scope.from1.length; i++) {
                        $scope.groupstatListArr1.push($scope.from1 [i].sourcename)
                        $scope.groupstatListArr2.push($scope.from1 [i].fromcount)
                    }
                    var myChart3 = echarts.init(document.getElementById('chat-sree'));
                    option3.xAxis.data = $scope.groupstatListArr1
                    option3.series[0].data = $scope.groupstatListArr2
                    myChart3.setOption(option3);
                    $('.alert1').show(300).find('.alertCon').html('微信号查找数据加载成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                    $('.page1-change-block').css('display', 'none')
                    $scope.page2Jilu = 0;
                } else {
                    $('.alert2').show(300).find('.alertCon').html('微信号查找数据加载失败，请稍后再试');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                    $('.page1-change-block').css('display', 'none')
                    $scope.page2Jilu = 0;
                }
            });
        }
    }

    /*-------------------------选择对应时间确认后------------------------*/
    $('.clickChose').click(function () {
        var times1 = ''
        var times2 = ''
        setTimeout(function () {
            var times = $('.form-control').val();
            times1 = times.substr(0, 10);
            times2 = times.substr(13, 10);
        }, 300)
        setTimeout(function () {
            var sendObj2 = new FormData();
            sendObj2.append('startDate', times1);
            sendObj2.append('weChatIds', JSON.stringify($scope.page2Wechats));
            sendObj2.append('endDate', times2);
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/extension/getAllMsg',
                data: sendObj2,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $scope.groupstatListArr1 = [];
                    $scope.groupstatListArr2 = []
                    $scope.fromstatList1Arr1 = [];
                    $scope.fromstatList1Arr2 = []
                    $scope.activestatList1Arr1 = [];
                    $scope.activestatList1Arr2 = []
                    // $scope.checkWechatId.push(JSON.stringify(arr))
                    // $scope.nowPeoples = response.data.contactCount;
                    // $scope.yestodayPeoples = response.data.timeIntervalCount;
                    // $scope.newAddPeople = $scope.nowPeoples - $scope.yestodayPeoples;
                    // $scope.addLv1 = ($scope.newAddPeople / $scope.yestodayPeoples) * 100;
                    // $scope.addLv = $scope.addLv1.toFixed(1)
                    // $scope.addCount = response.data.timesCount;
                    // $scope.groupAllNum = response.data.chatRoomCount;
                    // $scope.yestodayGroupAllNum = response.data.chatRoomStatBeforeInteCount;
                    // $scope.newAddGroupAllNum1 = ($scope.groupAllNum - $scope.yestodayGroupAllNum) / $scope.yestodayGroupAllNum * 100;
                    // $scope.newAddGroupAllNum = $scope.newAddGroupAllNum1.toFixed(1)
                    $scope.allRenwu = response.data.getAllTask;
                    /*----更新近一周操作统计----*/
                    $scope.activestatList1 = response.data.recentWeekOperationstat;
                    $scope.activestatList1Arr1 = [];
                    $scope.activestatList1Arr2 = []
                    for (var i = 0; i < $scope.activestatList1.length; i++) {
                        $scope.activestatList1Arr1.push($scope.activestatList1[i].operatetypecount)
                        $scope.activestatList1Arr2.push($scope.activestatList1[i].thedate.slice(0,10))
                    }
                    var myChart5 = echarts.init(document.getElementById('chat-one'));
                    option1.xAxis.data = $scope.activestatList1Arr2
                    option1.series[0].data = $scope.activestatList1Arr1
                    myChart5.setOption(option1);
                    /*----更新任务类型----*/
                    $scope.fromstatList1 = response.data.operationstatList;
                    for (var i = 0; i < $scope.fromstatList1.length; i++) {
                        $scope.fromstatList1Arr1.push($scope.fromstatList1[i].operatetype)
                        $scope.fromstatList1Arr2.push($scope.fromstatList1[i].operatetypecount)
                    }

                    var myChart2 = echarts.init(document.getElementById('chat-two'));
                    option2.xAxis.data = $scope.fromstatList1Arr1
                    option2.series[0].data = $scope.fromstatList1Arr2
                    myChart2.setOption(option2);
                    /*----更新新增好友来源----*/
                    $scope.from1 = response.data.getAllFromstat;
                    for (var i = 0; i < $scope.from1.length; i++) {
                        $scope.groupstatListArr1.push($scope.from1 [i].sourcename)
                        $scope.groupstatListArr2.push($scope.from1 [i].fromcount)
                    }
                    var myChart3 = echarts.init(document.getElementById('chat-sree'));
                    option3.xAxis.data = $scope.groupstatListArr1
                    option3.series[0].data = $scope.groupstatListArr2
                    myChart3.setOption(option3);
                    $('.alert1').show(300).find('.alertCon').html('微信号查找数据加载成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                } else {
                    $('.alert2').show(300).find('.alertCon').html('时间查找数据加载失败，请稍后再试');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                    // alert(response.msg);
                }
            });
        }, 350)
    })
}]);

app.controller('page3C', ["$rootScope", "$scope", "$http", "$timeout", function ($rootScope, $scope, $http, $timeout) {
    $scope.page3UserIdImportant=localStorage.getItem("userId");
    if($scope.page3UserIdImportant==undefined||$scope.page3UserIdImportant==null||$scope.page3UserIdImportant==''){
    }else {  setTimeout(function () {
        $scope.page2Wechats = [];
        var sendWechatIds = new FormData();
        sendWechatIds.append('accountId', $scope.page3UserIdImportant);
        $http({
            method: 'POST',
            url: $rootScope.link + '/gcsscrm/general/getAllWeChat',
            data: sendWechatIds,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            //上传成功的操作
            if (response.code == 200) {
                $scope.sendWechatIdsAll = response.data.weChats
                for (var i = 0; i < $scope.sendWechatIdsAll.length; i++) {
                    $scope.page2Wechats.push($scope.sendWechatIdsAll[i].id)
                }
            } else {
                $('.alert2').show(300).find('.alertCon').html('页面初始化失败，请刷新页面或再次登陆');
                setTimeout(function () {
                    $('.alert2').hide(300)
                }, 2000)
            }
        });

        var sendObj1 = new FormData();
        sendObj1.append('accountId', $scope.page3UserIdImportant);
        $http({
            method: 'POST',
            url: $rootScope.link + '/gcsscrm/customer/getAllMsgToPage',
            data: sendObj1,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            //上传成功的操作
            if (response.code == 200){
                $scope.todayChats = response.data.nowChat.chatcount;
                $scope.todayActive = response.data.nowChat.activecount;
                $scope.todayReceivemessage = response.data.nowChat.receivemessage;
                $scope.todaySendmessage = response.data.nowChat.sendmessage;
                $scope.allRenwu = response.data.taskstatList;
                console.log(response)
                /*----更新近一周消息统计----*/
                $scope.activestatList1 = response.data.chatlist;
                $scope.activestatList1Arr1 = [];
                $scope.activestatList1Arr2 = []
                $scope.activestatList1Arr3 = []
                for (var i = 0; i < $scope.activestatList1.length; i++) {
                    $scope.activestatList1Arr1.push($scope.activestatList1[i].thedate.slice(0, 10))
                    $scope.activestatList1Arr2.push($scope.activestatList1[i].receivemessage)
                    $scope.activestatList1Arr3.push($scope.activestatList1[i].sendmessage)
                }
                /*----未沟通数量----*/
                $scope.fromstatList1 = response.data.nochatstatList;
                $scope.fromstatList1Arr1 = [];
                $scope.fromstatList1Arr2 = []
                for (var i = 0; i < $scope.fromstatList1.length; i++) {
                    $scope.fromstatList1Arr1.push($scope.fromstatList1[i].nochattime)
                    $scope.fromstatList1Arr2.push($scope.fromstatList1[i].nochatcount)
                }
                /*----最热聊天----*/
                $scope.from1 = response.data.hotchatstatList;
                $scope.groupstatListArr1 = [];
                $scope.groupstatListArr2 = []
                for (var i = 0; i < $scope.from1.length; i++) {
                    $scope.groupstatListArr1.push($scope.from1 [i].friendwechat)
                    $scope.groupstatListArr2.push($scope.from1 [i].chatcount)
                }

            } else {
                $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或再次登陆');
                setTimeout(function () {
                    $('.alert2').hide(300)
                }, 2000)
            }
        });
    }, 0)}

    $rootScope.changePas = false;
    $rootScope.mainShow = true;
    setTimeout(function () {
        $('#example2').DataTable({
            // 'paging'      : true,
            // 'lengthChange': false,
            // 'searching'   : false,
            // 'ordering'    : true,
            'info': false,
            // 'autoWidth'   : false
        })
        var myChart5 = echarts.init(document.getElementById('chat-one'));
        option1 = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: $scope.activestatList1Arr1
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '发送消息总数',
                    type: 'line',
                    color: ['#5098F4'],
                    stack: '总量',
                    data: $scope.activestatList1Arr2
                },
                {
                    name: '收到消息总数',
                    type: 'line',
                    color: ['#91C7AE'],
                    stack: '总量',
                    data: $scope.activestatList1Arr3
                }
            ]
        };
        myChart5.setOption(option1);

        var myChart2 = echarts.init(document.getElementById('chat-two'));
        option2 = {
            tooltip: {
                trigger: 'item',
                // formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            xAxis: {
                data: $scope.fromstatList1Arr1
            },
            yAxis: {},
            series: [{
                name: '未沟通',
                type: 'bar',
                itemStyle: {
                    normal: {
                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#717CC5', '#75CDFA', '#9ACB77', '#F6B970', '#EE7B61',
                                '#7ED138', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
                barWidth: 40,
                data: $scope.fromstatList1Arr2
            }]
        };
        myChart2.setOption(option2);

        var myChart3 = echarts.init(document.getElementById('chat-sree'));
        option3 = {
            tooltip: {
                trigger: 'item',
                // formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            xAxis: {
                data: $scope.groupstatListArr1
            },
            yAxis: {},
            series: [{
                name: '沟通数量',
                type: 'bar',
                itemStyle: {
                    normal: {
                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#7ED138', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#717CC5', '#75CDFA', '#9ACB77', '#F6B970', '#EE7B61',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',


                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
                barWidth: 40,
                data: $scope.groupstatListArr2
            }]
        };
        myChart3.setOption(option3);
    }, 500)
    $('#config-demo').daterangepicker({
        startDate: moment().hours(0).minutes(0).seconds(0), //设置开始日期
        endDate: moment(new Date()), //设置结束器日期
        maxDate: moment(new Date()), //设置最大日期
        "opens": "left",
        ranges: {
            // '今天': [moment(), moment()],
            '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '上周': [moment().subtract(6, 'days'), moment()],
            '前30天': [moment().subtract(29, 'days'), moment()],
            '本月': [moment().startOf('month'), moment().endOf('month')],
            '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        showWeekNumbers: true,
        locale: {
            format: "YYYY-MM-DD", //设置显示格式
            applyLabel: '确定', //确定按钮文本
            cancelLabel: '取消', //取消按钮文本
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'
            ],
            firstDay: 1
        },
    }, function (start, end, label) {
        timeRangeChange = [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
        // console.log(timeRangeChange);
    });
    $(function () {
        $scope.page3Jilu = 0
        $(document).on('click', '.haha', function () {
            $scope.page3Jilu++
            if ($scope.page3Jilu % 2 == 0) {
                $('.page1-change-block').css('display', 'none')


            } else {
                $('.page1-change-block').css('display', 'block')

            }
        })
        //----------------单个点击---------------
        $scope.page3Click = function (e) {
            if ($('.page1-checkbox-one')[e].attributes[1].value == 0) {
                $('.page1-checkbox-one').eq(e).prev().addClass('on')
                $('.page1-checkbox-one')[e].attributes[1].value = 1
            } else {
                $('.page1-checkbox-one').eq(e).prev().removeClass('on')
                $('.page1-checkbox-one')[e].attributes[1].value = 0
            }
        }
        //-----------全选设备逻辑-----------
        $('.checkAllTelephone').click(function () {
                jilu = 0
                $('.checkbox-toggle-change').prev().removeClass('on');
                var importValue = $(this).attr('data')
                var allisChange = $('.isChange')
                console.log(allisChange)
                if (importValue == 0) {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 1
                        $('.isChange').prev().addClass('on')
                    }
                    for (var i2 = 0; i2 < $scope.data4.length; i2++) {
                        $scope.data4[i2].state = 1
                    }
                    $(this).attr('data', '1').prev().addClass('on')
                }
                else {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 0
                        $('.isChange').prev().removeClass('on')
                    }
                    for (var i2 = 0; i2 < $scope.data4.length; i2++) {
                        $scope.data4[i2].state = 0
                    }
                    $(this).attr('data', '0').prev().removeClass('on')
                }
                console.log($scope.data4)
            }
        )
        var jilu = 0
        //------------------反选设备逻辑--------------------
        $('.checkbox-toggle-change').click(function () {
            jilu++
            if (jilu % 2 == 0) {
                $(this).prev().removeClass('on')
            } else {
                $(this).prev().addClass('on')
            }
            $('.checkAllTelephone').attr('data', '0').prev().removeClass('on');
            var allisChangeNo = $('.isChange')
            for (var i = 0; i < allisChangeNo.length; i++) {
                if (allisChangeNo[i].attributes[1].value == 0) {
                    $('.isChange').eq(i).prev().addClass('on');
                    allisChangeNo[i].attributes[1].value = 1
                    $scope.data4[allisChangeNo[i].attributes[3].value].state = 1
                } else {
                    $('.isChange').eq(i).prev().removeClass('on');
                    allisChangeNo[i].attributes[1].value = 0
                    $scope.data4[allisChangeNo[i].attributes[3].value].state = 0
                }
            }
            console.log($scope.data4)
        });

    })
    /*-------------------------选择对应微信号确认后------------------------*/

    $scope.sendMsg = function () {
        var allCheckedSendAll = $('.page1-checkbox-one')
        /*----更新标签云----*/
        for (var i = 0, arr = []; i < allCheckedSendAll.length; i++) {
            if (allCheckedSendAll[i].attributes.data1.value == 1) {
                arr.push(allCheckedSendAll[i].attributes.data.value)
            }
        }
        if (arr.length == 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择相关微信号');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var sendObj = new FormData();
            sendObj.append('weChatIds', JSON.stringify(arr));
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/customer/getAllMsgToPage',
                data: sendObj,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $scope.page2Wechats.push(JSON.stringify(arr))
                    $scope.page1I = 0;
                    $('.page1-change-block').css('display', 'none');
                    $scope.page3Jilu = 0
                    $scope.todayChats = response.data.nowChat.chatcount;
                    $scope.todayActive = response.data.nowChat.activecount;
                    $scope.todayReceivemessage = response.data.nowChat.receivemessage;
                    $scope.todaySendmessage = response.data.nowChat.sendmessage;
                    $scope.allRenwu = response.data.taskstatList;
                    /*----更新近一周消息统计----*/
                    $scope.activestatList1 = response.data.chatlist;
                    $scope.activestatList1Arr1 = [];
                    $scope.activestatList1Arr2 = []
                    $scope.activestatList1Arr3 = []
                    for (var i = 0; i < $scope.activestatList1.length; i++) {
                        $scope.activestatList1Arr1.push($scope.activestatList1[i].thedate.slice(0, 10))
                        $scope.activestatList1Arr2.push($scope.activestatList1[i].receivemessage)
                        $scope.activestatList1Arr3.push($scope.activestatList1[i].sendmessage)
                    }
                    var myChart5 = echarts.init(document.getElementById('chat-one'));
                    option1.xAxis.data = $scope.activestatList1Arr1
                    option1.series[0].data = $scope.activestatList1Arr2
                    option1.series[1].data = $scope.activestatList1Arr3
                    myChart5.setOption(option1);
                    /*----未沟通数量----*/
                    $scope.fromstatList1 = response.data.nochatstatList;
                    $scope.fromstatList1Arr1 = [];
                    $scope.fromstatList1Arr2 = []
                    for (var i = 0; i < $scope.fromstatList1.length; i++) {
                        $scope.fromstatList1Arr1.push($scope.fromstatList1[i].nochattime)
                        $scope.fromstatList1Arr2.push($scope.fromstatList1[i].nochatcount)
                    }
                    var myChart2 = echarts.init(document.getElementById('chat-two'));
                    option2.series[0].data = $scope.fromstatList1Arr2;
                    option2.xAxis.data = $scope.fromstatList1Arr1;
                    myChart2.setOption(option2);
                    /*----最热聊天----*/
                    $scope.from1 = response.data.hotchatstatList;
                    $scope.groupstatListArr1 = [];
                    $scope.groupstatListArr2 = []
                    for (var i = 0; i < $scope.from1.length; i++) {
                        $scope.groupstatListArr1.push($scope.from1 [i].friendwechat)
                        $scope.groupstatListArr2.push($scope.from1 [i].chatcount)
                    }
                    var myChart3 = echarts.init(document.getElementById('chat-sree'));
                    option3.xAxis.data = $scope.groupstatListArr1;
                    option3.series[0].data = $scope.groupstatListArr2
                    myChart3.setOption(option3);
                    $('.alert1').show(300).find('.alertCon').html('微信号查找数据加载成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                } else {
                    $('.alert2').show(300).find('.alertCon').html('微信号查找数据加载失败，请稍后再试');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                    // alert(response.msg);
                }
            });
        }
    }
    /*-------------------------选择对应时间确认后------------------------*/
    $('.clickChose').click(function () {
        var times1 = ''
        var times2 = ''
        setTimeout(function () {
            var times = $('.form-control').val();
            times1 = times.substr(0, 10);
            times2 = times.substr(13, 10);
        }, 300)
        setTimeout(function () {
            var sendObj2 = new FormData();
            sendObj2.append('startDate', times1);
            sendObj2.append('weChatIds', JSON.stringify($scope.page2Wechats));
            sendObj2.append('endDate', times2);
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/customer/getAllMsgToPage',
                data: sendObj2,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    // $scope.todayChats = response.data.nowChat.chatcount;
                    // $scope.todayActive = response.data.nowChat.activecount;
                    // $scope.todayReceivemessage = response.data.nowChat.receivemessage;
                    // $scope.todaySendmessage = response.data.nowChat.sendmessage;
                    // $scope.allRenwu = response.data.taskstatList;
                    // console.log(response)
                    /*----更新近一周消息统计----*/
                    // $scope.activestatList1 = response.data.chatlist;
                    // $scope.activestatList1Arr1 = [];
                    // $scope.activestatList1Arr2 = []
                    // $scope.activestatList1Arr3 = []
                    // for (var i = 0; i < $scope.activestatList1.length; i++) {
                    //     $scope.activestatList1Arr1.push($scope.activestatList1[i].thedate.slice(0,10))
                    //     $scope.activestatList1Arr2.push($scope.activestatList1[i].receivemessage)
                    //     $scope.activestatList1Arr3.push($scope.activestatList1[i].sendmessage)
                    // }
                    // var myChart5 = echarts.init(document.getElementById('chat-one'));
                    // option1.xAxis.data= $scope.activestatList1Arr1
                    // option1.series[0].data= $scope.activestatList1Arr2
                    // option1.series[1].data= $scope.activestatList1Arr3
                    // myChart5.setOption(option1);
                    // /*----未沟通数量----*/
                    // $scope.fromstatList1 = response.data.nochatstatList;
                    // $scope.fromstatList1Arr1 = [];
                    // $scope.fromstatList1Arr2 = []
                    // for (var i = 0; i < $scope.fromstatList1.length; i++) {
                    //     $scope.fromstatList1Arr1.push($scope.fromstatList1[i].nochattime)
                    //     $scope.fromstatList1Arr2.push($scope.fromstatList1[i].nochatcount)
                    // }
                    // var myChart2 = echarts.init(document.getElementById('chat-two'));
                    // option2.series[0].data=$scope.fromstatList1Arr2;
                    // option2.xAxis.data=$scope.fromstatList1Arr1;
                    // myChart2.setOption(option2);
                    /*----最热聊天----*/
                    $scope.from1 = response.data.hotchatstatList;
                    $scope.groupstatListArr1 = [];
                    $scope.groupstatListArr2 = []
                    for (var i = 0; i < $scope.from1.length; i++) {
                        $scope.groupstatListArr1.push($scope.from1 [i].friendwechat)
                        $scope.groupstatListArr2.push($scope.from1 [i].chatcount)
                    }
                    var myChart3 = echarts.init(document.getElementById('chat-sree'));
                    option3.xAxis.data = $scope.groupstatListArr1;
                    option3.series[0].data = $scope.groupstatListArr2
                    myChart3.setOption(option3);

                    $('.alert1').show(300).find('.alertCon').html('时间查找数据加载成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                } else {
                    $('.alert2').show(300).find('.alertCon').html('时间查找数据加载失败，请稍后再试');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
        }, 350)
    })
}]);

app.controller('page4C', ["$rootScope", "$scope", "$http", "$timeout", function ($rootScope, $scope, $http, $timeout) {
    $scope.page4UserIdImportant = localStorage.getItem("userId");
    $scope.initpages = ''
    $rootScope.mainShow = true;
    $rootScope.changePas = false;
    $scope.page2Wechats = [];
    $rootScope.showLoads = false;
$scope.picSrc= 'http://'+window.location.host+'/pic/'
    if ($scope.page4UserIdImportant == undefined || $scope.page4UserIdImportant == null || $scope.page4UserIdImportant == '') {
    } else {
        setTimeout(function () {
                $rootScope.showLoads = true;
                var sendWechatIds = new FormData();
                sendWechatIds.append('accountId', $scope.page4UserIdImportant);
                $http({
                    method: 'POST',
                    url: $rootScope.link + '/gcsscrm/general/getAllWeChat',
                    data: sendWechatIds,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    //上传成功的操作
                    if (response.code == 200) {
                        $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                        $('.checkbox-toggle').attr('data', '0');
                        $scope.sendWechatIdsAll = response.data.weChats
                        for (var i = 0; i < $scope.sendWechatIdsAll.length; i++) {
                            $scope.page2Wechats.push($scope.sendWechatIdsAll[i].id)
                        }

                    } else {
                        $('.alert2').show(300).find('.alertCon').html('页面初始化失败，请刷新页面或再次登陆');
                        setTimeout(function () {
                            $('.alert2').hide(300)
                        }, 2000)
                    }
                });


                var sendObjInit = new FormData();
                sendObjInit.append('accountId', $scope.page4UserIdImportant);
                $http({
                    method: 'POST',
                    url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                    data: sendObjInit,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    //上传成功的操作
                    if (response.code == 200) {
                        $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                        $('.checkbox-toggle').attr('data', '0');
                        $scope.initData = response.data.contactList
                        $scope.initDatacontactCount = response.data.contactCount
                        $scope.initGroup = response.data.groupsList
                        for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                            if ($scope.initData[i].tagList.length > 0) {
                                arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                    arrAllList.push(arrAllList1[i1])
                                }
                                $scope.initData[i].tagList = arrAllList
                                arrAllList = []
                                arrAllList1 = []
                            } else {
                            }
                        }
                        $('.M-box1').pagination({
                            totalData: $scope.initDatacontactCount,
                            showData: 10,
                            coping: true,
                            callback: function (api) {
                                var data = {
                                    page: api.getCurrent(),
                                };
                                var sendObjInit = new FormData();
                                sendObjInit.append('accountId', $scope.page4UserIdImportant);
                                sendObjInit.append('page', data.page);
                                $http({
                                    method: 'POST',
                                    url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                                    data: sendObjInit,
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                }).success(function (response) {
                                    //上传成功的操作
                                    if (response.code == 200) {
                                        $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                        $('.checkbox-toggle').attr('data', '0');
                                        $scope.initData = response.data.contactList
                                        $scope.initDatacontactCount = response.data.contactCount
                                        $scope.initGroup = response.data.groupsList
                                        for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                            if ($scope.initData[i].tagList.length > 0) {
                                                arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                                for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                    arrAllList.push(arrAllList1[i1])
                                                }
                                                $scope.initData[i].tagList = arrAllList
                                                arrAllList = []
                                                arrAllList1 = []
                                            } else {
                                            }
                                        }
                                        setTimeout(function () {
                                            var allBlod = $('.blod')
                                            for (i = 0; i < allBlod.length; i++) {
                                                var pp = i
                                                if (allBlod[i].attributes[0].nodeValue == 1) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 2) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 3) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 4) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 5) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                                }
                                            }
                                            $('.mailbox-messages input[type="checkbox"]').iCheck({
                                                checkboxClass: 'icheckbox_flat-blue',
                                                radioClass: 'iradio_flat-blue'
                                            });

                                        }, 40)
                                    }
                                })
                            },

                        });
                        setTimeout(function () {

                            var allBlod = $('.blod')
                            for (i = 0; i < allBlod.length; i++) {
                                var pp = i
                                if (allBlod[i].attributes[0].nodeValue == 1) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 2) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 3) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 4) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 5) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                }
                            }
                            $rootScope.showLoads = false;
                            $('.mailbox-messages input[type="checkbox"]').iCheck({
                                checkboxClass: 'icheckbox_flat-blue',
                                radioClass: 'iradio_flat-blue'
                            });
                            $('#example2').DataTable({
                                // 'paging'      : true,
                                // 'lengthChange': false,
                                'searching': true,
                                'iDisplayLength': 10,
                                'bInfo': false,
                                'bRetrieve': true,
                                // 'info'        : true,
                                // 'autoWidth'   : false
                            })
                        }, 100)

                    } else {
                        $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或再次登陆');
                        setTimeout(function () {
                            $('.alert2').hide(300)
                        }, 2000)
                    }
                });
                setTimeout(function () {

                    var allBlod = $('.blod')
                    for (i = 0; i < allBlod.length; i++) {
                        var pp = i
                        if (allBlod[i].attributes[0].nodeValue == 1) {
                            $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                        }
                        if (allBlod[i].attributes[0].nodeValue == 2) {
                            $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                        }
                        if (allBlod[i].attributes[0].nodeValue == 3) {
                            $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                        }
                        if (allBlod[i].attributes[0].nodeValue == 4) {
                            $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                            $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                        }
                        if (allBlod[i].attributes[0].nodeValue == 5) {
                            $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                            $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                            $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                        }
                    }
                    $rootScope.showLoads = false;
                    $('.mailbox-messages input[type="checkbox"]').iCheck({
                        checkboxClass: 'icheckbox_flat-blue',
                        radioClass: 'iradio_flat-blue'
                    });
                    $('#example2').DataTable({
                        // 'paging'      : true,
                        // 'lengthChange': false,
                        'searching': true,
                        'iDisplayLength': 10,
                        'bInfo': false,
                        'bRetrieve': true,
                        // 'info'        : true,
                        // 'autoWidth'   : false
                    })
                }, 100)

            },
            0
        )
    }


    $rootScope.FriendsMoreName = '11'

    $(document).ready(function () {
        $scope.page4Sree = false;
        //----------------活跃度显示---------------------


        //--------------------不同颜色显示手机在线状态---------------
        // var allCyc = $('.clyc')
        // for (i1 = 0; i1 < allCyc.length; i1++) {
        //     var pp = i1
        //     if (allCyc[i1].attributes[0].nodeValue == 0) {
        //         $('.clyc').eq(pp).addClass('my-red')
        //     }
        //     if (allCyc[i1].attributes[0].nodeValue == 1) {
        //         $('.clyc').eq(pp).addClass('my-green')
        //     }
        // }
        //-----------------模拟点击执行时获取选中的好友id(全选)    data存放相关------------------
        $(".checkbox-toggle").click(function () {
            var clicks = $(this).attr('data');
            if (clicks == 1) {
                $(".mailbox-messages input[type='checkbox']").iCheck("uncheck");
                $(".fa", this).removeClass("fa-check-square-o").addClass('fa-square-o');
                $(this).attr('data', '0');
            } else {
                $(".mailbox-messages input[type='checkbox']").iCheck("check");
                $(".fa", this).removeClass("fa-square-o").addClass('fa-check-square-o');
                $(this).attr('data', '1');
            }
        });

    })

    $scope.data = $scope.data2
    $(function () {

        //------------------打标签--------------
        var tag3 = new Tag("tagValue3");
        tag3.tagValue = "";
        tag3.initView();
        //
        var tag4 = new Tag("tagValue4");
        tag4.tagValue = "";
        tag4.initView();
        // function openUpdate() {
        //     tag3.unDisableFun();
        // }
        //
        // function closeUpdate() {
        //     tag3.disableFun();
        // }

        $scope.page4One = 0
        $('.chose-on').click(function () {
            $('.page1-change-block-two').css('display', 'none')
            $('.page1-change-block-two1').css('display', 'none')
            $('.page1-change-block-sree').css('display', 'none')
            $('.page1-change-block-four').css('display', 'none')
            $scope.GroupNumJilu = 0
            $scope.jilukaka = 0
            $scope.jiluSree = 0
            $scope.jiluFour = 0
            /*----------批量分组开关-----------*/
            $scope.moreGiveGroup = false;
            /*----------单个好友分组开关-----------*/
            $scope.oneGiveGroup = false;
            /*----------单个好友打标签开关-----------*/
            $scope.oneTagFight = false;
            /*----------群发消息开关-----------*/
            $scope.sayGroup = false;
            /*----------批量打标签开关-----------*/
            $scope.allTagFightShow = false;
            /*----------好友交流记录开关-----------*/
            $scope.chatAll = false;
            /*----------好友基本资料开关-----------*/
            $scope.giveGroup = false;
            $scope.page4One++
            if ($scope.page4One % 2 == 0) {
                $('.page1-change-block').css('display', 'none')


            } else {
                $('.page1-change-block').css('display', 'block')

            }
        })
        $scope.jilukaka = 0
        $('.chose-two1').click(function () {
            $('.page1-change-block-two').css('display', 'none')
            $('.page1-change-block').css('display', 'none')
            $('.page1-change-block-sree').css('display', 'none')
            $('.page1-change-block-four').css('display', 'none')

            $scope.GroupNumJilu = 0
            $scope.jiluSree = 0
            $scope.jiluFour = 0
            $scope.page4One = 0
            $scope.moreGiveGroup = false;
            /*----------单个好友分组开关-----------*/
            $scope.oneGiveGroup = false;
            /*----------单个好友打标签开关-----------*/
            $scope.oneTagFight = false;
            /*----------群发消息开关-----------*/
            $scope.sayGroup = false;
            /*----------批量打标签开关-----------*/
            $scope.allTagFightShow = false;
            /*----------好友交流记录开关-----------*/
            $scope.chatAll = false;
            /*----------好友基本资料开关-----------*/
            $scope.giveGroup = false;
            $scope.jilukaka++
            if ($scope.jilukaka % 2 == 0) {
                $('.page1-change-block-two1').css('display', 'none')
                // $('.telephone1').css('display', 'none')

            } else {
                $('.page1-change-block-two1').css('display', 'block');


            }
        })

        /*--------------类似百度动态搜索标签-----------*/
        $('.tag-touch').bind('input propertychange', function () {

            var searchCon = $(this).val()
            if (searchCon == '') {
                var sendObjInit = new FormData();
                var allisChangeNo = $('.isChange')
                var allGroupChecked = $('.page4-group-group')
                var wechatArr = []
                var groupArr = []
                if (allisChangeNo.length > 0) {
                    for (var i = 0; i < allisChangeNo.length; i++) {
                        if (allisChangeNo[i].attributes[1].value == 1) {
                            wechatArr.push(allisChangeNo[i].attributes[4].value)
                        }
                    }
                    if (wechatArr.length > 0) {
                        sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                    } else {
                        sendObjInit.append('accountId', $scope.page4UserIdImportant);
                    }
                } else {

                }
                if (allGroupChecked.length > 0) {
                    for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                        if (allGroupChecked[i].attributes[1].value == 1) {
                            groupArr.push(allGroupChecked[i].attributes[4].value)
                        }
                    }
                    if (groupArr.length > 0) {
                        sendObjInit.append('groupIds', JSON.stringify(groupArr));
                    } else {
                        sendObjInit.append('groupIds', JSON.stringify([]));
                    }
                } else {
                }
                sendObjInit.append('tagId', '');
                $http({
                    method: 'POST',
                    url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                    data: sendObjInit,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    //上传成功的操作
                    if (response.code == 200) {
                        $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                        $('.checkbox-toggle').attr('data', '0');
                        $scope.initData = response.data.contactList
                        $scope.initDatacontactCount = response.data.contactCount
                        for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                            if ($scope.initData[i].tagList.length > 0) {
                                arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                    arrAllList.push(arrAllList1[i1])
                                }
                                $scope.initData[i].tagList = arrAllList
                                arrAllList = []
                                arrAllList1 = []
                            } else {
                            }
                        }
                        $('.M-box1').pagination({
                            totalData: $scope.initDatacontactCount,
                            showData: 10,
                            coping: true,
                            callback: function (api) {
                                var data = {
                                    page: api.getCurrent(),
                                };
                                console.log(data)
                                var sendObjInit = new FormData();
                                var allisChangeNo = $('.isChange')
                                var allGroupChecked = $('.page4-group-group')
                                var wechatArr = []
                                var groupArr = []
                                if (allisChangeNo.length > 0) {
                                    for (var i = 0; i < allisChangeNo.length; i++) {
                                        if (allisChangeNo[i].attributes[1].value == 1) {
                                            wechatArr.push(allisChangeNo[i].attributes[4].value)
                                        }
                                    }
                                    if (wechatArr.length > 0) {
                                        sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                    } else {
                                        sendObjInit.append('accountId', $scope.page4UserIdImportant);
                                    }
                                } else {

                                }
                                if (allGroupChecked.length > 0) {
                                    for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                        if (allGroupChecked[i].attributes[1].value == 1) {
                                            groupArr.push(allGroupChecked[i].attributes[4].value)
                                        }
                                    }
                                    if (groupArr.length > 0) {
                                        sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                    } else {
                                        sendObjInit.append('groupIds', JSON.stringify([]));
                                    }
                                } else {
                                }
                                sendObjInit.append('tagId', '');
                                sendObjInit.append('page', data.page);
                                $http({
                                    method: 'POST',
                                    url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                                    data: sendObjInit,
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                }).success(function (response) {
                                    //上传成功的操作
                                    if (response.code == 200) {
                                        $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                        $('.checkbox-toggle').attr('data', '0');
                                        $scope.initData = response.data.contactList
                                        $scope.initDatacontactCount = response.data.contactCount
                                        for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                            if ($scope.initData[i].tagList.length > 0) {
                                                arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                                for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                    arrAllList.push(arrAllList1[i1])
                                                }
                                                $scope.initData[i].tagList = arrAllList
                                                arrAllList = []
                                                arrAllList1 = []
                                            } else {
                                            }
                                        }
                                    }
                                    setTimeout(function () {
                                        var allBlod = $('.blod')
                                        for (i = 0; i < allBlod.length; i++) {
                                            var pp = i
                                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                            }
                                        }
                                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                                            checkboxClass: 'icheckbox_flat-blue',
                                            radioClass: 'iradio_flat-blue'
                                        });
                                    }, 40)
                                })
                            },

                        });
                        setTimeout(function () {
                            var allBlod = $('.blod')
                            for (i = 0; i < allBlod.length; i++) {
                                var pp = i
                                if (allBlod[i].attributes[0].nodeValue == 1) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 2) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 3) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 4) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 5) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                }
                            }
                            $('.mailbox-messages input[type="checkbox"]').iCheck({
                                checkboxClass: 'icheckbox_flat-blue',
                                radioClass: 'iradio_flat-blue'
                            });

                        }, 40)

                    } else {
                        $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或再次登陆');
                        setTimeout(function () {
                            $('.alert2').hide(300)
                        }, 2000)
                    }
                });
            } else {
                var tagSearch = new FormData();
                tagSearch.append('tagName', searchCon);

                $http({
                    method: 'POST',
                    url: $rootScope.link + '/gcsscrm/user/selectTagNameByLike',
                    data: tagSearch,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    //上传成功的操作
                    if (response.code == 200) {
                        $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                        $('.checkbox-toggle').attr('data', '0');
                        $scope.tagSearchList = response.data.tagList;
                    } else {
                    }
                })
            }

        })
        /*----------------------------------------------------------------------选择相关标签进行数据刷新---------------------------------------*/
        $scope.wcmmd = ''
        $(document).on('click', '.tag-touch-list li', function () {
            var targetTagId = $(this).attr('data')
            var targetTagName = $(this).attr('data1')
            var sendObjInit = new FormData();

            var allisChangeNo = $('.isChange')
            var allGroupChecked = $('.page4-group-group')
            var wechatArr = []
            var groupArr = []
            if (allisChangeNo.length > 0) {
                for (var i = 0; i < allisChangeNo.length; i++) {
                    if (allisChangeNo[i].attributes[1].value == 1) {
                        wechatArr.push(allisChangeNo[i].attributes[4].value)
                    }
                }
                if (wechatArr.length > 0) {
                    sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                } else {
                    sendObjInit.append('accountId', $scope.page4UserIdImportant);
                }
            } else {

            }
            if (allGroupChecked.length > 0) {
                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                    if (allGroupChecked[i].attributes[1].value == 1) {
                        groupArr.push(allGroupChecked[i].attributes[4].value)
                    }
                }
                if (groupArr.length > 0) {
                    sendObjInit.append('groupIds', JSON.stringify(groupArr));
                } else {
                    sendObjInit.append('groupIds', JSON.stringify([]));
                }
            } else {
            }
            sendObjInit.append('tagId', targetTagId);
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                data: sendObjInit,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                    $('.checkbox-toggle').attr('data', '0');
                    $('.page1-change-block-two1').hide()
                    $scope.jilukaka = 0
                    $scope.initData = response.data.contactList
                    $scope.initDatacontactCount = response.data.contactCount
                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                        if ($scope.initData[i].tagList.length > 0) {
                            arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                arrAllList.push(arrAllList1[i1])
                            }
                            $scope.initData[i].tagList = arrAllList
                            arrAllList = []
                            arrAllList1 = []
                        } else {
                        }
                    }
                    $('.M-box1').pagination({
                        totalData: $scope.initDatacontactCount,
                        showData: 10,
                        coping: true,
                        callback: function (api) {
                            var data = {
                                page: api.getCurrent(),
                            };
                            var sendObjInit = new FormData();


                            var allisChangeNo = $('.isChange')
                            var allGroupChecked = $('.page4-group-group')
                            var wechatArr = []
                            var groupArr = []
                            if (allisChangeNo.length > 0) {
                                for (var i = 0; i < allisChangeNo.length; i++) {
                                    if (allisChangeNo[i].attributes[1].value == 1) {
                                        wechatArr.push(allisChangeNo[i].attributes[4].value)
                                    }
                                }
                                if (wechatArr.length > 0) {
                                    sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                } else {
                                    sendObjInit.append('accountId', $scope.page4UserIdImportant);
                                }
                            } else {

                            }
                            if (allGroupChecked.length > 0) {
                                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                    if (allGroupChecked[i].attributes[1].value == 1) {
                                        groupArr.push(allGroupChecked[i].attributes[4].value)
                                    }
                                }
                                if (groupArr.length > 0) {
                                    sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                } else {
                                    sendObjInit.append('groupIds', JSON.stringify([]));
                                }
                            } else {
                            }
                            sendObjInit.append('tagId', targetTagId);
                            sendObjInit.append('page', data.page);

                            $http({
                                method: 'POST',
                                url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                                data: sendObjInit,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                //上传成功的操作
                                if (response.code == 200) {
                                    $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                    $('.checkbox-toggle').attr('data', '0');
                                    $('.page1-change-block-two1').hide()
                                    $scope.jilukaka = 0
                                    $scope.initData = response.data.contactList
                                    $scope.initDatacontactCount = response.data.contactCount
                                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                        if ($scope.initData[i].tagList.length > 0) {
                                            arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                arrAllList.push(arrAllList1[i1])
                                            }
                                            $scope.initData[i].tagList = arrAllList
                                            arrAllList = []
                                            arrAllList1 = []
                                        } else {
                                        }
                                    }
                                    setTimeout(function () {
                                        var allBlod = $('.blod')
                                        for (i = 0; i < allBlod.length; i++) {
                                            var pp = i
                                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                            }
                                        }
                                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                                            checkboxClass: 'icheckbox_flat-blue',
                                            radioClass: 'iradio_flat-blue'
                                        });
                                    }, 40)
                                }
                            })
                        },

                    });
                    $('.alert1').show(300).find('.alertCon').html('数据加载完成');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                    setTimeout(function () {
                        var allBlod = $('.blod')
                        for (i = 0; i < allBlod.length; i++) {
                            var pp = i
                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                            }
                        }
                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });

                    }, 40)

                } else {
                    $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或再次登陆');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });


        })


        /*---------------------点击分组打开分组内容-----------------------*/
        $scope.GroupNumJilu = 0
        $('.chose-two').click(function () {
            $scope.page4One = 0
            $scope.jilukaka = 0
            $scope.jiluSree = 0
            $scope.jiluFour = 0
            $('.page1-change-block').css('display', 'none')
            $('.page1-change-block-two1').css('display', 'none')
            $('.page1-change-block-sree').css('display', 'none')
            $('.page1-change-block-four').css('display', 'none')
            $scope.moreGiveGroup = false;
            /*----------单个好友分组开关-----------*/
            $scope.oneGiveGroup = false;
            /*----------单个好友打标签开关-----------*/
            $scope.oneTagFight = false;
            /*----------群发消息开关-----------*/
            $scope.sayGroup = false;
            /*----------批量打标签开关-----------*/
            $scope.allTagFightShow = false;
            /*----------好友交流记录开关-----------*/
            $scope.chatAll = false;
            /*----------好友基本资料开关-----------*/
            $scope.giveGroup = false;
            $scope.GroupNumJilu++
            if ($scope.GroupNumJilu % 2 == 0) {
                $('.page1-change-block-two').css('display', 'none')
                $('.telephone').css('display', 'none')
            } else {
                $('.page1-change-block-two').css('display', 'block');
            }
        })
        $scope.jiluSree = 0
        $('.chose-sree').click(function () {
            $('.page1-change-block').css('display', 'none')
            $('.page1-change-block-two1').css('display', 'none')
            $('.page1-change-block-two').css('display', 'none')
            $('.page1-change-block-four').css('display', 'none')
            $scope.page4One = 0
            $scope.GroupNumJilu = 0
            $scope.jilukaka = 0
            $scope.jiluFour = 0
            $scope.jiluSree++
            if ($scope.jiluSree % 2 == 0) {
                $('.page1-change-block-sree').css('display', 'none')


            } else {
                $('.page1-change-block-sree').css('display', 'block')

            }
        })
        $scope.jiluFour = 0
        $('.chose-four').click(function () {
            $('.page1-change-block').css('display', 'none')
            $('.page1-change-block-two1').css('display', 'none')
            $('.page1-change-block-two').css('display', 'none')
            $('.page1-change-block-sree').css('display', 'none')
            $scope.page4One = 0
            $scope.GroupNumJilu = 0
            $scope.jilukaka = 0
            $scope.jiluSree = 0
            $scope.jiluFour++
            if ($scope.jiluFour % 2 == 0) {
                $('.page1-change-block-four').css('display', 'none')
            } else {
                $('.page1-change-block-four').css('display', 'block')
            }
        })
        //----------------选择标签单个点击---------------
        $(document).on('click', '.page4-checkbox-One-one', function () {
            var myData1 = $(this).attr('data1')
            var myData2 = $(this).attr('data2')
            if ($(this).attr('data') == 0) {
                $(this).prev().addClass('on')
                $(this).attr('data', '1')
                $scope.data1[myData2][myData1].state = 1
            } else {
                $(this).prev().removeClass('on')
                $(this).attr('data', '0')
                $scope.data1[myData2][myData1].state = 0
            }
        });


        //-----------全选设备逻辑-----------
        $('.checkAllTelephone').click(function () {
                jilu = 0
                $('.checkbox-toggle-change').prev().removeClass('on');
                var importValue = $(this).attr('data')
                var allisChange = $('.isChange')
                if (importValue == 0) {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 1
                        $('.isChange').eq(i).prev().addClass('on')
                    }
                    $(this).attr('data', '1').prev().addClass('on')
                }
                else {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 0
                        $('.isChange').eq(i).prev().removeClass('on')
                    }
                    $(this).attr('data', '0').prev().removeClass('on')
                }
            }
        )
        //-----------全选分组逻辑-----------
        $('.page4-group-checkall').click(function () {
                jilu1 = 0
                $('.page4-group-checkall-change').prev().removeClass('on');
                var importValue = $(this).attr('data')
                var allisChange = $('.page4-isChange')
                if (importValue == 0) {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 1
                        $('.page4-isChange').prev().addClass('on')
                    }
                    $(this).attr('data', '1').prev().addClass('on');
                }
                else {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 0
                        $('.page4-isChange').prev().removeClass('on')
                    }
                    $(this).attr('data', '0').prev().removeClass('on')
                }
            }
        )
        var jilu = 0
        //------------------反选设备逻辑--------------------
        $('.checkbox-toggle-change').click(function () {
            jilu++
            if (jilu % 2 == 0) {
                $(this).prev().removeClass('on')
                $(this).attr('data', '0')
            } else {
                $(this).prev().addClass('on')
                $(this).attr('data', '1')
            }
            $('.checkAllTelephone').attr('data', '0').prev().removeClass('on');
            var allisChangeNo = $('.isChange')
            for (var i = 0; i < allisChangeNo.length; i++) {
                if (allisChangeNo[i].attributes[1].value == 0) {
                    $('.isChange').eq(i).prev().addClass('on');
                    allisChangeNo[i].attributes[1].value = 1
                } else {
                    $('.isChange').eq(i).prev().removeClass('on');
                    allisChangeNo[i].attributes[1].value = 0
                }
            }
        });
        //------------------反选分组逻辑--------------------
        var jilu1 = 0
        $('.page4-group-checkall-change').click(function () {
            jilu1++
            if (jilu1 % 2 == 0) {
                $(this).prev().removeClass('on')
                $(this).attr('data', '0')
            } else {
                $(this).prev().addClass('on')
                $(this).attr('data', '1')
            }
            $('.page4-group-checkall').attr('data', '0').prev().removeClass('on');
            var page4Grou = $('.page4-group-group')
            var allisChange = $('.page4-isChange')
            for (var i = 0; i < allisChange.length; i++) {
                if (allisChange[i].attributes[1].value == 1) {
                    allisChange[i].attributes[1].value = 0
                    $('.page4-isChange').eq(i).prev().removeClass('on')
                } else {
                    allisChange[i].attributes[1].value = 1
                    $('.page4-isChange').eq(i).prev().addClass('on')
                }

            }
        });

    })
//----------------选择微信单个点击---------------
    $scope.page4Click = function (e) {
        if ($('.page4-wechat-change')[e].attributes[1].value == 0) {
            $('.page4-wechat-change').eq(e).prev().addClass('on')
            $('.page4-wechat-change')[e].attributes[1].value = 1
        } else {
            $('.page4-wechat-change').eq(e).prev().removeClass('on')
            $('.page4-wechat-change')[e].attributes[1].value = 0
        }
    }
//----------------选择分组单个点击---------------
    $scope.page4Click1 = function (e) {
        if ($('.page4-group-group')[e].attributes[1].value == 0) {
            $('.page4-group-group').eq(e).prev().addClass('on')
            $('.page4-group-group')[e].attributes[1].value = 1
        } else {
            $('.page4-group-group').eq(e).prev().removeClass('on')
            $('.page4-group-group')[e].attributes[1].value = 0
        }
    }
    // $(document).on('click', '.page4-group-group', function () {
    //     var myselfData = $(this).attr('data')
    //     if ($(this).attr('data1') == 0) {
    //         $(this).prev().addClass('on')
    //         $(this).attr('data1', '1')
    //     } else {
    //         $(this).prev().removeClass('on')
    //         $(this).attr('data1', '0')
    //     }
    // });
    /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-----选择微信号后切换当前数据-----！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！*/
    $scope.importantWechatIds = ''
    $scope.page4WechatsendMsg = function () {
        var allisChangeNo = $('.isChange')
        var allGroupChecked = $('.page4-group-group')
        var groupArr = []
        for (var arr = [], i = 0; i < allisChangeNo.length; i++) {
            if (allisChangeNo[i].attributes[1].value == 1) {
                arr.push(allisChangeNo[i].attributes[4].value)
            }
        }
        if (arr.length == 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择相关微信号');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var changeWechat = new FormData();
            if (allGroupChecked.length > 0) {
                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                    if (allGroupChecked[i].attributes[1].value == 1) {
                        groupArr.push(allGroupChecked[i].attributes[4].value)
                    }
                }
                if (groupArr.length > 0) {
                    changeWechat.append('groupIds', JSON.stringify(groupArr));
                } else {
                    changeWechat.append('groupIds', JSON.stringify([]));
                }
            } else {
            }
            var tagCheckIds = $('.tag-touch').attr('data');
            $('.page1-change-block').css('display', 'none')
            $scope.page4One = 0
            $scope.importantWechatIds = arr
            if (tagCheckIds == undefined) {
                tagCheckIds = ''
            }
            changeWechat.append('weChatIds', JSON.stringify(arr));
            changeWechat.append('tagId', tagCheckIds);
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                data: changeWechat,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                    $('.checkbox-toggle').attr('data', '0');
                    $scope.page2Wechats = [];
                    $scope.page2Wechats = arr;
                    $scope.initDatacontactCount = response.data.contactCount
                    $scope.initData = response.data.contactList
                    $scope.initpages = response.data.contactCount;
                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                        if ($scope.initData[i].tagList.length > 0) {
                            arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                arrAllList.push(arrAllList1[i1])
                            }
                            $scope.initData[i].tagList = arrAllList
                            arrAllList = []
                            arrAllList1 = []
                        } else {
                        }
                    }
                    $('.M-box1').pagination({
                        totalData: $scope.initDatacontactCount,
                        showData: 10,
                        coping: true,
                        callback: function (api) {
                            var data = {
                                page: api.getCurrent(),
                            };


                            var sendObjInit = new FormData();
                            var allisChangeNo = $('.isChange')
                            var allGroupChecked = $('.page4-group-group')
                            var tagCheckIds = $('.tag-touch').attr('data');
                            var wechatArr = []
                            var groupArr = []
                            if (tagCheckIds == undefined) {
                                tagCheckIds = ''
                            }
                            if (allisChangeNo.length > 0) {
                                for (var i = 0; i < allisChangeNo.length; i++) {
                                    if (allisChangeNo[i].attributes[1].value == 1) {
                                        wechatArr.push(allisChangeNo[i].attributes[4].value)
                                    }
                                }
                                if (wechatArr.length > 0) {
                                    sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                } else {
                                    sendObjInit.append('accountId', $scope.page4UserIdImportant);
                                }
                            } else {

                            }
                            if (allGroupChecked.length > 0) {
                                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                    if (allGroupChecked[i].attributes[1].value == 1) {
                                        groupArr.push(allGroupChecked[i].attributes[4].value)
                                    }
                                }
                                if (groupArr.length > 0) {
                                    sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                } else {
                                    sendObjInit.append('groupIds', JSON.stringify([]));
                                }
                            } else {
                            }
                            sendObjInit.append('tagId', tagCheckIds);
                            sendObjInit.append('page', data.page);
                            $http({
                                method: 'POST',
                                url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                                data: sendObjInit,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                //上传成功的操作
                                if (response.code == 200) {
                                    $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                    $('.checkbox-toggle').attr('data', '0');
                                    $scope.page2Wechats = [];
                                    $scope.page2Wechats = arr;
                                    $scope.initDatacontactCount = response.data.contactCount
                                    $scope.initData = response.data.contactList
                                    $scope.initpages = response.data.contactCount;
                                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                        if ($scope.initData[i].tagList.length > 0) {
                                            arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                arrAllList.push(arrAllList1[i1])
                                            }
                                            $scope.initData[i].tagList = arrAllList
                                            arrAllList = []
                                            arrAllList1 = []
                                        } else {
                                        }
                                    }
                                    setTimeout(function () {
                                        var allBlod = $('.blod')
                                        for (i = 0; i < allBlod.length; i++) {
                                            var pp = i
                                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                            }
                                        }
                                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                                            checkboxClass: 'icheckbox_flat-blue',
                                            radioClass: 'iradio_flat-blue'
                                        });
                                    }, 40)
                                }
                            })
                        },

                    });


                    setTimeout(function () {
                        var allBlod = $('.blod')
                        for (i = 0; i < allBlod.length; i++) {
                            var pp = i
                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                            }
                        }
                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });
                    }, 40)
                    $('.alert1').show(300).find('.alertCon').html('微信号查找数据加载成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                } else {
                    $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或再次登陆');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
        }
    }
    /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-----选择分组后切换当前数据-----！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！*/
    $scope.allGroupChecks = [];
    $scope.page4GroupsendMsg = function () {
        var allGroupChecked = $('.page4-group-group')
        var allisChangeNo = $('.isChange')
        var tagCheckIds = $('.tag-touch').attr('data');
        var wechatArr = []
        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
            if (allGroupChecked[i].attributes[1].value == 1) {
                arr1.push(allGroupChecked[i].attributes[4].value)
            }
        }
        if (arr1.length == 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择微信号');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var changeWechat = new FormData();

            if (allisChangeNo.length > 0) {
                for (var i = 0; i < allisChangeNo.length; i++) {
                    if (allisChangeNo[i].attributes[1].value == 1) {
                        wechatArr.push(allisChangeNo[i].attributes[4].value)
                    }
                }
                if (wechatArr.length > 0) {
                    changeWechat.append('weChatIds', JSON.stringify(wechatArr));
                } else {
                    changeWechat.append('accountId', $scope.page4UserIdImportant);
                }
            } else {

            }


            $('.page1-change-block-two').css('display', 'none')
            $scope.GroupNumJilu = 0
            changeWechat.append('groupIds', JSON.stringify(arr1));
            changeWechat.append('tagId', tagCheckIds);
            $scope.allGroupChecks = arr1
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                data: changeWechat,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                    $('.checkbox-toggle').attr('data', '0');
                    $scope.initDatacontactCount = response.data.contactCount;
                    $scope.initpages = [];
                    $scope.initData = response.data.contactList;

                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                        if ($scope.initData[i].tagList.length > 0) {
                            arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                arrAllList.push(arrAllList1[i1])
                            }
                            $scope.initData[i].tagList = arrAllList
                            arrAllList = []
                            arrAllList1 = []
                        } else {
                        }
                    }
                    $('.M-box1').pagination({
                        totalData: $scope.initDatacontactCount,
                        showData: 10,
                        coping: true,
                        callback: function (api) {
                            var data = {
                                page: api.getCurrent(),
                            };
                            var changeWechat = new FormData();

                            var allisChangeNo = $('.isChange')
                            var allGroupChecked = $('.page4-group-group')
                            var tagCheckIds = $('.tag-touch').attr('data');
                            var wechatArr = []
                            var groupArr = []
                            if (tagCheckIds == undefined) {
                                tagCheckIds = ''
                            }
                            if (allisChangeNo.length > 0) {
                                for (var i = 0; i < allisChangeNo.length; i++) {
                                    if (allisChangeNo[i].attributes[1].value == 1) {
                                        wechatArr.push(allisChangeNo[i].attributes[4].value)
                                    }
                                }
                                if (wechatArr.length > 0) {
                                    changeWechat.append('weChatIds', JSON.stringify(wechatArr));
                                } else {
                                    changeWechat.append('accountId', $scope.page4UserIdImportant);
                                }
                            } else {

                            }
                            if (allGroupChecked.length > 0) {
                                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                    if (allGroupChecked[i].attributes[1].value == 1) {
                                        groupArr.push(allGroupChecked[i].attributes[4].value)
                                    }
                                }
                                if (groupArr.length > 0) {
                                    changeWechat.append('groupIds', JSON.stringify(groupArr));
                                } else {
                                    changeWechat.append('groupIds', JSON.stringify([]));
                                }
                            } else {
                            }

                            changeWechat.append('tagId', tagCheckIds);
                            changeWechat.append('page', data.page);
                            $scope.allGroupChecks = arr1
                            $http({
                                method: 'POST',
                                url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                                data: changeWechat,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                //上传成功的操作
                                if (response.code == 200) {
                                    $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                    $('.checkbox-toggle').attr('data', '0');
                                    $scope.initpages = [];
                                    $scope.initData = response.data.contactList;
                                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                        if ($scope.initData[i].tagList.length > 0) {
                                            arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                arrAllList.push(arrAllList1[i1])
                                            }
                                            $scope.initData[i].tagList = arrAllList
                                            arrAllList = []
                                            arrAllList1 = []
                                        } else {
                                        }
                                    }
                                    setTimeout(function () {
                                        var allBlod = $('.blod')
                                        for (i = 0; i < allBlod.length; i++) {
                                            var pp = i
                                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                            }
                                        }
                                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                                            checkboxClass: 'icheckbox_flat-blue',
                                            radioClass: 'iradio_flat-blue'
                                        });

                                    }, 40)
                                }
                            })
                        },

                    });
                    setTimeout(function () {
                        var allBlod = $('.blod')
                        for (i = 0; i < allBlod.length; i++) {
                            var pp = i
                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                            }
                        }
                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });

                    }, 40)
                    $('.alert1').show(300).find('.alertCon').html('分组名称查找数据加载成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                } else {
                    $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或再次登陆');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
        }
    }
    $scope.mosego = function (index) {
        $('.telephone').css('display', 'block')
        // $scope.showMe = true
        setTimeout(function () {
            var allFuck = $('.page4-checkbox-One-one');
            for (var i = 0; i < allFuck.length; i++) {

                allFuck[i].checked = false
            }
            for (var i1 = 0; i1 < allFuck.length; i1++) {

                if (allFuck[i1].attributes[1].value == 0) {

                } else {
                    // allFuck[i].checked = 'true'
                    $('.page4-checkbox-One-one').eq(i1).prev().addClass('on')
                }
            }
        }, 100)
    };
//---------------好友详情界面-------------
    $scope.giveGroup = false;
//---------------好友沟通记录界面-------------
    $scope.chatAll = false;
//----------------点击关闭基本资料详情页------------------
    $scope.page4closMsg = function () {
        $scope.giveGroup = false;
    }
//------------------------------------------------------------------------------点击头像打开基本资料详情页------------------
    $scope.page4trueShow = function (x) {

        $scope.page4One = 0
        $scope.GroupNumJilu = 0
        $scope.jilukaka = 0
        $scope.jiluSree = 0
        $scope.jiluFour = 0
        $('.page1-change-block').css('display', 'none')
        $('.page1-change-block-two1').css('display', 'none')
        $('.page1-change-block-two').css('display', 'none')
        $('.page1-change-block-sree').css('display', 'none')
        $('.page1-change-block-four').css('display', 'none')
        $scope.friendMoreId = x
        /*----------批量分组开关-----------*/
        $scope.moreGiveGroup = false;
        /*----------单个好友分组开关-----------*/
        $scope.oneGiveGroup = false;
        /*----------单个好友打标签开关-----------*/
        $scope.oneTagFight = false;
        /*----------群发消息开关-----------*/
        $scope.sayGroup = false;
        /*----------批量打标签开关-----------*/
        $scope.allTagFightShow = false;
        /*----------好友交流记录开关-----------*/
        $scope.chatAll = false;
        /*----------好友基本资料开关-----------*/
        $scope.giveGroup = true;

        var sendObjMorel = new FormData();
        sendObjMorel.append('contactId', x);
        $http({
            method: 'POST',
            url: $rootScope.link + '/gcsscrm/user/getContactMsgById',
            data: sendObjMorel,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            //上传成功的操作
            if (response.code == 200) {
                $scope.FriendsMore = ''
                $scope.FriendsMoreName = ''
                $scope.FriendsMoreCity = ''
                $scope.FriendsMoreprovince = ''
                $scope.FriendsMorewechatnumber = ''
                $scope.FriendsMoreismarred = ''
                $scope.FriendsMorepersonnumber = ''
                $scope.FriendsMoreincomelevel = ''
                $scope.Friendstelnumber = ''
                $scope.FriendsMoreTime = ''
                $scope.FriendsMorePhoto = ''
                $scope.FriendsMoreqq = ''
                $scope.FriendsMorerealname = ''
                $scope.FriendsMoresex = ''
                $scope.FriendsMornotename = ''
                $scope.FriendsMordescription = ''
                $scope.FriendsMortagList = ''
                $scope.FriendsMorwechat = ''
                $scope.FriendsMortagList = response.data.contact.tagList;
                $scope.FriendsMorwechat = response.data.contact.wechat;
                if (response.data.contact.wechat.wechatnickname != undefined) {
                    $scope.Friendsdnkashd = response.data.contact.wechat.wechatnickname
                } else {
                    $scope.Friendsdnkashd = '';
                }
                $scope.Friendslkj = response.data.contact.wechat.device.devicenumber;
                $scope.FriendsMore = response.data.contact;
                $scope.FriendsMoreName = $scope.FriendsMore.nickname
                $scope.FriendsMoreCity = $scope.FriendsMore.city
                $scope.FriendsMoreprovince = $scope.FriendsMore.province
                $scope.FriendsMorewechatnumber = $scope.FriendsMore.wechatnumber
                $scope.FriendsMoreismarred = $scope.FriendsMore.ismarred
                $scope.FriendsMorepersonnumber = $scope.FriendsMore.personnumber
                $scope.FriendsMoreincomelevel = $scope.FriendsMore.incomelevel
                $scope.FriendsMoreprofilephotol = $scope.FriendsMore.profilephoto


                $scope.Friendstelnumber = $scope.FriendsMore.telnumber
                if (response.data.contact.birthtime != undefined) {
                    $scope.FriendsMoreTime = $scope.FriendsMore.birthtime.slice(0, 10)
                } else {
                    $scope.FriendsMoreTime = '';
                }
                $scope.FriendsMorePhoto = $scope.FriendsMore.profilephoto

                $scope.FriendsMoreqq = $scope.FriendsMore.qqnumber
                $scope.FriendsMorerealname = $scope.FriendsMore.realname
                $scope.FriendsMoresex = $scope.FriendsMore.sex
                $scope.FriendsMornotename = $scope.FriendsMore.notename
                $scope.FriendsMordescription = $scope.FriendsMore.description

                setTimeout(function () {
                    if ($scope.FriendsMoresex == 0) {
                        $('.page4-chose-select-sex option[value="0"]').attr("selected", true).siblings().attr("selected", false);
                    } else if ($scope.FriendsMoresex == 1) {
                        $('.page4-chose-select-sex option[value="1"]').attr("selected", true).siblings().attr("selected", false);
                    } else {
                        $('.page4-chose-select-sex option[value="2"]').attr("selected", true).siblings().attr("selected", false);
                    }


                    if ($scope.FriendsMoreismarred == 0) {
                        $('.page4-chose-select-ismarred option[value="0"]').attr("selected", true).siblings().attr("selected", false);
                    } else if ($scope.FriendsMoreismarred == 1) {
                        $('.page4-chose-select-ismarred option[value="1"]').attr("selected", true).siblings().attr("selected", false);
                    } else {
                        $('.page4-chose-select-ismarred option[value="2"]').attr("selected", true).siblings().attr("selected", false);
                    }

                    if ($scope.FriendsMoreincomelevel == 0) {
                        $('.page4-chose-select-incomelevel option[value="0"]').attr("selected", true).siblings().attr("selected", false);
                    } else if ($scope.FriendsMoreincomelevel == 1) {
                        $('.page4-chose-select-incomelevel option[value="1"]').attr("selected", true).siblings().attr("selected", false);
                    } else if ($scope.FriendsMoreincomelevel == 2) {
                        $('.page4-chose-select-incomelevel option[value="2"]').attr("selected", true).siblings().attr("selected", false);
                    } else if ($scope.FriendsMoreincomelevel == 3) {
                        $('.page4-chose-select-incomelevel option[value="3"]').attr("selected", true).siblings().attr("selected", false);
                    } else {
                        $('.page4-chose-select-incomelevel option[value="4"]').attr("selected", true).siblings().attr("selected", false);
                    }
                }, 50)
            } else {
                $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或再次登陆');
                setTimeout(function () {
                    $('.alert2').hide(300)
                }, 2000)
            }
        });
    }
//----------------点击提交好友详情页更改信息------------------
    $scope.page4sendMsg = function () {
        var sendObCshangeMoreFriend = new FormData();
        var koko = $(".page4-chose-select-sex ").val()
        var koko1 = $(".page4-chose-select-ismarred ").val()
        var koko2 = $(".page4-chose-select-incomelevel ").val()
        var description1 = $('.FriendsMordescription').val()

        // sendObCshangeMoreFriend.append('lastchattime', dateValue);
        sendObCshangeMoreFriend.append('notename', $scope.FriendsMornotename);
        sendObCshangeMoreFriend.append('telnumber', $scope.Friendstelnumber);
        sendObCshangeMoreFriend.append('qqnumber', $scope.FriendsMoreqq);
        sendObCshangeMoreFriend.append('personnumber', $scope.FriendsMorepersonnumber);
        sendObCshangeMoreFriend.append('realname', $scope.FriendsMorerealname);
        sendObCshangeMoreFriend.append('city', $scope.FriendsMoreCity);
        sendObCshangeMoreFriend.append('province', $scope.FriendsMoreprovince);
        sendObCshangeMoreFriend.append('description', description1);
        sendObCshangeMoreFriend.append('ismarred', koko1);
        sendObCshangeMoreFriend.append('incomelevel', koko2);
        sendObCshangeMoreFriend.append('sex', koko);
        sendObCshangeMoreFriend.append('id', $scope.friendMoreId);
        sendObCshangeMoreFriend.append('wechatnumber', $scope.FriendsMorewechatnumber);
        $http({
            method: 'POST',
            url: $rootScope.link + '/gcsscrm/user/modifyContactMsg',
            data: sendObCshangeMoreFriend,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            //上传成功的操作
            if (response.code == 200) {
                $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                $('.checkbox-toggle').attr('data', '0');
                var sendObjInit = new FormData();


                var allisChangeNo = $('.isChange')
                var allGroupChecked = $('.page4-group-group')
                var tagCheckIds = $('.tag-touch').attr('data');
                var wechatArr = []
                var groupArr = []
                if (tagCheckIds == undefined) {
                    tagCheckIds = ''
                }
                if (allisChangeNo.length > 0) {
                    for (var i = 0; i < allisChangeNo.length; i++) {
                        if (allisChangeNo[i].attributes[1].value == 1) {
                            wechatArr.push(allisChangeNo[i].attributes[4].value)
                        }
                    }
                    if (wechatArr.length > 0) {
                        sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                    } else {
                        sendObjInit.append('accountId', $scope.page4UserIdImportant);
                    }
                } else {

                }
                if (allGroupChecked.length > 0) {
                    for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                        if (allGroupChecked[i].attributes[1].value == 1) {
                            groupArr.push(allGroupChecked[i].attributes[4].value)
                        }
                    }
                    if (groupArr.length > 0) {
                        sendObjInit.append('groupIds', JSON.stringify(groupArr));
                    } else {
                        sendObjInit.append('groupIds', JSON.stringify([]));
                    }
                } else {
                }
                sendObjInit.append('tagId', tagCheckIds);
                $http({
                    method: 'POST',
                    url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                    data: sendObjInit,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    //上传成功的操作
                    if (response.code == 200) {
                        $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                        $('.checkbox-toggle').attr('data', '0');
                        $scope.initData = response.data.contactList
                        $scope.initDatacontactCount = response.data.contactCount
                        for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                            if ($scope.initData[i].tagList.length > 0) {
                                arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                    arrAllList.push(arrAllList1[i1])
                                }
                                $scope.initData[i].tagList = arrAllList
                                arrAllList = []
                                arrAllList1 = []
                            } else {
                            }
                        }
                        $('.M-box1').pagination({
                            totalData: $scope.initDatacontactCount,
                            showData: 10,
                            coping: true,
                            callback: function (api) {
                                var data = {
                                    page: api.getCurrent(),
                                };
                                var sendObjInit = new FormData();


                                var allisChangeNo = $('.isChange')
                                var allGroupChecked = $('.page4-group-group')
                                var tagCheckIds = $('.tag-touch').attr('data');
                                var wechatArr = []
                                var groupArr = []
                                if (tagCheckIds == undefined) {
                                    tagCheckIds = ''
                                }
                                if (allisChangeNo.length > 0) {
                                    for (var i = 0; i < allisChangeNo.length; i++) {
                                        if (allisChangeNo[i].attributes[1].value == 1) {
                                            wechatArr.push(allisChangeNo[i].attributes[4].value)
                                        }
                                    }
                                    if (wechatArr.length > 0) {
                                        sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                    } else {
                                        sendObjInit.append('accountId', $scope.page4UserIdImportant);
                                    }
                                } else {

                                }
                                if (allGroupChecked.length > 0) {
                                    for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                        if (allGroupChecked[i].attributes[1].value == 1) {
                                            groupArr.push(allGroupChecked[i].attributes[4].value)
                                        }
                                    }
                                    if (groupArr.length > 0) {
                                        sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                    } else {
                                        sendObjInit.append('groupIds', JSON.stringify([]));
                                    }
                                } else {
                                }
                                sendObjInit.append('tagId', tagCheckIds);
                                sendObjInit.append('page', data.page);
                                $http({
                                    method: 'POST',
                                    url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                                    data: sendObjInit,
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                }).success(function (response) {
                                    //上传成功的操作
                                    if (response.code == 200) {
                                        $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                        $('.checkbox-toggle').attr('data', '0');
                                        $scope.initData = response.data.contactList
                                        $scope.initDatacontactCount = response.data.contactCount
                                        for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                            if ($scope.initData[i].tagList.length > 0) {
                                                arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                                for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                    arrAllList.push(arrAllList1[i1])
                                                }
                                                $scope.initData[i].tagList = arrAllList
                                                arrAllList = []
                                                arrAllList1 = []
                                            } else {
                                            }
                                        }
                                    }
                                })
                            },

                        });

                    } else {
                        $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或稍后再试');
                        setTimeout(function () {
                            $('.alert2').hide(300)
                        }, 2000)
                    }
                    setTimeout(function () {
                        var allBlod = $('.blod')
                        for (i = 0; i < allBlod.length; i++) {
                            var pp = i
                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                            }
                        }
                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });

                    }, 40)
                    $scope.giveGroup = false;
                });
            } else {
                $('.alert2').show(300).find('.alertCon').html('好友详细资料修改失败，请刷新页面稍后再试');
                setTimeout(function () {
                    $('.alert2').hide(300)
                }, 2000)
            }
        });
    }
//----------------点击关闭沟通记录详情页------------------
    $scope.page4ChatClosMsg = function () {
        $scope.chatAll = false;
    }
//----------------点击打开沟通记录详情页------------------
    $scope.page4ChatOpenMsg = function (e) {

        $scope.page4One = 0
        $scope.GroupNumJilu = 0
        $scope.jilukaka = 0
        $scope.jiluSree = 0
        $scope.jiluFour = 0
        $('.page1-change-block').css('display', 'none')
        $('.page1-change-block-two1').css('display', 'none')
        $('.page1-change-block-two').css('display', 'none')
        $('.page1-change-block-sree').css('display', 'none')
        $('.page1-change-block-four').css('display', 'none')
        $scope.lastTimeChat = ''
        /*-----批量分组开关------*/
        $scope.moreGiveGroup = false;
        /*----单个好友分组开关--*/
        $scope.oneGiveGroup = false;
        /*---单个好友打标签开关-----*/
        $scope.oneTagFight = false;
        /*---群发消息开关------*/
        $scope.sayGroup = false;
        /*---批量打标签开关-----*/
        $scope.allTagFightShow = false;
        /*---好友交流记录开关-----*/
        $scope.chatAll = true;
        /*---好友基本资料开关----*/
        $scope.giveGroup = false;
        var sendObjTimeLine = new FormData();
        sendObjTimeLine.append('contactId', e)
        $http({
            method: 'POST',
            data: sendObjTimeLine,
            url: $rootScope.link + '/gcsscrm/user/getChatStatByContactId',
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            //上传成功的操作
            if (response.code == 200) {
                $scope.lastTimeChat = response.data.chatStat;
            } else {
                $('.alert2').show(300).find('.alertCon').html('沟通时间数据加载失败，请刷新页面或稍后再试');
                setTimeout(function () {
                    $('.alert2').hide(300)
                }, 2000)
            }
        });

    }
    $scope.allTagFightShow = false;
//---------------------点击打开批量打标签界面并且渲染参考标签数据-------------------------
    $scope.allchecks2 = [];
    $scope.allTagFightShowMe = function () {
        var allCheckData = $('.checkData')
        var allCheck = $('.icheckbox_flat-blue')
        for (i2 = 0; i2 < allCheck.length; i2++) {
            var pp = i2
            if (allCheck[i2].attributes[1].value == 'true') {
                $scope.allchecks2.push(Number(allCheckData.eq(i2).attr('data')))
                console.log($scope.allchecks2)
            }
        }
        if ($scope.allchecks2.length <= 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择需要进行批量打标签的好友');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            /*----------批量分组开关-----------*/
            $scope.moreGiveGroup = false;
            /*----------单个好友分组开关-----------*/
            $scope.oneGiveGroup = false;
            /*----------单个好友打标签开关-----------*/
            $scope.oneTagFight = false;
            /*----------群发消息开关-----------*/
            $scope.sayGroup = false;
            /*----------批量打标签开关-----------*/
            $scope.allTagFightShow = true;
            /*----------好友交流记录开关-----------*/
            $scope.chatAll = false;
            /*----------好友基本资料开关-----------*/
            $scope.giveGroup = false;
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/user/getTheTopTenTag',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $scope.recommendTag = response.data.tagList
                    $('.page1-change-block-sree').css('display', 'none');
                    $scope.jiluSree = 0
                    $scope.allchecks2 = [];
                } else {
                    $('.alert2').show(300).find('.alertCon').html('参考标签数据加载失败，请刷新页面或稍后再试');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });

        }


    }
//----------------点击关闭批量打标签界面------------------
    $scope.page4allTagFightClosMsg = function () {
        $scope.allTagFightShow = false;
        $scope.addTagShowMe = false;
        $('.tagList').html('')
    }
//----------------------------------------------------------------------------点击提交批量打标签--------------------
    $scope.allchecks3 = [];
    $scope.page4allTagFightSendMsg = function () {
        var allCheckData = $('.checkData')
        var allCheck = $('.icheckbox_flat-blue')
        for (i2 = 0; i2 < allCheck.length; i2++) {
            var pp = i2
            if (allCheck[i2].attributes[1].value == 'true') {
                $scope.allchecks3.push(Number(allCheckData.eq(i2).attr('data')))
            }
        }
        if ($scope.allchecks3.length <= 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择需要进行批量打标签的好友');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
            return
        } else if ($('.page4-addTag1>.tagsContaine>.tagList ')[0].children.length == 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择或输入标签名');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {

            var alltagItems = $('.tagItem1');
            for (var tagid = [], tagcon = [], i = 0; i < alltagItems.length; i++) {
                tagid.push(alltagItems[i].attributes.id.value);
                tagcon.push(alltagItems[i].innerText)
            }
            $('.tagList').html('')
            var sendObAllTags = new FormData();
            sendObAllTags.append('tagNames', JSON.stringify(tagcon));
            sendObAllTags.append(' tagIds', JSON.stringify(tagid));
            sendObAllTags.append('contactIds', JSON.stringify($scope.allchecks3));
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/user/addTagsForContact',
                data: sendObAllTags,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                $scope.allchecks3 = [];
                if (response.code == 200) {
                    // $scope.initData = response.data.contactList
                    // $scope.initGroup = response.data.groupsList
                    var sendObjInit = new FormData();
                    var allisChangeNo = $('.isChange')
                    var allGroupChecked = $('.page4-group-group')
                    var tagCheckIds = $('.tag-touch').attr('data');
                    var wechatArr = []
                    var groupArr = []
                    if (tagCheckIds == undefined) {
                        tagCheckIds = ''
                    }
                    if (allisChangeNo.length > 0) {
                        for (var i = 0; i < allisChangeNo.length; i++) {
                            if (allisChangeNo[i].attributes[1].value == 1) {
                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                            }
                        }
                        if (wechatArr.length > 0) {
                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                        } else {
                            sendObjInit.append('accountId', $scope.page4UserIdImportant);
                        }
                    } else {

                    }
                    if (allGroupChecked.length > 0) {
                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                            if (allGroupChecked[i].attributes[1].value == 1) {
                                groupArr.push(allGroupChecked[i].attributes[4].value)
                            }
                        }
                        if (groupArr.length > 0) {
                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                        } else {
                            sendObjInit.append('groupIds', JSON.stringify([]));
                        }
                    } else {
                    }
                    sendObjInit.append('tagId', tagCheckIds);
                    $http({
                        method: 'POST',
                        url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                        data: sendObjInit,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        //上传成功的操作
                        if (response.code == 200) {
                            $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                            $('.checkbox-toggle').attr('data', '0');
                            $scope.initData = response.data.contactList
                            $scope.initDatacontactCount = response.data.contactCount
                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                if ($scope.initData[i].tagList.length > 0) {
                                    arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                        arrAllList.push(arrAllList1[i1])
                                    }
                                    $scope.initData[i].tagList = arrAllList
                                    arrAllList = []
                                    arrAllList1 = []
                                } else {
                                }
                            }
                            $('.M-box1').pagination({
                                totalData: $scope.initDatacontactCount,
                                showData: 10,
                                coping: true,
                                callback: function (api) {
                                    var data = {
                                        page: api.getCurrent(),
                                    };
                                    $scope.allchecks3 = [];
                                    var sendObjInit = new FormData();
                                    var allisChangeNo = $('.isChange')
                                    var allGroupChecked = $('.page4-group-group')
                                    var tagCheckIds = $('.tag-touch').attr('data');
                                    var wechatArr = []
                                    var groupArr = []
                                    if (tagCheckIds == undefined) {
                                        tagCheckIds = ''
                                    }
                                    if (allisChangeNo.length > 0) {
                                        for (var i = 0; i < allisChangeNo.length; i++) {
                                            if (allisChangeNo[i].attributes[1].value == 1) {
                                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                                            }
                                        }
                                        if (wechatArr.length > 0) {
                                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                        } else {
                                            sendObjInit.append('accountId', $scope.page4UserIdImportant);
                                        }
                                    } else {

                                    }
                                    if (allGroupChecked.length > 0) {
                                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                            if (allGroupChecked[i].attributes[1].value == 1) {
                                                groupArr.push(allGroupChecked[i].attributes[4].value)
                                            }
                                        }
                                        if (groupArr.length > 0) {
                                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                        } else {
                                            sendObjInit.append('groupIds', JSON.stringify([]));
                                        }
                                    } else {
                                    }
                                    sendObjInit.append('tagId', tagCheckIds);
                                    sendObjInit.append('page', data.page);
                                    $http({
                                        method: 'POST',
                                        url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                                        data: sendObjInit,
                                        headers: {'Content-Type': undefined},
                                        transformRequest: angular.identity
                                    }).success(function (response) {
                                        //上传成功的操作
                                        if (response.code == 200) {
                                            $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                            $('.checkbox-toggle').attr('data', '0');
                                            $scope.initData = response.data.contactList
                                            $scope.initDatacontactCount = response.data.contactCount
                                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                                if ($scope.initData[i].tagList.length > 0) {
                                                    arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                        arrAllList.push(arrAllList1[i1])
                                                    }
                                                    $scope.initData[i].tagList = arrAllList
                                                    arrAllList = []
                                                    arrAllList1 = []
                                                } else {
                                                }
                                            }
                                        }
                                    })
                                },

                            });
                            setTimeout(function () {
                                var allBlod = $('.blod')
                                for (i = 0; i < allBlod.length; i++) {
                                    var pp = i
                                    if (allBlod[i].attributes[0].nodeValue == 1) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 2) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 3) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 4) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 5) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                    }
                                }
                                $('.mailbox-messages input[type="checkbox"]').iCheck({
                                    checkboxClass: 'icheckbox_flat-blue',
                                    radioClass: 'iradio_flat-blue'
                                });

                            }, 40)
                            $scope.allTagFightShow = false;
                            $scope.addTagShowMe = false;
                            $('.tagList').html('')
                            $('.alert1').show(300).find('.alertCon').html('批量打标签保存成功');
                            setTimeout(function () {
                                $('.alert1').hide(300)
                            }, 2000)
                        } else {
                            $('.alert2').show(300).find('.alertCon').html('标签保存失败，请刷新页面或稍后再试');
                            setTimeout(function () {
                                $('.alert2').hide(300)
                            }, 2000)
                        }
                    });

                } else if (response.code == 202) {
                    // $scope.initData = response.data.contactList
                    // $scope.initGroup = response.data.groupsList
                    var sendObjInit = new FormData();
                    var allisChangeNo = $('.isChange')
                    var allGroupChecked = $('.page4-group-group')
                    var tagCheckIds = $('.tag-touch').attr('data');
                    var wechatArr = []
                    var groupArr = []
                    if (tagCheckIds == undefined) {
                        tagCheckIds = ''
                    }
                    if (allisChangeNo.length > 0) {
                        for (var i = 0; i < allisChangeNo.length; i++) {
                            if (allisChangeNo[i].attributes[1].value == 1) {
                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                            }
                        }
                        if (wechatArr.length > 0) {
                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                        } else {
                            sendObjInit.append('accountId', $scope.page4UserIdImportant);
                        }
                    } else {

                    }
                    if (allGroupChecked.length > 0) {
                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                            if (allGroupChecked[i].attributes[1].value == 1) {
                                groupArr.push(allGroupChecked[i].attributes[4].value)
                            }
                        }
                        if (groupArr.length > 0) {
                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                        } else {
                            sendObjInit.append('groupIds', JSON.stringify([]));
                        }
                    } else {
                    }
                    sendObjInit.append('tagId', tagCheckIds);
                    $http({
                        method: 'POST',
                        url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                        data: sendObjInit,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        //上传成功的操作
                        if (response.code == 200) {
                            $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                            $('.checkbox-toggle').attr('data', '0');
                            $scope.initData = response.data.contactList
                            $scope.initDatacontactCount = response.data.contactCount
                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                if ($scope.initData[i].tagList.length > 0) {
                                    arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                        arrAllList.push(arrAllList1[i1])
                                    }
                                    $scope.initData[i].tagList = arrAllList
                                    arrAllList = []
                                    arrAllList1 = []
                                } else {
                                }
                            }
                            $('.M-box1').pagination({
                                totalData: $scope.initDatacontactCount,
                                showData: 10,
                                coping: true,
                                callback: function (api) {
                                    var data = {
                                        page: api.getCurrent(),
                                    };
                                    $scope.allchecks3 = [];
                                    var sendObjInit = new FormData();
                                    var allisChangeNo = $('.isChange')
                                    var allGroupChecked = $('.page4-group-group')
                                    var tagCheckIds = $('.tag-touch').attr('data');
                                    var wechatArr = []
                                    var groupArr = []
                                    if (tagCheckIds == undefined) {
                                        tagCheckIds = ''
                                    }
                                    if (allisChangeNo.length > 0) {
                                        for (var i = 0; i < allisChangeNo.length; i++) {
                                            if (allisChangeNo[i].attributes[1].value == 1) {
                                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                                            }
                                        }
                                        if (wechatArr.length > 0) {
                                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                        } else {
                                            sendObjInit.append('accountId', $scope.page4UserIdImportant);
                                        }
                                    } else {

                                    }
                                    if (allGroupChecked.length > 0) {
                                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                            if (allGroupChecked[i].attributes[1].value == 1) {
                                                groupArr.push(allGroupChecked[i].attributes[4].value)
                                            }
                                        }
                                        if (groupArr.length > 0) {
                                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                        } else {
                                            sendObjInit.append('groupIds', JSON.stringify([]));
                                        }
                                    } else {
                                    }
                                    sendObjInit.append('tagId', tagCheckIds);
                                    $http({
                                        method: 'POST',
                                        url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                                        data: sendObjInit,
                                        headers: {'Content-Type': undefined},
                                        transformRequest: angular.identity
                                    }).success(function (response) {
                                        //上传成功的操作
                                        if (response.code == 200) {
                                            $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                            $('.checkbox-toggle').attr('data', '0');
                                            $scope.initData = response.data.contactList
                                            $scope.initDatacontactCount = response.data.contactCount
                                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                                if ($scope.initData[i].tagList.length > 0) {
                                                    arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                        arrAllList.push(arrAllList1[i1])
                                                    }
                                                    $scope.initData[i].tagList = arrAllList
                                                    arrAllList = []
                                                    arrAllList1 = []
                                                } else {
                                                }
                                            }
                                        }
                                    })
                                },

                            });
                            setTimeout(function () {
                                var allBlod = $('.blod')
                                for (i = 0; i < allBlod.length; i++) {
                                    var pp = i
                                    if (allBlod[i].attributes[0].nodeValue == 1) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 2) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 3) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 4) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 5) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                    }
                                }
                                $('.mailbox-messages input[type="checkbox"]').iCheck({
                                    checkboxClass: 'icheckbox_flat-blue',
                                    radioClass: 'iradio_flat-blue'
                                });

                            }, 40)
                            $scope.allTagFightShow = false;
                            $scope.addTagShowMe = false;
                            $('.tagList').html('')
                            $('.alert1').show(300).find('.alertCon').html('批量打标签保存成功');
                            setTimeout(function () {
                                $('.alert1').hide(300)
                            }, 2000)
                        } else {
                            $('.alert2').show(300).find('.alertCon').html('标签保存失败，请刷新页面或稍后再试');
                            setTimeout(function () {
                                $('.alert2').hide(300)
                            }, 2000)
                        }
                    });
                } else if (response.code == 201) {
                    $('.alert2').show(300).find('.alertCon').html('您输入的标签已经全部存在，请再次输入');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
                else {
                    $('.alert2').show(300).find('.alertCon').html('标签保存失败，请刷新页面或稍后再试');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
        }
    }
    /*---------------点击参考标签加入到新增标签----------------*/
    $scope.clickAddTag = function (e, q) {
        var appendThis = '                      <div class="tagItem tagItem1" id=' + e + '>\n' +
            '                            <span>' + q + '</span>\n' +
            '                            <div class="delete delete1"></div>\n' +
            '                        </div>'
        $('.newTagappend .tagsContaine .tagList').append(appendThis)
    }
    /*--------------------删除加入的标签---------------------*/
    $(document).on('click', '.delete1', function () {
        $(this).parent().remove()
    })
    $scope.addTagShowMe = false;
//--------------点击打开增加标签组界面---------------
    $scope.addTagShow = function () {

        $scope.addTagShowMe = true
    }
    $scope.addTagShowMe1 = false;
//--------------点击打开增加标签组界面---------------
    $scope.addTagShow1 = function () {
        $scope.addTagShowMe1 = true
    }
//--------------点击确认增加标签组---------------
    $scope.trueAddTagGroup = function () {

        if ($('.trueAddTagGroup').prev().val() == '') {
            console.log($('.trueAddTagGroup').prev().val())
            $('.alert2').show(300).find('.alertCon').html('新增标签组名不能为空，请再次输入');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            $('.trueAddTagGroup').prev().val('')
            $scope.addTagShowMe = false;
            $('.alert1').show(300).find('.alertCon').html('标签组添加成功');
            setTimeout(function () {
                $('.alert1').hide(300)
            }, 2000)
        }
    }

    $scope.trueAddTagGroup1 = function () {
        if ($('.trueAddTagGroup1').prev().val() == '') {
            $('.alert2').show(300).find('.alertCon').html('新增标签组名不能为空，请再次输入');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var newAddGroup = $('.trueAddTagGroup1').prev().val()
            var addGroup = new FormData();
            addGroup.append('groupName', newAddGroup);
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/user/addGroup',
                data: addGroup,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $('.trueAddTagGroup1').prev().val('')
                    $scope.addTagShowMe1 = false;
                    $('.alert1').show(300).find('.alertCon').html('标签组添加成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                } else {
                    $('.alert2').show(300).find('.alertCon').html('标签组添加失败');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });

        }
    }
//------------------弹出框开关-------------
    $('.closeAlert1').click(function () {
        $('.alert1').hide()
    })
    $('.closeAlert2').click(function () {
        $('.alert2').hide()
    })

    $scope.moreGiveGroup = false;
//----------------批量分组------------------
    $scope.allchecks = []
//---------------点击打开批量分组--------------
    $scope.allTaskGroup = function () {
        var allCheckData = $('.checkData')
        var allCheck = $('.icheckbox_flat-blue')
        for (i2 = 0; i2 < allCheck.length; i2++) {
            // var pp = i2
            if (allCheck[i2].attributes[1].value == 'true') {
                $scope.allchecks.push(Number(allCheckData.eq(i2).attr('data')))
                $scope.jiluSree = 0
            }
        }
        if ($scope.allchecks.length <= 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择需要进行分组的好友');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            /*----------批量分组开关-----------*/
            $scope.moreGiveGroup = true;
            /*----------单个好友分组开关-----------*/
            $scope.oneGiveGroup = false;
            /*----------单个好友打标签开关-----------*/
            $scope.oneTagFight = false;
            /*----------群发消息开关-----------*/
            $scope.sayGroup = false;
            /*----------批量打标签开关-----------*/
            $scope.allTagFightShow = false;
            /*----------好友交流记录开关-----------*/
            $scope.chatAll = false;
            /*----------好友基本资料开关-----------*/
            $scope.giveGroup = false;
            $('.page1-change-block-sree').css('display', 'none');
            $scope.allchecks = []
        }

    }
//----------------点击关闭批量分组分组弹框--------------
    $scope.page4moreGroupClosMsg = function () {
        $scope.moreGiveGroup = false;
        $scope.addTagShowMe1 = false;
    }
    $scope.allchecks1 = []


//------------------点击提交批量分组---------------
    $scope.page4moreGroupSendMsg = function () {
        var allCheckData = $('.checkData')
        var allCheck = $('.icheckbox_flat-blue')
        var allGroupId = $('.page4-select1 option:selected').attr('data')
        var allGroupHtml = $('.page4-select1 option:selected').html()
        for (i2 = 0; i2 < allCheck.length; i2++) {
            var pp = i2
            if (allCheck[i2].attributes[1].value == 'true') {
                $scope.allchecks1.push(Number(allCheckData.eq(i2).attr('data')))
            }
        }
        if ($scope.allchecks1.length <= 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择需要进行分组的好友');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else if (allGroupHtml == '' || allGroupHtml == null || allGroupHtml == undefined) {
            $('.alert2').show(300).find('.alertCon').html('当前分组为空请添加分组');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var SaveaGiveGroup = new FormData();
            SaveaGiveGroup.append(' contactIds', JSON.stringify($scope.allchecks1));
            SaveaGiveGroup.append('groupId', allGroupId);
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/user/modifyGroup',
                data: SaveaGiveGroup,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $scope.addTagShowMe1 = false;
                    $scope.allchecks1 = []

                    $('.alert1').show(300).find('.alertCon').html('批量分组好友成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                    $scope.moreGiveGroup = false;
                    var sendObjInit = new FormData();
                    var allisChangeNo = $('.isChange')
                    var allGroupChecked = $('.page4-group-group')
                    var tagCheckIds = $('.tag-touch').attr('data');
                    var wechatArr = []
                    var groupArr = []
                    if (tagCheckIds == undefined) {
                        tagCheckIds = ''
                    }
                    if (allisChangeNo.length > 0) {
                        for (var i = 0; i < allisChangeNo.length; i++) {
                            if (allisChangeNo[i].attributes[1].value == 1) {
                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                            }
                        }
                        if (wechatArr.length > 0) {
                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                        } else {
                            sendObjInit.append('accountId', $scope.page4UserIdImportant);
                        }
                    } else {

                    }
                    if (allGroupChecked.length > 0) {
                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                            if (allGroupChecked[i].attributes[1].value == 1) {
                                groupArr.push(allGroupChecked[i].attributes[4].value)
                            }
                        }
                        if (groupArr.length > 0) {
                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                        } else {
                            sendObjInit.append('groupIds', JSON.stringify([]));
                        }
                    } else {
                    }
                    sendObjInit.append('tagId', tagCheckIds);
                    $http({
                        method: 'POST',
                        url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                        data: sendObjInit,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        //上传成功的操作
                        if (response.code == 200) {
                            $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                            $('.checkbox-toggle').attr('data', '0');
                            $scope.initData = response.data.contactList
                            $scope.initDatacontactCount = response.data.contactCount
                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                if ($scope.initData[i].tagList.length > 0) {
                                    arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                        arrAllList.push(arrAllList1[i1])
                                    }
                                    $scope.initData[i].tagList = arrAllList
                                    arrAllList = []
                                    arrAllList1 = []
                                } else {
                                }
                            }
                            $('.M-box1').pagination({
                                totalData: $scope.initDatacontactCount,
                                showData: 10,
                                coping: true,
                                callback: function (api) {
                                    var data = {
                                        page: api.getCurrent(),
                                    };
                                    var sendObjInit = new FormData();
                                    var allisChangeNo = $('.isChange')
                                    var allGroupChecked = $('.page4-group-group')
                                    var tagCheckIds = $('.tag-touch').attr('data');
                                    var wechatArr = []
                                    var groupArr = []
                                    if (tagCheckIds == undefined) {
                                        tagCheckIds = ''
                                    }
                                    if (allisChangeNo.length > 0) {
                                        for (var i = 0; i < allisChangeNo.length; i++) {
                                            if (allisChangeNo[i].attributes[1].value == 1) {
                                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                                            }
                                        }
                                        if (wechatArr.length > 0) {
                                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                        } else {
                                            sendObjInit.append('accountId', $scope.page4UserIdImportant);
                                        }
                                    } else {

                                    }
                                    if (allGroupChecked.length > 0) {
                                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                            if (allGroupChecked[i].attributes[1].value == 1) {
                                                groupArr.push(allGroupChecked[i].attributes[4].value)
                                            }
                                        }
                                        if (groupArr.length > 0) {
                                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                        } else {
                                            sendObjInit.append('groupIds', JSON.stringify([]));
                                        }
                                    } else {
                                    }
                                    sendObjInit.append('tagId', tagCheckIds);
                                    sendObjInit.append('page', data.page);
                                    $http({
                                        method: 'POST',
                                        url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                                        data: sendObjInit,
                                        headers: {'Content-Type': undefined},
                                        transformRequest: angular.identity
                                    }).success(function (response) {
                                        //上传成功的操作
                                        if (response.code == 200) {
                                            $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                            $('.checkbox-toggle').attr('data', '0');
                                            $scope.initData = response.data.contactList
                                            $scope.initDatacontactCount = response.data.contactCount
                                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                                if ($scope.initData[i].tagList.length > 0) {
                                                    arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                        arrAllList.push(arrAllList1[i1])
                                                    }
                                                    $scope.initData[i].tagList = arrAllList
                                                    arrAllList = []
                                                    arrAllList1 = []
                                                } else {
                                                }
                                            }
                                            setTimeout(function () {
                                                var allBlod = $('.blod')
                                                for (i = 0; i < allBlod.length; i++) {
                                                    var pp = i
                                                    if (allBlod[i].attributes[0].nodeValue == 1) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 2) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 3) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 4) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 5) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                                    }
                                                }
                                                $('.mailbox-messages input[type="checkbox"]').iCheck({
                                                    checkboxClass: 'icheckbox_flat-blue',
                                                    radioClass: 'iradio_flat-blue'
                                                });

                                            }, 40)
                                        }
                                    })
                                },

                            });

                            setTimeout(function () {
                                var allBlod = $('.blod')
                                for (i = 0; i < allBlod.length; i++) {
                                    var pp = i
                                    if (allBlod[i].attributes[0].nodeValue == 1) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 2) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 3) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 4) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 5) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                    }
                                }
                                $('.mailbox-messages input[type="checkbox"]').iCheck({
                                    checkboxClass: 'icheckbox_flat-blue',
                                    radioClass: 'iradio_flat-blue'
                                });

                            }, 40)
                        } else {
                        }
                    });
                } else {
                    $('.alert2').show(300).find('.alertCon').html('批量分组好友失败');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
            //-------------发送成功后-----

        }
    }

//------------记录单个打标签好友id---------------
    $scope.oneFriendId = []
//------------------点击打开打标签按钮-----------------
    $scope.fighttag = function (x) {

        $scope.page4One = 0
        $scope.GroupNumJilu = 0
        $scope.jilukaka = 0
        $scope.jiluSree = 0
        $scope.jiluFour = 0
        $('.page1-change-block').css('display', 'none')
        $('.page1-change-block-two1').css('display', 'none')
        $('.page1-change-block-two').css('display', 'none')
        $('.page1-change-block-sree').css('display', 'none')
        $('.page1-change-block-four').css('display', 'none')
        $scope.oneFriendId = [];
        /*----------批量分组开关-----------*/
        $scope.moreGiveGroup = false;
        /*----------单个好友分组开关-----------*/
        $scope.oneGiveGroup = false;
        /*----------单个好友打标签开关-----------*/
        $scope.oneTagFight = true;
        /*----------群发消息开关-----------*/
        $scope.sayGroup = false;
        /*----------批量打标签开关-----------*/
        $scope.allTagFightShow = false;
        /*----------好友交流记录开关-----------*/
        $scope.chatAll = false;
        /*----------好友基本资料开关-----------*/
        $scope.giveGroup = false;
        $scope.oneFriendId.push(x)
    }
    $scope.oneTagFight = false;
//----------------点击关闭单个打标签弹框--------------
    $scope.page4oneTagFightClosMsg = function () {
        $scope.oneTagFight = false;
    }
//---------------点击提交单个标签---------------
    $scope.page4oneTagFightSendMsg = function () {
        if ($('.page4-addTag2>.tagsContaine>.tagList ')[0].children.length == 0) {
            $('.alert2').show(300).find('.alertCon').html('请输入标签名');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var alltagItems = $('.tagItem1');
            for (var tagid = [], tagcon = [], i = 0; i < alltagItems.length; i++) {
                tagid.push(alltagItems[i].attributes.id.value);
                tagcon.push(alltagItems[i].innerText)
            }
            var sendObAllTags = new FormData();
            sendObAllTags.append('tagNames', JSON.stringify(tagcon));
            sendObAllTags.append(' tagIds', JSON.stringify(tagid));
            sendObAllTags.append('contactIds', JSON.stringify($scope.oneFriendId));
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/user/addTagsForContact',
                data: sendObAllTags,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作

                if (response.code == 200) {
                    // $scope.initData = response.data.contactList
                    // $scope.initGroup = response.data.groupsList
                    var sendObjInit = new FormData();
                    var allisChangeNo = $('.isChange')
                    var allGroupChecked = $('.page4-group-group')
                    var tagCheckIds = $('.tag-touch').attr('data');
                    var wechatArr = []
                    var groupArr = []
                    if (tagCheckIds == undefined) {
                        tagCheckIds = ''
                    }
                    if (allisChangeNo.length > 0) {
                        for (var i = 0; i < allisChangeNo.length; i++) {
                            if (allisChangeNo[i].attributes[1].value == 1) {
                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                            }
                        }
                        if (wechatArr.length > 0) {
                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                        } else {
                            sendObjInit.append('accountId', $scope.page4UserIdImportant);
                        }
                    } else {

                    }
                    if (allGroupChecked.length > 0) {
                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                            if (allGroupChecked[i].attributes[1].value == 1) {
                                groupArr.push(allGroupChecked[i].attributes[4].value)
                            }
                        }
                        if (groupArr.length > 0) {
                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                        } else {
                            sendObjInit.append('groupIds', JSON.stringify([]));
                        }
                    } else {
                    }
                    sendObjInit.append('tagId', tagCheckIds);
                    $http({
                        method: 'POST',
                        url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                        data: sendObjInit,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        //上传成功的操作
                        if (response.code == 200) {
                            $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                            $('.checkbox-toggle').attr('data', '0');
                            $scope.initData = response.data.contactList
                            $scope.initDatacontactCount = response.data.contactCount
                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                if ($scope.initData[i].tagList.length > 0) {
                                    arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                        arrAllList.push(arrAllList1[i1])
                                    }
                                    $scope.initData[i].tagList = arrAllList
                                    arrAllList = []
                                    arrAllList1 = []
                                } else {
                                }
                            }

                            $('.M-box1').pagination({
                                totalData: $scope.initDatacontactCount,
                                showData: 10,
                                coping: true,
                                callback: function (api) {
                                    var data = {
                                        page: api.getCurrent(),
                                    };
                                    var sendObjInit = new FormData();


                                    var allisChangeNo = $('.isChange')
                                    var allGroupChecked = $('.page4-group-group')
                                    var tagCheckIds = $('.tag-touch').attr('data');
                                    var wechatArr = []
                                    var groupArr = []
                                    if (tagCheckIds == undefined) {
                                        tagCheckIds = ''
                                    }
                                    if (allisChangeNo.length > 0) {
                                        for (var i = 0; i < allisChangeNo.length; i++) {
                                            if (allisChangeNo[i].attributes[1].value == 1) {
                                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                                            }
                                        }
                                        if (wechatArr.length > 0) {
                                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                        } else {
                                            sendObjInit.append('accountId', $scope.page4UserIdImportant);
                                        }
                                    } else {

                                    }
                                    if (allGroupChecked.length > 0) {
                                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                            if (allGroupChecked[i].attributes[1].value == 1) {
                                                groupArr.push(allGroupChecked[i].attributes[4].value)
                                            }
                                        }
                                        if (groupArr.length > 0) {
                                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                        } else {
                                            sendObjInit.append('groupIds', JSON.stringify([]));
                                        }
                                    } else {
                                    }
                                    sendObjInit.append('tagId', tagCheckIds);
                                    sendObjInit.append('page', data.page);
                                    $http({
                                        method: 'POST',
                                        url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                                        data: sendObjInit,
                                        headers: {'Content-Type': undefined},
                                        transformRequest: angular.identity
                                    }).success(function (response) {
                                        //上传成功的操作
                                        if (response.code == 200) {
                                            $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                            $('.checkbox-toggle').attr('data', '0');
                                            $scope.initData = response.data.contactList
                                            $scope.initDatacontactCount = response.data.contactCount
                                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                                if ($scope.initData[i].tagList.length > 0) {
                                                    arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                        arrAllList.push(arrAllList1[i1])
                                                    }
                                                    $scope.initData[i].tagList = arrAllList
                                                    arrAllList = []
                                                    arrAllList1 = []
                                                } else {
                                                }
                                            }
                                            setTimeout(function () {
                                                var allBlod = $('.blod')
                                                for (i = 0; i < allBlod.length; i++) {
                                                    var pp = i
                                                    if (allBlod[i].attributes[0].nodeValue == 1) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 2) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 3) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 4) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 5) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                                    }
                                                }
                                                $('.mailbox-messages input[type="checkbox"]').iCheck({
                                                    checkboxClass: 'icheckbox_flat-blue',
                                                    radioClass: 'iradio_flat-blue'
                                                });

                                            }, 40)
                                        }
                                    })
                                },

                            });
                            setTimeout(function () {
                                var allBlod = $('.blod')
                                for (i = 0; i < allBlod.length; i++) {
                                    var pp = i
                                    if (allBlod[i].attributes[0].nodeValue == 1) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 2) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 3) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 4) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 5) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                    }
                                }
                                $('.mailbox-messages input[type="checkbox"]').iCheck({
                                    checkboxClass: 'icheckbox_flat-blue',
                                    radioClass: 'iradio_flat-blue'
                                });

                            }, 40)
                            $scope.oneTagFight = false;
                            $('.tagList').html('')
                            $('.alert1').show(300).find('.alertCon').html('标签保存成功');
                            setTimeout(function () {
                                $('.alert1').hide(300)
                            }, 2000)
                        } else {
                            $('.alert2').show(300).find('.alertCon').html('标签保存失败，请刷新页面或稍后再试');
                            setTimeout(function () {
                                $('.alert2').hide(300)
                            }, 2000)
                        }
                    });

                } else if (response.code == 202) {
                    $scope.initData = response.data.contactList
                    $scope.initDatacontactCount = response.data.contactCount
                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                        if ($scope.initData[i].tagList.length > 0) {
                            arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                arrAllList.push(arrAllList1[i1])
                            }
                            $scope.initData[i].tagList = arrAllList
                            arrAllList = []
                            arrAllList1 = []
                        } else {
                        }
                    }

                    $('.M-box1').pagination({
                        totalData: $scope.initDatacontactCount,
                        showData: 10,
                        coping: true,
                        callback: function (api) {
                            var data = {
                                page: api.getCurrent(),
                            };
                            var sendObjInit = new FormData();


                            var allisChangeNo = $('.isChange')
                            var allGroupChecked = $('.page4-group-group')
                            var tagCheckIds = $('.tag-touch').attr('data');
                            var wechatArr = []
                            var groupArr = []
                            if (tagCheckIds == undefined) {
                                tagCheckIds = ''
                            }
                            if (allisChangeNo.length > 0) {
                                for (var i = 0; i < allisChangeNo.length; i++) {
                                    if (allisChangeNo[i].attributes[1].value == 1) {
                                        wechatArr.push(allisChangeNo[i].attributes[4].value)
                                    }
                                }
                                if (wechatArr.length > 0) {
                                    sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                } else {
                                    sendObjInit.append('accountId', $scope.page4UserIdImportant);
                                }
                            } else {

                            }
                            if (allGroupChecked.length > 0) {
                                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                    if (allGroupChecked[i].attributes[1].value == 1) {
                                        groupArr.push(allGroupChecked[i].attributes[4].value)
                                    }
                                }
                                if (groupArr.length > 0) {
                                    sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                } else {
                                    sendObjInit.append('groupIds', JSON.stringify([]));
                                }
                            } else {
                            }
                            sendObjInit.append('tagId', tagCheckIds);
                            sendObjInit.append('page', data.page);
                            $http({
                                method: 'POST',
                                url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                                data: sendObjInit,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                //上传成功的操作
                                if (response.code == 200) {
                                    $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                    $('.checkbox-toggle').attr('data', '0');
                                    $scope.initData = response.data.contactList
                                    $scope.initDatacontactCount = response.data.contactCount
                                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                        if ($scope.initData[i].tagList.length > 0) {
                                            arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                arrAllList.push(arrAllList1[i1])
                                            }
                                            $scope.initData[i].tagList = arrAllList
                                            arrAllList = []
                                            arrAllList1 = []
                                        } else {
                                        }
                                    }
                                    setTimeout(function () {
                                        var allBlod = $('.blod')
                                        for (i = 0; i < allBlod.length; i++) {
                                            var pp = i
                                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                            }
                                        }
                                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                                            checkboxClass: 'icheckbox_flat-blue',
                                            radioClass: 'iradio_flat-blue'
                                        });

                                    }, 40)
                                }
                            })
                        },

                    });
                    setTimeout(function () {
                        var allBlod = $('.blod')
                        for (i = 0; i < allBlod.length; i++) {
                            var pp = i
                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                            }
                        }
                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });

                    }, 40)
                    $scope.oneTagFight = false;
                    $('.tagList').html('')
                    $('.alert1').show(300).find('.alertCon').html('标签保存成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                } else if (response.code == 201) {
                    $('.tagList').html('')
                    $('.alert2').show(300).find('.alertCon').html('您输入的标签已经全部存在，请再次输入');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
                else {
                    $('.alert2').show(300).find('.alertCon').html('标签保存失败，请刷新页面或稍后再试');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
        }


    }
    $scope.oneGiveGroup = false;
    $scope.oneFriendIds = []
//---------------点击分组打开分组弹框-------------
    $scope.giveGroups = function (x) {

        $scope.page4One = 0
        $scope.GroupNumJilu = 0
        $scope.jilukaka = 0
        $scope.jiluSree = 0
        $scope.jiluFour = 0
        $('.page1-change-block').css('display', 'none')
        $('.page1-change-block-two1').css('display', 'none')
        $('.page1-change-block-two').css('display', 'none')
        $('.page1-change-block-sree').css('display', 'none')
        $('.page1-change-block-four').css('display', 'none')
        /*----------批量分组开关-----------*/
        $scope.moreGiveGroup = false;
        /*----------单个好友分组开关-----------*/
        $scope.oneGiveGroup = true;
        /*----------单个好友打标签开关-----------*/
        $scope.oneTagFight = false;
        /*----------群发消息开关-----------*/
        $scope.sayGroup = false;
        /*----------批量打标签开关-----------*/
        $scope.allTagFightShow = false;
        /*----------好友交流记录开关-----------*/
        $scope.chatAll = false;
        /*----------好友基本资料开关-----------*/
        $scope.giveGroup = false;
        $scope.oneFriendIds.push(x)
    }
//----------------点击关闭单个分组弹框--------------
    $scope.page4oneGroupClosMsg = function () {
        $scope.oneGiveGroup = false;
    }
//---------------点击提交单个分组---------------
    $scope.page4oneGroupSendMsg = function () {
        var allGroupId = $('.page4-select-on-group option:selected').attr('data')
        var SaveaOnGiveGroup = new FormData();
        SaveaOnGiveGroup.append(' contactIds', JSON.stringify($scope.oneFriendIds));
        SaveaOnGiveGroup.append('groupId', allGroupId);
        $http({
            method: 'POST',
            url: $rootScope.link + '/gcsscrm/user/modifyGroup',
            data: SaveaOnGiveGroup,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $scope.addTagShowMe1 = false;
                $scope.allchecks1 = []
                var sendObjInit = new FormData();


                var allisChangeNo = $('.isChange')
                var allGroupChecked = $('.page4-group-group')
                var tagCheckIds = $('.tag-touch').attr('data');
                var wechatArr = []
                var groupArr = []
                if (tagCheckIds == undefined) {
                    tagCheckIds = ''
                }
                if (allisChangeNo.length > 0) {
                    for (var i = 0; i < allisChangeNo.length; i++) {
                        if (allisChangeNo[i].attributes[1].value == 1) {
                            wechatArr.push(allisChangeNo[i].attributes[4].value)
                        }
                    }
                    if (wechatArr.length > 0) {
                        sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                    } else {
                        sendObjInit.append('accountId', $scope.page4UserIdImportant);
                    }
                } else {

                }
                if (allGroupChecked.length > 0) {
                    for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                        if (allGroupChecked[i].attributes[1].value == 1) {
                            groupArr.push(allGroupChecked[i].attributes[4].value)
                        }
                    }
                    if (groupArr.length > 0) {
                        sendObjInit.append('groupIds', JSON.stringify(groupArr));
                    } else {
                        sendObjInit.append('groupIds', JSON.stringify([]));
                    }
                } else {
                }
                sendObjInit.append('tagId', tagCheckIds);
                $http({
                    method: 'POST',
                    url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                    data: sendObjInit,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    //上传成功的操作
                    if (response.code == 200) {
                        $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                        $('.checkbox-toggle').attr('data', '0');
                        $scope.initData = response.data.contactList
                        $scope.initDatacontactCount = response.data.contactCount
                        for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                            if ($scope.initData[i].tagList.length > 0) {
                                arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                    arrAllList.push(arrAllList1[i1])
                                }
                                $scope.initData[i].tagList = arrAllList
                                arrAllList = []
                                arrAllList1 = []
                            } else {
                            }
                        }
                        $('.M-box1').pagination({
                            totalData: $scope.initDatacontactCount,
                            showData: 10,
                            coping: true,
                            callback: function (api) {
                                var data = {
                                    page: api.getCurrent(),
                                };
                                var sendObjInit = new FormData();
                                var sendObjInit = new FormData();


                                var allisChangeNo = $('.isChange')
                                var allGroupChecked = $('.page4-group-group')
                                var tagCheckIds = $('.tag-touch').attr('data');
                                var wechatArr = []
                                var groupArr = []
                                if (tagCheckIds == undefined) {
                                    tagCheckIds = ''
                                }
                                if (allisChangeNo.length > 0) {
                                    for (var i = 0; i < allisChangeNo.length; i++) {
                                        if (allisChangeNo[i].attributes[1].value == 1) {
                                            wechatArr.push(allisChangeNo[i].attributes[4].value)
                                        }
                                    }
                                    if (wechatArr.length > 0) {
                                        sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                    } else {
                                        sendObjInit.append('accountId', $scope.page4UserIdImportant);
                                    }
                                } else {

                                }
                                if (allGroupChecked.length > 0) {
                                    for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                        if (allGroupChecked[i].attributes[1].value == 1) {
                                            groupArr.push(allGroupChecked[i].attributes[4].value)
                                        }
                                    }
                                    if (groupArr.length > 0) {
                                        sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                    } else {
                                        sendObjInit.append('groupIds', JSON.stringify([]));
                                    }
                                } else {
                                }
                                sendObjInit.append('tagId', tagCheckIds);
                                $http({
                                    method: 'POST',
                                    url: $rootScope.link + '/gcsscrm/user/getAllMsg',
                                    data: sendObjInit,
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                }).success(function (response) {
                                    //上传成功的操作
                                    if (response.code == 200) {
                                        $('.page4-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                        $('.checkbox-toggle').attr('data', '0');
                                        $scope.initData = response.data.contactList
                                        $scope.initDatacontactCount = response.data.contactCount
                                        for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                            if ($scope.initData[i].tagList.length > 0) {
                                                arrAllList1.push($scope.initData[i].tagList[0].tagname.split(','));
                                                for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                    arrAllList.push(arrAllList1[i1])
                                                }
                                                $scope.initData[i].tagList = arrAllList
                                                arrAllList = []
                                                arrAllList1 = []
                                            } else {
                                            }
                                        }
                                        setTimeout(function () {
                                            var allBlod = $('.blod')
                                            for (i = 0; i < allBlod.length; i++) {
                                                var pp = i
                                                if (allBlod[i].attributes[0].nodeValue == 1) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 2) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 3) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 4) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 5) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                                }
                                            }
                                            $('.mailbox-messages input[type="checkbox"]').iCheck({
                                                checkboxClass: 'icheckbox_flat-blue',
                                                radioClass: 'iradio_flat-blue'
                                            });

                                        }, 40)
                                    }
                                })
                            },

                        });
                        setTimeout(function () {
                            var allBlod = $('.blod')
                            for (i = 0; i < allBlod.length; i++) {
                                var pp = i
                                if (allBlod[i].attributes[0].nodeValue == 1) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 2) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 3) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 4) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 5) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                }
                            }
                            $('.mailbox-messages input[type="checkbox"]').iCheck({
                                checkboxClass: 'icheckbox_flat-blue',
                                radioClass: 'iradio_flat-blue'
                            });

                        }, 40)
                        $('.alert1').show(300).find('.alertCon').html('好友分组成功');
                        setTimeout(function () {
                            $('.alert1').hide(300)
                        }, 2000)
                        $scope.oneGiveGroup = false;
                    } else {
                    }
                });
            } else {
                $('.alert2').show(300).find('.alertCon').html('好友分组失败');
                setTimeout(function () {
                    $('.alert2').hide(300)
                }, 2000)
            }
        });
    }
    $scope.sayGroup = false;
//--------------点击打开群发消息弹框-----------
    $scope.allchecks4 = []
    $scope.sayGroupShow = function () {
        var allCheckData = $('.checkData')
        var allCheck = $('.icheckbox_flat-blue')
        console.log(allCheck)
        for (i2 = 0; i2 < allCheck.length; i2++) {
            // var pp = i2
            if (allCheck[i2].attributes[1].value == 'true') {
                $scope.allchecks4.push(Number(allCheckData.eq(i2).attr('data')))
                $scope.jiluSree = 0
            }
        }
        if ($scope.allchecks4.length <= 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择需要进行群发消息的好友');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            /*----------批量分组开关-----------*/
            $scope.moreGiveGroup = false;
            /*----------单个好友分组开关-----------*/
            $scope.oneGiveGroup = false;
            /*----------单个好友打标签开关-----------*/
            $scope.oneTagFight = false;
            /*----------群发消息开关-----------*/
            $scope.sayGroup = true;
            /*----------批量打标签开关-----------*/
            $scope.allTagFightShow = false;
            /*----------好友交流记录开关-----------*/
            $scope.chatAll = false;
            /*----------好友基本资料开关-----------*/
            $scope.giveGroup = false;
            $('.page1-change-block-four').css('display', 'none')
            $scope.jiluFour = 0;
            $scope.allchecks4 = []
        }
    }
//-------------点击关闭群发消息弹框-------------
    $scope.page4sayGroupClosMsg = function () {
        $scope.sayGroup = false;
    }

    $scope.allchecks5 = [];


//------------点击执行群发任务--------------
    $scope.page4sayGroupSendMsg = function () {
        $scope.sendObjMsgPost = new FormData();
        /*----图片---*/
        // $scope.sendObjMsgPost.append('file', $scope.pic);
        var allCheckData = $('.checkData')
        var allCheck = $('.icheckbox_flat-blue')
        for (var i2 = 0; i2 < allCheck.length; i2++) {
            // var pp = i2
            if (allCheck[i2].attributes[1].value == 'true') {
                $scope.allchecks5.push(Number(allCheckData.eq(i2).attr('data')))
                $scope.jiluSree = 0
            }
        }
        if ($scope.allchecks5.length <= 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择需要进行群发消息的好友');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else if ($(".FontAndEmjoy6").html() == '') {
            $('.alert2').show(300).find('.alertCon').html('请输入需要进行群发的信息');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var saySomething = $(".FontAndEmjoy6").html();
            var reger = /<img.*?(?:>|\/>)/g;
            var srcReg = /alt=[\'\"]?([^\'\"]*)[\'\"]?/i;
            var arr1 = saySomething.match(reger)
            if (arr1 == null) {
            } else {
                var tt = []
                for (var i = 0; i < arr1.length; i++) {
                    var src = arr1[i].match(srcReg);
                    if (src[1]) {
                        tt.push(src[1])
                    }
                }
                var result = saySomething.match(/<img.*?(?:>|\/>)/g);
                for (var i = 0; i < result.length; i++) {
                    saySomething = saySomething.replace(result[i], tt[i])
                }
            }
            $scope.sendObjMsgPost.append('msg', saySomething);
            $scope.sendObjMsgPost.append(' contactIds', JSON.stringify($scope.allchecks5));
            $http({
                method: 'POST',
                url: $rootScope.link + "/gcsscrm/user/sendMsg",
                data: $scope.sendObjMsgPost,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $(".FontAndEmjoy6").html('');
                    $scope.sayGroup = false;
                    /*------图片消失----*/
                    // $('.removeImg').css('background', 'url("../images/add-pic.png") center no-repeat');
                    // $scope.pic = '';
                    $('.alert1').show(300).find('.alertCon').html('群发消息任务添加完成');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)

                } else {
                    alert(response.msg);
                    // location.reload();
                }
            })
            $scope.allchecks5 = []
        }

    }
//-------------------emjoy表情相关-----------------
//-------------------鼠标悬停表情列表打开----------
    $(".emjoyDiv-page6").mouseover(function () {
        $('.emjoyList-page6').css("display", "block")
    })
//-------------------鼠标移除表情列表关闭----------
    $(".emjoyDiv-page6").mouseout(function () {
        $(".emjoyList-page6").css("display", "none")
    })
//-----------判断值----------
    var panduanTure = 0;
//-----------输入框焦点事件--------------
    $(function () {
        $("#FontAndEmjoy6").focus(function () {
            $(this).removeClass("flag1");
            // panduanTure = 1
        });
        $("#FontAndEmjoy6").blur(function () {
            // panduanTure=0
            $(this).addClass("flag1");
        });
    });
//------------表情点击触发事件------------
    $(".emjoyList-page6").on("click", "img", function () {
        if (panduanTure == 1) {
            // $("#FontAndEmjoy").removeClass("flag");
            var imgAlt = $(this).attr("alt")
            var imgSrc = $(this).attr("src")
            insertHTML("<img src='" + imgSrc + "'alt='" + imgAlt + "'>");
        }

    })
//再加入一个全屏事件
    var jilu = [];
    var runNing = false
    var i = -1;
    $(window).click(function (e) {
        i++;
        if (window.getSelection) {
            var getevent = e.srcElement ? e.srcElement : e.target;//不要告诉我不知道这句的意思
            jilu.push(getevent.id)
            // console.log(jilu)
            // console.log(i)
            // for (var j=0;j<jilu.length;j++){
            //     if(jilu[j]=="FontAndEmjoy"){
            //         runNing=true
            //     }else {
            //         panduanTure=0
            //         runNing=false
            //     }
            // }
            var runNing = $.inArray("FontAndEmjoy6", jilu);
            if (runNing != -1) {
                if (getevent.id != 'FontAndEmjoy6') {
                    $("#FontAndEmjoy6").addClass("flag1");
                    panduanTure = 0
                    if (getevent.className == 'gg') {
                        panduanTure = 1
                        $("#FontAndEmjoy6").removeClass("flag1");
                        if (jilu[i - 1] == 'FontAndEmjoy6') {
                            panduanTure = 1
                            $("#FontAndEmjoy6").removeClass("flag1");
                            if (jilu[i - 1] == getevent.id) {
                                panduanTure = 1
                                $("#FontAndEmjoy6").removeClass("flag1");
                            }
                        }
                    } else {
                        panduanTure = 0
                        $("#FontAndEmjoy6").addClass("flag1");
                    }
                } else {
                    panduanTure = 1
                    $("#FontAndEmjoy6").removeClass("flag1");
                }
            } else {
            }
            //除非点了那个插入html的按钮 其他时候必须要执行getFocus来更新最后失去焦点的div
        }
    })

    function insertHTML(html) {
        var dthis = $("#FontAndEmjoy6")[0];//要插入内容的某个div,在标准浏览器中 无需这句话
        //dthis.focus();a
        var sel, range;
        // console.log($(dthis).hasClass("flag"));
        if ($(dthis).hasClass("flag1")) {

        } else {
            $(dthis).html(dthis.innerHTML + html);
            return;
        }
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                var el = document.createElement('div');
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }

                range.insertNode(frag);
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
        else if (document.selection && document.selection.type != 'Control') {
            $(dthis).focus(); //在非标准浏览器中 要先让你需要插入html的div 获得焦点
            ierange = document.selection.createRange();//获取光标位置
            ierange.pasteHTML(html);    //在光标位置插入html 如果只是插入text 则就是fus.text="..."
            $(dthis).focus();
        }
    }

    $('.falseTime').blur(function () {
        var dateValue = $(this).val()
        var reg1 = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        var regExp = new RegExp(reg1);
        if (regExp.test(dateValue)) {
        } else {
            $('.alert2').show(300).find('.alertCon').html('请输入正确日期格式例如：2017-01-01');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        }
    })
}
])
;

app.controller('page5C', ["$rootScope", "$scope", "$http", "$timeout", function ($rootScope, $scope, $http, $timeout) {
    $rootScope.mainShow = true;
    $rootScope.changePas = false;
    $scope.page2Wechats = [];
    $rootScope.Page5showLoads = false;
    $scope.allGroupChecks = [];
    $scope.picSrc= 'http://'+window.location.host+'/pic/'
    $scope.page5UserIdImportant = localStorage.getItem("userId");
    if ($scope.page5UserIdImportant == undefined || $scope.page5UserIdImportant == null || $scope.page5UserIdImportant == '') {
    } else {
        setTimeout(function () {
            $rootScope.Page5showLoads = true;
            var sendWechatIds = new FormData();
            sendWechatIds.append('accountId', $scope.page5UserIdImportant);
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/general/getAllWeChat',
                data: sendWechatIds,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $scope.sendWechatIdsAll = response.data.weChats
                    for (var i = 0; i < $scope.sendWechatIdsAll.length; i++) {
                        $scope.page2Wechats.push($scope.sendWechatIdsAll[i].id)
                    }
                } else {
                    $('.alert2').show(300).find('.alertCon').html('页面初始化失败，请刷新页面或再次登陆');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
            var sendObjInit = new FormData();
            sendObjInit.append('accountId', $scope.page5UserIdImportant);
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                data: sendObjInit,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $scope.initData = response.data.chatrooms
                    $scope.initGroup = response.data.chatRoomGroups
                    $scope.initDatacontactCount = response.data.chatRoomCount
                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                        if ($scope.initData[i].chatRoomTags.length > 0) {
                            arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                arrAllList.push(arrAllList1[i1])
                            }
                            $scope.initData[i].chatRoomTags = arrAllList
                            arrAllList = []
                            arrAllList1 = []
                        } else {
                        }
                    }
                    $('.M-box1').pagination({
                        totalData: $scope.initDatacontactCount,
                        showData: 10,
                        coping: true,
                        callback: function (api) {
                            $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                            $('.checkbox-toggle').attr('data', '0');
                            var data = {
                                page: api.getCurrent(),
                            };
                            var sendObjInit = new FormData();
                            sendObjInit.append('accountId', $scope.page5UserIdImportant);
                            sendObjInit.append('page', data.page);
                            $http({
                                method: 'POST',
                                url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                                data: sendObjInit,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                //上传成功的操作
                                if (response.code == 200) {
                                    $scope.initData = response.data.chatrooms
                                    $scope.initGroup = response.data.chatRoomGroups
                                    $scope.initDatacontactCount = response.data.chatRoomCount
                                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                        if ($scope.initData[i].chatRoomTags.length > 0) {
                                            arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                arrAllList.push(arrAllList1[i1])
                                            }
                                            $scope.initData[i].chatRoomTags = arrAllList
                                            arrAllList = []
                                            arrAllList1 = []
                                        } else {
                                        }
                                    }
                                    setTimeout(function () {

                                        var allBlod = $('.blod')
                                        for (i = 0; i < allBlod.length; i++) {
                                            var pp = i
                                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                            }
                                        }
                                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                                            checkboxClass: 'icheckbox_flat-blue',
                                            radioClass: 'iradio_flat-blue'
                                        });
                                    }, 100)
                                }
                            })
                        },

                    });
                    setTimeout(function () {

                        var allBlod = $('.blod')
                        for (i = 0; i < allBlod.length; i++) {
                            var pp = i
                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                            }
                        }
                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });
                        $('#example2').DataTable({
                            // 'paging'      : true,
                            // 'lengthChange': false,
                            // 'searching'   : false,
                            'ordering': false,
                            'bInfo': false,
                            "aLengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],

                            // 'info'        : true,
                            // 'autoWidth'   : false
                        })
                    }, 200)
                    $rootScope.Page5showLoads = false;
                }
            })


        }, 0)
    }

    // setTimeout(function () {
    //
    //     $('#example3').DataTable({
    //         // 'paging'      : true,
    //         // 'lengthChange': false,
    //         // 'searching'   : false,
    //         'ordering': false,
    //         // 'info'        : true,
    //         // 'autoWidth'   : false
    //     })
    // }, 10)
    $scope.page4Sree = false;
    $(document).ready(function () {
        //-----------------模拟点击执行时获取选中的好友id(全选)    data存放相关------------------
        $(".checkbox-toggle").click(function () {
            var clicks = $(this).attr('data');
            console.log(clicks)
            if (clicks == 1) {
                $(".mailbox-messages input[type='checkbox']").iCheck("uncheck");
                $(".fa", this).removeClass("fa-check-square-o").addClass('fa-square-o');
                $(this).attr('data', '0');
            } else {
                $(".mailbox-messages input[type='checkbox']").iCheck("check");
                $(".fa", this).removeClass("fa-square-o").addClass('fa-check-square-o');
                $(this).attr('data', '1');
            }

        });
    })
    //-----------------测试数据------------------
    $(function () {
        //------------------打标签--------------
        var tag3 = new Tag("tagValue3");
        tag3.tagValue = "";
        tag3.initView();
        //
        var tag4 = new Tag("tagValue4");
        tag4.tagValue = "";
        tag4.initView();
        // function openUpdate() {
        //     tag3.unDisableFun();
        // }
        //
        // function closeUpdate() {
        //     tag3.disableFun();
        // }

        $scope.page4One = 0
        $('.chose-on').click(function () {
            $('.page1-change-block-two1').css('display', 'none')
            $('.page1-change-block-two').css('display', 'none')
            $('.page1-change-block-sree').css('display', 'none')
            $scope.GroupNumJilu = 0
            $scope.jilukaka = 0
            $scope.jiluSree = 0
            /*----------批量分组开关-----------*/
            $scope.moreGiveGroup = false;
            /*----------单个好友分组开关-----------*/
            $scope.oneGiveGroup = false;
            /*----------单个好友打标签开关-----------*/
            $scope.oneTagFight = false;
            /*----------群发消息开关-----------*/
            $scope.sayGroup = false;
            /*----------批量打标签开关-----------*/
            $scope.allTagFightShow = false;
            /*----------好友交流记录开关-----------*/
            $scope.chatAll = false;
            /*----------好友基本资料开关-----------*/
            $scope.giveGroup = false;
            $scope.page4One++
            if ($scope.page4One % 2 == 0) {
                $('.page1-change-block').css('display', 'none')
            } else {
                $('.page1-change-block').css('display', 'block')

            }
        })
        $scope.jilukaka = 0
        $('.chose-two1').click(function () {
            $('.page1-change-block').css('display', 'none')
            $('.page1-change-block-two').css('display', 'none')
            $('.page1-change-block-sree').css('display', 'none')
            $scope.page4One = 0
            $scope.GroupNumJilu = 0
            $scope.jiluSree = 0
            $scope.moreGiveGroup = false;
            /*----------单个好友分组开关-----------*/
            $scope.oneGiveGroup = false;
            /*----------单个好友打标签开关-----------*/
            $scope.oneTagFight = false;
            /*----------群发消息开关-----------*/
            $scope.sayGroup = false;
            /*----------批量打标签开关-----------*/
            $scope.allTagFightShow = false;
            /*----------好友交流记录开关-----------*/
            $scope.chatAll = false;
            /*----------好友基本资料开关-----------*/
            $scope.giveGroup = false;
            $scope.jilukaka++
            if ($scope.jilukaka % 2 == 0) {
                $('.page1-change-block-two1').css('display', 'none')
                // $('.telephone1').css('display', 'none')

            } else {
                $('.page1-change-block-two1').css('display', 'block');


            }
        })

        /*--------------类似百度动态搜索标签-----------*/
        $('.tag-touch').bind('input propertychange', function () {

            var searchCon = $(this).val()
            if (searchCon == '') {
                var sendObjInit = new FormData();
                var allisChangeNo = $('.isChange')
                var allGroupChecked = $('.page5-group-group')
                var tagCheckIds = $('.tag-touch').attr('data');
                if (tagCheckIds == undefined) {
                    tagCheckIds = ''
                }
                var wechatArr = []
                var groupArr = []
                if (allisChangeNo.length > 0) {
                    for (var i = 0; i < allisChangeNo.length; i++) {
                        if (allisChangeNo[i].attributes[1].value == 1) {
                            wechatArr.push(allisChangeNo[i].attributes[4].value)
                        }
                    }
                    if (wechatArr.length > 0) {
                        sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                    } else {
                        sendObjInit.append('accountId', $scope.page5UserIdImportant);
                    }
                } else {

                }
                if (allGroupChecked.length > 0) {
                    for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                        if (allGroupChecked[i].attributes[1].value == 1) {
                            groupArr.push(allGroupChecked[i].attributes[4].value)
                        }
                    }
                    if (groupArr.length > 0) {
                        sendObjInit.append('groupIds', JSON.stringify(groupArr));
                    } else {
                        sendObjInit.append('groupIds', JSON.stringify([]));
                    }
                } else {
                }
                $http({
                    method: 'POST',
                    url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                    data: sendObjInit,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    //上传成功的操作
                    if (response.code == 200) {
                        $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                        $('.checkbox-toggle').attr('data', '0');
                        $scope.initData = response.data.chatrooms
                        $scope.initDatacontactCount = response.data.chatRoomCount
                        for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                            if ($scope.initData[i].chatRoomTags.length > 0) {
                                arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                    arrAllList.push(arrAllList1[i1])
                                }
                                $scope.initData[i].chatRoomTags = arrAllList
                                arrAllList = []
                                arrAllList1 = []
                            } else {
                            }
                        }
                        $('.M-box1').pagination({
                            totalData: $scope.initDatacontactCount,
                            showData: 10,
                            coping: true,
                            callback: function (api) {
                                $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                $('.checkbox-toggle').attr('data', '0');
                                var data = {
                                    page: api.getCurrent(),
                                };
                                var sendObjInit = new FormData();
                                var allisChangeNo = $('.isChange')
                                var allGroupChecked = $('.page5-group-group')
                                var tagCheckIds = $('.tag-touch').attr('data');
                                var wechatArr = []
                                var groupArr = []
                                if (tagCheckIds == undefined) {
                                    tagCheckIds = ''
                                }
                                if (allisChangeNo.length > 0) {
                                    for (var i = 0; i < allisChangeNo.length; i++) {
                                        if (allisChangeNo[i].attributes[1].value == 1) {
                                            wechatArr.push(allisChangeNo[i].attributes[4].value)
                                        }
                                    }
                                    if (wechatArr.length > 0) {
                                        sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                    } else {
                                        sendObjInit.append('accountId', $scope.page5UserIdImportant);
                                    }
                                } else {

                                }
                                if (allGroupChecked.length > 0) {
                                    for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                        if (allGroupChecked[i].attributes[1].value == 1) {
                                            groupArr.push(allGroupChecked[i].attributes[4].value)
                                        }
                                    }
                                    if (groupArr.length > 0) {
                                        sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                    } else {
                                        sendObjInit.append('groupIds', JSON.stringify([]));
                                    }
                                } else {
                                }
                                sendObjInit.append('tagId', tagCheckIds);
                                sendObjInit.append('page', data.page);
                                $http({
                                    method: 'POST',
                                    url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                                    data: sendObjInit,
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                }).success(function (response) {
                                    //上传成功的操作
                                    if (response.code == 200) {
                                        $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                        $('.checkbox-toggle').attr('data', '0');
                                        $scope.initData = response.data.chatrooms
                                        $scope.initDatacontactCount = response.data.chatRoomCount
                                        for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                            if ($scope.initData[i].chatRoomTags.length > 0) {
                                                arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                                for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                    arrAllList.push(arrAllList1[i1])
                                                }
                                                $scope.initData[i].chatRoomTags = arrAllList
                                                arrAllList = []
                                                arrAllList1 = []
                                            } else {
                                            }
                                        }
                                        setTimeout(function () {

                                            var allBlod = $('.blod')
                                            for (i = 0; i < allBlod.length; i++) {
                                                var pp = i
                                                if (allBlod[i].attributes[0].nodeValue == 1) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 2) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 3) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 4) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 5) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                                }
                                            }
                                            $('.mailbox-messages input[type="checkbox"]').iCheck({
                                                checkboxClass: 'icheckbox_flat-blue',
                                                radioClass: 'iradio_flat-blue'
                                            });
                                        }, 100)
                                    }
                                })
                            },

                        });

                        setTimeout(function () {
                            var allBlod = $('.blod')
                            for (i = 0; i < allBlod.length; i++) {
                                var pp = i
                                if (allBlod[i].attributes[0].nodeValue == 1) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 2) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 3) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 4) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 5) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                }
                            }
                            $('.mailbox-messages input[type="checkbox"]').iCheck({
                                checkboxClass: 'icheckbox_flat-blue',
                                radioClass: 'iradio_flat-blue'
                            });

                        }, 40)

                    } else {
                        $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或稍后再试');
                        setTimeout(function () {
                            $('.alert2').hide(300)
                        }, 2000)
                    }
                });
            } else {
                var tagSearch = new FormData();
                tagSearch.append('tagName', searchCon);
                $http({
                    method: 'POST',
                    url: $rootScope.link + '/gcsscrm/group/selectTagNameByLike',
                    data: tagSearch,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    //上传成功的操作
                    if (response.code == 200) {
                        $scope.tagSearchList = response.data.chatRoomTags;
                    } else {
                    }
                })
            }
        })
        /*--------------选择相关标签进行数据刷新-----------*/
        $(document).on('click', '.tag-touch-list li', function () {
            var targetTagId = $(this).attr('data')
            var targetTagName = $(this).attr('data1')
            $('.tag-touch').val(targetTagName)
            var sendObjInit = new FormData();
            var allisChangeNo = $('.isChange')
            var allGroupChecked = $('.page5-group-group')
            var wechatArr = []
            var groupArr = []
            if (allisChangeNo.length > 0) {
                for (var i = 0; i < allisChangeNo.length; i++) {
                    if (allisChangeNo[i].attributes[1].value == 1) {
                        wechatArr.push(allisChangeNo[i].attributes[4].value)
                    }
                }
                if (wechatArr.length > 0) {
                    sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                } else {
                    sendObjInit.append('accountId', $scope.page5UserIdImportant);
                }
            } else {

            }
            if (allGroupChecked.length > 0) {
                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                    if (allGroupChecked[i].attributes[1].value == 1) {
                        groupArr.push(allGroupChecked[i].attributes[4].value)
                    }
                }
                if (groupArr.length > 0) {
                    sendObjInit.append('groupIds', JSON.stringify(groupArr));
                } else {
                    sendObjInit.append('groupIds', JSON.stringify([]));
                }
            } else {
            }
            sendObjInit.append('tagId', targetTagId);
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                data: sendObjInit,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                    $('.checkbox-toggle').attr('data', '0');
                    $('.page1-change-block-two1').hide()
                    $scope.jilukaka = 0
                    $scope.initData = response.data.chatrooms
                    $scope.initDatacontactCount = response.data.chatRoomCount
                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                        if ($scope.initData[i].chatRoomTags.length > 0) {
                            arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                arrAllList.push(arrAllList1[i1])
                            }
                            $scope.initData[i].chatRoomTags = arrAllList
                            arrAllList = []
                            arrAllList1 = []
                        } else {
                        }
                    }
                    $('.M-box1').pagination({
                        totalData: $scope.initDatacontactCount,
                        showData: 10,
                        coping: true,
                        callback: function (api) {
                            $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                            $('.checkbox-toggle').attr('data', '0');
                            var data = {
                                page: api.getCurrent(),
                            };
                            var sendObjInit = new FormData();
                            var allisChangeNo = $('.isChange')
                            var allGroupChecked = $('.page5-group-group')
                            var tagCheckIds = $('.tag-touch').attr('data');
                            var wechatArr = []
                            var groupArr = []
                            if (tagCheckIds == undefined) {
                                tagCheckIds = ''
                            }
                            if (allisChangeNo.length > 0) {
                                for (var i = 0; i < allisChangeNo.length; i++) {
                                    if (allisChangeNo[i].attributes[1].value == 1) {
                                        wechatArr.push(allisChangeNo[i].attributes[4].value)
                                    }
                                }
                                if (wechatArr.length > 0) {
                                    sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                } else {
                                    sendObjInit.append('accountId', $scope.page5UserIdImportant);
                                }
                            } else {

                            }
                            if (allGroupChecked.length > 0) {
                                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                    if (allGroupChecked[i].attributes[1].value == 1) {
                                        groupArr.push(allGroupChecked[i].attributes[4].value)
                                    }
                                }
                                if (groupArr.length > 0) {
                                    sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                } else {
                                    sendObjInit.append('groupIds', JSON.stringify([]));
                                }
                            } else {
                            }
                            sendObjInit.append('tagId', tagCheckIds);
                            sendObjInit.append('page', data.page);
                            $http({
                                method: 'POST',
                                url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                                data: sendObjInit,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                //上传成功的操作
                                if (response.code == 200) {
                                    $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                    $('.checkbox-toggle').attr('data', '0');
                                    $scope.initData = response.data.chatrooms
                                    $scope.initDatacontactCount = response.data.chatRoomCount
                                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                        if ($scope.initData[i].chatRoomTags.length > 0) {
                                            arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                arrAllList.push(arrAllList1[i1])
                                            }
                                            $scope.initData[i].chatRoomTags = arrAllList
                                            arrAllList = []
                                            arrAllList1 = []
                                        } else {
                                        }
                                    }
                                    setTimeout(function () {

                                        var allBlod = $('.blod')
                                        for (i = 0; i < allBlod.length; i++) {
                                            var pp = i
                                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                            }
                                        }
                                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                                            checkboxClass: 'icheckbox_flat-blue',
                                            radioClass: 'iradio_flat-blue'
                                        });
                                    }, 100)
                                }
                            })
                        },

                    });
                    setTimeout(function () {

                        var allBlod = $('.blod')
                        for (i = 0; i < allBlod.length; i++) {
                            var pp = i
                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                            }
                        }
                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });
                    }, 100)
                } else {
                    $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或稍后再试');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
        })
        $scope.GroupNumJilu = 0
        $('.chose-two').click(function () {
            $('.page1-change-block').css('display', 'none')
            $('.page1-change-block-two1').css('display', 'none')
            $('.page1-change-block-sree').css('display', 'none')
            $scope.page4One = 0
            $scope.jilukaka = 0
            $scope.jiluSree = 0
            /*----------批量分组开关-----------*/
            $scope.moreGiveGroup = false;
            /*----------单个好友分组开关-----------*/
            $scope.oneGiveGroup = false;
            /*----------单个好友打标签开关-----------*/
            $scope.oneTagFight = false;
            /*----------群发消息开关-----------*/
            $scope.sayGroup = false;
            /*----------批量打标签开关-----------*/
            $scope.allTagFightShow = false;
            /*----------好友交流记录开关-----------*/
            $scope.chatAll = false;
            /*----------好友基本资料开关-----------*/
            $scope.giveGroup = false;
            $scope.GroupNumJilu++
            if ($scope.GroupNumJilu % 2 == 0) {
                $('.page1-change-block-two').css('display', 'none')
                $('.telephone').css('display', 'none')

            } else {
                $('.page1-change-block-two').css('display', 'block');


            }
        })
        $scope.jiluSree = 0
        $('.chose-sree').click(function () {

            $('.page1-change-block').css('display', 'none')
            $('.page1-change-block-two1').css('display', 'none')
            $('.page1-change-block-two').css('display', 'none')
            $scope.page4One = 0
            $scope.GroupNumJilu = 0
            $scope.jilukaka = 0
            $scope.jiluSree++
            if ($scope.jiluSree % 2 == 0) {
                $('.page1-change-block-sree').css('display', 'none')


            } else {
                $('.page1-change-block-sree').css('display', 'block')

            }
        })
        $scope.jiluFour = 0
        $('.chose-four').click(function () {
            $scope.jiluFour++
            if ($scope.jiluFour % 2 == 0) {
                $('.page1-change-block-four').css('display', 'none')


            } else {
                $('.page1-change-block-four').css('display', 'block')

            }
        })
        //----------------选择微信单个点击---------------
        $scope.page5Click = function (e) {
            if ($('.page5-wechat-check')[e].attributes[1].value == 0) {
                $('.page5-wechat-check').eq(e).prev().addClass('on')
                $('.page5-wechat-check')[e].attributes[1].value = 1
            } else {
                $('.page5-wechat-check').eq(e).prev().removeClass('on')
                $('.page5-wechat-check')[e].attributes[1].value = 0
            }
        }
        //----------------选择分组单个点击---------------
        $scope.page5Click2 = function (e) {
            if ($('.page4-group-group')[e].attributes[1].value == 0) {
                $('.page4-group-group').eq(e).prev().addClass('on')
                $('.page4-group-group')[e].attributes[1].value = 1
            } else {
                $('.page4-group-group').eq(e).prev().removeClass('on')
                $('.page4-group-group')[e].attributes[1].value = 0
            }
        }


        //----------------选择标签单个点击---------------
        $(document).on('click', '.page4-checkbox-One-one', function () {
            var myData1 = $(this).attr('data1')
            var myData2 = $(this).attr('data2')
            if ($(this).attr('data') == 0) {
                $(this).prev().addClass('on')
                $(this).attr('data', '1')
                $scope.data1[myData2][myData1].state = 1
            } else {
                $(this).prev().removeClass('on')
                $(this).attr('data', '0')
                $scope.data1[myData2][myData1].state = 0
            }
        });


        //-----------全选设备逻辑-----------
        $('.checkAllTelephone').click(function () {
                jilu = 0
                $('.checkbox-toggle-change').prev().removeClass('on');
                var importValue = $(this).attr('data')
                var allisChange = $('.isChange')
                if (importValue == 0) {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 1
                        $('.isChange').eq(i).prev().addClass('on')
                    }
                    $(this).attr('data', '1').prev().addClass('on')
                }
                else {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 0
                        $('.isChange').eq(i).prev().removeClass('on')
                    }
                    $(this).attr('data', '0').prev().removeClass('on')
                }
            }
        )
        //-----------全选分组逻辑-----------
        $('.page4-group-checkall').click(function () {
                jilu1 = 0
                $('.page4-group-checkall-change').prev().removeClass('on');
                var importValue = $(this).attr('data')
                var allisChange = $('.page4-isChange')
                if (importValue == 0) {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 1
                        $('.page4-isChange').prev().addClass('on')
                    }
                    $(this).attr('data', '1').prev().addClass('on');
                }
                else {
                    for (var i = 0; i < allisChange.length; i++) {
                        allisChange[i].attributes[1].value = 0
                        $('.page4-isChange').prev().removeClass('on')
                    }
                    $(this).attr('data', '0').prev().removeClass('on')
                }
            }
        )
        var jilu = 0
        //------------------反选设备逻辑--------------------
        $('.checkbox-toggle-change').click(function () {
            jilu++
            if (jilu % 2 == 0) {
                $(this).prev().removeClass('on')
                $(this).attr('data', '0')
            } else {
                $(this).prev().addClass('on')
                $(this).attr('data', '1')
            }
            $('.checkAllTelephone').attr('data', '0').prev().removeClass('on');
            var allisChangeNo = $('.isChange')
            for (var i = 0; i < allisChangeNo.length; i++) {
                if (allisChangeNo[i].attributes[1].value == 0) {
                    $('.isChange').eq(i).prev().addClass('on');
                    allisChangeNo[i].attributes[1].value = 1
                } else {
                    $('.isChange').eq(i).prev().removeClass('on');
                    allisChangeNo[i].attributes[1].value = 0
                }
            }
        });
        //------------------反选分组逻辑--------------------
        var jilu1 = 0
        $('.page4-group-checkall-change').click(function () {
            jilu1++
            if (jilu1 % 2 == 0) {
                $(this).prev().removeClass('on')
                $(this).attr('data', '0')
            } else {
                $(this).prev().addClass('on')
                $(this).attr('data', '1')
            }
            $('.page4-group-checkall').attr('data', '0').prev().removeClass('on');
            var page4Grou = $('.page4-group-group')
            var allisChange = $('.page4-isChange')
            for (var i = 0; i < allisChange.length; i++) {
                if (allisChange[i].attributes[1].value == 1) {
                    allisChange[i].attributes[1].value = 0
                    $('.page4-isChange').eq(i).prev().removeClass('on')
                } else {
                    allisChange[i].attributes[1].value = 1
                    $('.page4-isChange').eq(i).prev().addClass('on')
                }

            }
        });

    })
    $scope.importantWechatIds = ''
    /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-----选择微信号后切换当前数据-----！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！*/
    $scope.page4WechatsendMsg = function () {
        var allisChangeNo = $('.isChange')
        for (var arr = [], i = 0; i < allisChangeNo.length; i++) {
            if (allisChangeNo[i].attributes[1].value == 1) {
                arr.push(allisChangeNo[i].attributes[4].value)
            }
        }
        if (arr.length == 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择相关微信号');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var changeWechat = new FormData();
            var allisChangeNo = $('.isChange')
            var allGroupChecked = $('.page5-group-group')
            var tagCheckIds = $('.tag-touch').attr('data');
            var wechatArr = []
            var groupArr = []
            if (tagCheckIds == undefined) {
                tagCheckIds = ''
            }
            if (allGroupChecked.length > 0) {
                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                    if (allGroupChecked[i].attributes[1].value == 1) {
                        groupArr.push(allGroupChecked[i].attributes[4].value)
                    }
                }
                if (groupArr.length > 0) {
                    changeWechat.append('groupIds', JSON.stringify(groupArr));
                } else {
                    changeWechat.append('groupIds', JSON.stringify([]));
                }
            } else {
            }
            changeWechat.append('tagId', tagCheckIds);
            changeWechat.append('weChatIds', JSON.stringify(arr));
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                data: changeWechat,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                $scope.importantWechatIds = arr
                if (response.code == 200) {
                    $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                    $('.checkbox-toggle').attr('data', '0');
                    $scope.page2Wechats = [];
                    $scope.page2Wechats = arr;
                    $('.page1-change-block').css('display', 'none')
                    $scope.page4One = 0
                    $scope.initData = [];
                    $scope.initData = response.data.chatrooms
                    $scope.initDatacontactCount = response.data.chatRoomCount
                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                        if ($scope.initData[i].chatRoomTags.length > 0) {
                            arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                arrAllList.push(arrAllList1[i1])
                            }
                            $scope.initData[i].chatRoomTags = arrAllList
                            arrAllList = []
                            arrAllList1 = []
                        } else {
                        }
                    }

                    $('.M-box1').pagination({
                        totalData: $scope.initDatacontactCount,
                        showData: 10,
                        coping: true,
                        callback: function (api) {
                            $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                            $('.checkbox-toggle').attr('data', '0');
                            var data = {
                                page: api.getCurrent(),
                            };
                            var changeWechat = new FormData();


                            var allisChangeNo = $('.isChange')
                            var allGroupChecked = $('.page5-group-group')
                            var tagCheckIds = $('.tag-touch').attr('data');
                            var wechatArr = []
                            var groupArr = []
                            if (tagCheckIds == undefined) {
                                tagCheckIds = ''
                            }
                            if (allisChangeNo.length > 0) {
                                for (var i = 0; i < allisChangeNo.length; i++) {
                                    if (allisChangeNo[i].attributes[1].value == 1) {
                                        wechatArr.push(allisChangeNo[i].attributes[4].value)
                                    }
                                }
                                if (wechatArr.length > 0) {
                                    changeWechat.append('weChatIds', JSON.stringify(wechatArr));
                                } else {
                                    changeWechat.append('accountId', $scope.page5UserIdImportant);
                                }
                            } else {

                            }
                            if (allGroupChecked.length > 0) {
                                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                    if (allGroupChecked[i].attributes[1].value == 1) {
                                        groupArr.push(allGroupChecked[i].attributes[4].value)
                                    }
                                }
                                if (groupArr.length > 0) {
                                    changeWechat.append('groupIds', JSON.stringify(groupArr));
                                } else {
                                    changeWechat.append('groupIds', JSON.stringify([]));
                                }
                            } else {
                            }
                            changeWechat.append('tagId', tagCheckIds);
                            changeWechat.append('page', data.page);
                            $http({
                                method: 'POST',
                                url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                                data: changeWechat,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                $('.checkbox-toggle').attr('data', '0');
                                //上传成功的操作
                                if (response.code == 200) {
                                    $scope.page2Wechats = [];
                                    $scope.page2Wechats = arr;
                                    $('.page1-change-block').css('display', 'none')
                                    $scope.page4One = 0
                                    $scope.initData = [];
                                    $scope.initData = response.data.chatrooms
                                    $scope.initDatacontactCount = response.data.chatRoomCount
                                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                        if ($scope.initData[i].chatRoomTags.length > 0) {
                                            arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                arrAllList.push(arrAllList1[i1])
                                            }
                                            $scope.initData[i].chatRoomTags = arrAllList
                                            arrAllList = []
                                            arrAllList1 = []
                                        } else {
                                        }
                                    }
                                    setTimeout(function () {

                                        var allBlod = $('.blod')
                                        for (i = 0; i < allBlod.length; i++) {
                                            var pp = i
                                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                            }
                                        }
                                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                                            checkboxClass: 'icheckbox_flat-blue',
                                            radioClass: 'iradio_flat-blue'
                                        });
                                    }, 100)
                                }
                            })
                        },

                    });


                    setTimeout(function () {
                        var allBlod = $('.blod')
                        for (i = 0; i < allBlod.length; i++) {
                            var pp = i
                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                            }
                        }
                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });
                        $('#example2').DataTable({
                            // 'paging'      : true,
                            // 'lengthChange': false,
                            // 'searching'   : false,
                            'bDestroy': true,
                            'ordering': false,
                            'bInfo': false,
                            "aLengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
                            // "aLengthMenu": [[5, 10, 15, -1], [5, 10, 15, "显示所有"]],
                            // 'autoWidth'   : false
                        })

                    }, 40)
                } else {
                    $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或再次登陆');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
        }
    }
    /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-----选择分组后切换当前数据-----！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！*/
    $scope.page4GroupsendMsg = function () {

        if ($('.checkbox-toggle').data('clicks') == undefined) {

        } else {
            $('.checkbox-toggle').data('clicks', 'false')
        }
        console.log($('.checkbox-toggle').data('clicks'))
        var allGroupChecked = $('.page5-group-group')
        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
            if (allGroupChecked[i].attributes.data1.value == 1) {
                arr1.push(allGroupChecked[i].attributes.data.value)
            }
        }
        if (arr1.length == 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择相关分组');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            $('.page1-change-block-two').css('display', 'none')
            $scope.GroupNumJilu = 0
            var changeWechat = new FormData();


            var allisChangeNo = $('.isChange')
            var allGroupChecked = $('.page5-group-group')
            var tagCheckIds = $('.tag-touch').attr('data');
            var wechatArr = []
            var groupArr = []
            if (tagCheckIds == undefined) {
                tagCheckIds = ''
            }
            if (allisChangeNo.length > 0) {
                for (var i = 0; i < allisChangeNo.length; i++) {
                    if (allisChangeNo[i].attributes[1].value == 1) {
                        wechatArr.push(allisChangeNo[i].attributes[4].value)
                    }
                }
                if (wechatArr.length > 0) {
                    changeWechat.append('weChatIds', JSON.stringify(wechatArr));
                } else {
                    changeWechat.append('accountId', $scope.page5UserIdImportant);
                }
            } else {

            }
            if (allGroupChecked.length > 0) {
                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                    if (allGroupChecked[i].attributes[1].value == 1) {
                        groupArr.push(allGroupChecked[i].attributes[4].value)
                    }
                }
                if (groupArr.length > 0) {
                    changeWechat.append('groupIds', JSON.stringify(groupArr));
                } else {
                    changeWechat.append('groupIds', JSON.stringify([]));
                }
            } else {
            }
            changeWechat.append('tagId', tagCheckIds);
            $scope.allGroupChecks = arr1;
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                data: changeWechat,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                    $('.checkbox-toggle').attr('data', '0');
                    $('.page1-change-block-two').css('display', 'none');
                    $('.telephone').css('display', 'none')
                    $scope.GroupNumJilu = 0
                    $scope.initData = response.data.chatrooms;
                    $scope.initDatacontactCount = response.data.chatRoomCount
                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                        if ($scope.initData[i].chatRoomTags.length > 0) {
                            arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                arrAllList.push(arrAllList1[i1])
                            }
                            $scope.initData[i].chatRoomTags = arrAllList
                            arrAllList = []
                            arrAllList1 = []
                        } else {
                        }
                    }
                    $('.M-box1').pagination({
                        totalData: $scope.initDatacontactCount,
                        showData: 10,
                        coping: true,
                        callback: function (api) {
                            $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                            $('.checkbox-toggle').attr('data', '0');
                            var data = {
                                page: api.getCurrent(),
                            };
                            var changeWechat = new FormData();
                            var allisChangeNo = $('.isChange')
                            var allGroupChecked = $('.page5-group-group')
                            var tagCheckIds = $('.tag-touch').attr('data');
                            var wechatArr = []
                            var groupArr = []
                            if (tagCheckIds == undefined) {
                                tagCheckIds = ''
                            }
                            if (allisChangeNo.length > 0) {
                                for (var i = 0; i < allisChangeNo.length; i++) {
                                    if (allisChangeNo[i].attributes[1].value == 1) {
                                        wechatArr.push(allisChangeNo[i].attributes[4].value)
                                    }
                                }
                                if (wechatArr.length > 0) {
                                    changeWechat.append('weChatIds', JSON.stringify(wechatArr));
                                } else {
                                    changeWechat.append('accountId', $scope.page5UserIdImportant);
                                }
                            } else {

                            }
                            if (allGroupChecked.length > 0) {
                                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                    if (allGroupChecked[i].attributes[1].value == 1) {
                                        groupArr.push(allGroupChecked[i].attributes[4].value)
                                    }
                                }
                                if (groupArr.length > 0) {
                                    changeWechat.append('groupIds', JSON.stringify(groupArr));
                                } else {
                                    changeWechat.append('groupIds', JSON.stringify([]));
                                }
                            } else {
                            }
                            changeWechat.append('tagId', tagCheckIds);
                            changeWechat.append('page', data.page);
                            $scope.allGroupChecks = arr1;
                            $http({
                                method: 'POST',
                                url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                                data: changeWechat,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                $('.checkbox-toggle').attr('data', '0');
                                //上传成功的操作
                                if (response.code == 200) {
                                    $scope.initData = response.data.chatrooms;
                                    $scope.initDatacontactCount = response.data.chatRoomCount
                                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                        if ($scope.initData[i].chatRoomTags.length > 0) {
                                            arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                arrAllList.push(arrAllList1[i1])
                                            }
                                            $scope.initData[i].chatRoomTags = arrAllList
                                            arrAllList = []
                                            arrAllList1 = []
                                        } else {
                                        }
                                    }
                                    setTimeout(function () {

                                        var allBlod = $('.blod')
                                        for (i = 0; i < allBlod.length; i++) {
                                            var pp = i
                                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                            }
                                        }
                                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                                            checkboxClass: 'icheckbox_flat-blue',
                                            radioClass: 'iradio_flat-blue'
                                        });
                                    }, 100)
                                }

                            })
                        },

                    });

                    setTimeout(function () {
                        var allBlod = $('.blod')
                        for (i = 0; i < allBlod.length; i++) {
                            var pp = i
                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                            }
                        }
                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });
                    }, 40)
                } else {
                    $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或再次登陆');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
        }
    }
    //---------------好友详情界面-------------
    $scope.giveGroup = false;
    //---------------好友沟通记录界面-------------
    $scope.chatAll = false;
    //----------------点击关闭基本资料详情页------------------
    $scope.page4closMsg = function () {
        $scope.giveGroup = false;
    }
    //----------------------------------------------------------------------点击头像打开基本资料详情页------------------

    $scope.page4trueShow = function (x) {
        $('.page1-change-block').css('display', 'none')
        $('.page1-change-block-two1').css('display', 'none')
        $('.page1-change-block-two').css('display', 'none')
        $('.page1-change-block-sree').css('display', 'none')

        $scope.page4One = 0
        $scope.GroupNumJilu = 0
        $scope.jilukaka = 0
        $scope.jiluSree = 0
        /*----------批量分组开关-----------*/
        $scope.moreGiveGroup = false;
        /*----------单个好友分组开关-----------*/
        $scope.oneGiveGroup = false;
        /*----------单个好友打标签开关-----------*/
        $scope.oneTagFight = false;
        /*----------群发消息开关-----------*/
        $scope.sayGroup = false;
        /*----------批量打标签开关-----------*/
        $scope.allTagFightShow = false;
        /*----------好友交流记录开关-----------*/
        $scope.chatAll = false;
        var mmphahha = new FormData()
        mmphahha.append('chatRoomId', x);
        $http({
            method: 'POST',
            url: $rootScope.link + '/gcsscrm/group/getChatRoomMsgById',
            data: mmphahha,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            //上传成功的操作
            if (response.code == 200) {
                /*----------好友基本资料开关-----------*/
                $scope.giveGroup = true;
                $scope.moreGroupAll = response.data.chatroommembers
                $scope.moreGroupchatRoomProfilePhoto = response.data.chatRoomProfilePhoto
                $scope.moreGroupchatroomname = response.data.chatroomname
                $scope.moreGroupdevicenumber = response.data.wechat.device.devicenumber
                $scope.moreGroupwechatnickname = response.data.wechat.wechatnickname
                // setTimeout(function () {
                //     $('#example3').DataTable({
                //         // 'paging'      : true,
                //         // 'lengthChange': false,
                //         // 'searching'   : false,
                //         // "processing": true,
                //         // "serverSide": true,
                //         'ordering': false,
                //         'bDestroy': true,
                //         // 'bRetrieve': true,
                //         "aLengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
                //         'paging': true,
                //         'bInfo': false,
                //         // "aLengthMenu": [[5, 10, 15, -1], [5, 10, 15, "显示所有"]],
                //         // 'autoWidth'   : false
                //     })
                // }, 300)
            } else {
                $('.alert2').show(300).find('.alertCon').html('数据加载失败，请刷新页面或再次登陆');
                setTimeout(function () {
                    $('.alert2').hide(300)
                }, 2000)
            }
        })
    }
    //----------------点击提交详情页更改信息------------------
    $scope.page4sendMsg = function () {

    }
    //----------------点击关闭沟通记录详情页------------------
    $scope.page4ChatClosMsg = function () {
        $scope.chatAll = false;
    }
    //----------------点击打开沟通记录详情页------------------
    $scope.page4ChatOpenMsg = function () {
        /*----------批量分组开关-----------*/
        $scope.moreGiveGroup = false;
        /*----------单个好友分组开关-----------*/
        $scope.oneGiveGroup = false;
        /*----------单个好友打标签开关-----------*/
        $scope.oneTagFight = false;
        /*----------群发消息开关-----------*/
        $scope.sayGroup = false;
        /*----------批量打标签开关-----------*/
        $scope.allTagFightShow = false;
        /*----------好友交流记录开关-----------*/
        $scope.chatAll = true;
        /*----------好友基本资料开关-----------*/
        $scope.giveGroup = false;
    }
    $scope.allTagFightShow = false;
    //--------------------------------------------------------------------------点击打开批量打标签界面-----------------------------------------
    $scope.allchecks2 = [];
    $scope.allTagFightShowMe = function () {
        var allCheckData = $('.checkData')
        var allCheck = $('.icheckbox_flat-blue')
        for (i2 = 0; i2 < allCheck.length; i2++) {
            var pp = i2
            if (allCheck[i2].attributes[1].value == 'true') {
                $scope.allchecks2.push(Number(allCheckData.eq(i2).attr('data')))
                console.log($scope.allchecks2)
            }
        }
        if ($scope.allchecks2.length <= 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择需要进行批量打标签的群组');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            /*----------批量分组开关-----------*/
            $scope.moreGiveGroup = false;
            /*----------单个好友分组开关-----------*/
            $scope.oneGiveGroup = false;
            /*----------单个好友打标签开关-----------*/
            $scope.oneTagFight = false;
            /*----------群发消息开关-----------*/
            $scope.sayGroup = false;
            /*----------批量打标签开关-----------*/
            $scope.allTagFightShow = true;
            /*----------好友交流记录开关-----------*/
            $scope.chatAll = false;
            /*----------好友基本资料开关-----------*/
            $scope.giveGroup = false;
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/group/getTheTopTenTag',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $scope.recommendTag = response.data.tagList
                    $('.page1-change-block-sree').css('display', 'none');
                    $scope.jiluSree = 0
                    $scope.allchecks2 = [];
                } else {
                    $('.alert2').show(300).find('.alertCon').html('参考标签数据加载失败，请刷新页面或再次登陆');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
        }
    }
    //----------------点击关闭批量打标签界面------------------
    $scope.page4allTagFightClosMsg = function () {
        $scope.allTagFightShow = false;
        $scope.addTagShowMe = false;
    }
    //-------------------------------------------------------------------点击提交批量打标签-----------------------------------------------------
    $scope.allchecks3 = [];
    $scope.page4allTagFightSendMsg = function () {
        var allCheckData = $('.checkData')
        var allCheck = $('.icheckbox_flat-blue')
        for (i2 = 0; i2 < allCheck.length; i2++) {
            var pp = i2
            if (allCheck[i2].attributes[1].value == 'true') {
                $scope.allchecks3.push(Number(allCheckData.eq(i2).attr('data')))
            }
        }
        if ($scope.allchecks3.length <= 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择需要进行批量打标签的群组');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
            return
        } else if ($('.page5-addTag1>.tagsContaine>.tagList ')[0].children.length == 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择或输入标签名');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var alltagItems = $('.tagItem1');
            for (var tagid = [], tagcon = [], i = 0; i < alltagItems.length; i++) {
                tagid.push(alltagItems[i].attributes.id.value);
                tagcon.push(alltagItems[i].innerText)
            }
            $('.tagList').html('')
            var sendObAllTags = new FormData();
            sendObAllTags.append('tagNames', JSON.stringify(tagcon));
            sendObAllTags.append(' tagIds', JSON.stringify(tagid));
            sendObAllTags.append('chatRoomIds', JSON.stringify($scope.allchecks3));
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/group/addTaging',
                data: sendObAllTags,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                    $('.checkbox-toggle').attr('data', '0');
                    // $scope.initData = response.data.contactList
                    // $scope.initGroup = response.data.groupsList
                    $scope.allchecks3 = [];
                    var sendObjInit = new FormData();
                    var allisChangeNo = $('.isChange')
                    var allGroupChecked = $('.page5-group-group')
                    var tagCheckIds = $('.tag-touch').attr('data');
                    var wechatArr = []
                    var groupArr = []
                    if (tagCheckIds == undefined) {
                        tagCheckIds = ''
                    }
                    if (allisChangeNo.length > 0) {
                        for (var i = 0; i < allisChangeNo.length; i++) {
                            if (allisChangeNo[i].attributes[1].value == 1) {
                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                            }
                        }
                        if (wechatArr.length > 0) {
                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                        } else {
                            sendObjInit.append('accountId', $scope.page5UserIdImportant);
                        }
                    } else {

                    }
                    if (allGroupChecked.length > 0) {
                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                            if (allGroupChecked[i].attributes[1].value == 1) {
                                groupArr.push(allGroupChecked[i].attributes[4].value)
                            }
                        }
                        if (groupArr.length > 0) {
                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                        } else {
                            sendObjInit.append('groupIds', JSON.stringify([]));
                        }
                    } else {
                    }
                    sendObjInit.append('tagId', tagCheckIds);
                    $http({
                        method: 'POST',
                        url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                        data: sendObjInit,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        //上传成功的操作
                        if (response.code == 200) {
                            $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                            $('.checkbox-toggle').attr('data', '0');
                            $scope.initData = response.data.chatrooms
                            $scope.initDatacontactCount = response.data.chatRoomCount
                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                if ($scope.initData[i].chatRoomTags.length > 0) {
                                    arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                        arrAllList.push(arrAllList1[i1])
                                    }
                                    $scope.initData[i].chatRoomTags = arrAllList
                                    arrAllList = []
                                    arrAllList1 = []
                                }
                                else {
                                }
                            }
                            $('.M-box1').pagination({
                                totalData: $scope.initDatacontactCount,
                                showData: 10,
                                coping: true,
                                callback: function (api) {
                                    $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                    $('.checkbox-toggle').attr('data', '0');
                                    var data = {
                                        page: api.getCurrent(),
                                    };
                                    var sendObjInit = new FormData();
                                    var allisChangeNo = $('.isChange')
                                    var allGroupChecked = $('.page5-group-group')
                                    var tagCheckIds = $('.tag-touch').attr('data');
                                    var wechatArr = []
                                    var groupArr = []
                                    if (tagCheckIds == undefined) {
                                        tagCheckIds = ''
                                    }
                                    if (allisChangeNo.length > 0) {
                                        for (var i = 0; i < allisChangeNo.length; i++) {
                                            if (allisChangeNo[i].attributes[1].value == 1) {
                                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                                            }
                                        }
                                        if (wechatArr.length > 0) {
                                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                        } else {
                                            sendObjInit.append('accountId', $scope.page5UserIdImportant);
                                        }
                                    } else {

                                    }
                                    if (allGroupChecked.length > 0) {
                                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                            if (allGroupChecked[i].attributes[1].value == 1) {
                                                groupArr.push(allGroupChecked[i].attributes[4].value)
                                            }
                                        }
                                        if (groupArr.length > 0) {
                                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                        } else {
                                            sendObjInit.append('groupIds', JSON.stringify([]));
                                        }
                                    } else {
                                    }
                                    sendObjInit.append('tagId', tagCheckIds);


                                    sendObjInit.append('page', data.page);
                                    $http({
                                        method: 'POST',
                                        url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                                        data: sendObjInit,
                                        headers: {'Content-Type': undefined},
                                        transformRequest: angular.identity
                                    }).success(function (response) {
                                        //上传成功的操作
                                        if (response.code == 200) {
                                            $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                            $('.checkbox-toggle').attr('data', '0');
                                            $scope.initData = response.data.chatrooms
                                            $scope.initDatacontactCount = response.data.chatRoomCount
                                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                                if ($scope.initData[i].chatRoomTags.length > 0) {
                                                    arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                        arrAllList.push(arrAllList1[i1])
                                                    }
                                                    $scope.initData[i].chatRoomTags = arrAllList
                                                    arrAllList = []
                                                    arrAllList1 = []
                                                }
                                                else {
                                                }
                                            }
                                            setTimeout(function () {

                                                var allBlod = $('.blod')
                                                for (i = 0; i < allBlod.length; i++) {
                                                    var pp = i
                                                    if (allBlod[i].attributes[0].nodeValue == 1) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 2) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 3) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 4) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 5) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                                    }
                                                }
                                                $('.mailbox-messages input[type="checkbox"]').iCheck({
                                                    checkboxClass: 'icheckbox_flat-blue',
                                                    radioClass: 'iradio_flat-blue'
                                                });
                                            }, 100)
                                        }
                                    })
                                },

                            });
                            setTimeout(function () {
                                var allBlod = $('.blod')
                                for (i = 0; i < allBlod.length; i++) {
                                    var pp = i
                                    if (allBlod[i].attributes[0].nodeValue == 1) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 2) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 3) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 4) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 5) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                    }
                                }
                                $('.mailbox-messages input[type="checkbox"]').iCheck({
                                    checkboxClass: 'icheckbox_flat-blue',
                                    radioClass: 'iradio_flat-blue'
                                });

                            }, 40)
                            $scope.allTagFightShow = false;
                            $scope.addTagShowMe = false;
                            $('.tagList').html('')
                            $('.alert1').show(300).find('.alertCon').html('批量打标签保存成功');
                            setTimeout(function () {
                                $('.alert1').hide(300)
                            }, 2000)
                        } else {
                            $('.alert2').show(300).find('.alertCon').html('标签保存失败，请刷新页面或稍后再试');
                            setTimeout(function () {
                                $('.alert2').hide(300)
                            }, 2000)
                        }
                    });
                } else if (response.code == 202) {
                    $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                    $('.checkbox-toggle').attr('data', '0');
                    $scope.initData = response.data.chatrooms
                    $scope.initDatacontactCount = response.data.chatRoomCount
                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                        if ($scope.initData[i].chatRoomTags.length > 0) {
                            arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                arrAllList.push(arrAllList1[i1])
                            }
                            $scope.initData[i].chatRoomTags = arrAllList
                            arrAllList = []
                            arrAllList1 = []
                        }
                        else {
                        }
                    }
                    $('.M-box1').pagination({
                        totalData: $scope.initDatacontactCount,
                        showData: 10,
                        coping: true,
                        callback: function (api) {
                            $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                            $('.checkbox-toggle').attr('data', '0');
                            var data = {
                                page: api.getCurrent(),
                            };
                            var sendObjInit = new FormData();
                            var allisChangeNo = $('.isChange')
                            var allGroupChecked = $('.page5-group-group')
                            var tagCheckIds = $('.tag-touch').attr('data');
                            var wechatArr = []
                            var groupArr = []
                            if (tagCheckIds == undefined) {
                                tagCheckIds = ''
                            }
                            if (allisChangeNo.length > 0) {
                                for (var i = 0; i < allisChangeNo.length; i++) {
                                    if (allisChangeNo[i].attributes[1].value == 1) {
                                        wechatArr.push(allisChangeNo[i].attributes[4].value)
                                    }
                                }
                                if (wechatArr.length > 0) {
                                    sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                } else {
                                    sendObjInit.append('accountId', $scope.page5UserIdImportant);
                                }
                            } else {

                            }
                            if (allGroupChecked.length > 0) {
                                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                    if (allGroupChecked[i].attributes[1].value == 1) {
                                        groupArr.push(allGroupChecked[i].attributes[4].value)
                                    }
                                }
                                if (groupArr.length > 0) {
                                    sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                } else {
                                    sendObjInit.append('groupIds', JSON.stringify([]));
                                }
                            } else {
                            }
                            sendObjInit.append('tagId', tagCheckIds);


                            sendObjInit.append('page', data.page);
                            $http({
                                method: 'POST',
                                url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                                data: sendObjInit,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                //上传成功的操作
                                if (response.code == 200) {
                                    $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                    $('.checkbox-toggle').attr('data', '0');
                                    $scope.initData = response.data.chatrooms
                                    $scope.initDatacontactCount = response.data.chatRoomCount
                                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                        if ($scope.initData[i].chatRoomTags.length > 0) {
                                            arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                arrAllList.push(arrAllList1[i1])
                                            }
                                            $scope.initData[i].chatRoomTags = arrAllList
                                            arrAllList = []
                                            arrAllList1 = []
                                        }
                                        else {
                                        }
                                    }
                                    setTimeout(function () {

                                        var allBlod = $('.blod')
                                        for (i = 0; i < allBlod.length; i++) {
                                            var pp = i
                                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                            }
                                        }
                                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                                            checkboxClass: 'icheckbox_flat-blue',
                                            radioClass: 'iradio_flat-blue'
                                        });
                                    }, 100)
                                }
                            })
                        },

                    });
                    setTimeout(function () {
                        var allBlod = $('.blod')
                        for (i = 0; i < allBlod.length; i++) {
                            var pp = i
                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                            }
                        }
                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });

                    }, 40)
                    $scope.allTagFightShow = false;
                    $scope.addTagShowMe = false;
                    $('.tagList').html('')
                    $('.alert1').show(300).find('.alertCon').html('批量打标签保存成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                } else if (response.code == 201) {
                    $('.alert2').show(300).find('.alertCon').html('您输入的标签已经全部存在，请再次输入');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                } else {
                    $('.alert2').show(300).find('.alertCon').html('标签保存失败，请刷新页面或稍后再试');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
        }
    }
    /*---------------点击参考标签加入到新增标签----------------*/
    $scope.clickAddTag = function (e, q) {
        var appendThis = '                      <div class="tagItem tagItem1" id=' + e + '>\n' +
            '                            <span>' + q + '</span>\n' +
            '                            <div class="delete delete1"></div>\n' +
            '                        </div>'
        $('.newTagappend .tagsContaine .tagList').append(appendThis)
    }
    /*--------------------删除加入的标签---------------------*/
    $(document).on('click', '.delete1', function () {
        $(this).parent().remove()
    })
    $scope.addTagShowMe = false;
    //--------------点击打开增加标签组界面---------------
    $scope.addTagShow = function () {

        $scope.addTagShowMe = true
    }
    $scope.addTagShowMe1 = false;
    //--------------点击打开增加标签组界面---------------
    $scope.addTagShow1 = function () {

        $scope.addTagShowMe1 = true
    }
    //--------------点击确认增加标签组---------------
    $scope.trueAddTagGroup = function () {

        if ($('.trueAddTagGroup').prev().val() == '') {
            console.log($('.trueAddTagGroup').prev().val())
            $('.alert2').show(300).find('.alertCon').html('新增标签组名不能为空，请再次输入');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            $('.trueAddTagGroup').prev().val('')
            $scope.addTagShowMe = false;
            $('.alert1').show(300).find('.alertCon').html('标签组添加成功');
            setTimeout(function () {
                $('.alert1').hide(300)
            }, 2000)
        }
    }
    $scope.trueAddTagGroup1 = function () {
        if ($('.trueAddTagGroup1').prev().val() == '') {
            $('.alert2').show(300).find('.alertCon').html('新增标签组名不能为空，请再次输入');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var newAddGroup = $('.trueAddTagGroup1').prev().val()
            var addGroup = new FormData();
            addGroup.append('groupName', newAddGroup);
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/group/addChatRoomGroup',
                data: addGroup,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    $('.trueAddTagGroup1').prev().val('')
                    $scope.addTagShowMe1 = false;
                    $('.alert1').show(300).find('.alertCon').html('标签组添加成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                    // $scope.initGroup = response.data.groups
                } else {
                    $('.alert2').show(300).find('.alertCon').html('标签组添加失败');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });

        }
    }
    //------------------弹出框开关-------------
    $('.closeAlert1').click(function () {
        $('.alert1').hide()
    })
    $('.closeAlert2').click(function () {
        $('.alert2').hide()
    })

    $scope.moreGiveGroup = false;
    //----------------批量分组------------------
    $scope.allchecks = []
    //---------------点击打开批量分组--------------
    $scope.allTaskGroup = function () {
        var allCheckData = $('.checkData')
        var allCheck = $('.icheckbox_flat-blue')
        console.log(allCheck)
        for (i2 = 0; i2 < allCheck.length; i2++) {
            // var pp = i2
            if (allCheck[i2].attributes[1].value == 'true') {
                $scope.allchecks.push(Number(allCheckData.eq(i2).attr('data')))
                $scope.jiluSree = 0
            }
        }
        if ($scope.allchecks.length <= 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择需要进行分组的群组');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            /*----------批量分组开关-----------*/
            $scope.moreGiveGroup = true;
            /*----------单个好友分组开关-----------*/
            $scope.oneGiveGroup = false;
            /*----------单个好友打标签开关-----------*/
            $scope.oneTagFight = false;
            /*----------群发消息开关-----------*/
            $scope.sayGroup = false;
            /*----------批量打标签开关-----------*/
            $scope.allTagFightShow = false;
            /*----------好友交流记录开关-----------*/
            $scope.chatAll = false;
            /*----------好友基本资料开关-----------*/
            $scope.giveGroup = false;
            $('.page1-change-block-sree').css('display', 'none');
            $scope.allchecks = []
        }

    }
    //----------------点击关闭批量分组分组弹框--------------
    $scope.page4moreGroupClosMsg = function () {
        $scope.moreGiveGroup = false;
    }
    $scope.allchecks1 = []
    //---------------点击提交批量分组---------------
    $scope.page4moreGroupSendMsg = function () {
        var allCheckData = $('.checkData')
        var allCheck = $('.icheckbox_flat-blue')
        var allGroupId = $('.page4-select1 option:selected').attr('data')
        var allGroupHtml = $('.page4-select1 option:selected').html()
        for (i2 = 0; i2 < allCheck.length; i2++) {
            var pp = i2
            if (allCheck[i2].attributes[1].value == 'true') {
                $scope.allchecks1.push(Number(allCheckData.eq(i2).attr('data')))
            }
        }
        if ($scope.allchecks1.length <= 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择需要进行分组的好友');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else if (allGroupHtml == '' || allGroupHtml == null || allGroupHtml == undefined) {
            $('.alert2').show(300).find('.alertCon').html('当前分组为空请添加分组');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var SaveaGiveGroup = new FormData();
            SaveaGiveGroup.append('chatRoomIds', JSON.stringify($scope.allchecks1));
            SaveaGiveGroup.append('groupId', allGroupId);
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/group/addGrouping',
                data: SaveaGiveGroup,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                    $('.checkbox-toggle').attr('data', '0');
                    $scope.addTagShowMe1 = false;
                    $scope.allchecks1 = []

                    $('.alert1').show(300).find('.alertCon').html('批量分组好友成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                    $scope.moreGiveGroup = false;
                    var sendObjInit = new FormData();
                    var allisChangeNo = $('.isChange')
                    var allGroupChecked = $('.page5-group-group')
                    var tagCheckIds = $('.tag-touch').attr('data');
                    var wechatArr = []
                    var groupArr = []
                    if (tagCheckIds == undefined) {
                        tagCheckIds = ''
                    }
                    if (allisChangeNo.length > 0) {
                        for (var i = 0; i < allisChangeNo.length; i++) {
                            if (allisChangeNo[i].attributes[1].value == 1) {
                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                            }
                        }
                        if (wechatArr.length > 0) {
                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                        } else {
                            sendObjInit.append('accountId', $scope.page5UserIdImportant);
                        }
                    } else {

                    }
                    if (allGroupChecked.length > 0) {
                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                            if (allGroupChecked[i].attributes[1].value == 1) {
                                groupArr.push(allGroupChecked[i].attributes[4].value)
                            }
                        }
                        if (groupArr.length > 0) {
                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                        } else {
                            sendObjInit.append('groupIds', JSON.stringify([]));
                        }
                    } else {
                    }
                    sendObjInit.append('tagId', tagCheckIds);


                    $http({
                        method: 'POST',
                        url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                        data: sendObjInit,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        //上传成功的操作
                        if (response.code == 200) {
                            $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                            $('.checkbox-toggle').attr('data', '0');
                            $scope.initData = response.data.chatrooms
                            $scope.initDatacontactCount = response.data.chatRoomCount
                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                if ($scope.initData[i].chatRoomTags.length > 0) {
                                    arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                        arrAllList.push(arrAllList1[i1])
                                    }
                                    $scope.initData[i].chatRoomTags = arrAllList
                                    arrAllList = []
                                    arrAllList1 = []
                                } else {
                                }
                            }
                            $('.M-box1').pagination({
                                totalData: $scope.initDatacontactCount,
                                showData: 10,
                                coping: true,
                                callback: function (api) {
                                    $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                    $('.checkbox-toggle').attr('data', '0');
                                    var data = {
                                        page: api.getCurrent(),
                                    };
                                    var sendObjInit = new FormData();
                                    var allisChangeNo = $('.isChange')
                                    var allGroupChecked = $('.page5-group-group')
                                    var tagCheckIds = $('.tag-touch').attr('data');
                                    var wechatArr = []
                                    var groupArr = []
                                    if (tagCheckIds == undefined) {
                                        tagCheckIds = ''
                                    }
                                    if (allisChangeNo.length > 0) {
                                        for (var i = 0; i < allisChangeNo.length; i++) {
                                            if (allisChangeNo[i].attributes[1].value == 1) {
                                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                                            }
                                        }
                                        if (wechatArr.length > 0) {
                                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                        } else {
                                            sendObjInit.append('accountId', $scope.page5UserIdImportant);
                                        }
                                    } else {

                                    }
                                    if (allGroupChecked.length > 0) {
                                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                            if (allGroupChecked[i].attributes[1].value == 1) {
                                                groupArr.push(allGroupChecked[i].attributes[4].value)
                                            }
                                        }
                                        if (groupArr.length > 0) {
                                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                        } else {
                                            sendObjInit.append('groupIds', JSON.stringify([]));
                                        }
                                    } else {
                                    }
                                    sendObjInit.append('tagId', tagCheckIds);


                                    sendObjInit.append('page', data.page);
                                    $http({
                                        method: 'POST',
                                        url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                                        data: sendObjInit,
                                        headers: {'Content-Type': undefined},
                                        transformRequest: angular.identity
                                    }).success(function (response) {
                                        //上传成功的操作
                                        if (response.code == 200) {
                                            $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                            $('.checkbox-toggle').attr('data', '0');
                                            $scope.initData = response.data.chatrooms
                                            $scope.initDatacontactCount = response.data.chatRoomCount
                                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                                if ($scope.initData[i].chatRoomTags.length > 0) {
                                                    arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                        arrAllList.push(arrAllList1[i1])
                                                    }
                                                    $scope.initData[i].chatRoomTags = arrAllList
                                                    arrAllList = []
                                                    arrAllList1 = []
                                                } else {
                                                }
                                            }
                                            setTimeout(function () {
                                                var allBlod = $('.blod')
                                                for (i = 0; i < allBlod.length; i++) {
                                                    var pp = i
                                                    if (allBlod[i].attributes[0].nodeValue == 1) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 2) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 3) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 4) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 5) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                                    }
                                                }
                                                $('.mailbox-messages input[type="checkbox"]').iCheck({
                                                    checkboxClass: 'icheckbox_flat-blue',
                                                    radioClass: 'iradio_flat-blue'
                                                });

                                            }, 40)
                                        }
                                    })
                                },

                            });
                            setTimeout(function () {
                                var allBlod = $('.blod')
                                for (i = 0; i < allBlod.length; i++) {
                                    var pp = i
                                    if (allBlod[i].attributes[0].nodeValue == 1) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 2) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 3) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 4) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 5) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                    }
                                }
                                $('.mailbox-messages input[type="checkbox"]').iCheck({
                                    checkboxClass: 'icheckbox_flat-blue',
                                    radioClass: 'iradio_flat-blue'
                                });

                            }, 40)
                        } else {
                        }
                        $('.tagList').html('')
                        $('.alert1').show(300).find('.alertCon').html('批量分组好友保存成功');
                        setTimeout(function () {
                            $('.alert1').hide(300)
                        }, 2000)
                    });
                } else {
                    $('.alert2').show(300).find('.alertCon').html('批量分组好友失败');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
            //-------------发送成功后-----

        }
    }

    //------------记录单个打标签好友id---------------
    $scope.oneFriendId = ''
    //------------------点击打标签按钮-----------------
    $scope.fighttag = function (x) {

        $('.page1-change-block').css('display', 'none')
        $('.page1-change-block-two1').css('display', 'none')
        $('.page1-change-block-two').css('display', 'none')
        $('.page1-change-block-sree').css('display', 'none')
        $scope.page4One = 0
        $scope.GroupNumJilu = 0
        $scope.jilukaka = 0
        $scope.jiluSree = 0
        /*----------批量分组开关-----------*/
        $scope.moreGiveGroup = false;
        /*----------单个好友分组开关-----------*/
        $scope.oneGiveGroup = false;
        /*----------单个好友打标签开关-----------*/
        $scope.oneTagFight = true;
        /*----------群发消息开关-----------*/
        $scope.sayGroup = false;
        /*----------批量打标签开关-----------*/
        $scope.allTagFightShow = false;
        /*----------好友交流记录开关-----------*/
        $scope.chatAll = false;
        /*----------好友基本资料开关-----------*/
        $scope.giveGroup = false;
        $scope.oneFriendId = x
    }
    $scope.oneTagFight = false;
    //----------------点击关闭单个打标签弹框--------------
    $scope.page4oneTagFightClosMsg = function () {
        $scope.oneTagFight = false;
    }
    //---------------点击提交单个标签---------------
    $scope.page4oneTagFightSendMsg = function () {
        $scope.oneFriendId1 = [];
        $scope.oneFriendId1.push($scope.oneFriendId);
        if ($('.page5-addTag2>.tagsContaine>.tagList ')[0].children.length == 0) {
            $('.alert2').show(300).find('.alertCon').html('请输入标签名');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var alltagItems = $('.tagItem1');
            for (var tagid = [], tagcon = [], i = 0; i < alltagItems.length; i++) {
                tagid.push(alltagItems[i].attributes.id.value);
                tagcon.push(alltagItems[i].innerText)
            }

            var sendObAllTags = new FormData();
            sendObAllTags.append('tagNames', JSON.stringify(tagcon));
            sendObAllTags.append(' tagIds', JSON.stringify(tagid));
            sendObAllTags.append('chatRoomIds', JSON.stringify($scope.oneFriendId1));
            $http({
                method: 'POST',
                url: $rootScope.link + '/gcsscrm/group/addTaging',
                data: sendObAllTags,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {
                    // $scope.initData = response.data.contactList
                    // $scope.initGroup = response.data.groupsList
                    // $scope.oneFriendId = [];
                    var sendObjInit = new FormData();
                    var allisChangeNo = $('.isChange')
                    var allGroupChecked = $('.page5-group-group')
                    var tagCheckIds = $('.tag-touch').attr('data');
                    var wechatArr = []
                    var groupArr = []
                    if (tagCheckIds == undefined) {
                        tagCheckIds = ''
                    }
                    if (allisChangeNo.length > 0) {
                        for (var i = 0; i < allisChangeNo.length; i++) {
                            if (allisChangeNo[i].attributes[1].value == 1) {
                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                            }
                        }
                        if (wechatArr.length > 0) {
                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                        } else {
                            sendObjInit.append('accountId', $scope.page5UserIdImportant);
                        }
                    } else {

                    }
                    if (allGroupChecked.length > 0) {
                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                            if (allGroupChecked[i].attributes[1].value == 1) {
                                groupArr.push(allGroupChecked[i].attributes[4].value)
                            }
                        }
                        if (groupArr.length > 0) {
                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                        } else {
                            sendObjInit.append('groupIds', JSON.stringify([]));
                        }
                    } else {
                    }
                    sendObjInit.append('tagId', tagCheckIds);


                    $http({
                        method: 'POST',
                        url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                        data: sendObjInit,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        //上传成功的操作
                        if (response.code == 200) {
                            $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                            $('.checkbox-toggle').attr('data', '0');
                            $scope.initData = response.data.chatrooms
                            $scope.initDatacontactCount = response.data.chatRoomCount
                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                if ($scope.initData[i].chatRoomTags.length > 0) {
                                    arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                        arrAllList.push(arrAllList1[i1])
                                    }
                                    $scope.initData[i].chatRoomTags = arrAllList
                                    arrAllList = []
                                    arrAllList1 = []
                                } else {
                                }
                            }
                            $('.M-box1').pagination({
                                totalData: $scope.initDatacontactCount,
                                showData: 10,
                                coping: true,
                                callback: function (api) {
                                    $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                    $('.checkbox-toggle').attr('data', '0');
                                    var data = {
                                        page: api.getCurrent(),
                                    };
                                    var sendObjInit = new FormData();
                                    var allisChangeNo = $('.isChange')
                                    var allGroupChecked = $('.page5-group-group')
                                    var tagCheckIds = $('.tag-touch').attr('data');
                                    var wechatArr = []
                                    var groupArr = []
                                    if (tagCheckIds == undefined) {
                                        tagCheckIds = ''
                                    }
                                    if (allisChangeNo.length > 0) {
                                        for (var i = 0; i < allisChangeNo.length; i++) {
                                            if (allisChangeNo[i].attributes[1].value == 1) {
                                                wechatArr.push(allisChangeNo[i].attributes[4].value)
                                            }
                                        }
                                        if (wechatArr.length > 0) {
                                            sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                        } else {
                                            sendObjInit.append('accountId', $scope.page5UserIdImportant);
                                        }
                                    } else {

                                    }
                                    if (allGroupChecked.length > 0) {
                                        for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                            if (allGroupChecked[i].attributes[1].value == 1) {
                                                groupArr.push(allGroupChecked[i].attributes[4].value)
                                            }
                                        }
                                        if (groupArr.length > 0) {
                                            sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                        } else {
                                            sendObjInit.append('groupIds', JSON.stringify([]));
                                        }
                                    } else {
                                    }
                                    sendObjInit.append('tagId', tagCheckIds);


                                    sendObjInit.append('page', data.page);
                                    $http({
                                        method: 'POST',
                                        url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                                        data: sendObjInit,
                                        headers: {'Content-Type': undefined},
                                        transformRequest: angular.identity
                                    }).success(function (response) {
                                        //上传成功的操作
                                        if (response.code == 200) {
                                            $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                            $('.checkbox-toggle').attr('data', '0');
                                            $scope.initData = response.data.chatrooms
                                            $scope.initDatacontactCount = response.data.chatRoomCount
                                            for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                                if ($scope.initData[i].chatRoomTags.length > 0) {
                                                    arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                                    for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                        arrAllList.push(arrAllList1[i1])
                                                    }
                                                    $scope.initData[i].chatRoomTags = arrAllList
                                                    arrAllList = []
                                                    arrAllList1 = []
                                                } else {
                                                }
                                            }
                                            setTimeout(function () {
                                                var allBlod = $('.blod')
                                                for (i = 0; i < allBlod.length; i++) {
                                                    var pp = i
                                                    if (allBlod[i].attributes[0].nodeValue == 1) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 2) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 3) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 4) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                    }
                                                    if (allBlod[i].attributes[0].nodeValue == 5) {
                                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                        $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                                    }
                                                }
                                                $('.mailbox-messages input[type="checkbox"]').iCheck({
                                                    checkboxClass: 'icheckbox_flat-blue',
                                                    radioClass: 'iradio_flat-blue'
                                                });

                                            }, 40)
                                        }
                                    })
                                },
                            });
                            setTimeout(function () {
                                var allBlod = $('.blod')
                                for (i = 0; i < allBlod.length; i++) {
                                    var pp = i
                                    if (allBlod[i].attributes[0].nodeValue == 1) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 2) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 3) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 4) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                    }
                                    if (allBlod[i].attributes[0].nodeValue == 5) {
                                        $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                        $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                    }
                                }
                                $('.mailbox-messages input[type="checkbox"]').iCheck({
                                    checkboxClass: 'icheckbox_flat-blue',
                                    radioClass: 'iradio_flat-blue'
                                });

                            }, 40)
                            $scope.oneTagFight = false;
                            $('.tagList').html('')
                            $('.alert1').show(300).find('.alertCon').html('批量打标签保存成功');
                            setTimeout(function () {
                                $('.alert1').hide(300)
                            }, 2000)
                        } else {
                            $('.alert2').show(300).find('.alertCon').html('标签保存失败，请刷新页面或再次登录');
                            setTimeout(function () {
                                $('.alert2').hide(300)
                            }, 2000)
                        }
                    });
                } else if (response.code == 202) {
                    $scope.initData = response.data.chatrooms
                    $scope.initDatacontactCount = response.data.chatRoomCount
                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                        if ($scope.initData[i].chatRoomTags.length > 0) {
                            arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                arrAllList.push(arrAllList1[i1])
                            }
                            $scope.initData[i].chatRoomTags = arrAllList
                            arrAllList = []
                            arrAllList1 = []
                        } else {
                        }
                    }
                    $('.M-box1').pagination({
                        totalData: $scope.initDatacontactCount,
                        showData: 10,
                        coping: true,
                        callback: function (api) {
                            $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                            $('.checkbox-toggle').attr('data', '0');
                            var data = {
                                page: api.getCurrent(),
                            };
                            var sendObjInit = new FormData();
                            var allisChangeNo = $('.isChange')
                            var allGroupChecked = $('.page5-group-group')
                            var tagCheckIds = $('.tag-touch').attr('data');
                            var wechatArr = []
                            var groupArr = []
                            if (tagCheckIds == undefined) {
                                tagCheckIds = ''
                            }
                            if (allisChangeNo.length > 0) {
                                for (var i = 0; i < allisChangeNo.length; i++) {
                                    if (allisChangeNo[i].attributes[1].value == 1) {
                                        wechatArr.push(allisChangeNo[i].attributes[4].value)
                                    }
                                }
                                if (wechatArr.length > 0) {
                                    sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                } else {
                                    sendObjInit.append('accountId', $scope.page5UserIdImportant);
                                }
                            } else {

                            }
                            if (allGroupChecked.length > 0) {
                                for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                    if (allGroupChecked[i].attributes[1].value == 1) {
                                        groupArr.push(allGroupChecked[i].attributes[4].value)
                                    }
                                }
                                if (groupArr.length > 0) {
                                    sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                } else {
                                    sendObjInit.append('groupIds', JSON.stringify([]));
                                }
                            } else {
                            }
                            sendObjInit.append('tagId', tagCheckIds);


                            sendObjInit.append('page', data.page);
                            $http({
                                method: 'POST',
                                url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                                data: sendObjInit,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                //上传成功的操作
                                if (response.code == 200) {
                                    $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                    $('.checkbox-toggle').attr('data', '0');
                                    $scope.initData = response.data.chatrooms
                                    $scope.initDatacontactCount = response.data.chatRoomCount
                                    for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                        if ($scope.initData[i].chatRoomTags.length > 0) {
                                            arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                            for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                arrAllList.push(arrAllList1[i1])
                                            }
                                            $scope.initData[i].chatRoomTags = arrAllList
                                            arrAllList = []
                                            arrAllList1 = []
                                        } else {
                                        }
                                    }
                                    setTimeout(function () {
                                        var allBlod = $('.blod')
                                        for (i = 0; i < allBlod.length; i++) {
                                            var pp = i
                                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                            }
                                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                            }
                                        }
                                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                                            checkboxClass: 'icheckbox_flat-blue',
                                            radioClass: 'iradio_flat-blue'
                                        });

                                    }, 40)
                                }
                            })
                        },
                    });
                    setTimeout(function () {
                        var allBlod = $('.blod')
                        for (i = 0; i < allBlod.length; i++) {
                            var pp = i
                            if (allBlod[i].attributes[0].nodeValue == 1) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 2) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 3) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 4) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                            }
                            if (allBlod[i].attributes[0].nodeValue == 5) {
                                $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                            }
                        }
                        $('.mailbox-messages input[type="checkbox"]').iCheck({
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });

                    }, 40)
                    $scope.oneTagFight = false;
                    $('.tagList').html('')
                    $('.alert1').show(300).find('.alertCon').html('批量打标签保存成功');
                    setTimeout(function () {
                        $('.alert1').hide(300)
                    }, 2000)
                } else if (response.code == 201) {
                    $('.tagList').html('')
                    $('.alert2').show(300).find('.alertCon').html('您输入的标签已经全部存在，请再次输入');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                } else {
                    $('.alert2').show(300).find('.alertCon').html('标签保存失败，请刷新页面或再次登录');
                    setTimeout(function () {
                        $('.alert2').hide(300)
                    }, 2000)
                }
            });
        }


    }
    $scope.oneGiveGroup = false;
    $scope.oneFriendIds = ''
    //---------------点击分组打开分组弹框-------------
    $scope.giveGroups = function (x) {

        $('.page1-change-block').css('display', 'none')
        $('.page1-change-block-two1').css('display', 'none')
        $('.page1-change-block-two').css('display', 'none')
        $('.page1-change-block-sree').css('display', 'none')
        $scope.page4One = 0
        $scope.GroupNumJilu = 0
        $scope.jilukaka = 0
        $scope.jiluSree = 0
        /*----------批量分组开关-----------*/
        $scope.moreGiveGroup = false;
        /*----------单个好友分组开关-----------*/
        $scope.oneGiveGroup = true;
        /*----------单个好友打标签开关-----------*/
        $scope.oneTagFight = false;
        /*----------群发消息开关-----------*/
        $scope.sayGroup = false;
        /*----------批量打标签开关-----------*/
        $scope.allTagFightShow = false;
        /*----------好友交流记录开关-----------*/
        $scope.chatAll = false;
        /*----------好友基本资料开关-----------*/
        $scope.giveGroup = false;
        $scope.oneFriendIds = x
    }
    //----------------点击关闭单个分组弹框--------------
    $scope.page4oneGroupClosMsg = function () {
        $scope.oneGiveGroup = false;
    }
    //---------------点击提交单个分组---------------
    $scope.page4oneGroupSendMsg = function () {
        var allGroupId = $('.page4-select-on-group option:selected').attr('data')
        var SaveaOnGiveGroup = new FormData();
        $scope.oneFriendIds1 = [];
        $scope.oneFriendIds1.push($scope.oneFriendIds)
        SaveaOnGiveGroup.append('chatRoomIds', JSON.stringify($scope.oneFriendIds1));
        SaveaOnGiveGroup.append('groupId', allGroupId);
        $http({
            method: 'POST',
            url: $rootScope.link + '/gcsscrm/group/addGrouping',
            data: SaveaOnGiveGroup,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $scope.oneGiveGroup = false;
                $scope.allchecks1 = []
                $('.alert1').show(300).find('.alertCon').html('群组分组成功');
                setTimeout(function () {
                    $('.alert1').hide(300)
                }, 2000)
                $scope.moreGiveGroup = false;
                var sendObjInit = new FormData();
                var allisChangeNo = $('.isChange')
                var allGroupChecked = $('.page5-group-group')
                var tagCheckIds = $('.tag-touch').attr('data');
                var wechatArr = []
                var groupArr = []
                if (tagCheckIds == undefined) {
                    tagCheckIds = ''
                }
                if (allisChangeNo.length > 0) {
                    for (var i = 0; i < allisChangeNo.length; i++) {
                        if (allisChangeNo[i].attributes[1].value == 1) {
                            wechatArr.push(allisChangeNo[i].attributes[4].value)
                        }
                    }
                    if (wechatArr.length > 0) {
                        sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                    } else {
                        sendObjInit.append('accountId', $scope.page5UserIdImportant);
                    }
                } else {

                }
                if (allGroupChecked.length > 0) {
                    for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                        if (allGroupChecked[i].attributes[1].value == 1) {
                            groupArr.push(allGroupChecked[i].attributes[4].value)
                        }
                    }
                    if (groupArr.length > 0) {
                        sendObjInit.append('groupIds', JSON.stringify(groupArr));
                    } else {
                        sendObjInit.append('groupIds', JSON.stringify([]));
                    }
                } else {
                }
                sendObjInit.append('tagId', tagCheckIds);


                $http({
                    method: 'POST',
                    url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                    data: sendObjInit,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    //上传成功的操作
                    if (response.code == 200) {
                        $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                        $('.checkbox-toggle').attr('data', '0');
                        $scope.initData = response.data.chatrooms
                        $scope.initDatacontactCount = response.data.chatRoomCount
                        for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                            if ($scope.initData[i].chatRoomTags.length > 0) {
                                arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                    arrAllList.push(arrAllList1[i1])
                                }
                                $scope.initData[i].chatRoomTags = arrAllList
                                arrAllList = []
                                arrAllList1 = []
                            } else {
                            }
                        }
                        $('.M-box1').pagination({
                            totalData: $scope.initDatacontactCount,
                            showData: 10,
                            coping: true,
                            callback: function (api) {
                                $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                $('.checkbox-toggle').attr('data', '0');
                                var data = {
                                    page: api.getCurrent(),
                                };
                                var sendObjInit = new FormData();
                                var allisChangeNo = $('.isChange')
                                var allGroupChecked = $('.page5-group-group')
                                var tagCheckIds = $('.tag-touch').attr('data');
                                var wechatArr = []
                                var groupArr = []
                                if (tagCheckIds == undefined) {
                                    tagCheckIds = ''
                                }
                                if (allisChangeNo.length > 0) {
                                    for (var i = 0; i < allisChangeNo.length; i++) {
                                        if (allisChangeNo[i].attributes[1].value == 1) {
                                            wechatArr.push(allisChangeNo[i].attributes[4].value)
                                        }
                                    }
                                    if (wechatArr.length > 0) {
                                        sendObjInit.append('weChatIds', JSON.stringify(wechatArr));
                                    } else {
                                        sendObjInit.append('accountId', $scope.page5UserIdImportant);
                                    }
                                } else {

                                }
                                if (allGroupChecked.length > 0) {
                                    for (var i = 0, arr1 = []; i < allGroupChecked.length; i++) {
                                        if (allGroupChecked[i].attributes[1].value == 1) {
                                            groupArr.push(allGroupChecked[i].attributes[4].value)
                                        }
                                    }
                                    if (groupArr.length > 0) {
                                        sendObjInit.append('groupIds', JSON.stringify(groupArr));
                                    } else {
                                        sendObjInit.append('groupIds', JSON.stringify([]));
                                    }
                                } else {
                                }
                                sendObjInit.append('tagId', tagCheckIds);


                                sendObjInit.append('page', data.page);
                                $http({
                                    method: 'POST',
                                    url: $rootScope.link + '/gcsscrm/group/getAllMsgToGroupPage',
                                    data: sendObjInit,
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                }).success(function (response) {
                                    //上传成功的操作
                                    if (response.code == 200) {
                                        $('.page5-checkbox-toggle-1').removeClass('fa-check-square-o').addClass('fa-square-o');
                                        $('.checkbox-toggle').attr('data', '0');
                                        $scope.initData = response.data.chatrooms
                                        $scope.initDatacontactCount = response.data.chatRoomCount
                                        for (var arrAllList1 = [], i = 0; i < $scope.initData.length; i++) {
                                            if ($scope.initData[i].chatRoomTags.length > 0) {
                                                arrAllList1.push($scope.initData[i].chatRoomTags[0].tagname.split(','));
                                                for (var arrAllList = [], i1 = 0; i1 < arrAllList1.length; i1++) {
                                                    arrAllList.push(arrAllList1[i1])
                                                }
                                                $scope.initData[i].chatRoomTags = arrAllList
                                                arrAllList = []
                                                arrAllList1 = []
                                            } else {
                                            }
                                        }
                                        setTimeout(function () {
                                            var allBlod = $('.blod')
                                            for (i = 0; i < allBlod.length; i++) {
                                                var pp = i
                                                if (allBlod[i].attributes[0].nodeValue == 1) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 2) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 3) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 4) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                }
                                                if (allBlod[i].attributes[0].nodeValue == 5) {
                                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                                    $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                                }
                                            }
                                            $('.mailbox-messages input[type="checkbox"]').iCheck({
                                                checkboxClass: 'icheckbox_flat-blue',
                                                radioClass: 'iradio_flat-blue'
                                            });

                                        }, 40)
                                    }
                                })
                            },

                        });

                        setTimeout(function () {
                            var allBlod = $('.blod')
                            for (i = 0; i < allBlod.length; i++) {
                                var pp = i
                                if (allBlod[i].attributes[0].nodeValue == 1) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 2) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 3) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 4) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                }
                                if (allBlod[i].attributes[0].nodeValue == 5) {
                                    $('.blod').eq(pp).find('.blod1').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod2').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod3').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod4').addClass('ox').css('border', 'none')
                                    $('.blod').eq(pp).find('.blod5').addClass('ox').css('border', 'none')
                                }
                            }
                            $('.mailbox-messages input[type="checkbox"]').iCheck({
                                checkboxClass: 'icheckbox_flat-blue',
                                radioClass: 'iradio_flat-blue'
                            });

                        }, 40)
                    } else {
                    }
                });
            } else {
                $('.alert2').show(300).find('.alertCon').html('群组分组失败');
                setTimeout(function () {
                    $('.alert2').hide(300)
                }, 2000)
            }
        });
    }
    $scope.moreGroupchatroomname = '11'
    $scope.sayGroup = false;
    //--------------点击打开群发消息弹框-----------
    $scope.allchecks4 = []
    $scope.sayGroupShow = function () {
        var allCheckData = $('.checkData')
        var allCheck = $('.icheckbox_flat-blue')
        console.log(allCheck)
        for (i2 = 0; i2 < allCheck.length; i2++) {
            // var pp = i2
            if (allCheck[i2].attributes[1].value == 'true') {
                $scope.allchecks4.push(Number(allCheckData.eq(i2).attr('data')))
                $scope.jiluSree = 0
            }
        }
        if ($scope.allchecks4.length <= 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择需要进行群发消息的群组');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            /*----------批量分组开关-----------*/
            $scope.moreGiveGroup = false;
            /*----------单个好友分组开关-----------*/
            $scope.oneGiveGroup = false;
            /*----------单个好友打标签开关-----------*/
            $scope.oneTagFight = false;
            /*----------群发消息开关-----------*/
            $scope.sayGroup = true;
            /*----------批量打标签开关-----------*/
            $scope.allTagFightShow = false;
            /*----------好友交流记录开关-----------*/
            $scope.chatAll = false;
            /*----------好友基本资料开关-----------*/
            $scope.giveGroup = false;
            $('.page1-change-block-four').css('display', 'none')
            $scope.jiluFour = 0;
            $scope.allchecks4 = []
        }
    }
    //-------------点击关闭群发消息弹框-------------
    $scope.page4sayGroupClosMsg = function () {
        $scope.sayGroup = false;
    }
    $scope.allchecks5 = [];
    //------------点击执行群发任务--------------
    $scope.page4sayGroupSendMsg = function () {
        $scope.sendObj1 = new FormData();
        $scope.sendObj1.append('file', $scope.pic);
        var allCheckData = $('.checkData')
        var allCheck = $('.icheckbox_flat-blue')
        for (var i2 = 0; i2 < allCheck.length; i2++) {
            // var pp = i2
            if (allCheck[i2].attributes[1].value == 'true') {
                $scope.allchecks5.push(Number(allCheckData.eq(i2).attr('data')))
                $scope.jiluSree = 0
            }
        }
        if ($scope.allchecks5.length <= 0) {
            $('.alert2').show(300).find('.alertCon').html('请选择需要进行群发消息的群组');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else if ($(".FontAndEmjoy6").html() == '') {
            $('.alert2').show(300).find('.alertCon').html('请输入需要进行群发的消息');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        } else {
            var saySomething = $(".FontAndEmjoy6").html();
            var reger = /<img.*?(?:>|\/>)/g;
            var srcReg = /alt=[\'\"]?([^\'\"]*)[\'\"]?/i;
            var arr1 = saySomething.match(reger)
            if (arr1 == null) {
            } else {
                var tt = []
                for (var i = 0; i < arr1.length; i++) {
                    var src = arr1[i].match(srcReg);
                    if (src[1]) {
                        tt.push(src[1])
                    }
                }
                var result = saySomething.match(/<img.*?(?:>|\/>)/g);
                for (var i = 0; i < result.length; i++) {
                    saySomething = saySomething.replace(result[i], tt[i])
                }
                $scope.sendObj1.append('msg', saySomething);
                $http({
                    method: 'POST',
                    url: $rootScope.link + "/operate/sendMoments",
                    data: $scope.sendObj1,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    if (response.code == 200) {
                        $(".FontAndEmjoy6").html('');
                        $('.removeImg').css('background', 'url("../images/add-pic.png") center no-repeat');
                        $scope.pic = '';
                        $('.alert1').show(300).find('.alertCon').html('群发消息任务添加完成');
                        setTimeout(function () {
                            $('.alert1').hide(300)
                        }, 2000)

                    } else {
                        alert(response.msg);
                        location.reload();
                    }
                })
            }
            $scope.allchecks5 = []
        }

    }
    //-------------------emjoy表情相关-----------------
    //-------------------鼠标悬停表情列表打开----------
    $(".emjoyDiv-page6").mouseover(function () {
        $('.emjoyList-page6').css("display", "block")
    })
    //-------------------鼠标移除表情列表关闭----------
    $(".emjoyDiv-page6").mouseout(function () {
        $(".emjoyList-page6").css("display", "none")
    })
    //-----------判断值----------
    var panduanTure = 0;
    //-----------输入框焦点事件--------------
    $(function () {
        $("#FontAndEmjoy6").focus(function () {
            $(this).removeClass("flag1");
            // panduanTure = 1
        });
        $("#FontAndEmjoy6").blur(function () {
            // panduanTure=0
            $(this).addClass("flag1");
        });
    });
    //------------表情点击触发事件------------
    $(".emjoyList-page6").on("click", "img", function () {
        if (panduanTure == 1) {
            // $("#FontAndEmjoy").removeClass("flag");
            var imgAlt = $(this).attr("alt")
            var imgSrc = $(this).attr("src")
            insertHTML("<img src='" + imgSrc + "'alt='" + imgAlt + "'>");
        }

    })
    //再加入一个全屏事件
    var jilu = [];
    var runNing = false
    var i = -1;
    $(window).click(function (e) {
        i++;
        if (window.getSelection) {
            var getevent = e.srcElement ? e.srcElement : e.target;//不要告诉我不知道这句的意思
            jilu.push(getevent.id)
            // console.log(jilu)
            // console.log(i)
            // for (var j=0;j<jilu.length;j++){
            //     if(jilu[j]=="FontAndEmjoy"){
            //         runNing=true
            //     }else {
            //         panduanTure=0
            //         runNing=false
            //     }
            // }
            var runNing = $.inArray("FontAndEmjoy6", jilu);
            if (runNing != -1) {
                if (getevent.id != 'FontAndEmjoy6') {
                    $("#FontAndEmjoy6").addClass("flag1");
                    panduanTure = 0
                    if (getevent.className == 'gg') {
                        panduanTure = 1
                        $("#FontAndEmjoy6").removeClass("flag1");
                        if (jilu[i - 1] == 'FontAndEmjoy6') {
                            panduanTure = 1
                            $("#FontAndEmjoy6").removeClass("flag1");
                            if (jilu[i - 1] == getevent.id) {
                                panduanTure = 1
                                $("#FontAndEmjoy6").removeClass("flag1");
                            }
                        }
                    } else {
                        panduanTure = 0
                        $("#FontAndEmjoy6").addClass("flag1");
                    }
                } else {
                    panduanTure = 1
                    $("#FontAndEmjoy6").removeClass("flag1");
                }
            } else {
            }
            //除非点了那个插入html的按钮 其他时候必须要执行getFocus来更新最后失去焦点的div
        }
    })

    function insertHTML(html) {
        var dthis = $("#FontAndEmjoy6")[0];//要插入内容的某个div,在标准浏览器中 无需这句话
        //dthis.focus();a
        var sel, range;
        // console.log($(dthis).hasClass("flag"));
        if ($(dthis).hasClass("flag1")) {

        } else {
            $(dthis).html(dthis.innerHTML + html);
            return;
        }
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                var el = document.createElement('div');
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }

                range.insertNode(frag);
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
        else if (document.selection && document.selection.type != 'Control') {
            $(dthis).focus(); //在非标准浏览器中 要先让你需要插入html的div 获得焦点
            ierange = document.selection.createRange();//获取光标位置
            ierange.pasteHTML(html);    //在光标位置插入html 如果只是插入text 则就是fus.text="..."
            $(dthis).focus();
        }
    }

    $('.falseTime').blur(function () {
        var dateValue = $(this).val()
        console.log($(this).val())
        var reg1 = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        var regExp = new RegExp(reg1);
        if (regExp.test(dateValue)) {
        } else {
            $('.alert2').show(300).find('.alertCon').html('请输入正确日期格式例如：2017-01-01');
            setTimeout(function () {
                $('.alert2').hide(300)
            }, 2000)
        }
    })
}
])
;
