 /***************************************************************************
  								<入库查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.smt_line_scan_interval_time.view.ListResult",{
   	extend:"Ext.grid.GridPanel",			
 	alias:'widget.smt_line_scan_interval_time_list_result',
	store:'core.smt_line_scan_interval_time.store.ListStore',
	columns:[  
		{text:'序号',dataIndex:'RowNum',flex:0.5},
		{text: '资源',dataIndex:'Resource',flex:1.5},
		{text:"扫描条码",dataIndex:'ScanBarcode',flex:1.5},
		{text:"扫描时间",dataIndex:'ScanTime',flex:1.5},
		{text:"上次扫描条码",dataIndex:'LastTimeScanBarcode',flex:1.5},
		{text:"上次扫描时间",dataIndex:'LastTimeScanTime',flex:1.5},
		{text:"[间隔时间(秒)]",dataIndex:'IntervalTime',flex:1}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.smt_line_scan_interval_time.store.ListStore',
			dock:'bottom',
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];

	   this.callParent(arguments);  //初始化后的参数传给上级
	}
 	
   });
 