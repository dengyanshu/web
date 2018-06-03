Ext.define("core.tj_led_kanban.store.zc.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    model:'core.tj_led_kanban.model.zc.Model',
    proxy: {
    	url:'/web/kanban/tj_led_zc!getResult.action',
        type: 'ajax',
        timeout:120000,
        reader: {
            type: 'json',
            root:'data'
            //totalProperty: 'total'
        }
    }	
});