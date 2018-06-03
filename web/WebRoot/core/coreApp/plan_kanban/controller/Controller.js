Ext.define("core.plan_kanban.controller.Controller", {
			extend : 'Ext.app.Controller',

			init : function() {
				var self = this;

				this.control({
							'plan_kb_navigation' : {
								itemclick : function(view, record, item, index,e, eOpts) {
									var tabpanel = view.ownerCt.ownerCt.items.items[2];
									var name = record.raw.name;
									var text = record.get("text");
									var id = record.get("id");
									var tab = tabpanel.getComponent(id);

									if (!tab) {
										var t = tabpanel.add({
													title : text,id : id,closable : true,
													closeAction : 'hide',layout : 'border',
													items : [{xtype : name,region : 'center'}]
												});
										tabpanel.setActiveTab(t);
									}else{
										tabpanel.setActiveTab(tab);
									}
								}
							}
						});
			},

			views : ['core.plan_kanban.view.DisplayPanel',
					'core.plan_kanban.view.Navigation',
					'core.plan_kanban.view.MainLayout',
					'core.plan_kanban.view.PlanLinesManufacture',
					'core.plan_kanban.view.PlanManpower'],
			models : [],
			stores : ['core.plan_kanban.store.Tree']

		});