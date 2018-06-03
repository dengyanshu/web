var status_runner = new Ext.util.TaskRunner();

var status_kanban_task = null
var status_kanban_p = 1;
var total = null;

Ext.define("core.steelmesh_kanban.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins : {
		suppleUtil : 'core.util.SuppleUtil',
		MaskMsgUtil : 'core.util.model.MaskMsgUtil',
		MessageUitl : 'core.util.MessageUtil'
	},
	init : function() {
		var self = this;
		coreApp = self;
		this.control({
			'panel[xtype=steelmesh_kanban]' : {
				afterrender : function(view, record, item, index, e, eOpts) {
					status_kanban_task = {
						run : function() {
							var store = Ext.data.StoreManager.map['core.steelmesh_kanban.store.Store'];
							store.load();
						},
						interval : 60000
					};
					status_runner.start(status_kanban_task);
				}
			}
		});
	},
	views : ['core.steelmesh_kanban.view.List'
	// 'core.status_kanban.view.Main'
	],

	stores : ['core.steelmesh_kanban.store.Store'],

	models : ['core.steelmesh_kanban.model.Model']

});