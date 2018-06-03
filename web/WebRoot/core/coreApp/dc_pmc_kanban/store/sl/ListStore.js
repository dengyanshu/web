//var pageItems=comm.get("pageItems");
Ext.define("core.dc_pmc_kanban.store.sl.ListStore",{
	extend:"Ext.data.Store",
    //remoteSort:true,
    model:'core.dc_pmc_kanban.model.sl.ListModel',
     //groupField: 'flag',
    //pageSize:pageItems,
    //autoLoad:true,
     proxy: {
        type: 'ajax',
        url:'/web/kanban/ff_sl_list!getResult12.action',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }	
});