 /***************************************************************************
  								<SOP查看结果界面> 
 ***************************************************************************/
   Ext.define("core.sop.view.main.content.search.Result",{
 	extend:"Ext.grid.GridPanel",
 	alias:'widget.search_sop_result',
	mode:'remote',			
	frame:true,
	title:'资源列表',
    loadMask:true,									//加载遮住罩
    store:'core.sop.store.search.Store',			//数据集
	stripeRows:true,								//斑马线效果
	multiSelect:true,								//运行多选
	columns:[  
		//Ext.create("Ext.grid.RowNumberer",{header:'序号',width:50,align:'center'}),
		{header:"ID",dataIndex:'id',hidden:true},
		{header:"产品名称",dataIndex:'name',sortable:true,width:130},
		{header:"制程别",dataIndex:'processing',sortable:true,width:110},
		{header:"上传日期",dataIndex:'date',sortable:true,width:130},
		{header:"机型",dataIndex:'type',sortable:true,width:130}
	]
/*	renderer:renderCol,
	viewConfig:{
             getRowClass: function(record, rowIndex, rowParams, store){
                 var cls;
                 
                 if(record.get('processing')=="WC"){
                 cls='yellow-row'
                 }
                 return cls;
             }
	},*/
/*	initComponent:function(){
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
	}*/
 	
   });
   
/*        function renderCol(value, metaData, record, rowIndex, columnIndex, store, view ){
         metaData.style = "background-color: #F5C0C0";
         return value;
     } 
*/
 