var mainPageItems=comm.get("mainPageItems");
Ext.define("core.xm_sc_kanban.store.sl.Store3",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.xm_sc_kanban.model.sl.Model3',
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult26.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});
