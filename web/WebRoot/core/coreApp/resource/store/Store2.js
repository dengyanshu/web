
Ext.define("core.resource.store.Store2",{
	extend:'Ext.data.Store',
	model:'core.resource.model.Model2',
	autoLoad:true,


	//autoLoad : false,

	proxy : {
		type : 'ajax',
		url:'/web/technology/resource!getResult2.action',
		reader : {
			type : 'json',
			root : 'data'
		}
	}
});