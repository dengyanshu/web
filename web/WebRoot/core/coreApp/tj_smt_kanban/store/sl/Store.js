var mainPageItems=comm.get("mainPageItems");
Ext.define("core.tj_smt_kanban.store.sl.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.tj_smt_kanban.model.sl.Model',
    proxy: {
    	url:'/web/kanban/tj_smt_sl!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});