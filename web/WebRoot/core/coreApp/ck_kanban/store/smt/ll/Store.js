var mainPageItems=comm.get("mainPageItems");
Ext.define("core.ck_kanban.store.smt.ll.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.ck_kanban.model.smt.ll.Model',
    proxy: {
    	url:'/web/kanban/ck_smt_ll!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});