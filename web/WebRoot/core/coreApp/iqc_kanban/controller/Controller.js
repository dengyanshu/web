var iqc_runner=new Ext.util.TaskRunner();
var iqc_list_task=null;
Ext.define("core.iqc_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		MessageUitl:'core.util.MessageUtil'
	},
	
	init : function() {
		var self = this;
		coreApp = self;				
		this.control(
			{
				'iqc_kanban_listview':{
					afterrender:function(){
					 	iqc_list_task={
						   run:function(){
								var store = Ext.data.StoreManager.map['core.iqc_kanban.store.Store'];
								store.load();
						},
							interval:100000
					};
					iqc_runner.start(iqc_list_task);
				}
			 },
			
			'panel[xtype=iqc_kanban_listview]' : {
				cellclick : function(object, td, cellIndex, record, tr, rowIndex, e, eOpts) {			
					var TimeLinessRatioId=record.data.TimeLinessRatioId;
					var flag=cellIndex;
					if(flag==0||flag==2||flag==1){
						return;
					}
					if(TimeLinessRatioId==''){					
						return;
					}
					var win=Ext.create("core.iqc_kanban.view.ErrorLotList",{
					}).show();
					var mask=self.msg(win);
					var store=Ext.data.StoreManager.map['core.iqc_kanban.store.iqc.ListStore'];
					mask.show();
					store.removeAll();
					store.load({params:{TimeLinessRatioId:TimeLinessRatioId,flag:flag}});
					mask.hide();
				}
			},
			 	 	 
			'iqc_kanban_search button[ref=submit]':{
			   click:function(e,Opts){
		   	      var ser=e.ownerCt.ownerCt;
		          var dayBegin=ser.getForm().findField('dayBegin').getValue();
		          var dayEnd= ser.getForm().findField('dayEnd').getValue(); 
			  	  var store = Ext.data.StoreManager.map['core.iqc_kanban.store.Store'];
				  store.removeAll();
				  store.getProxy().extraParams={dayBegin:dayBegin,dayEnd:dayEnd};
				  store.load();
			   		}
				},
				 'window button[id=beginPage3]':{
						click:function( but, e, eOpts ){
							var store = Ext.data.StoreManager.map['core.iqc_kanban.store.Store'];
							store.load();
						}
					},
					'window[id=A97308AA2F5D40CF8DAEAB617392B2DB_win]':{					
						beforehide:function(e,Opts){
							iqc_runner.stopAll();
						}
				}
			}	
					
		);
	},


	views : ['core.iqc_kanban.view.Main',
		'core.iqc_kanban.view.SearchView',
		'core.iqc_kanban.view.ResultView',
		'core.iqc_kanban.view.ErrorLotList'
		],
		
	stores : ['core.iqc_kanban.store.Store',
	          'core.iqc_kanban.store.iqc.ListStore'
	],
	
	models : ['core.iqc_kanban.model.Model',
	          'core.iqc_kanban.model.iqc.ListModel'
	          ]
});