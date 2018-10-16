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
