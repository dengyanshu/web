Ext.define("core.silou_line_kanban.view.SearchView", {
			extend : 'Ext.form.Panel',
			alias : 'widget.silou_line_kanban_search',
			region : 'north',
			bodyPadding : 5,
			bodyStyle: 'background:#006699; ',
			layout : 'column',
			fieldDefaults:{labelAlign:'right',labelWidth:55},
			////
			items : [ 
			    {
			    columnWidth:.22,
			    margin:5,
			    xtype:'combo',
			    allowBlank:false,
			       displayField:'WorkcenterName',
		        	valueField:'WorkcenterId',
		        	name:'WorkcenterId',
		        	fieldLabel:'线别',
					store : 'core.silou_line_kanban.store.sl.Store',
					forceSelection :true
			    },
			    {
			    	 columnWidth:.18,
			    	 margin:5,
					xtype:'combo',
					displayField:'statusV',
		        	valueField:'statusK',
		        	name:'status',
		        	fieldLabel:'制程',
		        	queryMode:'local',
		        	store:Ext.create("Ext.data.Store",{
		        		fields:['statusK','statusV'],
		        		data:[
		        			{"statusK":'DIP',"statusV":'DIP'},
		        			{"statusK":'Assy',"statusV":'Assy'},
		        			{"statusK":'Test',"statusV":'Test'},
		        			{"statusK":'Test1',"statusV":'Test1'},
		        			{"statusK":'Packing',"statusV":'Packing'}
		        			
		        		]
		        	})
		        },

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
		        	value: new Date()
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
		         	 columnWidth:.2,
					xtype:'combo',
					margin:5,
					displayField:'statusV',
		        	valueField:'statusK',
		        	name:'banci',
		        	fieldLabel:'班次',
		        	queryMode:'local',
		        	store:Ext.create("Ext.data.Store",{
		        		fields:['statusK','statusV'],
		        		data:[
		        			{"statusK":'1',"statusV":'白班'},
		        			{"statusK":'2',"statusV":'夜班'}
		        			
		        		]
		        	})
		        }
		        
		       
			],
			buttons:[
				{text:'查找',ref:'submit'}
				
			]
		});