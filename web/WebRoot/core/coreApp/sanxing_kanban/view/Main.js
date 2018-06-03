Ext.define("core.sanxing_kanban.view.Main",{
	extend:'Ext.grid.Panel',
	layout:'fit',
	alias:'widget.sanxing_kanban_main',
	store:'core.sanxing_kanban.store.Store',
	bodyStyle: 'background:#006699;',
	 //hideHeaders:true,
	columnLines:true,
	title:'<font size="5" color="black">自动化测试线('+(new  Date().getHours()-2)+':50到'+(new  Date().getHours()-1)+':50)</font>',
	titleAlign : 'center',
	features: [{
        ftype: 'groupingsummary',
        startCollapsed : false
    }],
	columns : [
			//{header : '序号',dataIndex : 'Row',width : 40},
			{header : '料号',dataIndex : 'ProductName',width : 100}, 
			{header : '工单',dataIndex : 'MOName',width : 135}, 
			{header : '工站',dataIndex : 'WG_WorkStation',width : 60}, 
			{header : '机台',dataIndex : 'WS_Station',width : 125},
			
			{header : '投入数',dataIndex : 'Touru',width : 60, summaryType: 'sum',
              summaryRenderer: function(value){
                  return value;
                }
             },
			{header : '直通数',dataIndex : 'Zhitong',width : 60,
			summaryType: 'sum',
              summaryRenderer: function(value){
                  return value;
                }
			},
			{header : '误测数',dataIndex : 'Wuce',width : 60,
			summaryType: 'sum',
              summaryRenderer: function(value){
                  return value;
                }
			},
			{header : '不良数',dataIndex : 'Buliang',width : 60,
			summaryType: 'sum',
              summaryRenderer: function(value){
                  return value;
                }
			},
			
			{header : '直通率',dataIndex : 'ZhitongLv',width : 60,
			  summaryType: 'average',
              summaryRenderer: function(value){
                  return Ext.util.Format.number(value,"00.00");
                }
			},
			{header : '不良率',dataIndex : 'BuliangLv',width : 60,
			 summaryType: 'average',
              summaryRenderer: function(value){
                  return Ext.util.Format.number(value,"00.00");
                }
			},
			{header : '误测率',dataIndex : 'WuceLv',width : 60,
			  summaryType: 'average',
              summaryRenderer: function(value){
                  return Ext.util.Format.number(value,"00.00");
                }
			},
			{header : '通过率',dataIndex : 'TongguoLv',width : 60,
			  summaryType: 'average',
              summaryRenderer: function(value){
                  return Ext.util.Format.number(value,"00.00");
                }
			},
			{header : '利用率/小时',dataIndex : 'LiyongLv',width : 85,
			summaryType: 'sum',
              summaryRenderer: function(value){
                  return value;
                }
			},
			
			{header : '拔插更换后',dataIndex : 'BaChanum1',width : 90},
			{header : '拔插更换前',dataIndex : 'BaChanum2',width : 90},
			{header : '更换时间',dataIndex : 'ChangeDate',width : 140},
			{header : '更换间隔(分)',dataIndex : 'ChangeJiange',flex : 1}
	]
	,
	viewConfig:{
		forceFit:true,
		enableRowBody:true,
		getRowClass:function(record,rowIndex,p,store){
			var cls='';
			if(record.data.ZhitongLv>=90){ //等同于record.get('isAlert')
				cls="row-green .x-grid-cell";
			}else if(record.data.ZhitongLv>=80&&record.data.ZhitongLv<90){
				cls="row-orange .x-grid-cell";
			}
			else {
				cls="row-red .x-grid-cell";
			}
			return cls;
		}
	}
});