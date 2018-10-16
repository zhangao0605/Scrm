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
