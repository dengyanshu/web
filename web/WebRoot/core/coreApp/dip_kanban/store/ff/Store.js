var mainPageItems=comm.get("mainPageItems");
Ext.define("core.dip_kanban.store.ff.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.dip_kanban.model.ff.Model',
    proxy: {
    	url:'/web/kanban/dip_mt!getResult2.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});