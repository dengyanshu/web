Ext.define("core.sys_stored_procedure.controller.Controller",{
	extend:'Ext.app.Controller',
	
	init:function(){
		var self=this;
		coreApp=self;
		this.control({
			'panel[xtype=sys_stored_procedure_navigation]':{
				itemdblclick : function(_this, record, item, index, e, eOpts) {
					Ext.Msg.alert("存储过程名", record.data.name);
				}
			}
		})
	},
	views:['core.sys_stored_procedure.view.Main','core.sys_stored_procedure.view.Navigation'],
	stores:['core.sys_stored_procedure.store.Store']
});