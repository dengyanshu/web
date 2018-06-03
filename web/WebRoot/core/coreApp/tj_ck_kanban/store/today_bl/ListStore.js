var pageItems=comm.get("pageItems");
Ext.define("core.tj_ck_kanban.store.today_bl.ListStore",{
	extend:'Ext.data.Store',
	remoteSort:true,
   	model:'core.tj_ck_kanban.model.bl.ListModel',
    pageSize:pageItems,
    proxy:{
    	type:'pagingmemory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
});