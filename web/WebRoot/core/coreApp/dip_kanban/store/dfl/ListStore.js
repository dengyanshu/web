Ext.define("core.dip_kanban.store.dfl.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.dip_kanban.model.dfl.ListModel',
	proxy:{
		url:'/web/kanban/dip_dfl_list!getResult.action',
		type:'ajax',
		reader:{
			type:'json',
			root:'data'
		}
	}
	
});