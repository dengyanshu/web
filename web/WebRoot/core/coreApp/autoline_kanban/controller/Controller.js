var autoline_runner=new Ext.util.TaskRunner();
var autoline_list_task=null;


Ext.define("core.autoline_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		MessageUtil : 'core.util.MessageUtil'
	},
	
	init : function() {
		var self=this;
		coreApp=self;
		this.control({
			'panel[xtype=autoline_kanban_result]':{
				afterrender:function(){
				 	autoline_list_task={
					   run:function(){
								var store = Ext.data.StoreManager.map['core.autoline_kanban.store.Store'];
								store.load();
						},
						interval:60000
					};
					autoline_runner.start(autoline_list_task);
			}
		 },
		 
		 'window[id=8a8280915c1e0184015c1e7b2ef40001_win]':{
				beforehide:function(e,Opts){
					autoline_runner.stopAll();
				}
		}
		 
		 
	   }
	  );
	},
	
	
	
	views : ['core.autoline_kanban.view.Main'
	,'core.autoline_kanban.view.ResultView'
	],
		
	stores : ['core.autoline_kanban.store.Store'],
	
	models : ['core.autoline_kanban.model.Model']
});