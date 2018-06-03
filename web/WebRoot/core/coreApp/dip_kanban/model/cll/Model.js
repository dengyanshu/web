Ext.define("core.dip_kanban.model.cll.Model",{
	extend:"Ext.data.Model",
    fields: [
         {name: 'id'},   
         {name: 'MOName'},   
         {name: 'ProductName'},
         {name: 'ProductDescription'},
         {name: 'RequireQty'},
         {name: 'StockQty'},
         {name: 'Remark'}
         
    ]
});