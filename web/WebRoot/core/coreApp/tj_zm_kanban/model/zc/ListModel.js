Ext.define("core.tj_zm_kanban.model.zc.ListModel",{
	extend:"Ext.data.Model",
	fields: [
		 {name: 'WorkcenterId'},
         {name: 'WorkcenterName'},
         {name: 'Times'},
         {name: 'InputQty'},
         {name: 'CompleteQty'},
         {name: 'RepairQty'}
    ]
});