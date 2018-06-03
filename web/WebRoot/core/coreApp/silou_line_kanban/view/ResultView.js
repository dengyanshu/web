Ext.define("core.silou_line_kanban.view.ResultView",{
	extend:'Ext.grid.Panel',
	region:'center',
	alias:'widget.silou_line_kanban_listview',
	store:'core.silou_line_kanban.store.Store',
	bodyStyle: 'background:#006699;',
	 //hideHeaders:true,
	 columnLines:true,
	columns : [
	       {header : '日期',dataIndex : 'fDate',width : 90,renderer:rendererFather},
			{header : '线别',dataIndex : 'WorkcenterName',width : 140,renderer:rendererFather},
			{header : '机型',dataIndex : 'ProductDescription',width : 190,renderer:rendererFather}, 
			{header : '工站',dataIndex : 'SpecificationName',width : 90,renderer:rendererFather},
			{header : '标产',dataIndex : 'StandardProductivity',width : 60,renderer:rendererFather},
			
			{header : '8:00',dataIndex : '1',width : 50,align:'center',renderer:rendererSon},
			{header : '9:00',dataIndex : '2',width : 50,align:'center',renderer:rendererSon},
			{header : '10:00',dataIndex : '3',width : 50,align:'center',renderer:rendererSon}, 
			{header : '11:00',dataIndex : '4',width : 50,align:'center',renderer:rendererSon},
			{header : '12:00',dataIndex : '5',width : 50,align:'center',renderer:rendererSon},
			{header : '13:00',dataIndex : '6',width : 50,align:'center',renderer:rendererSon},
			{header : '14:00',dataIndex : '7',width : 50,align:'center',renderer:rendererSon},
			{header : '15:00',dataIndex : '8',width : 50,align:'center',renderer:rendererSon},
			{header : '16:00',dataIndex : '9',width : 50,align:'center',renderer:rendererSon},
			{header : '17:00',dataIndex : '10',width: 50,align:'center',renderer:rendererSon},
			{header : '18:00',dataIndex : '11',width : 50,align:'center',renderer:rendererSon},
			{header : '19:00',dataIndex : '12',width : 50,align:'center',renderer:rendererSon},
			{header : '累计',dataIndex : '累计',flex : 1,align:'center',renderer:rendererFather}
	]
	
	

	
//    ,
//	dockedItems:[{
//		xtype:'pagingtoolbar',
//		store : 'core.silou_line_kanban.store.Store',
//		dock:'bottom',
//		displayInfo:true,
//		displayMsg:'第{0} 到 {1} 条数据 共{2}条',
//		emptyMsg:'没有数据'		
//	}]
});


    function rendererFather(v,m) {
		m.tdCls = 'x-grid-record-brown';
		return '<span style="COLOR:#000000">'+v+'</span>';	
	}
    function rendererSon(value, cellMeta, record, rowIndex, columnIndex, store) {
    	
      	var stand = record.data.StandardProductivity;
      	stand=stand*1.0;
//		if (value>=stand*0.98){
//			 return '<span style="text-align:center;COLOR:black">'+value+'</span>';
//		}
//		else if (value>=stand*0.9&value<stand*0.98){
//			return '<span style="text-align:center;COLOR:#FF00FF">'+value+'</span>';			
//		}
//		else{
//			return '<span style="text-align:center;COLOR:red">'+value+'</span>';					
//		}
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