 Ext.define("core.sys.dd.store.DDStore",{
	extend:"Ext.data.Store",
	model:factory.ModelFactory.getModelByName("com.desktop.core.dd.model.Dictionary","").modelName,
	proxy:{
		type:"ajax",		
		url:"/web/core/ddAction!load.action",
		reader:{
			type:"json",
			root:"rows",
			totalProperty :'totalCount'
		},
		writer:{
			type:"json"
		}
	},
	autoLoad:true
 });