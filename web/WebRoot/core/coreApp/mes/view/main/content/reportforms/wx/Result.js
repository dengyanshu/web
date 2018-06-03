 /***************************************************************************
  								<收料查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.wx.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.wx.result',
	store:'core.mes.store.reportforms.wx.Store',			
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"在线维修时间",width:100,dataIndex:'在线维修时间',sortable:true},
		{header:"LotSN",width:100,dataIndex:'LotSN',sortable:true},
		{header:"MOName",width:100,dataIndex:'MOName',sortable:true},
		{header:"ProductDescription",width:100,dataIndex:'ProductDescription',sortable:true},
		{header:"ProductSpecification",width:100,dataIndex:'ProductSpecification',sortable:true},
		{header:"当前所在工站",width:100,dataIndex:'当前所在工站',sortable:true},
		{header:"UserCodeDescription",width:100,dataIndex:'UserCodeDescription',sortable:true},
		{header:"RepairComment",width:100,dataIndex:'RepairComment',sortable:true},
		{header:"UserCodeDescription",width:100,dataIndex:'UserCodeDescription',sortable:true},
		{header:"repairUser",width:100,dataIndex:'repairUser',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.wx.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
		
		this.callParent(arguments);
	}
 	
   });
 