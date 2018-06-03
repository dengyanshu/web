Ext.define("core.sanxing_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.sanxing_kanban.model.Model',
    autoLoad:true,
     groupField: 'WG_WorkStation',
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult7.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }  
});