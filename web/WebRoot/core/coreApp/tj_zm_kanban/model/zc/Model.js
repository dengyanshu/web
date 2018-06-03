Ext.define("core.tj_zm_kanban.model.zc.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'WorkcenterId'},
         {name: 'WorkcenterName'},
         {name: 'InputQty'},
         {name: 'CompleteQty'},
         {name: 'RepairQty'}
    ]
});