Ext.define("core.dc_mo_kanban.view.SlList",{
	extend : "Ext.grid.Panel",
	alias : 'widget.dc_mo_sl_list_kb',
	title:"<div style='width:910px;float:left'>送料区</div><div>备料区(黄色待备，绿色扫描完成)</div>" ,
		columns:[
			{text:'序号',dataIndex:'Num',sortable:true ,width:50,locked:true,renderer:rendererFather1},
			{text:'料号',dataIndex:'ProductName',width:120,locked:true,renderer:rendererFather1},	
			{text:'规格/描述',dataIndex:'ProductDescription',sortable:false,locked:true,width:100,renderer:rendererFather1},
			{text:'总需求量',dataIndex:'BOMQty',width:80,locked:true,renderer:rendererFather1},
			{text:'过账数量',dataIndex:'IssueQty',width:80,locked:true,renderer:rendererFather1},
			{text:'剩余数量',dataIndex:'RestQty',width:80,locked:true,renderer:rendererFather1},
			{text:'送料单',dataIndex:'PickingListNameS',width:140,locked:true,renderer:rendererFather1},
			{text:'送料时间',dataIndex:'ExecuteTime',width:130,renderer:rendererFather1,locked:true},
			
			
			{text:'备料单',dataIndex:'PickingListName',width:140,renderer:rendererFather2},
			{text:'备料时间',dataIndex:'IssueTime',width:120,renderer:rendererFather2},
			{text:'待备数量',dataIndex:'RestIssueQty',width:100,renderer:rendererFather2},
			{text:'已拣扫数量',dataIndex:'PickIssueQty',width:100,renderer:rendererFather2},
			{text:'仓别',dataIndex:'StockName',width:100,renderer:rendererFather2},
			{text:'仓管员',dataIndex:'StockUserCode',width:100,renderer:rendererFather2},
			{text:'组长',dataIndex:'PStockUserCode',width:100,renderer:rendererFather2},
			{text:'一次性/分批',dataIndex:'IsInBatches',width:160,renderer:rendererFather2},
            {text:'制程',dataIndex:'FlowName',width:100,renderer:rendererFather2}
		],
		
		features: [{
        	    ftype: 'groupingsummary',
                startCollapsed : false,
                groupHeaderTpl: '责任人:{name}'
       }],
       
		
		store:'core.dc_mo_kanban.store.sl.ListStore'
//		dockedItems:[{
//			xtype:'pagingtoolbar',
//			store : 'core.dc_mo_kanban.store.sl.ListStore',
//			dock:'bottom',
//			displayInfo:true,
//			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
//			emptyMsg:'没有数据'
//		}],
//		
		/*viewConfig:{
			forceFit:true,
			enableRowBody:true,
			getRowClass:function(record,rowIndex,p,store){
				var cls='';
				//alert(record.data.IsAlert);
				if(record.data.ColorFlag=="2"){ // 等同于record.get('isAlert')
					cls="row-red .x-grid-cell";
				}else if(record.data.ColorFlag=="1"){
					cls="row-orange .x-grid-cell";
				}
				else {
					cls="row-green .x-grid-cell";
				}
				return cls;
			}
		}*/
		
	


			
});


	function rendererFather1(v,m) {
		m.tdCls = 'x-grid-record-red';
		//return '<span style="COLOR:#000000">'+v+'</span>';	
		return v;	
    }

   function rendererFather2(value, cellMeta, record, rowIndex, columnIndex, store) {
	var flag = record.data.flag;
	flag=flag.valueOf();
	if(flag==1){
		cellMeta.tdCls = 'x-grid-record-red';
		//cellMeta.tdCls = 'blink';
		return value;	
	}
	else  if(flag==2){
		//cellMeta.tdCls = 'x-grid-record-rosegold';
		cellMeta.tdCls = 'blink';
		return value;	
		
	}
	else  if(flag==3){
		cellMeta.tdCls = 'x-grid-record-yellow';
		//return '<span style="COLOR:#eee">'+value+'</span>';
		return value;	
		
	}
	else {
	    cellMeta.tdCls = 'x-grid-record-green';
	    return value;
	}
	
}