Ext.define("core.smt_kanban.model.sl.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'RowNum'},
         {name: 'MOName'},
         {name: 'MOQtyRequired'},
         {name: 'InputDone'},
         {name: 'ProductName'},
         {name: 'WorkCenterName'},       
         {name: 'ProductDescription'},
         {name: 'ProductSpecification'},
         {name:	'isAlert'}
    ]
});