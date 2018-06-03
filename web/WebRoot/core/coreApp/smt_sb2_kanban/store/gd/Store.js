var mainPageItems=comm.get("mainPageItems");
Ext.define("core.smt_sb2_kanban.store.gd.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.smt_sb2_kanban.model.gd.Model',
    proxy: {
    	url:'/web/kanban/smt_sb!getResult_gd_odm.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});