Ext.define("core.manpower.store.Store3", {
	extend : 'Ext.data.Store',
	model : 'core.manpower.model.Model3',
	autoLoad : false,
	proxy : {
		type : 'ajax',
		url:'/web/technology/manpower!getResult3.action',
		reader : {
			type : 'json',
			root : 'data'
		}
	}


});