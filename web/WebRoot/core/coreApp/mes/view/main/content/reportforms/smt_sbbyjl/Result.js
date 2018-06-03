 /***************************************************************************
  								<物料收料单回传查询> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.smt_sbbyjl.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.smt_sbbyjl.result',
	store:'core.mes.store.reportforms.smt_sbbyjl.Store',	
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"线体编号",width:100,dataIndex:'SMTLine',sortable:true},
		{header:"印刷机编号",width:100,dataIndex:'PrintMachine',sortable:true},
		{header:"SPI编号",width:100,dataIndex:'SMTSPI',sortable:true},
		{header:"泛用机编号",width:100,dataIndex:'UniversalMachine',sortable:true},
		{header:"回流焊炉编号",width:100,dataIndex:'ReflowOven',sortable:true},
		{header:"AOI编号",width:100,dataIndex:'AOINumber',sortable:true},
		{header:"贴片机编号(1)",width:100,dataIndex:'ChipMachineA',sortable:true},
		{header:"贴片机编号(2)",width:100,dataIndex:'ChipMachineB',sortable:true},
		{header:"贴片机编号(3)",width:100,dataIndex:'ChipMachineC',sortable:true},
		{header:"贴片机编号(4)",width:100,dataIndex:'ChipMachineD',sortable:true},
		{header:"贴片机编号(5)",width:100,dataIndex:'ChipMachineE',sortable:true},
		{header:"贴片机编号(6)",width:100,dataIndex:'ChipMachineF',sortable:true},
		{header:"保养类型(周/月/季/年)",width:110,dataIndex:'MaintainType',sortable:true},
		{header:"保养人",width:100,dataIndex:'MaintainUser',sortable:true},
		{header:"设备保养日期",width:100,dataIndex:'设备保养日期',sortable:true},
		{header:"下一次周保养日期",width:110,dataIndex:'下一次周保养日期',sortable:true},
		{header:"下一次月保养日期",width:110,dataIndex:'下一次月保养日期',sortable:true},
		{header:"下一次季度保养日期",width:110,dataIndex:'下一次季度保养日期',sortable:true},
		{header:"下一次年保养日期",width:110,dataIndex:'下一次年保养日期',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.smt_sbbyjl.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
		
		this.callParent(arguments);
	}
 	
   });
 