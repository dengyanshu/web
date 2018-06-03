var pageItems=comm.get("pageItems");
Ext.define("core.ck_kanban.store.tomorrow_bl.ListStore",{
	extend:'Ext.data.Store',
	remoteSort:true,
   	model:'core.ck_kanban.model.bl.ListModel',
    pageSize:pageItems,
    proxy:{
    	type:'pagingmemory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
});