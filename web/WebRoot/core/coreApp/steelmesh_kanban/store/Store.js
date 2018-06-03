var mainPageItems = comm.get("mainPageItems");
Ext.define("core.steelmesh_kanban.store.Store", {
			extend : "Ext.data.Store",
			autoLoad : true,
			pageSize : mainPageItems,
			model : 'core.steelmesh_kanban.model.Model',
			proxy : {
				url : '/web/kanban/ff_sl_list!getResult15.action',
				type : 'ajax',
				reader : {
					type : 'json',
					root : 'data',
					totalProperty : 'total'
				}
			}
		});