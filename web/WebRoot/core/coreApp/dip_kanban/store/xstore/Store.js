var mainPageItems=comm.get("mainPageItems");
Ext.define("core.dip_kanban.store.xstore.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.dip_kanban.model.xstore.Model',
    proxy: {
    	url:'/web/kanban/dip_xstore!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});