var pageItems=comm.get("pageItems");
Ext.define("core.tj_led_kanban.store.mx.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    model:'core.tj_led_kanban.model.mx.Model',
    pageSize:pageItems,
    proxy: {
    	url:'/web/kanban/tj_led_mx!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});