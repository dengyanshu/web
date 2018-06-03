var mainPageItems=comm.get("mainPageItems");
Ext.define("core.tj_smt_kanban.store.cn.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.tj_smt_kanban.model.cn.Model',
    proxy: {
    	url:'/web/kanban/tj_smt_cn!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});