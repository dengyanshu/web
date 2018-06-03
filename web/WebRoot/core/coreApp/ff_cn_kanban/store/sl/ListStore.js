var pageItems=comm.get("pageItems");
Ext.define("core.ff_cn_kanban.store.sl.ListStore",{
	extend:"Ext.data.Store",
    remoteSort:true,
    model:'core.ff_cn_kanban.model.sl.ListModel',
    pageSize:pageItems,
    proxy: {
        type: 'pagingmemory',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});