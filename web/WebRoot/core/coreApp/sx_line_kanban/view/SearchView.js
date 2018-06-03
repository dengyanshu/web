var  yesterday=new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate()-1);

Ext.define("core.sx_line_kanban.view.SearchView", {
			extend : 'Ext.form.Panel',
			alias : 'widget.sx_line_kanban_search',
			region : 'north',
			bodyPadding : 5,
			bodyStyle: 'background:#006699; ',
			layout : 'column',
			fieldDefaults:{labelAlign:'right',labelWidth:55},
			////
			items : [ 
		        {
		        	 columnWidth:.2,
		        	 margin:5,
		        	xtype: 'datefield',
		        	fieldLabel:'日期(起)',
		        	width:150,
		        	editable:false,	//不可填写
		        	emptyText:'请选择查询日期',
		        	applyTo : 'txtDate', 
		        	format: 'Y-m-d',
		        	id:'chaxunrq',
		        	name : 'chaxunrq',
		        	maxValue: new Date(),
		        	value: new  Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-1)
		        	// new Date().getFullYear()+"-"+(new Date().getMonth()-1)+"-"+new Date().getDay()
		        },
		        {
		         	columnWidth:.15,
					xtype:'combo',
					margin:5,
					displayField:'time',
		        	valueField:'time',
		        	name:'time1',
		        	//fieldLabel:'线体',
		        	queryMode:'local',
		        	value:"08:00",
		        	store:Ext.create("Ext.data.Store",{
		        		fields:['time'],
		        		data:[
		        			{"time":"00:00"},
		        			{"time":"01:00"},
		        			{"time":"02:00"},
		        			{"time":"03:00"},
		        			{"time":"04:00"},
		        			{"time":"05:00"},
		        			{"time":"06:00"},
		        			{"time":"07:00"},
		        			{"time":"08:00"},
		        			{"time":"09:00"},
		        			{"time":"10:00"},
		        			{"time":"11:00"},
		        			{"time":"12:00"},
		        			{"time":"13:00"},
		        			{"time":"14:00"},
		        			{"time":"15:00"},
		        			{"time":"16:00"},
		        			{"time":"17:00"},
		        			{"time":"18:00"},
		        			{"time":"19:00"},
		        			{"time":"20:00"},
		        			{"time":"21:00"},
		        			{"time":"22:00"},
		        			{"time":"23:00"}
		        		]
		        	})
		        },
		        
		           {
		        	 columnWidth:.2,
		        	 margin:5,
		        	xtype: 'datefield',
		        	fieldLabel:'日期(止)',
		        	width:150,
		        	editable:false,	//不可填写
		        	emptyText:'请选择查询日期',
		        	applyTo : 'txtDate', 
		        	format: 'Y-m-d',
		        	id:'chaxunrq2',
		        	name : 'chaxunrq2',
		        	maxValue: new Date(),
		        	value: new Date()
		        },
		        
		         {
		         	columnWidth:.15,
					xtype:'combo',
					margin:5,
					displayField:'time',
		        	valueField:'time',
		        	name:'time2',
		        	//fieldLabel:'线体',
		        	value:"08:00",
		        	queryMode:'local',
		        	store:Ext.create("Ext.data.Store",{
		        		fields:['time'],
		        		data:[
		        			{"time":"00:00"},
		        			{"time":"01:00"},
		        			{"time":"02:00"},
		        			{"time":"03:00"},
		        			{"time":"04:00"},
		        			{"time":"05:00"},
		        			{"time":"06:00"},
		        			{"time":"07:00"},
		        			{"time":"08:00"},
		        			{"time":"09:00"},
		        			{"time":"10:00"},
		        			{"time":"11:00"},
		        			{"time":"12:00"},
		        			{"time":"13:00"},
		        			{"time":"14:00"},
		        			{"time":"15:00"},
		        			{"time":"16:00"},
		        			{"time":"17:00"},
		        			{"time":"18:00"},
		        			{"time":"19:00"},
		        			{"time":"20:00"},
		        			{"time":"21:00"},
		        			{"time":"22:00"},
		        			{"time":"23:00"}
		        		]
		        	})
		        },
		         {
		         	columnWidth:.3,
					xtype:'combo',
					margin:5,
					displayField:'statusV',
		        	valueField:'statusK',
		        	name:'line',
		        	fieldLabel:'线体',
		        	queryMode:'local',
		        	value:'L01',
		        	store:Ext.create("Ext.data.Store",{
		        		fields:['statusK','statusV'],
		        		data:[
		        			{"statusK":'L01',"statusV":'三星274AA自动化测试一线'},
		        			{"statusK":'L02',"statusV":'三星274AA自动化测试二线'},
		        			{"statusK":'L03',"statusV":'三星274AA自动化测试三线'},
		        			{"statusK":'L04',"statusV":'三星274AA自动化测试四线'}
		        			
		        		]
		        	})
		        }
		        
		       
			],
			buttons:[
				{text:'查找',ref:'submit'}
				
			]
		});