var pageItems=comm.get("pageItems");
Ext.define("core.tj_zm_kanban.store.mx.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    model:'core.tj_zm_kanban.model.mx.Model',
    pageSize:pageItems,
    proxy: {
    	url:'/web/kanban/tj_zm_mx!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});