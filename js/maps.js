

                var map = new BMap.Map('allmap');
                var poi = new BMap.Point(111.644885,22.791031);
                map.centerAndZoom(poi, 20);
                map.enableScrollWheelZoom(true);
                var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                                '<img src="images/gate.png" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                                '地址：广东省云浮市罗定市双东街道龙凤村福兴新型墙体材料厂<br/>电话：0766-3912813<br/>' +
                              '</div>';

                //创建检索信息窗口对象
                var searchInfoWindow = null;
                searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
                  title  : "福兴新型墙体材料厂",      //标题
                  width  : 300,             //宽度
                  height : 105,              //高度
                  panel  : "panel",         //检索结果面板
                  enableAutoPan : true,     //自动平移
                  enableSendToPhone: false, // 取消发送手机
                  searchTypes   :[
                    BMAPLIB_TAB_SEARCH,   //周边检索
                    BMAPLIB_TAB_TO_HERE,  //到这里去
                    BMAPLIB_TAB_FROM_HERE //从这里出发
                  ]
                });
                var marker = new BMap.Marker(poi); //创建marker对象
                marker.enableDragging(); //marker可拖拽
                marker.addEventListener("click", function(e){
                  searchInfoWindow.open(marker);
                  document.getElementById('BMapLib_trans_text0').parentNode.style.width = '110px'   // 出发的样式错乱修正
                })
                map.addOverlay(marker); //在地图中添加marker