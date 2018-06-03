var mainPageItems=comm.get("mainPageItems");
Ext.define("core.dip_kanban.store.gc.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.dip_kanban.model.gc.Model',
    proxy: {
    	url:'/web/kanban/dip_gc!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});