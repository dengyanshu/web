Ext.define("core.iqc_kanban.view.ResultView",{
	extend:'Ext.grid.Panel',
	region:'center',
	alias:'widget.iqc_kanban_listview',
	loadMask : true,
	stripeRows : true,
	store:'core.iqc_kanban.store.Store',
	bodyStyle: 'background:#006699;',
	 columnLines:true,
	columns : [
	        {header : '及时率表的ID',dataIndex : 'TimeLinessRatioId',width:100,hidden: true,renderer:rendererFather},
	        {header : '日期\项目',dataIndex : 'TimeLinessDate',width : 100,renderer:rendererFather},
			{header : '进料总批数',dataIndex : 'TotalNumber',width : 85,renderer:rendererFather},
			{header : '检验总批数',dataIndex : 'CheckedNumber',width : 85,renderer:rendererFather}, 
			{header : '待检批数',dataIndex : 'WaitCheckNumber',width : 80,renderer:rendererFather},
			{header : '异常批数',dataIndex : 'UnusualNumber',width : 80,renderer:rendererFather},
			{header : '批合格率',dataIndex : 'PassRatio',width : 80,renderer:rendererFather},
			{header : '4H检验批数/率',dataIndex : 'CheckedNumber4H',width : 120,renderer:rendererFather},
			{header : '8H检验批数/率',dataIndex : 'CheckedNumber8H',width : 120,renderer:rendererFather},		
			{header : '24H检验批数/率(目标值95%)',dataIndex : 'CheckedNumber24H',width : 180,renderer:rendererFather},
			{header : '48H检验批数/率(目标值100%)',dataIndex : 'CheckedNumber48H',width : 180,renderer:rendererFather}
	],
	dockedItems:[{
		xtype:'pagingtoolbar',
		store : 'core.iqc_kanban.store.Store',
		dock:'bottom',
		displayInfo:true,
		pageSize:15,
		displayMsg:'第{0} 到 {1} 条数据 共{2}条',
		emptyMsg:'没有数据'
	}]

});


    function rendererFather(v,m) {
		m.tdCls = 'x-grid-record-brown'; 
		return '<span style="COLOR:#000000">'+v+'</span>';	
	}


   /* function rendererSon(value, cellMeta, record, rowIndex, columnIndex, store) {
    	
      	var stand = record.data.StandardProductivity;
      	stand=stand*1.0;
      	if (value>=stand*0.98){
      		cellMeta.tdCls = 'x-grid-record-green';
			return '<span style="COLOR:#000000">'+value+'</span>';
		}
		else if (value>=stand*0.9&value<stand*0.98){
			cellMeta.tdCls = 'x-grid-record-orange';
			return '<span style="COLOR:#000000">'+value+'</span>';			
		}
		else{
			cellMeta.tdCls = 'x-grid-record-yellow';
			return '<span style="COLOR:#000000">'+value+'</span>';					
		}
      	
      	
    }*/