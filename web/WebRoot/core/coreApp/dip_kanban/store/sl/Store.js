var mainPageItems=comm.get("mainPageItems");
Ext.define("core.dip_kanban.store.sl.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.dip_kanban.model.sl.Model',
    proxy: {
    	url:'/web/kanban/dip_sl!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});