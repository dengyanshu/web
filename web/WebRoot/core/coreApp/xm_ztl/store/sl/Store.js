Ext.define("core.xm_ztl.store.sl.Store",{
	extend:'Ext.data.Store',
	model:'core.xm_ztl.model.sl.Model',
	autoLoad:true,
	proxy:{
		url:'/web/kanban/ff_sl_list!getResult17.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
	}
	
});