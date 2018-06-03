Ext.define("core.smt_tp_kanban.view.MoView",{
		extend:'Ext.Panel',
		alias:'widget.smt_tp_kb_moview',
		frame:true,
		layout:'border',
		fit:true,
		items:[
		      {
		    	xtype:'panel',
		    	region:'center',
		    	layout:"fit",
		    	items:[{
				    xtype:'chart',
		    		animate:true,
					shadow:true,
					theme:'Category4',
					store:'core.smt_tp_kanban.store.sl.Store1',
					legend:{position:'top'},
					axes:[
						{
							type:'Numeric',
							position:'left',
							fields:['生产枚数'],
							title:'生产枚数',
							//grid:true,
							majorTickSteps:10,
							maximum:10
						},
						{
							type:'Category',
							position:'bottom',
							fields:['时间段']
							//title:''
						}
					],
					series:[
						{
							type:'column',
							axis:'left',
							gutter:80,
							highlight:true,
							//style: {width: 30},
							title:['生产效率'],
							label: {
		                        display: 'insideEnd',
		                        'text-anchor': 'middle',
		                        field: ['生产枚数'],
		                        renderer: Ext.util.Format.numberRenderer('0'),
		                       // orientation: 'vertical',
		                        color: '#333'
		                    },
							
							xField:'时间段',
							yField:['生产枚数'],
							stacked:true
							,tips:{
								trackMouse:true,
								width:365,
								height:28,
								renderer:function(storeItem,item){
									 this.setTitle(storeItem.get('时间段')+"共产出"+storeItem.get('生产枚数')  );
								}
							}
						}
						
				        
					]
		    	}]
		      } ,
		      {
			    	xtype:'panel',
			    	region:'east',
			    	width:"50%",
			    	layout:"fit",
			    	items:[{
					    xtype:'chart',
			    		animate:true,
						shadow:true,
						theme:'Category4',
						store:'core.smt_tp_kanban.store.sl.Store2',
						legend:{position:'top'},
						axes:[
							{
								type:'Numeric',
								position:'left',
								fields:['运转率'],
								title:'运转率',
								//title:'',
								//grid:true,
								majorTickSteps:10,
								maximum:10
							},
							{
								type:'Category',
								position:'bottom',
								fields:['时间']
								//title:''
							}
						],
						series:[
							{
								type:'column',
								axis:'left',
								gutter:80,
								highlight:true,
								//style: {width: 30},
								title:['运转率[%]'],
								label: {
			                        display: 'insideEnd',
			                        'text-anchor': 'middle',
			                        field: ['运转率'],
			                        renderer: Ext.util.Format.numberRenderer('0'),
			                       // orientation: 'vertical',
			                        color: '#333'
			                    },
								
								xField:'时间',
								yField:['运转率'],
								stacked:true
								,tips:{
									trackMouse:true,
									width:365,
									height:28,
									renderer:function(storeItem,item){
										 this.setTitle(storeItem.get('时间')+"运转率为"+storeItem.get('运转率')+"%" );
									}
								}
							}
							
					        
						]
			    	}]
			   } ,
		      {
			    	xtype:'panel',
			    	region:'south',
			    	layout:"border",
			    	height:"50%",
			    	items:[

			    	  {
			    		  xtype:'panel',
			    		  region:"center",
			    		  layout:"fit",
					    	items:[{
							    xtype:'chart',
					    		animate:true,
								shadow:true,
								theme:'Category4',
								store:'core.smt_tp_kanban.store.sl.Store3',
								legend:{position:'top'},
								axes:[
									{
										type:'Numeric',
										position:'left',
										fields:['Spoilage_Rate'],
										title:'损坏率',
										//title:'',
										//grid:true,
										majorTickSteps:10,
										maximum:10
									},
									{
										type:'Category',
										position:'bottom',
										fields:['Machine']
										//title:''
									}
								],
								series:[
									{
										type:'column',
										axis:'left',
										gutter:80,
										highlight:true,
										//style: {width: 30},
										title:['损坏率[PPM]'],
										label: {
					                        display: 'insideEnd',
					                        'text-anchor': 'middle',
					                        field: ['Spoilage_Rate'],
					                        renderer: Ext.util.Format.numberRenderer('0'),
					                       // orientation: 'vertical',
					                        color: '#333'
					                    },
										
										xField:'Machine',
										yField:['Spoilage_Rate'],
										stacked:true
										,tips:{
											trackMouse:true,
											width:365,
											height:28,
											renderer:function(storeItem,item){
												 this.setTitle("机器"+storeItem.get('Machine')+"损坏率为"+storeItem.get('Spoilage_Rate')  );
											}
										}
									}
									
							        
								]
					    	}]
			    		  
			    	  
			    	  },
			    	  //第4个饼图
			    	  {xtype:'panel',
			    		 region:"east",
			    		 width:"50%",
			    		 layout:"fit",
			    		 title:'抛料TOP5',
					    	items:[{
							    xtype:'chart',
							    id: 'piechart',
					    		animate:true,
								shadow:true,
								legend:{position:'right'},
								store:'core.smt_tp_kanban.store.sl.Store4',
							    theme: 'Base:gradients',
							    series: [{
							        type: 'pie',
							        angleField: 'count',
							        showInLegend: true,
							        tips: {
							            trackMouse: true,
							            width: 240,
							            height: 28,
							            renderer: function(storeItem, item) {
							                // calculate and display percentage on hover
							                var total = 0;
							                /*var store=Ext.data.StoreManager.map['core.smt_tp_kanban.store.sl.Store4'];
							                store.each(function(rec) {
							                    total += rec.get('count');
							                });*/
							                Ext.getCmp('piechart').store.each(function(record) {
							                    total += record.get('count');
							                });
							                this.setTitle(storeItem.get('type') + ': ' + storeItem.get('count'));
							            }
							        },
							        highlight: {
							            segment: {
							                margin: 5
							            }
							        },
							        label: {
							            field: 'type',
							            renderer:function(v,record,re1,re2){
							            	return re1.data.type+"/"+re1.data.count;
							            },
							        
							            display: 'under',
							            contrast: true,
							            font: '11px Helvetica, sans-serif'
							        }
							   }]
					    	}]	
			    			 
			    	  }
			    	 //第4个饼图
			    	]
			    	
			      } ,
		       
		 ]
		/**/	
});