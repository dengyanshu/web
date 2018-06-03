 Ext.define("core.sys.dd.store.DDItemStore",{
	extend:"Ext.data.Store",
	model:factory.ModelFactory.getModelByName("com.desktop.core.dd.model.DictionaryItem","").modelName,
	proxy:{
		type:"ajax",		
		url:"/web/core/ddItemAction!load.action",
		extraParams:{
			orderSql:" order by orderIndex"
		},
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