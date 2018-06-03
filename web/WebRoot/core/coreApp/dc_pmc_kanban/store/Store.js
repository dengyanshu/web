Ext.define("core.dc_pmc_kanban.store.Store",{
	extend:'Ext.data.Store',
	model:'core.dc_pmc_kanban.model.Model',
    //autoLoad:true,
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult8.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }  
});