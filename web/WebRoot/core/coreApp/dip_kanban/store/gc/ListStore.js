Ext.define("core.dip_kanban.store.gc.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.dip_kanban.model.gc.ListModel',
	proxy:{
		url:'/web/kanban/dip_gc_list!getResult.action',
		type:'ajax',
		reader:{
			type:'json',
			root:'data'
		}
	}
	
});