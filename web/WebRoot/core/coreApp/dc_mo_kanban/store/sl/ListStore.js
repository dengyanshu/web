//var pageItems=comm.get("pageItems");
Ext.define("core.dc_mo_kanban.store.sl.ListStore",{
	extend:"Ext.data.Store",
    remoteSort:false,
    model:'core.dc_mo_kanban.model.sl.ListModel',
    // groupField: 'flag',
    pageSize:1000,
    //autoLoad:false,
    
    groupField: 'PStockUserCode',
    /*sortInfo : {//排序
		 field : 'PStockUserCode',
		 direction : "ASC"
     },*/
     sorters: ["PStockUserCode","Num"],
    proxy: {
        type: 'pagingmemory',
        //pagingmemory
        reader: {
            type: 'json',
            root: 'data'
            //,totalProperty: 'total'
            
        }
    }	
});