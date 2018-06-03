Ext.define("core.smt_sb_kanban.store.zj.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.smt_sb_kanban.model.zj.ListModel',
	proxy:{
		url:'/web/kanban/smt_sb!getResult_zj2.action',
		type:'ajax',
		reader:{
			type:'json',
			root:'data'
		}
	}
	
});