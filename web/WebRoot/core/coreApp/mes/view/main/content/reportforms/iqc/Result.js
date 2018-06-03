 /***************************************************************************
  								<收料查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.iqc.Result",{
 		extend:"core.mes.base.BaseGrid",
 		alias:'widget.iqc.result',
		store:'core.mes.store.reportforms.iqc.Store',
		columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"物料编号",width:100,dataIndex:'物料编码',sortable:true},
		{header:"供应商",width:100,dataIndex:'供应商',sortable:true},
		{header:"料号",width:100,dataIndex:'料号',sortable:true},
		{header:"ROHS送检时间",width:100,dataIndex:'ROHS送检时间',sortable:true},
		{header:"ROHS关检人",width:100,dataIndex:'ROHS关检人',sortable:true},
		{header:"ROHS检验人",width:100,dataIndex:'ROHS检验人',sortable:true},
		{header:"包材耐破送检时间",width:100,dataIndex:'包材耐破送检时间',sortable:true},
		{header:"包材送检人",width:100,dataIndex:'包材送检人',sortable:true},
		{header:"包材检验人",width:100,dataIndex:'包材检验人',sortable:true},
		{header:"物料规测送检时间",width:100,dataIndex:'物料规测送检时间',sortable:true},
		{header:"物料规则送检人",width:100,dataIndex:'物料规则送检人',sortable:true},
		{header:"物料规则检验人",width:100,dataIndex:'物料规则检验人',sortable:true},
		{header:"物料规则检验结果",width:100,dataIndex:'物料规则检验结果',sortable:true},
		{header:"ROHS检验报告单",width:100,dataIndex:'ROHS检验报告单',sortable:true},
		{header:"包材耐破检验报告单",width:100,dataIndex:'包材耐破检验报告单',sortable:true},
		{header:"物料规则检验报告单",width:100,dataIndex:'物料规则检验报告单',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.iqc.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
		}];	
		this.callParent(arguments);
	}
 	
   });
 
 