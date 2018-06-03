var mainPageItems=comm.get("mainPageItems");
Ext.define("core.tj_sc_kanban.store.sh.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.tj_sc_kanban.model.sh.Model',
    proxy: {
    	url:'/web/kanban/tj_sc_sh!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});