var pageItems=comm.get("pageItems");
Ext.define("core.tj_led_kanban.store.mx.ListStore",{
	extend:'Ext.data.Store',
	remoteSort:true,
   	model:'core.tj_led_kanban.model.mx.ListModel',
    pageSize:pageItems,
    proxy:{
    	type:'pagingmemory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
});