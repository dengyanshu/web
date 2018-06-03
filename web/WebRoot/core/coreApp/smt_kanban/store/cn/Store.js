var mainPageItems=comm.get("mainPageItems");
Ext.define("core.smt_kanban.store.cn.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.smt_kanban.model.cn.Model',
    proxy: {
    	url:'/web/kanban/smt_cn!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});