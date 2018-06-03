Ext.define("core.mes.store.AllDataStore",{
	extend:'Ext.data.Store',
	model:'core.mes.model.AllDataModel',
	autoLoad:false,
	proxy:{
		url: '/web/mes/overall/all.action',	//testA/mes/baobiao/sljl.action
		type:'ajax',
		reader:{
			type:'json',
			root:'data'
		}
	}
	
});