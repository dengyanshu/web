Ext.define("core.sys_stored_procedure.store.Store", {
			extend : 'Ext.data.TreeStore',
			model : 'core.sys_stored_procedure.model.Model',
			proxy : {
				type : 'ajax',
				url : 'core/data/sys_stored_procedure/tree.json'
			},
			folderSort : true
		});