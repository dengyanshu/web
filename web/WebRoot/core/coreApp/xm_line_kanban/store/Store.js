Ext.define("core.xm_line_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.xm_line_kanban.model.Model',
    autoLoad:false,
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult23.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
    }  
});