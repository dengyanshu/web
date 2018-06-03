var mainPageItems=comm.get("mainPageItems");
Ext.define("core.smt_kanban.store.cc.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.smt_kanban.model.cc.Model',
    proxy: {
    	url:'/web/kanban/smt_cc!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});