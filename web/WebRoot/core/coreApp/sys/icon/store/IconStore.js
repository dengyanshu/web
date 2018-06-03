 Ext.define("core.sys.icon.store.IconStore",{
	extend:"Ext.data.Store",
	model:factory.ModelFactory.getModelByName("com.desktop.core.icon.model.SysIcon","").modelName,
	proxy:{
		type:"ajax",		
		url:"/web/core/iconAction!load.action",
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