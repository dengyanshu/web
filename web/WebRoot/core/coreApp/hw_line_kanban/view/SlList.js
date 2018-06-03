Ext.define("core.hw_line_kanban.view.SlList",{
	extend : "Ext.grid.Panel",
	alias : 'widget.hw_line_sl_list_kb',
		columns:[
			//{text:'序号',dataIndex:'RowNum',width:50,sortable:true},
			{text:'线体',dataIndex:'WorkcenterName',width:100},
			{text:'工单号',dataIndex:'MoName',width:80},	
			{text:'料号',dataIndex:'ProductName',width:200},
			{text:'标准产能',dataIndex:'StandardProductivity',width:90},	
			{text:'标准人力',dataIndex:'StandardNumOfPeople',width:90},
			{text:'任务令',dataIndex:'WOSN',width:90},
			{text:'华为编码',dataIndex:'CustomerModel',width:90},
			{text:'实际产能',dataIndex:'Productivity',width:110},
			{text:'实际人力',dataIndex:'StandardNumOfPeople',width:90},
			
			{text:'工单批量',dataIndex:'MOQtyRequired',width:90},
			{text:'完工数量',dataIndex:'MOQtyDone',width:90},
			
			{text:'时间1',dataIndex:'TimeSlice1',width:90},
			{text:'标产1',dataIndex:'StandardProduct1',width:90},
			{text:'实际产能1',dataIndex:'Productivity1',width:90},
			{text:'效率1',dataIndex:'Efficiency1',width:90},
			
			{text:'时间2',dataIndex:'TimeSlice2',width:90},
			{text:'标产2',dataIndex:'StandardProduct2',width:90},
			{text:'实际产能2',dataIndex:'Productivity2',width:90},
			{text:'效率2',dataIndex:'Efficiency2',width:90}


		],
		store:'core.hw_line_kanban.store.sl.ListStore',
		dockedItems:[{
			xtype:'pagingtoolbar',
			store : 'core.hw_line_kanban.store.sl.ListStore',
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