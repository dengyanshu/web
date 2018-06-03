Ext.define("core.xm_ztl.view.ResultView",{
	extend:'Ext.grid.Panel',
	region:'center',
	alias:'widget.xm_ztl_listview',
	store:'core.xm_ztl.store.Store',
	columns : [
			{header : '机型',dataIndex : 'ProductFamilyName',width : 160,renderer:rendererGreen},
			{header : '站别',dataIndex : '站别',width : 130,renderer:rendererGreen},
			
			{header : '生产效率',columns:[
			       {header : 'UPH',dataIndex : 'alertQty',width : 50,renderer:rendererNeed1},
                   {header : '实际产能 ',dataIndex : 'UPHYieId',width : 80,renderer:rendererNeed1},
			]}, 
			 
			{header : '生产直通率',columns:[
				{header : '投入总数 ',dataIndex : '投入总数 ',width : 80,renderer:rendererNeed2},
				{header : '一次通过数',dataIndex : '一次通过数',width : 100,renderer:rendererNeed2},
				{header : '一次通过率 (%)',dataIndex : '一次通过率 (%)',width : 120,renderer:rendererNeed2
				},
				{header : '一次不良数',dataIndex : '一次不良数',width : 120,renderer:rendererNeed2},
				{header : '一次不良率 (%)',dataIndex : '一次不良率 (%)',width : 120,flex:1,renderer:rendererNeed2}
				   
			]},
			
	],
//	dockedItems:[{
//		xtype:'pagingtoolbar',
//		store : 'core.xm_ztl.store.Store',
//		dock:'bottom',
//		displayInfo:true,
//		displayMsg:'第{0} 到 {1} 条数据 共{2}条',
//		emptyMsg:'没有数据'		
//	}]


   /* viewConfig:{
    	forceFit:true,
    	enableRowBody:true,
    	getRowClass:function(record,rowIndex,p,store){
    		var cls='';
    		cls="row-green .x-grid-cell";
    		return cls;
    	}
   }*/
});

function rendererNeed1(value, cellMeta, record, rowIndex, columnIndex, store) {
	var stand = Number(record.data.UPHYieId.replace("%",""));
	if (stand>=95){
		cellMeta.tdCls = 'x-grid-record-green';
		return '<span style="COLOR:#000000">'+value+'</span>';
	}
	else{
		cellMeta.tdCls = 'x-grid-record-red';
		return '<span style="COLOR:#000000">'+value+'</span>';					
	}
	
	
} 

function rendererNeed2(value, cellMeta, record, rowIndex, columnIndex, store) {
	var ztl=record.data["一次通过率 (%)"].replace("%","");
	var stand = Number(ztl);
	//alert(stand);
	if (stand>=95){
		cellMeta.tdCls = 'x-grid-record-green';
		return '<span style="COLOR:#000000">'+value+'</span>';
	}
	else{
		cellMeta.tdCls = 'x-grid-record-red';
		return '<span style="COLOR:#000000">'+value+'</span>';					
	}
} 


function rendererGreen(value, cellMeta, record, rowIndex, columnIndex, store) {
	cellMeta.tdCls = 'x-grid-record-yellow';
	return '<span style="COLOR:#000000">'+value+'</span>';
} 