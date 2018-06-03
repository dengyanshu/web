Ext.define("core.smt_rpc_kanban.model.xb.Model",{
	extend:"Ext.data.Model",
	fields: [
	         {name: 'RowNum'},
	         {name: 'Productid'},
	         {name: 'ProductName'},
	         {name: 'ProductDescription'},
	         {name: 'ProductSpecification'},
	         {name: 'Sum'},       
	         {name: 'Used'},//Append
	         {name: 'Surplus'},
	         {name:	'Rate'}
	]
/*
    fields: [
    	 {name: 'RowNum'},
             {name: 'Productid'},
             {name: 'ProductName'},
             {name: 'ProductDescription'},
             {name: 'ProductSpecification'},
             {name: 'Sum'},       
             {name: 'Append'},
             {name: 'Surplus'},
             {name:	'Rate'}
    ]
    */
});