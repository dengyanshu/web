
Ext.define("core.dip_kanban.store.zcb.Store2",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:1,
    model:'core.dip_kanban.model.zcb.Model2',
    proxy: {
    	url:'/web/kanban/dip_zcb!getResult2.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});