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
