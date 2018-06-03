Ext.define("core.resource.view.CenterPanel",{
//	extend:'Ext.grid.Panel',
	extend : 'Ext.Panel',
	alias:'widget.resource-centerpanel',
//	store:'core.resource.store.Store',
	region:'center',
	layout : 'fit',
	items : [{
		title : '刷卡结果',
//		region:'center', // position for region
		xtype : 'form',
		split : true, // enable resizing
//		margins : '0 5 5 5',
		bodyStyle : 'padding:5px 5px 0',
		labelAlign : "left",
		layout : 'fit',
		frame : true,
		items : [{
					xtype : 'textarea',
					style:'color:red',
//					editable : false,// 是否允许输入 
					grow : true,
					labelAlign : 'top',
					readOnly:'true',
					name : 'return_msg',
					id : 'return_msg',
					fieldLabel : '处理信息'
				}]
	}]
//	columns:[
//			   { text: '工号',  dataIndex: '',flex : 5.3},
//			   { text: '状态',  dataIndex: '' ,flex : 5.3}
//			]
		
});

