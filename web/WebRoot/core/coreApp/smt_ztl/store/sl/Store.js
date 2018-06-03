//var pageItems=comm.get("pageItems");
Ext.define("core.smt_ztl.store.sl.Store",{
	extend:'Ext.data.Store',
	model:'core.smt_ztl.model.sl.Model',
    //autoLoad:true,
    //pageSize:pageItems,
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult20.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
           // totalProperty: 'total'
        }
    }  
});