Ext.define("core.smt_line_scan_interval_time.view.Result", {
	extend : "Ext.Panel",
	alias : 'widget.smt_line_scan.interval_time.result',
	layout : 'border',
	title : '查询结果',
	items : [{
				xtype : 'chart',
				frame : true,
				style : {
					background : '#ffffff'
				},
				region : 'center',
				// id : 'chartCmp',
				animate : true,
				store : 'core.smt_line_scan_interval_time.store.Store',
				shadow : true,
				legend : {
					position : 'top'
/*								renderer:function(label, storeItem, item, i, display, animate, index){
									return label.replace("m","分钟");
								}*/
				},
				insetPadding : 10,
				series : [{
							type : 'pie',
							field : 'IntervalTime',
							showInLegend : true,
							donut : false,// 内环状线圈
							id : 'tt',
							highlight : {// 高亮
								segment : {
									margin : 20
								}
							},

							label : {
								field : 'Title',
								display : 'rotate',
								contrast : true,
/*
								renderer:function(label, storeItem, item, i, display, animate, index){
									return label.replace("m","分钟");
									console.log(label);console.log(item);console.log(storeItem);
								},	
*/		
								font : '12px Arial'
							}

						}]
			}, {
				xtype : 'grid',
				width : 500,
				// collapsible : true, // 可折叠
				split : true,
				region : 'east',
				store : 'core.smt_line_scan_interval_time.store.Store',
				columns : [{
							text : '标题',
							dataIndex : 'Title',
							width : 75,
							renderer:function(value){
								return value.replace("m","分钟");
							}
						}, {
							text : '开始间隔',
							dataIndex : 'StartInterval',
							width : 75
						}, {
							text : '结束间隔',
							dataIndex : 'EndInterval',
							width : 75
						}, {
							text : '间隔时间',
							dataIndex : 'IntervalTime',
							width : 100
						}, {
							text : '百分比',
							dataIndex : 'Rate',
							width : 75,
							renderer:function(value){
								return Math.round(value*10000)/100+"%";
								//return value*100+"%";
							}
						}, {
							text : '总时间',
							dataIndex : 'TotalTime',
							flex : 1
						}]
			}

	]
});
