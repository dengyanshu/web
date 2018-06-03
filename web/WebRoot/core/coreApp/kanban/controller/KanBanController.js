Ext.define("core.kanban.controller.KanBanController", {
	extend : "Ext.app.Controller",

	init : function() {
		var self = this;
		coreApp = self;
		this.control({

			'panel[xtype=kanban.main]' : {
				itemclick : function(e, eOpts) {
					var width=comm.get("resolutionWidth")*1;
 					var height=comm.get("resolutionHeight")*0.7;				   	
					var mo = eOpts.data.moname;
					var store = Ext.data.StoreManager.map['core.kanban.store.Store2'];
					var win = Ext.create('Ext.window.Window', {
								title : '物料清单信息',
								height : height,
								width : width,
								closable : true,
								maximizable:true,
								stripeRows : true,
								modal:true,
								plain:true,
								headerPosition:'bottom',
								layout : 'fit',
								items : [{
											xtype : 'gridpanel',
											store : 'core.kanban.store.Store2',
											columns : [{
														header : 'torder',
														dataIndex : 'torder',
														width : 200
														//hidden : true
													}, {
														header : 'ProductName',
														dataIndex : 'ProductName',
														width : 200
													}, {
														header : 'stockLocation',
														dataIndex : 'stockLocation',
														width : 200
													}, {
														header : 'ProductDescript',
														dataIndex : 'ProductDescript',
														width : 200
													},  {
														header : 'RequireMount',
														dataIndex : 'RequireMount',
														width : 200
													},{
														header : 'ReadyMount',
														dataIndex : 'ReadyMount',
														width : 200
													}, {
														header : 'UsedMount',
														dataIndex : 'UsedMount',
														width : 200
													}, {
														header : 'LeftMount',
														dataIndex : 'LeftMount',
														width : 200
													}, {
														header : 'UnitQty',
														dataIndex : 'UnitQty',
														width : 200
													}, {
														header : 'LeftUnitQtyMount',
														dataIndex : 'LeftUnitQtyMount',
														flex : 1
													}]
										}],
								renderTo : Ext.getBody()
							}).show();
					store.load({params : {mo : mo}});
				}
			}

		});
	},

	views : ['core.kanban.view.Main'],

	stores : ['core.kanban.store.Store', 'core.kanban.store.Store2'],

	models : ['core.kanban.model.Model', 'core.kanban.model.Model2']
});