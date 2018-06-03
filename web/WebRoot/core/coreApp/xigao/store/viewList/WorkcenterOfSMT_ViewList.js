Ext.define("core.xigao.store.viewList.WorkcenterOfSMT_ViewList",{
	extend:'Ext.data.Store',
    model:'core.xigao.model.viewList.WorkcenterOfSMT_ViewList',
   	autoLoad:false,
	proxy:{
		url: '/web/mes/overall/workcenterOfSMT_viewlist.action',
		type:'ajax',
		reader:{
    		type:'json',
    		root:'data'
		}
	}
	
});	
