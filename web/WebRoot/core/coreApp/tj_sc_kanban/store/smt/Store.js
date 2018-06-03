var mainPageItems=comm.get("mainPageItems");
Ext.define("core.tj_sc_kanban.store.smt.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.tj_sc_kanban.model.smt.Model',
    proxy: {
    	url:'/web/kanban/tj_sc_smt!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});