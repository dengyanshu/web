   /***************************************************************************
  								<收料查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.gdbl.Result",{
 	extend:"core.mes.base.BaseGrid",
 	alias:'widget.gdbl.result',
    store:'core.mes.store.reportforms.gdbl.Store',	//数据集
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"料号",dataIndex:'ProductName',sortable:true},
		{header:"ItemQtyRequired",dataIndex:'ItemQtyRequired',sortable:true},
		{header:"备料数量",dataIndex:'备料数量',sortable:true},
		{header:"产品描述",dataIndex:'ProductDescription',sortable:true},
		{header:"产品规格",dataIndex:'ProductSpecification',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.sl.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
		}];
	   this.callParent(arguments);  //初始化后的参数传给上级
	}
   });
 