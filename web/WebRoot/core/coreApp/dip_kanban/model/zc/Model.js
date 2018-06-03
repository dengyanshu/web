Ext.define("core.dip_kanban.model.zc.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'RowNum'},
         {name: 'MOName'},
         {name: 'WorkCenterName'},
         {name: 'MOQtyRequired'},
         {name: 'InputDone'},
         {name: 'ProductName'},
         {name: 'ProductSpecification'},
         {name: 'ProductDescription'}
    ]
});