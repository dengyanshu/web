var pageItems=comm.get("pageItems");
Ext.define("core.hw_line_kanban.store.sl.ListStore",{
	extend:"Ext.data.Store",
    remoteSort:true,
    model:'core.hw_line_kanban.model.sl.ListModel',//core.ff_line_kanban.model.sl.ListModel
    pageSize:pageItems,
    proxy: {
        type: 'pagingmemory',
        reader: {
            type: 'json',
            root: 'data'
        }
    }	
});