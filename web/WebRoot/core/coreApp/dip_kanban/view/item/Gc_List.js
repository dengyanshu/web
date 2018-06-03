Ext.define("core.dip_kanban.view.item.Gc_List",{
	extend:'Ext.window.Window',	
	frame:true,
	alias : 'widget.dip_gc_list_kb',
	width:500,
	maximized:true,
    layout: 'border',
    title:'规程明细',
    items:[
    	{
    		xtype:'grid',
    		store:'core.dip_kanban.store.gc.ListStore',
    		//frame:true,
    		collapsible:true,
    		height:370,
    		region:'south',
    		columns:[
    			{text:'规程名',dataIndex:'SpecificationDescription',width:'25%'},
    			{text:'数量',dataIndex:'Qty',width:'25%'},
    			{text:'规程开始时间',dataIndex:'FirtTime',width:'25%'},
    			{text:'最近更新时间',dataIndex:'LastTime',width:'25%'}
    			
    		],
    		run:function(response, opts)
    		{
    			obj = Ext.decode(response.responseText);
    			var data=obj.data;
    			for(var i=0;i<data.length;i++){
    				alert(data[i].Qty);
				}
    		},
    		viewConfig:{
				forceFit:true,
				enableRowBody:true,
				getRowClass:function(record,rowIndex,p,store){
					var cls='';
					if(rowIndex%2==0){
						cls="row-qianlan .x-grid-cell";
					}else{
						cls="row-qianchen .x-grid-cell";
					}
					return cls;
					}}
    	},
    	
    	{
    		xtype:'panel',
    		region:'center',
    		frame:true,
    		layout:'fit',
    		items:[{
    		    xtype:'chart',
	    		animate:true,
				shadow:true,
				theme:'Category4',
    			store:'core.dip_kanban.store.gc.ListStore',
				legend:{position:'top'},
				axes:[
					{
						type:'Numeric',
						position:'left',
						fields:['Qty'],
						//title:'',
						grid:true,
						majorTickSteps:10,
						maximum:10
					},{
						type:'Category',
						position:'bottom',
						fields:['SpecificationDescription'],
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
						title:['实际数量'],
						label: {
                            display: 'insideEnd',
                            'text-anchor': 'middle',
                            field: 'Qty',
                            renderer: Ext.util.Format.numberRenderer('0'),
                           // orientation: 'vertical',
                            color: '#333'
                        },
						xField:'SpecificationDescription',
						yField:['Qty'],
						stacked:true,
						tips:{
							trackMouse:true,
							width:65,
							height:28,
							renderer:function(storeItem,item){
								this.setTitle(String(item.value[1]));
							}
						}
					},
//					{
//							type : 'line',
//							axis : 'left',
//							highlight : true,
//							xField : 'Time',
//							yField : 'StandardCapacity',
//							title : '标准产能',
//							markerConfig: { //标记配置
//						  		type: 'cross', //交叉 size: 4, radius: 4,
//						 	   'stroke-width': 5
//						 	} 
//					}
			        
			        
				]
				
	    	}]
	
    	}
    ]
});