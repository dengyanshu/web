Ext.define("core.silou_site_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.silou_site_kanban.model.Model',
    autoLoad:false,
    proxy: {
    	url:'/web/kanban/silou_site!getResult_new.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
    }  
});