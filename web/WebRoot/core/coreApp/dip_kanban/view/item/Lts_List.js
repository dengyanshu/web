Ext.define("core.dip_kanban.view.item.Lts_List",{
	extend:'Ext.window.Window',	
	frame:true,
	alias : 'widget.dip_lts_list_kb',
	width:500,
	maximized:true,
    layout: 'border',
    title:'产能工时效率汇总图',
    items:[
    	{
    		xtype:'grid',
    		store:'core.dip_kanban.store.lts.ListStore',
    		//frame:true,
    		collapsible:true,
    		height:370,
    		enableColumnHide:false,//隐藏列 
    		sortableColumns:false,///隐藏排序
    		region:'south',
    		columns:[ 			
    			{text:'日期',dataIndex:'Fdate',width:120},
    			{text:'班次',dataIndex:'Shift',width:120},
    			{text:'计划产量',dataIndex:'PlanSumQty',width:120},
    			{text:'实际产量',dataIndex:'ActualSumQty',width:120}, 			
    			{text:'生产达成率',dataIndex:'AchieveRate',width:120 ,renderer:function(value){
    	    			return value+"%";}},  			
    			{text:'标准总工时',dataIndex:'StandardTotalOfTime',width:120}, 			
    			{text:'实际总工时',dataIndex:'ActualLaborTime',width:120},
    			{text:'异常总工时',dataIndex:'UnusualLaborTime',width:120},   			
    			{text:'产能效率',dataIndex:'Efficiency',width:120,renderer:function(value){
        			return value+"%";}},
    			{text:'返工总工时',dataIndex:'ReMadeLaborTime',width:120}, 			
    			{text:'考勤总工时',dataIndex:'CheckinSumTime',width:120},  			
    			{text:'未上岗工时',dataIndex:'NotOnLaborTime',width:120}	
    		],
    		run:function(response, opts)
    		{
    			obj = Ext.decode(response.responseText);
    			var data=obj.data;
    			for(var i=0;i<data.length;i++){
    				alert(data[i].Fdate);
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
				}
			}	
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
				border:false,
				cls:'chartBody',
				theme:'Category4',
    			store:'core.dip_kanban.store.lts.ListStore',
				legend:{position:'top'},
				axes:[
					{
						type:'Numeric',
						position:'left',
						fields:['PlanSumQty','ActualSumQty'],
						title:'数量',
						grid:true,
						majorTickSteps:10,
						maximum:10
					},
					{
						type:'Numeric',
						position:'right',
						fields:['Efficiency'],
						title:'百分比'
					},
					{
						type:'Category',
						position:'bottom',
						fields:['Fdate'],
						title:'日期'
					}
				],
				series:[
					{
						type:'column',
						axis:'left',
						gutter:80,
						highlight:true,
						title:['实际数量'],
						xField:'Fdate',
						yField:['ActualSumQty'],
						stacked:true,
						tips:{
							trackMouse:true,
							width:100,
							height:28,
							renderer:function(storeItem,item){
								var value=Math.round(storeItem.data.ActualSumQty);
								this.setTitle("产量:"+value);
							}
						}
					},
					
					{
							type : 'line',
							axis : 'left',
							highlight : true,
							xField : 'Fdate',
							yField : 'PlanSumQty',
							title : '计划数量',
							markerConfig: { //标记配置
						  		type: 'cross', //交叉 size: 4, radius: 4,
						 	   'stroke-width': 5
						 	},
							label:{
								display:'over',
							   'text-anchor':'middle', 	// contrast:true,
								field:['PlanSumQty'], 
								orientation:'vertical',
								renderer:function(value,label){
									return Math.round(value);
								}	
							}
					},
 
			       {
			        	type:'line',
			           	axis:'right',
			            highlight:true,
			            xField:'Fdate',
			            yField:'AchieveRate',
			            title:'达成率',
			            tips:{
							trackMouse:true,
							width:100,
							height:30,
							renderer:function(storeItem,item){
								var value=Math.round(storeItem.data.AchieveRate*10)/10;
								this.setTitle("达成:"+value+"%");
							}
						},
						label:{
							display:'over',
						   'text-anchor':'middle', 	// contrast:true,
							field:['AchieveRate'], 
							orientation:'vertical',
							renderer:function(value,label){
								return Math.round(value*10)/10+"%";
							}	
						}
/*						label:{
		                  display: 'under',	//under inside End
		                  'text-anchor': 'middle',
		                  field: 'AchievingRate',
		                  font:'italic small-caps bold 8px Arial',
		                  //font:'11px Helvetica, sans-serif',
		                  renderer: function(value,label){
          				  	if (value >= 90) {
              					label.setAttributes({fill:'#00CC00'});
          					}else{
          						label.setAttributes({fill:'#FF0000'});
          					}
          					value = value+'%';
          					return value;
						},
		                  orientation: 'vertical'
		                  //color: '#3333FF'
		                }*/
		               
			        },
			        {
			            type:'line',
			            axis:'right',
			            highlight:true,
			            xField:'Fdate',
			            yField:'Efficiency',
			            title:'效率',
			            tips:{
							trackMouse:true,
							width:100,
							height:30,
							renderer:function(storeItem,item){
								var value=Math.round(storeItem.data.Efficiency*100)/100;
								this.setTitle("效率:"+value+"%");
							}
						},
						label:{
							display:'over',
						   'text-anchor':'middle', 	// contrast:true,
							field:['Efficiency'], 
							orientation:'vertical',
							renderer:function(value,label){
								label.setAttributes({fill:'#0000FF'});
								return Math.round(value*100)/100+"%";
							}	
						}
/*						label: {
		                  display: 'over',//under insideEnd
		                  'text-anchor': 'middle',
		                  field: 'BadRate',
		                  font:'italic small-caps bold 8px Arial',
		                  renderer: function(value,label){
          				  	if (value >= 90) {
              					label.setAttributes({fill:'#00CC00'});
          					}else{
          						label.setAttributes({fill:'#FF0000'});
          					}
          					value = value+'%';
          					return value;
						},
		                  orientation: 'vertical'
		                }*/
			        }
			        
				]
				
	    	}]
	
    	}
    ]
});