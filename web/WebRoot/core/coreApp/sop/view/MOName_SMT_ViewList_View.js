var result = new Array();
var store = Ext.data.StoreManager
		.get('core.sop.store.MOName_SMT_ViewList_Store');

Ext.define("core.sop.view.MOName_SMT_ViewList_View", {
	extend : 'Ext.Window',
	width : 600,
	height : 400,
	closable:true,
	closeAction:'hide',
	layout : 'border',
	items : [{
		xtype : 'form',
		region : 'north',
		layout : 'hbox',
		frame : true,
		height : 30,
		defaults : {
			anchor : '100%'
		},
		defaultType : 'textfield',
		items : [{
					emptyText : 'MO查询',
					name : 'mo',
					listeners : {
						specialkey : function(field, e) {
							if (e.getKey() == e.ENTER) {
								var mo = field.rawValue;
								store.load({
											params : {
												mo : mo
											}
										});
								store.loadPage(1);
							}
						},
						focus : function(eOpts) {
							eOpts.ownerCt.getForm().findField('pn')
									.setValue("");
						}
					}
				},

				{
					emptyText : 'PN查询',
					name : 'pn',
					listeners : {
						specialkey : function(field, e) {
							if (e.getKey() == e.ENTER) {
								var pn = field.rawValue;
								store.load({
											params : {
												pn : pn
											}
										});
								store.loadPage(1);
							}
						},
						focus : function(eOpts) {
							eOpts.ownerCt.getForm().findField('mo')
									.setValue("");
						}
					}
				}]
	}, {
		xtype : 'gridpanel',
		region : 'center',
		store : Ext.data.StoreManager
				.lookup('core.sop.store.MOName_SMT_ViewList_Store'),
		columns : [{
					header : 'rowNum',
					dataIndex : 'rowNum',
					width : 100
				}, {
					header : 'MOName',
					dataIndex : 'MOName',
					width : 150
				}, {
					header : 'productName',
					dataIndex : 'productName',
					width : 150
				}, {
					header : 'ProductDescription',
					dataIndex : 'ProductDescription',
					width : 150
				},
				 {
					header : 'MOId',
					dataIndex : 'MOId',
					hidden:true
				}],
		dockedItems : [{
			xtype : 'pagingtoolbar',
			store : Ext.data.StoreManager
					.lookup('core.sop.store.MOName_SMT_ViewList_Store'),
			dock : 'bottom',
			displayInfo : true,
			displayMsg : '显示 {0} - {1} 条，共计 {2} 条',
			emptyMsg : '没有数据'
		}],
		listeners : {
			// 添加一个事件把表格获取到的值赋给name然后再关闭窗口
			itemclick : function(record, item, index, e, eOpts) {
				var mo = record.getSelectionModel().selected.items[0].raw['MOName'];
				var pn = record.getSelectionModel().selected.items[0].raw['productName'];
				var moid = record.getSelectionModel().selected.items[0].raw['MOId'];
				result[0] = mo;
				result[1] = pn;
				result[2] = moid;
				this.ownerCt.close();
			}
		}
	}],
	initComponent : function() {
		this.text = result;
		this.callParent(arguments);
	}

});
