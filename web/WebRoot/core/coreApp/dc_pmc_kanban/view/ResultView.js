Ext.define("core.dc_pmc_kanban.view.ResultView",{
	extend:'Ext.grid.Panel',
	layout:'fit',
	alias:'widget.dc_pmc_kanban_result',
	store:'core.dc_pmc_kanban.store.Store',
	bodyStyle: 'background:#006699;',
	 //hideHeaders:true,
	columnLines:true,
	title:'<font size="4" color="black">大仓首次备料计划</font>',
	titleAlign : 'center',
	columns : [
			{header : '序号',dataIndex : 'num',width : 45}, 
			{header : '日期',dataIndex : 'PlanDate',width :85}, 
			{header : '线体',dataIndex : 'WorkcenterName',width : 90}, 
			{header : '工单',dataIndex : 'MOName',width : 136}, 
                        {header : '成品料号',dataIndex : 'ProductNameCode',width : 95}, 
			{header : '工单套料数',dataIndex : 'QtyRequired',width : 90}, 
			{header : '首次通知备料时间',dataIndex : 'BEGINtime',width : 130}, 
			{header : '仓库提前两小时备料时间',dataIndex : 'BEGINtime2',width : 170}, 
			{header : '首次备料数',dataIndex : 'completeQty',width : 90},
			/*
			{header : '单号',dataIndex : 'picklistname',width : 130}, 
			{header : '仓库',dataIndex : 'stockname',width : 100}, 
                        {header : '仓管员',dataIndex : 'UserName',width : 130}, 
                        */
			{header : '状态',dataIndex : 'status',width : 100},
			{header : '拣料单',dataIndex : 'picklistname',width : 130},
			{header : '仓别',dataIndex : 'stockname',width : 100},
			{header : '创建人',dataIndex : 'UserName',width : 130,flex:1}
	],
	tbar:[
						{xtype:'button',text:'刷新',id:'beginPage3'}
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
					}
	}
});