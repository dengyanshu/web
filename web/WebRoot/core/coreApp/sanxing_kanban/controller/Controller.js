Ext.define("core.sanxing_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		MessageUtil : 'core.util.MessageUtil'
	},
	
	init : function() {
		
	},	
	views : ['core.sanxing_kanban.view.Main'],
		
	stores : ['core.sanxing_kanban.store.Store'],
	
	models : ['core.sanxing_kanban.model.Model']
});