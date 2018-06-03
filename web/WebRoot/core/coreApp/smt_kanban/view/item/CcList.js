Ext.define("core.smt_kanban.view.item.CcList", {
			extend : 'Ext.Panel',
			alias : 'widget.smt_cc_list_kb',
			layout : 'fit',
/*			tbar : [{
				text : '保存图表',
				handler : function() {
					Ext.MessageBox.confirm(
									'下载确认','您想下载这个图表图片吗?',
									function(choice) {
										if (choice == 'yes') {
											chart.save({
														type : 'image/png'
													});
										}
									});
				}
			}],*/
			items : [{
						xtype:'chart',
						theme:'Category2',
						animate : true,
						shadow : true,
						store : 'core.smt_kanban.store.cc.ListStore',
						// 说明
						legend : {position : 'top'},
						axes : [{
									type : 'Numeric',
									position : 'left',
									xField : 'RealYield',
									title : '实际产出',
									grid : true,
									minimum : 0,
									majorTickSteps : 10,
									maximum : 10
								}, {
									// 配置坐标类型一般用Category\Numeric
									type : 'Numeric',
									// 配置坐标位置 上下左
									position : 'right',
									fields : ['SumYield'],
									title : '累计产出'
									// grid: true
							}	, {
									type : 'Category',
									position : 'bottom',
									fields : ['timeslice'],
									title : '时间'
								}],
						// 配置图表
						series : [{
							type : 'column',// 配置图表的类型,
							axis : 'left',// 相对于哪个坐标
							gutter : 80,
							highlight : true,// 是否高亮
							title : ['实际产出'],
							xField : 'timeslice', // 设定x坐标绑定的字段,必须与axes的坐标绑定
							yField : ['RealYield'],
							stacked : true,
						    tips: { 
						    	trackMouse: false,
						    	width: 50, 
						        height:28, 
						        renderer: function(storeItem, item) {
								  this.setTitle(String(item.value[1])); } 
							},								
/*							renderer:function(sprite,record,attr, index,store){ 
										var value=record.data.hits;
								 		if(value>200){ 
								 			color="#00FF7F"; 
								 		}else if(value<200){ 
								 			color="#FFFF00"; 
								 		}else{
								  			color="#00FFFF"; 
								  		}
								  		return value;
								  		Ext.apply(attr,{fill:color}); 
							},*/
								 								
						    label:{ 
								   display:'insideEnd', //over显示在上方
								 	'text-anchor':'middle', // contrast:true,
								 	field:['RealYield'], 
								   orientation:'horizontal',
								   font:'14px Helvetica, sans-serif',
								   renderer:Ext.util.Format.numberRenderer(('0')),
								   color:'#111'
								 }
							}, 
						{
							type : 'line',
							axis : 'left',
							highlight : true,
							xField : 'timeslice',
							yField : 'StandYield',
							title : 'UPH',
							markerConfig: { //标记配置
						  		type: 'cross', //交叉 size: 4, radius: 4,
						 	   'stroke-width': 0 } 
						},
						{
							type : 'line',
							axis : 'right',
							highlight : true,
							xField : 'timeslice',
							yField : 'SumYield',
							title : '累计产出',
							tips: { 
								trackMouse: false, 
								width: 50,
								height: 28, renderer: function(storeItem, item) { 
									this.setTitle(String(item.value[1])); }
							},
							label:{ 
								display:'over', 				 	//over显示在上方
							    'text-anchor':'middle', 	// contrast:true,
								field:['SumYield'], 
								orientation:'vertical',
								font:'14px Helvetica, sans-serif',
								//renderer:Ext.util.Format.numberRenderer(('0'))
								renderer:function(value,label){
									label.setAttributes({fill:'#0000FF'});
									return value;
									
								},
								color:'#111' 
								}
							}
						]
					}]
		});