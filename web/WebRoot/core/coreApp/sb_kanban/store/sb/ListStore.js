Ext.define("core.sb_kanban.store.sb.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.sb_kanban.model.sb.ListModel',
	proxy:{
		url:'/web/kanban/sb_kanban!getMaintenanceList.action',
		type:'ajax',
		reader:{
			type:'json',
			root:'data'
		}
	}
	
});