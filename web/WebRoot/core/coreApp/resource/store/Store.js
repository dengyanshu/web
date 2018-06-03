Ext.define("core.resource.store.Store", {
	extend : 'Ext.data.Store',
	model : 'core.resource.model.Model',
	autoLoad : false,
	proxy : {
	type : 'ajax',
	url:'/web/technology/resource!getResult.action',
	reader : {
		type : 'json',
		root : 'data'
	}}
});