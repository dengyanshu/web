Ext.define("core.dip_kanban.view.item.Lts", {
			extend : "Ext.grid.Panel",
			alias : 'widget.dip_lts_kb',
			loadMask : true,
			stripeRows : true,
			store : 'core.dip_kanban.store.lts.Store',
			columns : [
////				{header : '序号',dataIndex : 'RowNum',flex : 0.4},
//					{xtype:'rownumberer',text:'序号',flex : 0.4},
//					{header : '线别ID',dataIndex : 'Workcenterid',hidden:true}, 
//					{header : 'ProductFamilyShortName',dataIndex : 'ProductFamilyShortName',hidden:true}, 
//					{header : 'ProductName',dataIndex : 'ProductName',hidden:true}, 
//					{header : '线别',dataIndex : 'WorkcenterName',flex : 1.4}, 
////					{header : '上岗卡机',dataIndex : 'OnGwkName',flex : 1.4},
////					{header : '下岗卡机',dataIndex : 'OffGwkName',flex : 1.4},
//					{header : '班别',dataIndex : 'Shift',hidden:true},
//					{header : '制程列表',dataIndex : 'WorkprocedureFlowName_List',flex : 1.2},
//					{header : '当前工单',dataIndex : 'MoName',flex : 1.2},
//					{header : '产出',dataIndex : 'SumYield',flex : 0.8},
//					{header : '工时',dataIndex : 'SumTime',flex : 0.8},
//					{header : '标准产能',dataIndex : 'UPH',flex : 0.8},
//					{header : '平均产能',dataIndex : 'AvgYield',flex : 0.8},
//					{header : '节点ID',dataIndex : 'Specificationid_End',hidden:true},
//					{header : '工单ID',dataIndex : 'MOId',hidden:true},
//					{header : '标准人力',dataIndex : 'StandardHuman',hidden:true},
//					{header : '产品描述',dataIndex : 'productDescription',hidden:true},
//					{header : '工单数量',dataIndex : 'MOQtyRequired',hidden:true},
//					{header : '达成率',dataIndex : 'AchieveRate',flex : 3.8,renderer:function(value){
//						return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus3(value);}}
//		
	    			{text:'日期',dataIndex:'Fdate',width:100},	  	    			
	    			{text:'事业部',dataIndex:'OrgName',width:150},  			
	    			{text:'计划产量',dataIndex:'PlanSumQty',width:100},
	    			{text:'实际产量',dataIndex:'ActualSumQty',width:100}, 			
	    			{text:'达成率',dataIndex:'AchieveRate',width:100 ,renderer:function(value){
	    	    			return value+"%";}},  			
	    			{text:'标准总工时',dataIndex:'StandardTotalOfTime',width:100}, 			
	    			{text:'实际总工时',dataIndex:'ActualLaborTime',width:100},
	    			{text:'异常总工时',dataIndex:'UnusualLaborTime',width:100},   			
	    			{text:'产能工时效率',dataIndex:'Efficiency',width:100,renderer:function(value){
	        			return value+"%";}},
	    			{text:'返工总工时',dataIndex:'ReMadeLaborTime',width:100}, 			
	    			{text:'考勤总工时',dataIndex:'CheckinSumTime',width:100},  			
	    			{text:'未上岗工时',dataIndex:'NotOnLaborTime',width:100}											
					],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.dip_kanban.store.lts.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据',
			}]

		});