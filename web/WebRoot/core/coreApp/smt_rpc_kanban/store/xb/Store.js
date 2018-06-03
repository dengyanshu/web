var mainPageItems=comm.get("mainPageItems");
Ext.define("core.smt_rpc_kanban.store.xb.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.smt_rpc_kanban.model.xb.Model',
    proxy: {
    	url:'/web/kanban/smt_rpc_xb!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});

