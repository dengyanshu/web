var mainPageItems=comm.get("mainPageItems");
Ext.define("core.smt_sb2_kanban.store.gw.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.smt_sb2_kanban.model.gw.Model',
    proxy: {
    	url:'/web/kanban/smt_sb!getResult_gw_odm.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});