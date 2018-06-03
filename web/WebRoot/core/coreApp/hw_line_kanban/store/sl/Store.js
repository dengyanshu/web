var mainPageItems=comm.get("mainPageItems");
Ext.define("core.hw_line_kanban.store.sl.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.hw_line_kanban.model.sl.Model',
    proxy: {
    	url:'/web/kanban/hw_sl_list!getResult3.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});

