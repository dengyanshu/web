var mainPageItems=comm.get("mainPageItems");
Ext.define("core.tj_ck_kanban.store.today_bl.dip.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.tj_ck_kanban.model.bl.Model',
    proxy: {
    	url:'/web/kanban/tj_ck_today_dip_bl!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});