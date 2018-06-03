Ext.define("core.smt_ztl.view.SearchView", {
			extend : 'Ext.form.Panel',
			alias : 'widget.smt_ztl_search',
			region : 'north',
			bodyPadding : 5,
			bodyStyle: 'background:#006699; ',
			layout : 'column',
			fieldDefaults:{labelAlign:'left',labelWidth:60},
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
							displayField:'line',
				        	valueField:'line',
				        	name:'line',
				        	fieldLabel:'线体',
				        	queryMode:'local',
				        	value:'1B-2FA-L01',
				        	store:Ext.create("Ext.data.Store",{
				        		fields:['line'],
				        		data:[
				        			{"line":'1B-2FA-L01'},
				        			{"line":'1B-2FA-L02'},
				        			{"line":'1B-2FA-L03'},
				        			{"line":'1B-2FA-L04'},
				        			{"line":'1B-2FA-L05'},
				        			{"line":'1B-2FA-L06'},
				        			{"line":'1B-2FA-L07'},
				        			{"line":'1B-2FA-L08'},
				        			{"line":'1B-2FA-L09'},
				        			{"line":'1B-2FA-L10'},
				        			{"line":'1B-2FA-L11'},
				        			{"line":'1B-2FA-L12'},
				        			{"line":'1B-2FA-L13'},
				        			{"line":'1B-2FA-L14'},
				        			{"line":'1B-2FA-L15'},
				        			{"line":'1B-2FA-L16'},
				        			{"line":'1B-2FA-L17'},
				        			{"line":'1B-2FA-L18'},
				        			{"line":'1B-2FA-L19'},
				        			{"line":'1B-2FA-L20'},
				        			{"line":'1B-2FA-L21'},
				        			{"line":'1B-2FA-L22'},
				        			{"line":'1B-2FA-L23'},
				        			{"line":'1B-2FA-L24'},
				        			{"line":'1B-2FA-L25'},
				        			{"line":'1B-2FA-L26'},
				        			{"line":'1B-2FB-L27'},
				        			{"line":'1B-2FB-L28'},
				        			{"line":'1B-2FB-L29'},
				        			{"line":'1B-2FB-L30'},
				        			{"line":'1B-2FB-L31'},
				        			{"line":'1B-2FB-L32'},
				        			{"line":'1B-2FB-L33'},
				        			{"line":'1B-2FB-L34'},
				        			{"line":'1B-2FB-L35'},
				        			{"line":'1B-2FB-L36'},
				        			{"line":'1B-2FB-L37'},
				        			{"line":'1B-2FB-L38'},
				        			{"line":'1B-2FB-L39'},
				        			{"line":'1B-2FB-L40'}
				        			
				        		]
				        	})
				        }
				        
				       
					],
			buttons:[
				{text:'查找',ref:'submit'}
				
			]
		});