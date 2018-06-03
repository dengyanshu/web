var mainPageItems = comm.get("mainPageItems");
Ext.define("core.status_kanban.store.Store", {
			extend : "Ext.data.Store",
			autoLoad : true,
			pageSize : mainPageItems,
			model : 'core.status_kanban.model.Model',
			proxy : {
				url : '/web/kanban/dip_mt!getResult.action',
				type : 'ajax',
				reader : {
					type : 'json',
					root : 'data',
					totalProperty : 'total'
				}
			}
		});