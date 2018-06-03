Ext.define("core.smt_sb2_kanban.store.gd.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.smt_sb2_kanban.model.gd.ListModel',
	proxy:{
		url:'/web/kanban/smt_sb!getResult_gd2.action',
		type:'ajax',
		reader:{
			type:'json',
			root:'data'
		}
	}
	
});