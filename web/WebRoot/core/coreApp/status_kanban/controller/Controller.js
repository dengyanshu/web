var status_runner = new Ext.util.TaskRunner();

var status_kanban_task = null
var status_kanban_p = 1;
var total = null;

Ext.define("core.status_kanban.controller.Controller", {
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
			'panel[xtype=status_kanban]' : {
				itemclick : function(view, record, item, index, e, eOpts) {
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
	views : ['core.status_kanban.view.List'
	// 'core.status_kanban.view.Main'
	],

	stores : ['core.status_kanban.store.Store'],

	models : ['core.status_kanban.model.Model']

});