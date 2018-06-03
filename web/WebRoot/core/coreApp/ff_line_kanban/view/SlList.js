Ext.define("core.ff_line_kanban.view.SlList",{
	extend : "Ext.grid.Panel",
	alias : 'widget.ff_line_sl_list_kb',
		columns:[
			{text:'序号',dataIndex:'RowNum',width:50,sortable:true},
			//{text:'工段',dataIndex:'WorkprocedureFlowName',width:100},
			{text:'料号',dataIndex:'ProductName',width:120},	
			{text:'物料名称',dataIndex:'ProductDescription',width:200},
			//{text:'工单批量',dataIndex:'MOQtyRequired',width:90},
			//1111222222222333333333333
			{text:'BOM单位用量',dataIndex:'UnitQty',width:130},
			{text:'物料总需求量',dataIndex:'RequiredMount',width:110},
			{text:'已上料数量',dataIndex:'OnLoadMount',width:110},
			{text:'已使用数量',dataIndex:'UseQty',width:110},
			{text:'产线剩余数量',dataIndex:'SurplusMount',width:110},
			
			{text:'备料时间',dataIndex:'beiTime',width:110},
			{text:'备料数量',dataIndex:'beiQty',width:110},
			{text:'送料时间',dataIndex:'receTime',width:110},
			{text:'送料数量',dataIndex:'rece_material',width:110}
		
							
			
		],
		store:'core.ff_line_kanban.store.sl.ListStore',
		dockedItems:[{
			xtype:'pagingtoolbar',
			store : 'core.ff_line_kanban.store.sl.ListStore',
			dock:'bottom',
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
		}],
		
		viewConfig:{
			forceFit:true,
			enableRowBody:true,
			getRowClass:function(record,rowIndex,p,store){
				var cls='';
				//alert(record.data.IsAlert);
				if(record.data.isAlert=="1"){ // 等同于record.get('isAlert')
					cls="row-red .x-grid-cell";
				}else if(record.data.isAlert=="2"){
					cls="row-orange .x-grid-cell";
				}
				else {
					cls="row-green .x-grid-cell";
				}
				return cls;
			}
		}
		
		


			
});