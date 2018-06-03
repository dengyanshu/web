Ext.define("core.steelmesh_kanban.view.List", {
			extend : "Ext.grid.Panel",
			alias : 'widget.steelmesh_kanban',
			loadMask : true,
			stripeRows : true,
			layout : 'fit',
			// id:'images-view-mt',
			bodyStyle : 'background:#444444;padding:1px;',
			store : 'core.steelmesh_kanban.store.Store',
			columns : [/*{
						header : '序号',
						dataIndex : 'row',
						width : '4%'
						
					},*/ 
					{
						header : '线别',
						dataIndex : 'WorkCenter',
						width : '7%'
					}, {
						header : '储位号',
						dataIndex : 'StoreNo',
						width : '5%'
					}, {
						header : '钢网序列号',
						dataIndex : 'SteelmeshSN',
						width : '10%'
					},
					
					{
						header : '工站',
						dataIndex : 'flag',
						width : '6%'
					}, {
						header : '上线时间',
						dataIndex : 'OnlineDate',
						width : '10%'
					}, {
						header : '在线清洗时间',
						dataIndex : 'WashOnLine',
						width : '10%'
					}, {
						header : '下次在线清洗时间',
						dataIndex : 'nextonlinewash_time',
						width : '10%'
					}, {
						header : '下次在线清洗倒计时(分)',
						dataIndex : 'nextonlinewash_countdown',
						width : '11.5%'
						,renderer:rendererSon
					}, {
						header : '离线清洗时间',
						dataIndex : 'WashOutLine',
						width : '10%'
					}, {
						header : '下次离线清洗时间',
						dataIndex : 'nextoutlinewash_time',
						width : '10%'
					}, {
						header : '下次离线清洗倒计时(时)',
						dataIndex : 'nextoutlinewash_countdown',
						width : '11.5%'
						,renderer:rendererSon2
					}]
					,viewConfig:{
						forceFit:true,
						enableRowBody:true,
						getRowClass:function(record,rowIndex,p,store){
							var cls='';
							cls="row-green .x-grid-cell";
							return cls;
						}
					}
			/*dockedItems : [{
						xtype : 'pagingtoolbar',
						store : 'core.steelmesh_kanban.store.Store',
						dock : 'bottom',
						displayInfo : true,
						displayMsg : '第{0} 到 {1} 条数据 共{2}条',
						emptyMsg : '没有数据'
					}]*/

		});

function rendererSon(v, m) {
	if (v<=5) {
		m.tdCls = 'x-grid-record-red';
	} 
	return '<span style="text-align:center;COLOR:#ffffff">' + v + '</span>';

}

function rendererSon2(v, m) {
	if (v <=1) {
		m.tdCls = 'x-grid-record-red';
	} 
	return '<span style="text-align:center;COLOR:#ffffff">' + v + '</span>';

}