Ext.define("core.smt_rpc_kanban.model.ck.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'RowNum'},
         {name: 'Productid'},
         {name: 'ProductName'},
         {name: 'ProductDescription'},
         {name: 'ProductSpecification'},
         {name: 'Sum'},       
         {name: 'Prepared'},
         {name: 'Surplus'},
         {name:	'Rate'}
    ]
});