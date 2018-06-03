Ext.define("core.sb_kanban.view.SearchView", {
			extend : 'Ext.form.Panel',
			alias : 'widget.sb_kanban_search',
			region : 'north',
			bodyPadding : 5,
			bodyStyle: 'background:#006699; ',
			layout : 'column',
			fieldDefaults:{labelAlign:'right',labelWidth:60},
			items : [ 
			    {
			    columnWidth:.22,
			    margin:5,
			    xtype:'combo',
			    allowBlank:false,
			       displayField:'BelongDivision',
		        	valueField:'BelongDivision',
		        	name:'BelongDivision',
		        	fieldLabel:'事业部',
		        	queryMode:'local',
		        	store:Ext.create("Ext.data.Store",{
		        		fields:['BelongDivision','BelongDivision'],
		        		data:[
		        			{"BelongDivision":"第一事业部","BelongDivision":"第一事业部"},
		        			{"BelongDivision":"第二事业部","BelongDivision":"第二事业部"},
		        			{"BelongDivision":"第三事业部","BelongDivision":"第三事业部"},
		        			{"BelongDivision":"EMS制造中心","BelongDivision":"EMS制造中心"},
		        			
		        		]
		        	})
			    },
			    {
			    	 columnWidth:.22,
			    	 margin:5,
					xtype:'combo',
					displayField:'factory',
		        	valueField:'factory',
		        	name:'factory',
		        	fieldLabel:'厂区',
		        	queryMode:'local',
		        	store:Ext.create("Ext.data.Store",{
		        		fields:['factory','factory'],
		        		data:[
		        			{"factory":'松岗',"factory":'松岗'}
		        			
		        		]
		        	})
		        },
		        {
				    columnWidth:.22,
				    margin:5,
				    xtype:'combo',
				  //  allowBlank:false,
				       displayField:'InstrumentType',
			        	valueField:'InstrumentType',
			        	name:'InstrumentType',
			        	fieldLabel:'设备类型',
			        	queryMode:'local',
			        	store:Ext.create("Ext.data.Store",{
			        		fields:['InstrumentType','InstrumentType'],
			        		data:[
			        			{"InstrumentType":'仪器',"InstrumentType":'仪器'},
			        			{"InstrumentType":'工具',"InstrumentType":'工具'},
			        			{"InstrumentType":'设备',"InstrumentType":'设备'},
			        			{"InstrumentType":'治具',"InstrumentType":'治具'},
			        			
			        		]
			        	})
				    },
				    {
					    columnWidth:.22,
					    margin:5,
					    xtype:'combo',
					  //  allowBlank:false,
					       displayField:'UserDepartments',
				        	valueField:'UserDepartments',
				        	name:'UserDepartments',
				        	fieldLabel:'所属部门',
							store : 'core.sb_kanban.store.sb.Store',
							forceSelection :true
					    },
					    {
						    columnWidth:.22,
						    margin:5,
						    xtype:'combo',
						  //  allowBlank:false,
						       displayField:'StatusV',
					        	valueField:'StatusK',
					        	name:'status',
					        	fieldLabel:'设备状态',
					        	queryMode:'local',
					        	store:Ext.create("Ext.data.Store",{
					        		fields:['StatusK','StatusV'],
					        		data:[
					        			{"StatusK":'0',"StatusV":'在库'},
					        			{"StatusK":'1',"StatusV":'在使用'},
					        			{"StatusK":'R',"StatusV":'维修'},
					        			{"StatusK":'D',"StatusV":'废弃'},
					        			{"StatusK":'B',"StatusV":'退租'},
					        			
					        		]
					        	})
						    },
		        
		       
			],
			buttons:[
				{text:'查找',ref:'submit'}
				
			]
		});