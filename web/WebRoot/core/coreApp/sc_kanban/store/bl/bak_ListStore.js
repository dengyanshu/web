Ext.define("core.ck_kanban.store.bl.ListStore",{
	extend:"Ext.data.Store",
    autoLoad:false,
    model:'core.ck_kanban.model.bl.ListModel',
    proxy: {
    	url:'/web/kanban/ck_bl_list.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
            //totalProperty: 'total'
        }
    }	
});