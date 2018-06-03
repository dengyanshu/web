Ext.define("core.dc_pmc_kanban.view.SlList",{
	extend : "Ext.grid.Panel",
	alias : 'widget.dc_pmc_sl_list_kb',
		columns:[
			{text:'序号',dataIndex:'Num',width:50,sortable:true},
			{text:'料号',dataIndex:'ProductName',width:120},	
			{text:'规格/描述',dataIndex:'ProductDescription',width:200},
			{text:'送料单需求数',dataIndex:'BOMQty',width:110},
			{text:'套件数',dataIndex:'PickingListQty',width:110},
			{text:'扫描数量',dataIndex:'IssueQty',width:110},
			{text:'已过账数',dataIndex:'RestIssueQty',width:100},
			{text:'待备数量',dataIndex:'RestQty',width:110},
			{text:'备料时间',dataIndex:'IssueTime',width:110},
			//{text:'首次备料时间',dataIndex:'scbltime',width:110},
			{text:'仓别',dataIndex:'StockName',width:100},
			{text:'库位栏',dataIndex:'StockLocationName',width:120},
			{text:'工序',dataIndex:'FlowName',width:100},
			{text:'一次性/分批',dataIndex:'IsInBatches',width:160,flex:1}
			
		],
		/*features: [{
        	ftype: 'groupingsummary',
                startCollapsed : false,
                groupHeaderTpl: '类别:{name}区'
       }],*/
		
		store:'core.dc_pmc_kanban.store.sl.ListStore',
//		dockedItems:[{
//			xtype:'pagingtoolbar',
//			store : 'core.dc_mo_kanban.store.sl.ListStore',
//			dock:'bottom',
//			displayInfo:true,
//			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
//			emptyMsg:'没有数据'
//		}],
//		
		viewConfig:{
				forceFit:true,
				enableRowBody:true,
				getRowClass:function(record,rowIndex,p,store){
					var cls='';
					var  flag=record.data.flag;
					flag=flag.valueOf();
					if(record.data.flag==0){
						cls="row-green .x-grid-cell";
					}else if(record.data.flag==1){
						cls="row-red .x-grid-cell";
					}
					else{
						cls="row-orange .x-grid-cell";
					}
					return cls;
					}
	  }
		
		


			
});