
Ext.define("core.tj_sc_kanban.store.zm.Store2",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:1,
    model:'core.tj_sc_kanban.model.zm.Model',
    proxy: {
    	url:'/web/kanban/tj_sc_zm!getResult2.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});