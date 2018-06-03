Ext.define("core.kanban.model.Model2",{
	extend:"Ext.data.Model",
	fields: [
         {name: 'torder'},
         {name: 'ProductName'},
         {name: 'stockLocation'},
         {name: 'ProductDescript'},
         {name: 'RequireMount'},
         {name: 'ReadyMount'},
         {name: 'UsedMount'},
         {name: 'LeftMount'},
         {name: 'UnitQty'},
         {name: 'LeftUnitQtyMount'}
    ]
});