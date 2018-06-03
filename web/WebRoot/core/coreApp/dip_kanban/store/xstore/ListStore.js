////var mainPageItems=comm.get("mainPageItems");
//Ext.define("core.dip_kanban.store.xstore.ListStore",{
//	extend:"Ext.data.Store",
//    autoLoad:false,
////    pageSize:mainPageItems,
//    model:'core.dip_kanban.model.xstore.ListModel',
//    proxy: {
//    	url:'/web/kanban/dip_xstore_list!getResult.action',
//        type: 'ajax',
//        reader: {
//            type: 'json',
//            root:'data'
//        }
//    }	
//});

Ext.define("core.dip_kanban.store.xstore.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.dip_kanban.model.xstore.ListModel',
	proxy:{
		url:'/web/kanban/dip_xstore_list!getResult.action',
		type:'ajax',
		reader:{
			type:'json',
			root:'data'
		}
	}	
});