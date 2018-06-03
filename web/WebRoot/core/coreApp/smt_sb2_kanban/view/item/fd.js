Ext.define("core.smt_sb2_kanban.view.item.fd", {
			extend : "Ext.grid.Panel",
			alias : 'widget.smtsb2_fd_kb',
			loadMask : true,
			stripeRows : true,
			store : 'core.smt_sb2_kanban.store.fd.Store',
			title:'飞达保养周期：90天 | 次数目标：2000000 | 周期预警：10天   | 次数预警：100000 | CPK判定：大于1.33',
			columns : [
					{header : '序号',dataIndex : 'RowNum',flex : 0.4},
					{header : '编号',dataIndex : 'DevicePartsNum',flex : 1.3}, 
					{header : '状态',dataIndex : 'DevicePartsStatus',flex : 0.8, 
					               renderer:function(v,m) {
					               	   if(v=="OK"){
					               	   	    m.tdCls = 'x-grid-record-green';
					               	   }
					               	   else if(v=="警告"){
					               	   	    m.tdCls = 'x-grid-record-yellow';
					               	   }
	                                   else
	                                         m.tdCls = 'x-grid-record-red';
					               	   
                                        return '<span style="COLOR:#000000">'+v+'</span>';	
                                   }
					},
					{header : '位置',dataIndex : 'WorkcenterName',flex : 1.2},
					{header : '执行动作',dataIndex : 'MaintainType',flex : 1.2},
					{header : '槽位',dataIndex : 'slot',flex : 0.9},
					{header : 'CPK',dataIndex : 'TestResult',flex : 0.7,
					 renderer:function(v,m) {
		               	   if(v>1.33){
		               	   	    m.tdCls = 'x-grid-record-green';
		               	   }
                           else {
                                 m.tdCls = 'x-grid-record-red';
                           }
                           return '<span style="COLOR:#ffffff">'+v+'</span>';	
                       }
					
					},
					{header : '使用次数',dataIndex : 'UsedNum',flex : 1.0},
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
					{header : '使用天数',dataIndex : 'UserDay',flex : 1.0},
					{header : '剩余天数',dataIndex : 'LeftDay',flex : 1.0,
					     renderer:function(v,m, record, rowIndex, columnIndex, store) {
					   				  var v_my=record.data.alertDay;
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
					{header : '作业员',dataIndex : 'MaintainUser',flex : 1.4},
					{header : '日期',dataIndex : 'MaintainDate',flex : 1.6}
			],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.smt_sb2_kanban.store.fd.Store',
				dock:'bottom',
				displayInfo:true,
				pageSize:15,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据'
			}]

		});
		
		

