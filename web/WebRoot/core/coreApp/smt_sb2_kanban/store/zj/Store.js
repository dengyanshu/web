var mainPageItems=comm.get("mainPageItems");
Ext.define("core.smt_sb2_kanban.store.zj.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.smt_sb2_kanban.model.zj.Model',
    proxy: {
    	url:'/web/kanban/smt_sb!getResult_zj_odm.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});