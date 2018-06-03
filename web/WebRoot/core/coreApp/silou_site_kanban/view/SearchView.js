Ext.define("core.silou_site_kanban.view.SearchView", {
			extend : 'Ext.form.Panel',
			alias : 'widget.silou_site_kanban_search',
			region : 'north',
			bodyPadding : 5,
			bodyStyle: 'background:#006699; ',
			layout : 'column',
			fieldDefaults:{labelAlign:'right',labelWidth:55},
			////
			items : [ 
			{
				columnWidth:.18,
			    margin:5,
					xtype:'combo',
					displayField:'statusV',
		        	valueField:'statusV',
		        	name:'status',
		        	fieldLabel:'车间',
		        	queryMode:'local',
		        	store:Ext.create("Ext.data.Store",{
		        		fields:['statusK','statusV'],
		        		data:[
		        		    {"statusK":'SIT10000000L',"statusV":'1B-3FA'},
		        		    {"statusK":'SIT10000000R',"statusV":'1B-3FB'},
		        			{"statusK":'SIT10000000K',"statusV":'1B-4FA'},
		        			{"statusK":'SIT10000000Q',"statusV":'1B-4FB'},
		        			{"statusK":'SIT10000000H',"statusV":'1B-6FA'},
		        			{"statusK":'SIT10000000J',"statusV":'1B-6FB'}
		        		]
		        	}),
		        	listeners:{ 
		        	   blur : function(f){
					    	Ext.getCmp("WorkcenterId_4d").setValue('');
					    	var childStore = Ext.data.StoreManager.map['core.silou_line_kanban.store.sl.Store'];
					    	childStore.removeAll();
							childStore.getProxy().extraParams={site:this.value};
							childStore.load();
	   			      }  
		           }
			   },
			    {
			    id:'WorkcenterId_4d',
			    columnWidth:.22,
			    margin:5,
			    xtype:'combo',
			    allowBlank:false,
			       displayField:'WorkcenterName',
		        	valueField:'WorkcenterId',
		        	name:'WorkcenterId',
		        	fieldLabel:'线别',
					store : 'core.silou_line_kanban.store.sl.Store'
				
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
		        	id:'chaxunrq_site',
		        	name : 'chaxunrq_site',
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
		        	id:'chaxunrq_site2',
		        	name : 'chaxunrq_site2',
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