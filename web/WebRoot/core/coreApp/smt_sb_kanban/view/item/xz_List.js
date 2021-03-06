﻿Ext.define("core.smt_sb_kanban.view.item.xz_List",{
	extend:'Ext.window.Window',	
	frame:true,
	alias : 'widget.smtsb_xz_list_kb',
	width:500,
	maximized:true,
    layout: 'fit',
    title:'吸嘴历史记录',
    items:[
    	{
    		xtype:'grid',
    		store:'core.smt_sb_kanban.store.xz.ListStore',
    		//frame:true,
    		//collapsible:true,
    		height:370,
    		//region:'south',
    		columns:[
    			{text:'吸嘴编号',dataIndex:'吸嘴编号',width:'9%'},
    			 {text:'零件状态',dataIndex:'零件状态',width:'5%'},
    			{text:'位置',dataIndex:'位置',width:'7%'},
    			{text:'数量',dataIndex:'数量',width:'7%'},
    			//{text:'规格',dataIndex:'规格',width:'7%'},
    			{text:'执行动作',dataIndex:'维护类型',width:'6%'},
    			{text:'原因',dataIndex:'维护原因',width:'9%'},
    			{text:'执行结果',dataIndex:'维护对策',width:'9%'},
    			//{text:'维护部位',dataIndex:'维护部位',width:'6%'},
    			//{text:'配件料号',dataIndex:'配件料号',width:'6%'},
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