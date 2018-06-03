Ext.define("core.xigao.store.viewList.MOName_SMT_ViewList_Store",{
	extend:'Ext.data.Store',
   	model:'core.xigao.model.viewList.MOName_SMT_ViewList_Model',
   	autoLoad : false,
	pageSize : 15,
	proxy:{
		url:'/web/mes/overall/moname_smt_viewlist.action',
		type:'ajax',
		reader:{
    		type:'json',
    		root:'data',
    		totalProperty : 'total'
		}
	}
	
});	
