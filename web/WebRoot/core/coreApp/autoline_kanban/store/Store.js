Ext.define("core.autoline_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.autoline_kanban.model.Model',
	//autoLoad:true,
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult13.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }  
});