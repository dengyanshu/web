Ext.define("core.ff_line_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.ff_line_kanban.model.Model',
	autoLoad:true,
	proxy:{
		url:'/web/kanban/ff_line_lines!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
	}
	
});