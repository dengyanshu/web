

Ext.define("core.xm_line_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		MessageUtil : 'core.util.MessageUtil'
	},
	
	init : function() {
		var self = this;
		coreApp = self;				
		this.control({
			'xm_line_kanban_search button[ref=submit]':{
			   click:function(e,Opts){
		   	      var   ser=e.ownerCt.ownerCt;
		   	      var  main=ser.ownerCt;
		          var   chaxunrq= Ext.Date.format(new Date(ser.getForm().findField('chaxunrq').getValue()),'Y-m-d'); 
		          var   chaxunrq2= Ext.Date.format(new Date(ser.getForm().findField('chaxunrq2').getValue()),'Y-m-d'); 
		          var  time1=ser.getForm().findField('time1').getValue();
		          var  time2=ser.getForm().findField('time2').getValue();
		          var   line=ser.getForm().findField('line').getValue();
		            
					var store = Ext.data.StoreManager.map['core.xm_line_kanban.store.Store'];
					store.removeAll();
					store.getProxy().extraParams={chaxunrq:chaxunrq,chaxunrq2:chaxunrq2,time1:time1,time2:time2,line:line};
					store.load();
			   }
			}
			
			
		});
	},	
	views : ['core.xm_line_kanban.view.Main',
	'core.xm_line_kanban.view.ResultView',
	'core.xm_line_kanban.view.SearchView',
	'core.xm_line_kanban.view.ChartView'
	],
		
	stores : ['core.xm_line_kanban.store.Store'
	],
	
	models : ['core.xm_line_kanban.model.Model']
});


