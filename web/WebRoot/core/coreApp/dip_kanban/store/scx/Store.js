var mainPageItems=comm.get("mainPageItems");
//var pageItems=comm.get("pageItems");
Ext.define("core.dip_kanban.store.scx.Store",{
	extend:"Ext.data.Store",
  remoteSort:true,
    model:'core.dip_kanban.model.scx.Model',
    pageSize:mainPageItems,
    proxy: {
    	//url:'/web/kanban/dip_scx!getResult.action',
        	 type: 'pagingmemory',
             reader: {
                 type: 'json',
                 root:'data',
                 totalProperty: 'total'
             }
    }	
});