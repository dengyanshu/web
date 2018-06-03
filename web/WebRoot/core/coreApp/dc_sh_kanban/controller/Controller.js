var dc_sh_runner=new Ext.util.TaskRunner();
var dc_sh_list_task=null;

Ext.define("core.dc_sh_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		MessageUitl:'core.util.MessageUtil'
	},
	
	init : function() {
		var self=this;
		coreApp=self;
		this.control({
			'panel[xtype=dc_sh_kanban_result]':{
				afterrender:function(){
				 	dc_sh_list_task={
					   run:function(){
								var store = Ext.data.StoreManager.map['core.dc_sh_kanban.store.Store'];
								store.load();
								/*var result=self.ajax({url:'/web/kanban/dc_sh_kanban!getResult.action',params:{limit:4,page:1}});	
								if(result.success){
									store.proxy.data=result.data;
									store.load();
								}else{
									store.removeAll();
									self.msgbox(result.returnMsg);
								}*/
								
						},
						interval:60000
					};
					dc_sh_runner.start(dc_sh_list_task);
			}
		 },
		 	 
		 'window button[id=beginPage3]':{
				click:function( but, e, eOpts ){
					var store = Ext.data.StoreManager.map['core.dc_sh_kanban.store.Store'];
					store.load();
				}
			},
			'window[id=8a82809158e608020158e667e2be0002_win]':{
				beforehide:function(e,Opts){
					dc_sh_runner.stopAll();
				}
			}
	  });
	},	
	
	
	views : ['core.dc_sh_kanban.view.Main'
	,'core.dc_sh_kanban.view.ResultView'],
		
	stores : ['core.dc_sh_kanban.store.Store'
	],
	
	models : ['core.dc_sh_kanban.model.Model'
	]
});