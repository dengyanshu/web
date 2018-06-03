Ext.define("core.kanban.controller.Controller",{
	extend:'Ext.app.Controller',
	
	init:function(){
		var self=this;
		
		this.control({
		
		});
	},
	
	views:[
		'core.kanban.base.BaseTree',
		'core.kanban.view.Main',
		'core.kanban.view.Navigation',
		'core.kanban.view.Content'
	],
	stores:[],
	models:[]
});