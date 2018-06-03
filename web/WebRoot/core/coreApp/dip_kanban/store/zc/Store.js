var mainPageItems=comm.get("mainPageItems");
Ext.define("core.dip_kanban.store.zc.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.dip_kanban.model.zc.Model',
    proxy: {
    	url:'/web/kanban/dip_zc!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});