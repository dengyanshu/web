Ext.define("core.xm_sc_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.xm_sc_kanban.model.Model',
	autoLoad:true,
	proxy:{
		url:'/web/kanban/ff_sl_list!getResult24.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
	}
	
});