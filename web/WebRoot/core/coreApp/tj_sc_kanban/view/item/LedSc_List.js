Ext.define("core.tj_sc_kanban.view.item.LedSc_List",{
	extend:'Ext.window.Window',	
	frame:true,
	alias : 'widget.tj_sc_led_list_kb',
	width:500,
	maximized:true,
    layout: 'border',
    title:'生产报表',
    items:[
    	{
    		xtype:'grid',
    		store:'core.tj_sc_kanban.store.led.ListStore',
    		//frame:true,
    		collapsible:true,
    		height:300,
    		region:'south',
    		columns:[
    			{text:'时间段',dataIndex:'Time',width:250},
    			{text:'目标',dataIndex:'StandardCapacity',width:180},
    			{text:'投入数',dataIndex:'InputCount',width:180},
    			{text:'实际值',dataIndex:'sj',width:180},
    			{text:'差异值',dataIndex:'cy',width:180,renderer:function(value){if(value<0){
    					var str=value.toString();return str.substring(1,str.length);}else{return "0";}}},
    			{text:'达成率',dataIndex:'AchievingRate',width:180,renderer:function(value){
    			return value+"%";}},
    			{text:'不良率',dataIndex:'BadRate',width:180,renderer:function(value){
    			return value+"%";}},
    			{text:'维修品数',dataIndex:'RepairCount',flex:1}
    		],
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
					
				}
			}
    	},
    	{
    		xtype:'grid',
    		store :'core.tj_sc_kanban.store.led.Store2',
    		region:'north',
    		height:57,
    		
    		columns : [
    		        {header : '序号',dataIndex : 'RowNum',flex : 0.4},
   					{header : '线别',dataIndex : 'WorkcenterName',flex : 1.4},
   					{header : '产出',dataIndex : 'SumYield',flex : 1.3},
   					{header : '工时',dataIndex : 'SumTime',flex : 1.3},
   					{header : 'UPH',dataIndex : 'UPHStanTime',flex : 1.3},
   					{header : 'APC',dataIndex : 'AvgYield',flex : 1.3},
   					{header : '总达成率',dataIndex : 'AchieveRate',flex : 1.6,renderer:function(value)
   						{
						return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus4(value);
						}
   					}
   					]},
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
				store:'core.tj_sc_kanban.store.led.ListStore',
				legend:{position:'top'},
				axes:[
					{
						type:'Numeric',
						position:'left',
						fields:['sj'],
						//title:'数量',
						grid:true,
						majorTickSteps:10,
						maximum:10
					},
					/*{
						type:'Numeric',
						position:'right',
						fields:['AchievingRate'],
						title:'百分比'
					},*/
					{
						type:'Category',
						position:'bottom',
						fields:['Time'],
						//title:'时间段'
					}
				],
				series:[
					{
						type:'column',
						axis:'left',
						gutter:80,
						highlight:true,
						title:['实际数量'],
						xField:'Time',
						yField:['sj'],
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
					
					{
							type : 'line',
							axis : 'left',
//							fill: '#FFF0FF', 
							highlight : true,
							xField : 'Time',
							yField : 'StandardCapacity',
							title : '标准产能',
							renderer: function(sprite, record, attributes, index, store) {
									if(record.data!=undefined){
											record.data.StandardCapacity=store.data.items[0].data.StandardCapacity;
									}
        							return attributes;
    						},
    						
    						
//    						label:{
//    						//	display:'over',
//    						//   'text-anchor':'middle', 	// contrast:true,
//    							field:['StandardCapacity'], 
//    							orientation:'vertical',
//    							renderer:function(value,label){
//    								label.setAttributes({fill:'#FFF0FF'});
//    								
//    							}
//    								
//    								
//    						},
	
							markerConfig: { //标记配置
						  		type: 'cross', //交叉 size: 4, radius: 4,
						 	   'stroke-width': 3
						 	} 
					},

			      /* {
			        	type:'line',
			           	axis:'right',
			            highlight:true,
			            xField:'Time',
			            yField:'AchievingRate',
			            title:'达成率',
			            tips:{
							trackMouse:true,
							width:100,
							height:30,
							renderer:function(storeItem,item){
								var value=Math.round(storeItem.data.AchievingRate*10)/10;
								this.setTitle("达成率为:"+value+"%");
							}
						},
						label:{
							display:'over',
						   'text-anchor':'middle', 	// contrast:true,
							field:['AchievingRate'], 
							orientation:'vertical',
							renderer:function(value,label){
								return Math.round(value*10)/10+"%";
							}	
						}

			        },*/
			     /*   {
			            type:'line',
			            axis:'right',
			            highlight:true,
			            xField:'Time',
			            yField:'BadRate',
			            title:'不良率',
			            tips:{
							trackMouse:true,
							width:100,
							height:30,
							renderer:function(storeItem,item){
								var value=Math.round(storeItem.data.BadRate*100)/100;
								this.setTitle("不良率为:"+value+"%");
							}
						},
						label:{
							display:'over',
						    'text-anchor':'middle', 	// contrast:true,
							field:['BadRate'], 
							orientation:'vertical',
							renderer:function(value,label){
								label.setAttributes({fill:'#0000FF'});
								return Math.round(value*100)/100+"%";
							}	
						}

			        }*/
				]
	    	}]
	
    	}
    ]
});