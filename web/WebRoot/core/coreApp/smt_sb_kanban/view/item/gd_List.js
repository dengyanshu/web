Ext.define("core.smt_sb_kanban.view.item.gd_List",{
	extend:'Ext.window.Window',	
	frame:true,
	alias : 'widget.smtsb_gd_list_kb',
	width:500,
	maximized:true,
    layout: 'fit',
    title:'刮刀历史记录',
    items:[
    	{
    		xtype:'grid',
    		store:'core.smt_sb_kanban.store.gd.ListStore',
    		//frame:true,
    		//collapsible:true,
    		height:370,
    		//region:'south',
    		columns:[
    			{text:'刮刀编号',dataIndex:'刮刀编号',width:'9%'},
    			 {text:'零件状态',dataIndex:'零件状态',width:'5%'},
    			{text:'位置',dataIndex:'位置',width:'7%'},
    			 {text:'执行动作',dataIndex:'执行动作',width:'9%'},
    			{text:'规格',dataIndex:'规格',width:'5%'},
    			{text:'领用人',dataIndex:'领用人',width:'6%'},
    			{text:'平整度测试',dataIndex:'平整度测试',width:'9%'},
    			{text:'表面清洁状况',dataIndex:'表面清洁状况',width:'9%'},
    			{text:'有无变形',dataIndex:'有无变形',width:'9%'},
    			//{text:'出入库状态',dataIndex:'出入库状态',width:'7%'},
    			{text:'作业员',dataIndex:'维护人',width:'6%'},
    			{text:'日期',dataIndex:'维修日期',width:'10%'},
    			{text:'备注',dataIndex:'备注',width:'8%'}
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