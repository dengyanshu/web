var mainPageItems=comm.get("mainPageItems");
Ext.define("core.sb_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.sb_kanban.model.Model',
    autoLoad:false,
    pageSize:mainPageItems,
    proxy: {
    	url:'/web/kanban/sb_kanban!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }  
});