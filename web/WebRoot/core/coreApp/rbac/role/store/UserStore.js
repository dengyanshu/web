Ext.define("core.rbac.role.store.UserStore",{
	extend:"Ext.data.Store",
	model:factory.ModelFactory.getModelByName("com.desktop.rbac.model.EndUser","checked").modelName,
	proxy:{
		type:"ajax",
		url:"/web/rbac/roleAction!loadUsers.action",
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