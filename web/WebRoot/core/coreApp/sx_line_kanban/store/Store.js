Ext.define("core.sx_line_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.sx_line_kanban.model.Model',
    autoLoad:false,
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult14.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
    }  
});