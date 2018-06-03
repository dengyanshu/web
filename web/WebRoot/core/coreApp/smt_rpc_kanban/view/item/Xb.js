Ext.define("core.smt_rpc_kanban.view.item.Xb", {
			extend : "Ext.grid.Panel",
			alias : 'widget.smt_xb_kb',
			loadMask : true,	 
			stripeRows : true,
			store : 'core.smt_rpc_kanban.store.xb.Store',
			columns : [
					{header : '序号',dataIndex : 'RowNum',width : 50},
					{header : '物料ID',dataIndex : 'Productid',width : 140,hidden:true}, 
					{header : '物料名',dataIndex : 'ProductName',width : 140}, 
					{header : '备料数',dataIndex : 'Sum',width : 90}, 
					{header : '上料数',dataIndex : 'Used',width : 90}, //Append
					{header : '剩余物料数',dataIndex : 'Surplus',width : 90},
					{header : '剩余比',dataIndex : 'Rate',width : 260,renderer : function(value) {
					return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus3(value);}}, 
					{header : '物料描述',dataIndex : 'ProductDescription',width : 140}, 
					{header : '物料规格',dataIndex : 'ProductSpecification',flex : 3.1}
			],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.smt_rpc_kanban.store.xb.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据',
				items:[
					{xtype:'button',text:'停止',action:'stop'},'-',
					{xtype:'textfield',name:'mo',emptyText:'请输入物料名',disabled:true},'-',
					{xtype:'button',text:'查询',action:'search',disabled:true}
				]
			}],
			viewConfig:{
				forceFit:true,
				enableRowBody:true,
				getRowClass:function(record,rowIndex,p,store){
					var cls='';
					if(record.data.isAlert=="1"){ //等同于record.get('isAlert')
						cls="row-red .x-grid-cell";
					}else if(record.data.isAlert=="2"){
						cls="row-orange .x-grid-cell";
					}
					return cls;
				}
			}
		});