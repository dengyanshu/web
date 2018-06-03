Ext.define("core.ck_kanban.store.bl.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:19,
    model:'core.ck_kanban.model.bl.Model',
    proxy: {
    	url:'/web/kanban/ck_bl.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});