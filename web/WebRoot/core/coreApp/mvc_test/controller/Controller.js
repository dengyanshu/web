 Ext.define('core.mvc_test.controller.Controller', {
     extend: 'Ext.app.Controller',
     
     
     init : function() {
 		var self = this;
 		coreApp = self;
 		this.control({
 			'mvc_treepanel' : {
 				itemclick : function(view, record, item, index, e, eOpts) {
 					var tabpanel = view.ownerCt.ownerCt.items.items[2];
					var name = record.raw.name;
					var text = record.get("text");
					var id = record.get("id");
					var tab = tabpanel.getComponent(id);

					if (!tab) {
						var t = tabpanel.add({
									title : text,
									id : id,
									closable : true,
									closeAction : 'hide',
									layout : 'border',
									items : [{
												xtype : name,
												region : 'center'
											}]
								});
						tabpanel.setActiveTab(t);
					} else {
						tabpanel.setActiveTab(tab);
					}

 					var store = Ext.data.StoreManager.map['core.mvc_test.store.GridStore'];
 					store.reload();
 				}

 			},

		});
 	},
     
	 
	 views:['core.mvc_test.view.MainLayout',	        
			'core.mvc_test.view.DisplayPanel',
			'core.mvc_test.view.TreePanel',
			'core.mvc_test.view.Grid',
			],
	 stores:['core.mvc_test.store.Store','core.mvc_test.store.GridStore','core.mvc_test.store.TreeStore'],
	 models:['core.mvc_test.model.Model',]
 });