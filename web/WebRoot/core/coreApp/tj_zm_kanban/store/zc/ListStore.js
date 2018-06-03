var pageItems=comm.get("pageItems");
Ext.define("core.tj_zm_kanban.store.zc.ListStore",{
	extend:'Ext.data.Store',
	remoteSort:true,
   	model:'core.tj_zm_kanban.model.zc.ListModel',
    pageSize:pageItems,
    proxy:{
    	type:'pagingmemory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
});