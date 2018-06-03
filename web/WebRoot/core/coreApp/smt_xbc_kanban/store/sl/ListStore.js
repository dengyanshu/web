var pageItems=comm.get("pageItems");
Ext.define("core.smt_xbc_kanban.store.sl.ListStore",{
	extend:"Ext.data.Store",
    //remoteSort:true,
    model:'core.smt_xbc_kanban.model.sl.ListModel',
    //pageSize:pageItems,
    autoLoad:false,
    proxy: {
    	url:'/web/kanban/smt_xbc_sl_list!getResult.action',
        type: 'ajax',//pagingmemory
        reader: {
            type: 'json',
            root:'data'
           // totalProperty: 'total'
        }
    }	
});