Ext.define("core.smt_sb_kanban.store.xz.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.smt_sb_kanban.model.xz.ListModel',
	proxy:{
		url:'/web/kanban/smt_sb!getResult_xz2.action',
		type:'ajax',
		reader:{
			type:'json',
			root:'data'
		}
	}
	
});