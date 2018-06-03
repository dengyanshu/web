Ext.define("core.dc_mo_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.dc_mo_kanban.model.Model',
	autoLoad:true,
	proxy:{
		url:'/web/kanban/ff_sl_list!getResult9.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
	}
	
});