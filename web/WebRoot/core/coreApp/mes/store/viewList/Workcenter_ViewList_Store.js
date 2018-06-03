Ext.define("core.mes.store.viewList.Workcenter_ViewList_Store",{
	extend:'Ext.data.Store',
    model:'core.mes.model.viewList.Workcenter_ViewList_Model',
   	autoLoad:false,
	proxy:{
		url:'/web/mes/overall/workcenter_viewlist.action',
		type:'ajax',
		reader:{
    		type:'json',
    		root:'data'
		}
	}
	
});	
