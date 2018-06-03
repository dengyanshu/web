var mainPageItems=comm.get("mainPageItems");
Ext.define("core.kanban_test.store.led.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.kanban_test.model.led.Model',
    proxy: {
    	url:'/web/kanban/tj_sc_led!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});