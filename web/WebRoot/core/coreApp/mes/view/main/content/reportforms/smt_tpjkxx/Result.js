 /***************************************************************************
  								<SMT贴片接口信息> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.smt_tpjkxx.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.smt_tpjkxx.result',
	store:'core.mes.store.reportforms.smt_tpjkxx.Store',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"机台",dataIndex:'机台',sortable:true,width:100},
		{header:"轨道",dataIndex:'轨道',sortable:true,width:100},
		{header:"PCB序列号",dataIndex:'PCB序列号',sortable:true,width:100},
		{header:"机台文件名",dataIndex:'机台文件名',sortable:true,width:100},
		{header:"文件名称",dataIndex:'文件名称',sortable:true,width:100},
		{header:"产生时间",dataIndex:'产生时间',sortable:true,width:100},
		{header:"总运行时间",dataIndex:'总运行时间(S)',sortable:true,width:100},
		{header:"实际贴片时间",dataIndex:'实际贴片时间(S)',sortable:true,width:100},
		{header:"停止时间",dataIndex:'停止时间(S)',sortable:true,width:100},
		{header:"等待时间",dataIndex:'等待时间(S)',sortable:true,width:100},
		{header:"Rwait",dataIndex:'Rwait',sortable:true,width:100},
		{header:"Pwait",dataIndex:'Pwait',sortable:true,width:100},
		{header:"物料帖片总数",dataIndex:'物料贴片总数',sortable:true,width:100},
		{header:"物料抛料总数",dataIndex:'物料抛料总数',sortable:true,width:100},
		{header:"Rmiss",dataIndex:'Rmiss',sortable:true,width:100},
		{header:"PCB板总数",dataIndex:'PCB板总数',sortable:true,width:100},
		{header:"计算机名",dataIndex:'计算机名',sortable:true,width:100},
		{header:"开始时间",dataIndex:'CreateDate',sortable:true,width:100}
	],

	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.smt_tpjkxx.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];

	   this.callParent(arguments);  //初始化后的参数传给上级
	}
 	
   });
 