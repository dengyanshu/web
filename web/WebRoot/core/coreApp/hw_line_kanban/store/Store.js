Ext.define("core.hw_line_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.hw_line_kanban.model.Model',
	autoLoad:true,
	proxy:{
		url:'/web/kanban/hw_sl_list!getResult2.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
	}
	
});