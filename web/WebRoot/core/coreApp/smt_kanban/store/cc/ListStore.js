Ext.define("core.smt_kanban.store.cc.ListStore",{
	extend:"Ext.data.Store",
    remoteSort:true,
    model:'core.smt_kanban.model.cc.ListModel',
    autoLoad:false,
    proxy: {
    	url:'/web/kanban/smt_cc_list!getResult.action',
        type: 'ajax',
        reader: {
            type: 'json',
            root:'data'
        }
    }	
});