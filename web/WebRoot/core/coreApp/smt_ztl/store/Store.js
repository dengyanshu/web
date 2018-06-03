//var pageItems=comm.get("pageItems");
Ext.define("core.smt_ztl.store.Store",{
	extend:'Ext.data.Store',
	model:'core.smt_ztl.model.Model',
    //autoLoad:true,
    //pageSize:pageItems,
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult19.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
           // totalProperty: 'total'
        }
    }  
});