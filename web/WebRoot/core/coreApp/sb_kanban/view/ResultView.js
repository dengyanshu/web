Ext.define("core.sb_kanban.view.ResultView",{
	extend:'Ext.grid.Panel',
	region:'center',
	alias:'widget.sb_kanban_listview',
	loadMask : true,
	stripeRows : true,
	store:'core.sb_kanban.store.Store',
	bodyStyle: 'background:#006699;',
	 columnLines:true,
	columns : [
	       {header : '序号',dataIndex : 'RowNum',width : 60,renderer:rendererFather},
	       {header : '设备ID',dataIndex : 'InstrumentId',hidden: true,renderer:rendererFather},
			{header : '设备编号(工程部编号)',dataIndex : 'InstrumentName',width : 160,renderer:rendererFather},
			{header : '资产编号',dataIndex : 'FixedAssetNumber',width : 120,renderer:rendererFather}, 
			{header : '设备类型',dataIndex : 'InstrumentType',width : 80,renderer:rendererFather},
			{header : '设备描述',dataIndex : 'InstrumentDescription',width : 80,renderer:rendererFather},
			{header : '型号',dataIndex : 'Model',width : 60,renderer:rendererFather},
			{header : '状态',dataIndex : 'Status',width : 60,renderer:rendererFather},		
			{header : '设备来源',dataIndex : 'Origin',width : 80,renderer:rendererSon},
			{header : '存放位置',dataIndex : 'LocationSpace',width : 80,renderer:rendererSon},
			{header : '所属事业部',dataIndex : 'BelongDivision',width : 100,renderer:rendererSon}, 
			{header : '所属部门(使用部门)',dataIndex : 'UserDepartments',width : 160,renderer:rendererSon},
			{header : '责任人',dataIndex : 'UserDescription',width : 70,renderer:rendererSon},
			{header : '是否按日期校准',dataIndex : 'IsCheckDay',width : 120,renderer:rendererSon},
			{header : '是否按周期校准',dataIndex : 'IsCheckWeek',width : 120,renderer:rendererSon},
			{header : '是否按周月校准',dataIndex : 'IsCheckMonth',width : 120,renderer:rendererSon},
			{header : '是否按年校准',dataIndex : 'IsCheckYear',width : 120,renderer:rendererSon},
			{header : '下次校准项目',dataIndex : 'NextCheckItem',width : 100,renderer:rendererSon},
			{header : '下次校准时间',dataIndex : 'NextCheckDate',width: 100,renderer:rendererSon},
			{header : '有效天数',dataIndex : 'Resultful',width : 80,renderer:rendererSon}
	],
	dockedItems:[{
		xtype:'pagingtoolbar',
		store : 'core.sb_kanban.store.Store',
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
    function rendererSon(value, cellMeta, record, rowIndex, columnIndex, store) {
    	
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
			cellMeta.tdCls = 'x-grid-record-red';
			return '<span style="COLOR:#000000">'+value+'</span>';					
		}
      	
      	
    }