Ext.define("core.smt_sb2_kanban.store.gw.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.smt_sb2_kanban.model.gw.ListModel',
	proxy:{
		url:'/web/kanban/smt_sb!getResult_gw2.action',
		type:'ajax',
		reader:{
			type:'json',
			root:'data'
		}
	}
	
});