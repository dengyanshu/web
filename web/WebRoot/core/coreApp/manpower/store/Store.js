Ext.define("core.manpower.store.Store", {
	extend : 'Ext.data.Store',
	model : 'core.manpower.model.Model',
	autoLoad : false,
//	data: [
//	    	{name:"制造人力",data:30},
//	    	{name:"制造间接",data:30},
//	    	{name:"工程间接",data:30},
//	    	{name:"品质间接",data:10}
//	],
//	proxy : {
//		type : 'ajax',
//		url:'/web/technology/manpower!getResult.action',
//		reader : {
//			type : 'json',
//			root : 'data'
//		}
//	}

	proxy : {
	type : 'ajax',
	url:'/web/technology/manpower!getResult.action',
	reader : {
		type : 'json',
		root : 'data'
	}
}

});