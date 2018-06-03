Ext.define("core.iqc_kanban.store.iqc.ListStore",{
	extend:'Ext.data.Store',
	autoLoad:false,
	model:'core.iqc_kanban.model.iqc.ListModel',
	proxy:{
		url:'/web/kanban/iqc_kanban!getErrorLotList.action',
		type:'ajax',
		reader:{
			type:'json',
			root:'data'
		}
	}
	
});