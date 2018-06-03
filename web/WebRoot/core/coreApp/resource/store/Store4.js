Ext.define("core.resource.store.Store4", {
	extend : 'Ext.data.Store',
	model : 'core.resource.model.Model4',
	autoLoad : false,
	proxy : {
	type : 'ajax',
	url:'/web/technology/resource!getResult5.action',
	reader : {
		type : 'json',
		root : 'data'
	}}
});