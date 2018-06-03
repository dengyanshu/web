var pageItems=comm.get("pageItems");	
Ext.define("core.ck_kanban.store.smt.ll.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
   	model:'core.ck_kanban.model.smt.ll.ListModel',
    pageSize:pageItems,
    proxy:{
    	type:'ajax',								//pagingmemory 
    	url:'/web/kanban/ck_smt_ll_list!getResult.action',
    	reader:{
    		type:'json',
    		root:'data',
    		totalProperty: 'total'
    	}
    }
});