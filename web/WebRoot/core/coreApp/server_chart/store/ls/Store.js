Ext.define("core.server_chart.store.ls.Store",{
	extend:'Ext.data.Store',
	autoLoad:true,
	fields:[
		{name:'cServer'}
		],
	proxy:{
		url:'/web/kanban/ff_sl_list!getResult6.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
	}
	
	
});