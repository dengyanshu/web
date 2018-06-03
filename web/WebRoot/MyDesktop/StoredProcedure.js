Ext.define("MyDesktop.StoredProcedure", {
	extend : 'Ext.window.Window',
	modal : true,
	width : 640,
	height : 480,
	border : false,
	layout : 'fit',
	title : '系统存储过程',

	initComponent : function() {
		var me = this;
		me.tree = me.createTree();
		me.items = [me.tree];
		me.callParent();
	},

	createTree : function() {
		var me = this;
		var tree = new Ext.tree.Panel({
					autoScroll : true,
					rootVisible : false,
					border : false,
					animate : true,
					lines : true,
					margins : '5 2 5 5',
					store : new Ext.data.TreeStore({
								fields : [{
											name : 'text',
											type : 'string'
										}, {
											name : 'name',
											type : 'string'
										}],
								proxy : {
									type : 'ajax',
									url : 'core/data/sys_stored_procedure/tree.json'
								},
								folderSort : true
							}),
					useArrows : true,
					multiSelect : true,
					listeners : {
						itemdblclick : function(_this, record, item, index, e,
								eOpts) {
							Ext.Msg.alert("存储过程名", record.data.name);
						}
					},
					columns : [{
								xtype : 'treecolumn',
								text : '模块名',
								width : 310,
								sortable : true,
								dataIndex : 'text',
								locked : true
							}, {
								text : '存储过程名',
								width : 310,
								dataIndex : 'name',
								sortable : true
							}]
				});
		return tree;
	}

});