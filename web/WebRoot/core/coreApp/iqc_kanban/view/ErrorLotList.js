Ext.define("core.iqc_kanban.view.ErrorLotList",{
	extend:'Ext.window.Window',	
	frame:true,
	alias : 'widget.iqc_ErrorLotList',
	width:500,
	maximized:true,
    layout: 'fit',
    title:'批次明细',
    items:[
    	{
    		xtype:'grid',
    		store:'core.iqc_kanban.store.iqc.ListStore',
    		//frame:true,
    		//collapsible:true,
    		height:370,
    		//region:'south',
    		columns:[
	          {text:'序号',dataIndex:'clls',width:60},
    		   {text:'质检单号',dataIndex:'QCDoc_DocNo',width:140},
    		   {text:'单据行号',dataIndex:'QCDocLines_QCDocLineNo',width:100},
    		   {text:'单据日期',dataIndex:'QCDoc_BusinessDate',width:100},
    		   {text:'创建时间',dataIndex:'QCDoc_CreatedOn',width:100},
    			{text:'单据类型',dataIndex:'QCDocType_Name',width:80},
    			{text:'单据状态',dataIndex:'QCDoc_State',width:80},
    			{text:'供应商',dataIndex:'sup_name',width:120},
    			{text:'料号',dataIndex:'ItemMaster_Code',width:120},
    			{text:'品名',dataIndex:'ItemMaster_Name',width:120},
    			{text:'质检员',dataIndex:'Checker_Name',width:60},
    			{text:'质检批量',dataIndex:'QCDocLines_BatchCount',width:80},
    			{text:'质检数量',dataIndex:'QCResult_count',width:80},
    			{text:'质检时间',dataIndex:'QCDocLines_QCTime',width:120},
    			{text:'质检完成时间',dataIndex:'QCDocLines_QCCompleteTime',width:120},
    			{text:'质检结果',dataIndex:'QCDocResults_QCResult',width:120}
    			
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