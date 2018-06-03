Ext.define("core.smt_sb2_kanban.view.item.gw_List",{
	extend:'Ext.window.Window',	
	frame:true,
	alias : 'widget.smtsb2_gw_list_kb',
	width:500,
	maximized:true,
    layout: 'fit',
    title:'钢网历史记录',
    items:[
    	{
    		xtype:'grid',
    		store:'core.smt_sb2_kanban.store.gw.ListStore',
    		//frame:true,
    		//collapsible:true,
    		height:370,
    		//region:'south',
    		columns:[
    			{text:'储位号',dataIndex:'储位号',width:'9%'},
    			{text:'钢网编号',dataIndex:'钢网编号',width:'9%'},
    			{text:'位置',dataIndex:'位置',width:'7%'},
    			 {text:'零件状态',dataIndex:'零件状态',width:'5%'},
    			 {text:'执行动作',dataIndex:'执行动作',width:'9%'},
    			{text:'张力测试结果',dataIndex:'张力测试结果',width:'7%'},
    			//{text:'规格',dataIndex:'规格',width:'5%'},
    			//{text:'领用人',dataIndex:'领用人',width:'6%'},
    			{text:'张力值方向左上',dataIndex:'张力值方向左上',width:'9%'},
    			{text:'张力值方向右上',dataIndex:'张力值方向右上',width:'9%'},
    			{text:'张力值方向左下',dataIndex:'张力值方向左下',width:'9%'},
    			{text:'张力值方向右下',dataIndex:'张力值方向右下',width:'9%'},
    			{text:'张力值方向中央',dataIndex:'张力值方向中央',width:'9%'},
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