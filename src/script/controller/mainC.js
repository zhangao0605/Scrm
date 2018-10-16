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