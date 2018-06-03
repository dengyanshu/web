Ext.define("core.dip_kanban.view.item.Dfl", {
	extend : "Ext.grid.Panel",
	alias : 'widget.dip_dfl_kb',
	loadMask : true,
	stripeRows : true,
	store : 'core.dip_kanban.store.dfl.Store',
	columns : [
	           {header : '序号',dataIndex : 'ID',flex : 0.4 }, 
	           {header : '领料单ID',dataIndex : 'PickingListId',flex : 0.4,hidden:true}, 
	           {header : '领料单',dataIndex : 'PickinglistName',flex : 1.7 }			           
			],					
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.dip_kanban.store.dfl.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0}到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据'
			}]

});