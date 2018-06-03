Ext.define("core.hw_mo_chart.store.Store",{
	extend:'Ext.data.Store',
	model:'core.hw_mo_chart.model.Model',
   // autoLoad:true,
    proxy: {
    	url:'/web/kanban/hw_sl_list!getResult_chart.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
            //totalProperty: 'total'
        }
    }  
});