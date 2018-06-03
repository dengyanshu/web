 /***************************************************************************
  								<收料查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.bdgx.Result",{
 	extend:"core.mes.base.BaseGrid",
 	alias:'widget.bdgx.result',
	store:'core.mes.store.reportforms.bdgx.Store',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"工单",dataIndex:'MOName',sortable:true,width:120},
		{header:"规程",dataIndex:'SpecificationName',sortable:true,width:100},
		{header:"当前批号",dataIndex:'当前批号',sortable:true,width:100},
		{header:"单板SN",dataIndex:'PCBASN',sortable:true,width:100},
		{header:"MAC",dataIndex:'MAC',sortable:true,width:100},
		{header:"标签SN",dataIndex:'SN',sortable:true,width:100},
		{header:"DSN",dataIndex:'DSN',sortable:true,width:100},
		{header:"客户SN",dataIndex:'CUSTSN',sortable:true,width:100},
		{header:"OUI",dataIndex:'OUI',sortable:true,width:100},
		{header:"IMEI1",dataIndex:'PrimaryIMEI',sortable:true,width:100},
		{header:"IMEI2",dataIndex:'Sub_IMEI',sortable:true,width:100},
		{header:"BlueTooth",dataIndex:'BlueTooth',sortable:true,width:100},
		{header:"网络许可证",dataIndex:'NETLicenseSN',sortable:true,width:100},
		{header:"电源SN",dataIndex:'PowerSN',sortable:true,width:100},
		{header:"手机电池2",dataIndex:'PowerSN2',sortable:true,width:100},
		{header:"箱号",dataIndex:'CartoonBoxSN',sortable:true,width:100},
		{header:"栈板SN起始",dataIndex:'PalletLotSN',sortable:true,width:100}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.bdgx.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据',
			items:[
				{xtype:'button',text:'b',handler:function(){
					Ext.Ajax.request({
						url:'/web/mes/baobiao/bdgx!Excel.action',
						success:function(response){
							alert("OK");
						}
					});
				}}
			]
	}];
	   this.callParent(arguments);  //初始化后的参数传给上级
	}	
});
 