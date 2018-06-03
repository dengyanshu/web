Ext.define("core.sop.view.main.content.search.Result",{
	extend:'Ext.grid.GridPanel',
	alias:'widget.search_sop_result',
	title:'资源列表',
	store:'core.sop.store.search.Store',
	loadMask:true,	
	stripeRows:true,								//斑马线效果
	frame:true,	
	columns:[  
		Ext.create("Ext.grid.RowNumberer",{header:'序号',width: 50,align:'center'}),
		{header:'ID',dataIndex:'id',hidden:true},
		{header:"产品名称",dataIndex:'name',sortable:true,width:130},
		{header:"制程别",dataIndex:'processing',sortable:true,width:110},
		{header:"上传日期",dataIndex:'date',sortable:true,width:130},
		{header:"机型",dataIndex:'type',sortable:true,width:130}	
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.sop.store.search.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
		}];

	this.callParent(arguments);  //初始化后的参数传给上级
	}	
});