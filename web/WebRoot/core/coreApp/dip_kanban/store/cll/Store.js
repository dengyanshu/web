var mainPageItems=comm.get("mainPageItems");
Ext.define("core.dip_kanban.store.cll.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.dip_kanban.model.cll.Model',
    proxy: {
    	url:'/web/kanban/dip_cll!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});