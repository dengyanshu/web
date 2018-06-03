Ext.define("core.tj_ck_kanban.model.bl.ListModel",{
	extend:"Ext.data.Model",
	fields: [
         {name: 'RowNum'},
         {name: 'WorkCenterName'},
         {name: 'ProductName'},
         {name: 'ProductDescript'},
         {name: 'StockLocation'},
         {name: 'RequireQuantity'},
         {name: 'ReadyQuantity'},
         {name: 'UsedQuantity'},
         {name: 'SurplusMount'},
         {name: 'UnitQty'},
         {name: 'CanUsePCBQty'},
         {name:	'isAlert'},
         {name: 'isAlertSum'}
    ]
});