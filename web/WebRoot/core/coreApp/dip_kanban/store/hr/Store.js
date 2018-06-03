Ext.define("core.dip_kanban.store.hr.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    model:'core.dip_kanban.model.hr.Model',
    proxy: {
    	url:'/web/kanban/dip_hr!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }
});