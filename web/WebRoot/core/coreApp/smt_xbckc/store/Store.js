//var pageItems=comm.get("pageItems");
Ext.define("core.smt_xbckc.store.Store",{
	extend:'Ext.data.Store',
	model:'core.smt_xbckc.model.Model',
    autoLoad:false,
    //pageSize:pageItems,
    proxy: {
    	//url:'/web/kanban/smt_xbckc_kanban!getResult.action',
        type: 'pagingmemory',
        reader: {
            type: 'json',
            root:'data'
           // totalProperty: 'total'
        }
    }  
});