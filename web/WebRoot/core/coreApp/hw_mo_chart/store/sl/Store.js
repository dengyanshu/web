Ext.define("core.hw_mo_chart.store.sl.Store",{
	extend:'Ext.data.Store',
	model:'core.hw_mo_chart.model.sl.Model',
	autoLoad:true,
	proxy:{
		url:'/web/kanban/hw_sl_list!getResult_chart2.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
	}
	
});