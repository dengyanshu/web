Ext.define("core.sb_kanban.view.SBMaintenanceList",{
	extend:'Ext.window.Window',	
	frame:true,
	alias : 'widget.sb_SBMaintenanceList_kb',
	width:500,
	maximized:true,
    layout: 'fit',
    title:'设备维护记录',
    items:[
    	{
    		xtype:'grid',
    		store:'core.sb_kanban.store.sb.ListStore',
    		//frame:true,
    		//collapsible:true,
    		height:370,
    		//region:'south',
    		columns:[
    		   {text:'序号',dataIndex:'序号',width:60},
    		   {text:'设备编号(工程部编号)',dataIndex:'设备编号(工程部编号)',width:160},
    		   {text:'设备类型',dataIndex:'设备类型',width:80},
    			{text:'设备描述',dataIndex:'设备描述',width:80},
    			{text:'型号',dataIndex:'型号',width:80},
    			{text:'状态',dataIndex:'状态',width:80},
    			{text:'存放位置',dataIndex:'存放位置',width:120},
    			{text:'维护人',dataIndex:'维护人',width:60},
    			{text:'维修履历',dataIndex:'维修履历',width:80},
    			{text:'维护项目',dataIndex:'维护项目',width:160},
    			{text:'维护时间',dataIndex:'维护时间',width:120}
    			
    		],
    		viewConfig:{
				forceFit:true,
				enableRowBody:true,
				getRowClass:function(record,rowIndex,p,store){
					var cls='';
					if(rowIndex%2==0){
						cls="row-qianlan .x-grid-cell";
					}else{
						cls="row-qianchen .x-grid-cell";
					}
					return cls;
					}}
    	}
    	
    
    ]
});