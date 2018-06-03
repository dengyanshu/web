Ext.define("core.xm_line_kanban.view.ResultView",{
	extend:'Ext.grid.Panel',
	region:'center',
	alias:'widget.xm_line_kanban_listview',
	store:'core.xm_line_kanban.store.Store',
	bodyStyle: 'background:#006699;',
	 //hideHeaders:true,
	 columnLines:true,
	 features: [{
        ftype: 'summary'
    }],
	 
	columns : [
	       {header : '时间',dataIndex : 'time',width : 190,renderer:rendererFather
	        ,showSummaryRow :true
	        ,summaryRenderer: function(value, summaryData, dataIndex) {
                    return "<span style='color:red;font-weight:bold;text-align:center;font-size:20px;'>合计:</sapn>"; 
             }
	       },
			//{header : 'BL',dataIndex : 'BL',width : 140,renderer:rendererFather},
			{header : 'SN',dataIndex : 'SN',width : 140,renderer:rendererFather
			    ,summaryType: 'sum'
			}, 
			{header : 'RFT',dataIndex : 'RFT',width : 140,renderer:rendererFather
			   ,summaryType: 'sum'
			},
			//{header : 'CSP',dataIndex : 'CSP',width :140,renderer:rendererFather},
			{header : 'CAL',dataIndex : 'CAL',width :140,renderer:rendererFather
			,flex:1
			     ,summaryType: 'sum'
			}
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