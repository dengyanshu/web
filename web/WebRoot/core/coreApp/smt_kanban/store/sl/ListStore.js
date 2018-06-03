var pageItems=comm.get("pageItems");
Ext.define("core.smt_kanban.store.sl.ListStore",{
	extend:"Ext.data.Store",
    remoteSort:true,
    model:'core.smt_kanban.model.sl.ListModel',
    pageSize:pageItems,
    proxy: {
        type: 'pagingmemory',
        reader: {
            type: 'json',
            root:'data'
        }
    }
});