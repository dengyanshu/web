Ext.define("core.xm_sc_kanban.view.Item",{
		extend:'Ext.Panel',
		alias:'widget.xm_sc_kb_item',
		frame:true,
		layout:'border',
		/*
		 * 小米电视怪异 无法显示整个页面
		 * title:'<h1 style="color:gold;font-weight:bold;margin:0;text-align:center">卓翼科技第二事业部生产管理看板</h1>',
		titleAlign : 'center',*/
		fit:true,
		/*
		tbar: [
		       { xtype: 'button', text: '返回',name:'return'
		    	   , 
		       },
		      
		 ],*/
		 dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'top',
			    style: {
		            background: 'black',
		            margin:0
		            ,padding:0
		        },
			    items: [
			        { xtype: 'button', text: '返回',name:'return' }
			    ]
		}] ,
		
		 
		items:[
         //上部分
	      {
	    	  
		    	region:'north',
		    	height:'32%',
		    	layout:'border',
			    items:[
		    	    {
	    	    	 xtype:'form',
	    	    	 id:"xm_sc_form",
	    	    	 region:'north',
	    	    	 bodyStyle:"background:black;padding:5px",
	    	    	 border:false,
	    	    	 items:[
	    	    	        //第一排
	    	    	        {
	    	    	        	layout:'column',
	    	    	        	baseCls:'x-plain',
	    	    	        	items:[
								{
									xtype:'textfield',
									columnWidth:.15,
									readOnly : true,
					  				value:'线别',
					  				height:30,
					  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:15px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
					  				
								},
								{
									xtype:'textfield',
									columnWidth:.15,
									readOnly : true,
					  				height:30,
					  				name:'WorkcenterName',
					  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:15px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
					  				
								},
								{
									xtype:'textfield',
									columnWidth:.15,
									readOnly : true,
					  				value:'应到人数',
					  				height:30,
					  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:15px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
					  				
								},
								{
									xtype:'textfield',
									columnWidth:.15,
									readOnly : true,
					  				height:30,
					  				name:'NumOfPeople',
					  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:15px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
					  				
								},
								{
									xtype:'textfield',
									columnWidth:.15,
									readOnly : true,
					  				value:'日期',
					  				height:30,
					  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:15px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
					  				
								},
								{
									xtype:'textfield',
									columnWidth:.25,
									readOnly : true,
					  				height:30,
					  				name:"ProductDate",
					  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:15px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
								}
	    	    	            ]
	    	    	        },
	    	    	        
	    	    	        {
	    	    	        	layout:'column',
	    	    	        	baseCls:'x-plain',
	    	    	        	items:[
								{
									xtype:'textfield',
									columnWidth:.15,
									readOnly : true,
					  				value:'责任人',
					  				height:30,
					  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:15px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
					  				
								},
								{
									xtype:'textfield',
									columnWidth:.15,
									readOnly : true,
					  				height:30,
					  				name:"Responsible",
					  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:15px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
					  				
								},
								{
									xtype:'textfield',
									columnWidth:.15,
									readOnly : true,
					  				value:'实到人数',
					  				height:30,
					  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:15px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
					  				
								},
								{
									xtype:'textfield',
									columnWidth:.15,
									readOnly : true,
					  				height:30,
					  				name:'Attendence',
					  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:15px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
					  				
								},
								{
									xtype:'textfield',
									columnWidth:.15,
									readOnly : true,
					  				value:'一次直通率',
					  				height:30,
					  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:15px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
					  				
								},
								{
									xtype:'textfield',
									columnWidth:.25,
									readOnly : true,
					  				height:30,
					  				name:"pass_yield",
					  	    		fieldStyle:'text-align:center;color:gold;font-weight:bold;font-size:15px;background:none;border:2px green solid;border-bottom:2px green solid;' ,
								}
	    	    	            ]
	    	    	        }
	    	    	    ]
		    	   },
		    	   //上图第2部分
	    	       {
	    	    	xtype:'gridpanel',
	    	    	store:'core.xm_sc_kanban.store.sl.Store3',
		    		bodyStyle: 'background:green;',
		    		region:'center',
		    		 columnLines:true,
		    		 viewConfig:{
	    					forceFit:true,
	    					enableRowBody:true,
	    					getRowClass:function(record,rowIndex,p,store){
	    						var cls='';
	    						if(record.data.isAlert=="1"){ //等同于record.get('isAlert')
	    							cls="row-red .x-grid-cell";
	    						}else if(record.data.isAlert=="2"){
	    							cls="row-orange .x-grid-cell";
	    						}
	    						else {
	    							cls="row-green .x-grid-cell";
	    						}
	    						return cls;
	    					}
	    				},
		    		 columns:[
    					{text:'序号',dataIndex:'num',width:80,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:12px;"},
    					{text:'工单',dataIndex:'MOName',width:150,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:12px;"},
    					{text:'产品型号',dataIndex:'ProductFamilyName',width:150,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:12px;"},			
    					{text:'工单数量',dataIndex:'RequireQty',width:150,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:12px;"},			
    					{text:'当班计划',dataIndex:'SumPlanQty',width:100,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:12px;"},			
    					{text: '投入数',dataIndex:'SumQtyIN',width:100,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:12px;"},			
    					{text: '产出数',dataIndex:'SumQtyOut',width:100,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:12px;"},			
    					{text:'工单完成率',dataIndex:'MOFinish',flex:1,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:12px;"}
    					 
    				] 
    	        }
			    	       
			    ]
			  },
		       //中间图表
		      {
		    	xtype:'panel',
		    	region:'center',
		    	layout:"fit",
		    	bodyStyle: {
		    	    background: 'black',
		    	},
		    	items:[{
				    xtype:'chart',
		    		animate:true,
					shadow:true,
					theme:'Category4',
					store:'core.xm_sc_kanban.store.sl.Store1',
					legend:{position:'left'},
					axes:[
						{
							type:'Numeric',
							position:'left',
							fields:['biaochan','shichan'],
							//title:'生产数',
							//grid:true,
							
							majorTickSteps:10,
							maximum:10
						},
						{
							type:'Category',
							position:'bottom',
							label : {
								font : '11px Helvetica, sans-serif'
							},
							fields:['TimeSlice']
						}
					],
					series:[
						{
							type:'line',
							axis:'left',
							gutter:80,
							highlight:true,
							title:['标产'],
							xField:'TimeSlice',
							yField:['biaochan'],
							stacked:true
						},
						{
							type:'line',
							axis:'left',
							gutter:80,
							highlight:true,
							title:['实产'],
							xField:'TimeSlice',
							yField:['shichan'],
							label: {
	                            display: 'top',
	                            'text-anchor': 'middle',
	                            field: 'shichan',
	                            renderer: Ext.util.Format.numberRenderer('0'),
	                           // orientation: 'vertical',
	                            //color: '#333'
	                        },
							stacked:true
							,tips:{
								trackMouse:true,
								width:365,
								height:28,
								renderer:function(storeItem,item){
									 this.setTitle(storeItem.get('TimeSlice')+"共产出"+storeItem.get('shichan')  );
								}
							}
						}
						
				        
					]
		    	}]
		      } ,
		      
		      //下面是datagrid
		      {
		    	  
		    		xtype:'gridpanel',
			    	region:'south',
			    	height:'44%',
		    	    store:'core.xm_sc_kanban.store.sl.Store2',
		    		//bodyStyle: 'background:#006699;',
		    		bodyStyle: 'background:black;',
		    		 //hideHeaders:true,
		    		 columnLines:true,
		    		 
		    		 columns:[
		    					{text:'时间段',dataIndex:'y',width:75,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:10px;"},
		    					{text:'8:00/20:00<br/>9:00/21:00',dataIndex:'1',width:62,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:10px;"},
		    					{text:'9:00/21:00<br/>10:00/22:00',dataIndex:'2',width:68,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:10px;"},	
		    					{text:'10:00/22:00<br/>11:00/23:00',dataIndex:'3',width:68,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:10px;"},
		    					{text:'11:00/23:00<br/>12:00/00:00',dataIndex:'4',width:68,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:10px;"},
		    					{text:'12:00/00:00<br/>13:00/01:00',dataIndex:'5',width:68,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:10px;"},
		    					{text:'13:00/01:00<br/>14:00/02:00',dataIndex:'6',width:68,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:10px;"},
		    					{text:'14:00/02:00<br/>15:00/03:00',dataIndex:'7',width:68,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:10px;"},
		    					{text:'15:00/03:00<br/>16:00/04:00',dataIndex:'8',width:68,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:10px;"},
		    					{text:'16:00/04:00<br/>17:00/05:00',dataIndex:'9',width:68,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:10px;"},
		    					{text:'17:00/05:00<br/>18:00/06:00',dataIndex:'10',width:68,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:10px;"},
		    					{text:'18:00/06:00<br/>19:00/07:00',dataIndex:'11',width:68,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:10px;"},
		    					{text:'19:00/07:00<br/>20:00/08:00',dataIndex:'12',width:68,style:"background:black;text-align:'center';color:gold;font-weight:bold;font-size:10px;"},
		    					{text:'汇总',dataIndex:'13',width:75,style:{background:'black'}}			
		    					
    				],
    				viewConfig:{
    					forceFit:true,
    					enableRowBody:true,
    					getRowClass:function(record,rowIndex,p,store){
    						var cls='';
    						if(record.data.isAlert=="1"){ //等同于record.get('isAlert')
    							cls="row-red .x-grid-cell";
    						}else if(record.data.isAlert=="2"){
    							cls="row-orange .x-grid-cell";
    						}
    						else {
    							cls="row-green .x-grid-cell";
    						}
    						return cls;
    					}
    				}
    				
		    		 
		    		
		    	  
		    	  
		      }
		      
		    
			    	
		       
		 ]
		/**/	
});