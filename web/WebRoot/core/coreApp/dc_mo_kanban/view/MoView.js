Ext.define("core.dc_mo_kanban.view.MoView",{
	extend:'Ext.grid.Panel',
	alias:'widget.dc_mo_kb_moview',
	store:'core.dc_mo_kanban.store.sl.Store',
	columns : [
			{header : '序号',dataIndex : 'Num',width : 40},
			{header : '首单',dataIndex : 'firstMoName',width : 135},
			{header : '工单',dataIndex : 'MOName',width : 135},
			{header : '工单计划上线时间',dataIndex : 'planToOnlineTime',width : 155},
			{header : '产品料号',dataIndex : 'ProductName',width : 95}, 
			{header : '需求数量',dataIndex : 'MOQtyRequired',flex:1}
	],
	dockedItems:[{
		xtype:'pagingtoolbar',
		store : 'core.dc_mo_kanban.store.sl.Store',
		dock:'bottom',
		displayInfo:true,
		displayMsg:'第{0} 到 {1} 条数据 共{2}条',
		emptyMsg:'没有数据'
		/*items:[
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
		]*/
	}],
	tbar:[
		{xtype:'button',text:'返回',action:'return'}
	],
	viewConfig:{
		forceFit:true,
		enableRowBody:true,
		getRowClass:function(record,rowIndex,p,store){
			var cls='';
			if(record.data.flag=="3"){ //等同于record.get('isAlert')
				cls="row-yellow .x-grid-cell";
			}
			else if(record.data.flag=="1"){ //等同于record.get('isAlert')
				cls="row-red .x-grid-cell";
			}
			else if(record.data.flag=="2"){ //等同于record.get('isAlert')
				cls="row-rosegold .x-grid-cell";
			}
			else {
				cls="row-green .x-grid-cell";
				//cls="row-red .x-grid-cell";
			}
			return cls;
		}
	}
	
	
	
	
});