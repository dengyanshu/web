var result = new Array();
var store = Ext.data.StoreManager.get('core.mes.store.AllDataStore');

Ext.define("core.mes.view.main.content.viewList.AllDataView", {
	extend : 'Ext.Window',
	width : 600,
	height : 400,
	closable:true,
	modal:true,
	closeAction:'hide',
	layout : 'border',
	items : [{
		xtype:'livesearchgridpanel',
		region:'center',	
		store:store,
		columns: [
			{ header: '工单',  dataIndex: 'MOName' },
			{ header: '产品名称',  dataIndex: 'ProductName' },
			{ header: '产品描述',  dataIndex: 'ProductDescription' },
			{ header: '机型', dataIndex: 'ProductFamilyShortName',flex: 1 }
		],
		listeners : {
			// 添加一个事件把表格获取到的值赋给name然后再关闭窗口
			itemclick : function(record, item, index, e, eOpts) {
				var mo = record.getSelectionModel().selected.items[0].raw['MOName'];
				var pn = record.getSelectionModel().selected.items[0].raw['productName'];
				result[0] = mo;
				result[1] = pn;
				this.ownerCt.close();
			}
		}
	}],
	initComponent : function() {
		this.text = result;
		this.callParent(arguments);
	}

});
