Ext.define("core.resource.store.Store3", {
	extend : 'Ext.data.Store',
	model : 'core.resource.model.Model3',
	autoLoad : false,
	proxy : {
		type : 'ajax',
		url:'/web/technology/resource!getResult3.action',
		reader : {
			type : 'json',
			root : 'data'
		}
	}


});