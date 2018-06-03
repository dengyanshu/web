Ext.define("core.sx_line_kanban.view.ChartView",{
		    extend:'Ext.panel.Panel',
		    alias:'widget.sx_line_kanban_chartview',
    		region:'south',
    		frame:true,
    		layout:'fit',
    		height:270,
    		items:[{
    		    xtype:'chart',
	    		animate:true,
				shadow:true,
				theme:'Category4',
    			store:'core.sx_line_kanban.store.Store',
				legend:{position:'top'},
				axes:[
					{
						  title: '产出',
						type:'Numeric',
						position:'left',
						fields:['BC','MWT','CST'],
						 label: {
								                renderer: Ext.util.Format.numberRenderer('0,0')
								    },
						grid: {
									            odd: {  
	                                            opacity: 1,  
	                                            fill: '#ddd',  
	                                            stroke: '#bbb',  
	                                            'stroke-width': 0.5  
	                                            },
	                                             even: {  
	                                            opacity: 1,  
	                                            fill: '#CCFFFF',  
	                                            stroke: '#bbb',  
	                                            'stroke-width': 0.5  
	                                            }
								            },
						 minimum: 0,
				                			maximum: 500
					},{
						type:'Category',
						position:'bottom',
						fields:['time'],
						/*label: { 
						   rotate: { degrees: 45} 
						
						},*/
						 title: '时间'
					}
				],
				series:[
					{
			            type: 'line',
			            highlight: {
			                size: 7,
			                radius: 7
			            },
			            axis: 'left',
			            xField: 'time',
			            yField: 'BC',
			           /* label: {
                            display:'over',
                            'text-anchor': 'middle',
                            field: 'BC',
                            renderer: Ext.util.Format.numberRenderer('0'),
                           // orientation: 'vertical',
                            color: '#333'
                        },*/
			            tips:{
							trackMouse:true,
							width:365,
							height:28,
							renderer:function(storeItem,item){
								 this.setTitle('['+storeItem.get('time')+']BC站产出:'+ storeItem.get('BC') );
							}
						},
			            markerConfig: {
			                type: 'cross',
			                size: 4,
			                radius: 4,
			                'stroke-width': 0
			            }
			        },
			        {
			            type: 'line',
			            highlight: {
			                size: 7,
			                radius: 7
			            },
			            axis: 'left',
			            fill: true,
			            xField: 'time',
			            yField: 'MWT',
			             tips:{
							trackMouse:true,
							width:365,
							height:28,
							renderer:function(storeItem,item){
								 this.setTitle('['+storeItem.get('time')+']MWT站产出:'+ storeItem.get('MWT') );
							}
						},
			            markerConfig: {
			                type: 'circle',
			                size: 4,
			                radius: 4,
			                'stroke-width': 0
			            }
			        }
			        , {
			            type: 'line',
			            highlight: {
			                size: 7,
			                radius: 7
			            },
			            axis: 'left',
			            fill: true,
			            xField: 'time',
			            yField: 'CST',
			             tips:{
							trackMouse:true,
							width:365,
							height:28,
							renderer:function(storeItem,item){
								 this.setTitle('['+storeItem.get('time')+']CST站产出:'+ storeItem.get('CST') );
							}
						},
			            markerConfig: {
			                type: 'circle',
			                size: 4,
			                radius: 4,
			                'stroke-width': 0
			            }
			        }
				]
	    	}]
    	})