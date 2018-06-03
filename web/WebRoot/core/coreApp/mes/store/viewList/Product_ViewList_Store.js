Ext.define("core.mes.store.viewList.Product_ViewList_Store",{
	extend:'Ext.data.Store',
   	model:'core.mes.model.viewList.Product_ViewList_Model',
   	autoLoad:false,
	proxy:{
		url:'/web/mes/overall/product_viewlist.action',
		type:'ajax',
		reader:{
    		type:'json',
    		root:'data'
		}
	}
	
});	
