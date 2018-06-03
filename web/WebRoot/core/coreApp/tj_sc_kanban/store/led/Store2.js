
Ext.define("core.tj_sc_kanban.store.led.Store2",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:1,
    model:'core.tj_sc_kanban.model.led.Model',
    proxy: {
    	url:'/web/kanban/tj_sc_led!getResult2.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});