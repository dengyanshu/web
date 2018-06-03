Ext.define("core.tj_sc_kanban.store.smt.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.tj_sc_kanban.model.smt.ListModel',
	proxy:{
		url:'/web/kanban/tj_sc_smt_list!getResult.action',
		type:'ajax',
		reader:{
			type:'json',
			root:'data'
		}
	}
	/*
	extend:'Ext.data.Store',
	remoteSort:true,
   	model:'core.tj_ck_kanban.model.bl.ListModel',
    //pageSize:27,
    proxy:{
    	type:'pagingmemory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
	*/
});