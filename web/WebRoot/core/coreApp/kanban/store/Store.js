Ext.define("core.kanban.store.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    model:'core.kanban.model.Model',
    proxy: {
    	url:'/web/kanban/kanban.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});