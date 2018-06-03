//var pageItems=comm.get("pageItems");
Ext.define("core.xm_oba.store.Store",{
	extend:'Ext.data.Store',
	model:'core.xm_oba.model.Model',
    autoLoad:true,
    //pageSize:pageItems,
    proxy: {
    	url:'/web/kanban/ff_sl_list!getResult18.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
           // totalProperty: 'total'
        }
    }  
});