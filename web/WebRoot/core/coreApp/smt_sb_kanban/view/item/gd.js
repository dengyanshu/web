﻿Ext.define("core.smt_sb_kanban.view.item.gd", {
			extend : "Ext.grid.Panel",
			alias : 'widget.smtsb_gd_kb',
			loadMask : true,
			stripeRows : true,
			store : 'core.smt_sb_kanban.store.gd.Store',
			title:'刮刀保养周期：1次/月   |   次数目标：100000      | 周期预警：99000次   |   次数预警：1000             ',
			columns : [
					{header : '序号',dataIndex : 'RowNum',flex : 0.4},
					{header : '编号',dataIndex : 'DevicePartsNum',flex : 1.2}, 
					{header : '状态',dataIndex : 'DevicePartsStatus',flex : 0.8,
					     renderer:function(v,m) {
					               	   if(v.indexOf("OK")>=0){
					               	   	    m.tdCls = 'x-grid-record-green';
					               	   }
					               	    else if(v=="警告"){
					               	   	    m.tdCls = 'x-grid-record-yellow';
					               	   }
	                                   else{
	                                         m.tdCls = 'x-grid-record-red';
	                                   }
                                        return '<span style="COLOR:#000000">'+v+'</span>';	
                                   }
					}, 
					{header : '位置',dataIndex : 'WorkCenterName',flex : 1.2},
					{header : '执行动作',dataIndex : 'MaintainType',flex : 1.2},
					{header : '平整度测试',dataIndex : 'TestResult',flex : 1.2,
					 renderer:function(v,m) {
					               	   if(v.indexOf("OK")>=0){
					               	   	    m.tdCls = 'x-grid-record-green';
					               	   }
	                                   else{
	                                         m.tdCls = 'x-grid-record-red';
	                                   }
                                        return '<span style="COLOR:#000000">'+v+'</span>';	
                                   }
					},
					{header : '使用次数',dataIndex : 'UsedNum',flex : 1.0
					
					},
					{header : '剩余次数',dataIndex : 'LeftUseNum',flex : 1.0,
					renderer:function(v,m, record, rowIndex, columnIndex, store) {
					   				  var v_my=record.data.alertNum;
					               	   if(v_my==1){
					               	   	    m.tdCls = 'x-grid-record-red';
					               	   }
					               	    else if(v_my==2) {
	                                         m.tdCls = 'x-grid-record-yellow';
	                                   }
	                                   else{
	                                         m.tdCls = 'x-grid-record-green';
	                                   }
                                        return '<span style="COLOR:#000000">'+v+'</span>';	
                                   }
					
					},
					/*
				{header : '使用天数',dataIndex : 'UserDay',flex : 1.0},
					{header : '剩余天数',dataIndex : 'LeftDay',flex : 1.0,
					renderer:function(v,m, record, rowIndex, columnIndex, store) {
					   				  var v_my=record.data.alertDay;
					   				  if(v=="")
					   				  alert(v);
					               	   if(v_my==1){
					               	   	    m.tdCls = 'x-grid-record-red';
					               	   }
					               	    else if(v_my==2) {
	                                         m.tdCls = 'x-grid-record-yellow';
	                                   }
	                                   else{
	                                         m.tdCls = 'x-grid-record-green';
	                                   }
                                        return '<span style="COLOR:#ffffff">'+v+'</span>';	
                                   }
					},*/
					{header : '作业员',dataIndex : 'MaintainUser',flex : 1.4},
					{header : '日期',dataIndex : 'MaintainDate',flex : 1.6}
			],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.smt_sb_kanban.store.gd.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据'
			}]

		});