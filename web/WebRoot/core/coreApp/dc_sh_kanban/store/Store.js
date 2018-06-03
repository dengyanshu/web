var mainPageItems=comm.get("mainPageItems");
Ext.define("core.dc_sh_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.dc_sh_kanban.model.Model',
	autoLoad:false,
    pageSize:mainPageItems,
    proxy: {
    	url:'/web/kanban/dc_sh_kanban!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }  
});