Ext.define("core.dip_kanban.model.sl.ListModel",{
	extend:"Ext.data.Model",
	fields: [
         {name: 'RowNum'},
         {name: 'WorkCenterName'},
         {name: 'ProductName'},
         {name: 'ProductDescript'},
         {name: 'RequireQuantity'},
         {name: 'ReadyQuantity'},
         {name: 'UsedQuantity'},
         {name: 'SurplusMount'},
         {name: 'CanUsePCBQty'},
         {name: 'UnitQty'},
         {name: 'StockLocation'},
         {name: 'SpecificationName'}         
    ]
});