var mainPageItems=comm.get("mainPageItems");
Ext.define("core.dip_kanban.store.mt.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.dip_kanban.model.mt.Model',
    proxy: {
    	url:'/web/kanban/dip_mt!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});