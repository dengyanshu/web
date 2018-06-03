//var mainPageItems=comm.get("mainPageItems");
var pageItems=comm.get("pageItems");
Ext.define("core.dip_kanban.store.zcb.Store",{
	extend:"Ext.data.Store",
//    autoLoad:false,
    remoteSort:true,
//    pageSize:mainPageItems,
    model:'core.dip_kanban.model.zcb.Model',
    pageSize:15,
    proxy: {
//    	url:'/web/kanban/dip_zcb!getResult.action',
        type: 'pagingmemory',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});