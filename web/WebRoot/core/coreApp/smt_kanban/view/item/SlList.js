﻿Ext.define("core.smt_kanban.view.item.SlList",{
	extend : "Ext.grid.Panel",
	alias : 'widget.smt_sl_list_kb',
		columns:[
			{text:'序号:',dataIndex:'RowNum',width:50},
			{text:'工作中心',dataIndex:'WorkCenterName',width:150,hidden:true},
			{text:'机台号',dataIndex:'StationNo',width:100,hidden:true},			
			{text:'站位',dataIndex:'SLotNO',width:150},			
			{text:'料号',dataIndex:'ProductName',width:160},			
			{text:'线边仓库位',dataIndex:'XBCStockLocationName',width:150},			
			{text: '需求数',dataIndex:'RequiredMount',width:80},			
			{text: '未上料数量',dataIndex:'WaitMount',width:80},			
			{text:'上料数量',dataIndex:'OnLoadMount',width:80},
			{text:'剩余数量',dataIndex:'SurplusMount',width:80},
			{text:'单位数量',dataIndex:'UnitQty',width:60},
			{text:'A/B面',dataIndex:'Side',width:60},
			{text:'投板数量',dataIndex:'inputqty',width:60},
			{text:'可生产板数',dataIndex:'CanUsePCBQty',flex:1}
		],
		store:'core.smt_kanban.store.sl.ListStore',
		dockedItems:[{
			xtype:'pagingtoolbar',
			store : 'core.smt_kanban.store.sl.ListStore',
			dock:'bottom',
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
		}],
		viewConfig:{
			forceFit:true,
			enableRowBody:true,
			getRowClass:function(record,rowIndex,p,store){
				var cls='';
				if(record.data.isAlert=="1"){ //等同于record.get('isAlert')
					cls="row-red .x-grid-cell";
				}else if(record.data.isAlert=="2"){
					cls="row-orange .x-grid-cell";
				}
				else {
					cls="row-green .x-grid-cell";
				}
				return cls;
			}
		}
});