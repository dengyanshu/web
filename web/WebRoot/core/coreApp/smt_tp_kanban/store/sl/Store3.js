var mainPageItems=comm.get("mainPageItems");
Ext.define("core.smt_tp_kanban.store.sl.Store3",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.smt_tp_kanban.model.sl.Model3',
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult22_3.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});

