var mainPageItems=comm.get("mainPageItems");
Ext.define("core.tj_sc_kanban.store.led.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.tj_sc_kanban.model.led.Model',
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