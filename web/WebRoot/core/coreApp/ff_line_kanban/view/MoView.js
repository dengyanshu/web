Ext.define("core.ff_line_kanban.view.MoView",{
	extend:'Ext.grid.Panel',
	alias:'widget.ff_line_kb_moview',
	store:'core.ff_line_kanban.store.sl.Store',
	columns : [
			{header : '序号',dataIndex : 'Num',width : 40},
			{header : '工单',dataIndex : 'MOName',width : 135},
			{header : '产品料号',dataIndex : 'ProductName',width : 95}, 
			{header : '需求数量',dataIndex : 'MOQtyRequired',width : 65},
			{header : '组长',dataIndex : 'headman',width : 65},
			{header : '计划开始时间',dataIndex : 'PlannedDateFrom',width : 100},
			{header : '计划结束时间',dataIndex : 'PlannedDateTo',width : 100},
			{header : '实际开始时间',dataIndex : 'ExecuteDateFrom',width : 100},
			{header : '实际结束时间',dataIndex : 'ExecuteDateTo',width : 100},
			{header : '投入产出比',dataIndex : 'InputDone',flex : 1,
				renderer : function(value) {
					return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus2(value);
				}}
			
			
	],
	dockedItems:[{
		xtype:'pagingtoolbar',
		store : 'core.ff_line_kanban.store.sl.Store',
		dock:'bottom',
		displayInfo:true,
		displayMsg:'第{0} 到 {1} 条数据 共{2}条',
		emptyMsg:'没有数据',
		items:[
            {xtype:'label',text:'投产（产出条）：'},
			{xtype:'label',html:'<img src="/web/core/css/image/grid/green2.gif"/>'},
			{xtype:'label',text:'已投入'},
			{xtype:'label',html:'<img src="/web/core/css/image/grid/red.gif"/>'},
			{xtype:'label',text:'已产出'},'-','-','-',
			 {xtype:'label',text:'工单（背景）：'},
			{xtype:'label',html:'<img src="/web/core/css/image/grid/green.gif"/>'},
			{xtype:'label',text:'正在生产'},
			{xtype:'label',html:'<img src="/web/core/css/image/grid/orange.gif"/>'},
			{xtype:'label',text:'已生产未结单'}
		]
	}],
	tbar:[
		{xtype:'button',text:'返回',action:'return'}
	],
	viewConfig:{
		forceFit:true,
		enableRowBody:true,
		getRowClass:function(record,rowIndex,p,store){
			var cls='';
			if(record.data.isOver=="0"){ //等同于record.get('isAlert')
				cls="row-green .x-grid-cell";
			}else {
				cls="row-orange .x-grid-cell";
			}
			return cls;
		}
	}
	
	
});