Ext.define("core.ck_kanban.model.bl.ListModel",{
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