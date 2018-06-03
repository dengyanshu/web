//var pageItems=comm.get("pageItems");
Ext.define("core.xm_ztl.store.Store",{
	extend:'Ext.data.Store',
	model:'core.xm_ztl.model.Model',
    autoLoad:false,
    //pageSize:pageItems,
    proxy: {
    	//url:'/web/kanban/xm_ztl_kanban!getResult.action',
        type: 'pagingmemory',
        reader: {
            type: 'json',
            root:'data'
           // totalProperty: 'total'
        }
    }  
});