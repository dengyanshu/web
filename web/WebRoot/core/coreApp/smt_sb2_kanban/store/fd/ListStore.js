Ext.define("core.smt_sb2_kanban.store.fd.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.smt_sb2_kanban.model.fd.ListModel',
	proxy:{
		url:'/web/kanban/smt_sb!getResult_fd2.action',
		type:'ajax',
		reader:{
			type:'json',
			root:'data'
		}
	}
	
});