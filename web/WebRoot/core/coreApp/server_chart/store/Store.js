Ext.define("core.server_chart.store.Store",{
	extend:'Ext.data.Store',
	model:'core.server_chart.model.Model',
   // autoLoad:true,
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult5.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
            //totalProperty: 'total'
        }
    }  
});