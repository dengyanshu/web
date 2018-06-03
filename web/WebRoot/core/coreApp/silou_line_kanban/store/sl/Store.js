Ext.define("core.silou_line_kanban.store.sl.Store",{
	extend:'Ext.data.Store',
	autoLoad:true,
	fields:[
		{name:'WorkcenterName'},
		{name:'WorkcenterId'}
		],
	proxy:{
		url:'/web/kanban/silou_line_kanban!getResult_mo.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
	}
	
	
});