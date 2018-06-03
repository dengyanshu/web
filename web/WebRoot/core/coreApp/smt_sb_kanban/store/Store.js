Ext.define("core.smt_sb_kanban.store.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    fields:
    [
		{name:'title'}
	],
    proxy: {
    	url:'/web/kanban/smt_sb!getResult_title.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});