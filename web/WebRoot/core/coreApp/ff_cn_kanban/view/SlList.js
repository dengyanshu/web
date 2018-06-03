Ext.define("core.ff_cn_kanban.view.SlList",{
	extend : "Ext.grid.Panel",
	alias : 'widget.ff_cn_sl_list_kb',
	border:2,
	columnLines : true,
	columns:[
			{text:'制程',dataIndex:'CTYPE',width:250,   renderer:function(value){
           				return '<span style="text-align:center;color:black;font-weight:bold;font-size:20px;">' + value + '</span>';
            }
            },
			{text:'插件',dataIndex:'DIP',width:150,renderer:function(value){
           				return '<span style="text-align:center;color:black;font-weight:bold;font-size:20px;">' + value + '</span>';
            }},
			{text:'组装',dataIndex:'ASSY',width:150,renderer:function(value){
           				return '<span style="text-align:center;color:black;font-weight:bold;font-size:20px;">' + value + '</span>';
            }},			
			{text:'成品测试',dataIndex:'TEST1',width:150,renderer:function(value){
           				return '<span style="text-align:center;color:black;font-weight:bold;font-size:20px;">' + value + '</span>';
            }},
			{text:'半品测试',dataIndex:'TEST',width:150,renderer:function(value){
           				return '<span style="text-align:center;color:black;font-weight:bold;font-size:20px;">' + value + '</span>';
            }},	
			{text:'包装',dataIndex:'PACKING',width:150,renderer:function(value){
           				return '<span style="text-align:center;color:black;font-weight:bold;font-size:20px;">' + value + '</span>';
            }}
		],
		store:'core.ff_cn_kanban.store.sl.ListStore',
		dockedItems:[{
			xtype:'pagingtoolbar',
			store : 'core.ff_cn_kanban.store.sl.ListStore',
			dock:'bottom',
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
		}]
		
//		viewConfig:{
//			forceFit:true,
//			enableRowBody:true,
//			getRowClass:function(record,rowIndex,p,store){
//				var cls='';
//				//alert(record.data.IsAlert);
//				if(record.data.isAlert=="1"){ // 等同于record.get('isAlert')
//					cls="row-red .x-grid-cell";
//				}else if(record.data.isAlert=="2"){
//					cls="row-orange .x-grid-cell";
//				}
//				else {
//					cls="row-green .x-grid-cell";
//				}
//				return cls;
//			}
//		}
		
		


			
});