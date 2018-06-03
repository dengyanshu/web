var mainPageItems=comm.get("mainPageItems");
Ext.define("core.smt_sb2_kanban.store.fd.Store",{
	extend:"Ext.data.Store",
    autoLoad:false,
    pageSize:mainPageItems,
    model:'core.smt_sb2_kanban.model.fd.Model',
    proxy: {
    	url:'/web/kanban/smt_sb!getResult_fd_odm.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data',
            totalProperty: 'total'
        }
    }	
});