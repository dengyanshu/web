Ext.define("core.smt_xbckc.view.ResultView",{
	extend:'Ext.grid.Panel',
	region:'center',
	alias:'widget.smt_xbckc_listview',
	store:'core.smt_xbckc.store.Store',
	columns : [
			//{header : 'PickingListId',dataIndex : 'PickingListId',width : 120},
			{header : '序号',dataIndex : 'row',width : 50},
			{header : '料号',dataIndex : 'productname',width : 125}, 
			{header : '规格',dataIndex : 'productdescri',width : 225},
			{header : '库位',dataIndex : 'stock',width : 120},
			{header : '库存数量',dataIndex : 'sumqty',width : 100,
				renderer:function(v,m,r){
					  if(r.get('isalert_sum')=='1') {
					       // return '<SPAN style="color:red">' + v + '</SPAN>';
					  	   m.tdCls='x-grid-record-red';
					    }else {
					         
					    }
					    return v;
				}
				
			
			},
			{header : 'MZ个数',dataIndex : 'mzqty',width : 100,
			    renderer:function(v,m,r){
					  if(r.get('isalert_mzqty')=='1') {
					        m.tdCls='x-grid-record-yellow';
					    }else {
					         
					    }
					    return v;
				}
			
			}
			//{header : '库存报警',dataIndex : 'isalert_sum',width : 100},
			//{header : 'MZ报警',dataIndex : 'isalert_mzqty',width : 100}
	]
//	dockedItems:[{
//		xtype:'pagingtoolbar',
//		store : 'core.smt_xbckc.store.Store',
//		dock:'bottom',
//		displayInfo:true,
//		displayMsg:'第{0} 到 {1} 条数据 共{2}条',
//		emptyMsg:'没有数据'		
//	}]
});