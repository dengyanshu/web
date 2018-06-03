Ext.define("core.silou_line_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.silou_line_kanban.model.Model',
    autoLoad:false,
    proxy: {
    	url:'/web/kanban/silou_line_kanban!getResult_new.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
    }  
});