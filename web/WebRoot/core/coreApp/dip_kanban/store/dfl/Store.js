var mainPageItems=comm.get("mainPageItems");
Ext.define("core.dip_kanban.store.dfl.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.dip_kanban.model.dfl.Model',
    proxy: {
    	url:'/web/kanban/dip_dfl!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});