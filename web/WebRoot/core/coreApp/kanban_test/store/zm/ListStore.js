Ext.define("core.kanban_test.store.zm.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.kanban_test.model.zm.ListModel',
	proxy:{
		url:'/web/kanban/tj_sc_zm_list!getResult.action',
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