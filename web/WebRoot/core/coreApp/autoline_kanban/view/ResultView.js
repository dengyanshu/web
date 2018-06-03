Ext.define("core.autoline_kanban.view.ResultView",{
	extend:'Ext.grid.Panel',
	layout:'fit',
	alias:'widget.autoline_kanban_result',
	store:'core.autoline_kanban.store.Store',
	bodyStyle: 'background:#006699;',
	 //hideHeaders:true,
	columnLines:true,
	title:'<font size="5" color="black">自动化线产出('+(new  Date().getHours()-1)+'时---当前时间)</font>',
	titleAlign : 'center',
	columns : [
	
	
			//{header : '序号',dataIndex : 'Row',width : 40},
			{header : '前1小时',dataIndex : 'TimeSlice1',width : 100,renderer:rendererFather}, 
			{header : '当前时间',dataIndex : 'TimeSlice2',width : 100,renderer:rendererFather}, 
			{header : '料号',dataIndex : 'ProductName',width : 100,renderer:rendererFather2}, 
			{header : '工单',dataIndex : 'MOName',width : 150,renderer:rendererFather2}, 
			{header : '工站',dataIndex : 'WG_WorkStation',width : 100,renderer:rendererFather}, 
			{header : '前1小时产出',dataIndex : 'LastTimeQty',width : 135,renderer:rendererFather}, 
			{header : '当前产出',dataIndex : 'CurrTimeQty',width : 100,renderer:rendererFather}, 
			{header : '工单总产出',dataIndex : 'MOQtyDone',flex:1,renderer:rendererFather}
			
			
	]
	,
	viewConfig:{
		forceFit:true,
		enableRowBody:true,
		getRowClass:function(record,rowIndex,p,store){
			var cls='';
			if(record.data.ZhitongLv>=90){ //等同于record.get('isAlert')
				cls="row-green .x-grid-cell";
			}else if(record.data.ZhitongLv>=80&&record.data.ZhitongLv<90){
				cls="row-orange .x-grid-cell";
			}
			else {
				cls="row-gold .x-grid-cell";
			}
			return cls;
		}
	}
});


function rendererFather(v,m) {
	m.tdCls = 'x-grid-record-brown';
	return '<span style="COLOR:#000000">'+v+'</span>';	
}

function rendererFather2(v,m) {
	m.tdCls = 'x-grid-record-green';
	return '<span style="COLOR:#000000">'+v+'</span>';	
}