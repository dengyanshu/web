Ext.define("core.rbac.user.store.UserStore",{
	extend:"Ext.data.Store",
	model:factory.ModelFactory.getModelByName("com.desktop.rbac.model.EndUser","checked").modelName,
	proxy:{
		type:"ajax",
		url:"/web/rbac/userAction!load.action",
		extraParams :{whereSql: " and deptId in('ROOT')"},
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