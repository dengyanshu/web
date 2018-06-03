var mainPageItems=comm.get("mainPageItems");
Ext.define("core.dc_mo_kanban.store.sl.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.dc_mo_kanban.model.sl.Model',
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult11.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});

