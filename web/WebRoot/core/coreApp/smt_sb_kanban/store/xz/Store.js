var mainPageItems=comm.get("mainPageItems");
Ext.define("core.smt_sb_kanban.store.xz.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.smt_sb_kanban.model.xz.Model',
    proxy: {
    	url:'/web/kanban/smt_sb!getResult_xz.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});