Ext.define("core.kanban.store.Store2",{
	extend:"Ext.data.Store",
    autoLoad:false,
    model:'core.kanban.model.Model2',
    proxy: {
    	url:'/web/kanban/pn_list.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
            //totalProperty: 'total'
        }
    }	
});