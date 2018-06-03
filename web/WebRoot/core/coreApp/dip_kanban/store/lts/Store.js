//var mainPageItems=comm.get("mainPageItems");
//var pageItems=comm.get("pageItems");
Ext.define("core.dip_kanban.store.lts.Store",{
	extend:"Ext.data.Store",

    remoteSort:true,
    pageSize:15,
    model:'core.dip_kanban.model.lts.Model',

    proxy: {

        type: 'pagingmemory',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});