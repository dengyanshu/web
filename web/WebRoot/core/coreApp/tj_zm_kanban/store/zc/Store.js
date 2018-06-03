Ext.define("core.tj_zm_kanban.store.zc.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    model:'core.tj_zm_kanban.model.zc.Model',
    proxy: {
    	url:'/web/kanban/tj_zm_zc!getResult.action',
        type: 'ajax',
        timeout:120000,
        reader: {
            type: 'json',
            root:'data'
            //totalProperty: 'total'
        }
    }	
});