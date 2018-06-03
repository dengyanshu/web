var pageItems=Math.ceil((comm.get("screenHeight") -38-32-40-6)/25.5);	
Ext.define("core.ck_kanban.store.bl.ListStore",{
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