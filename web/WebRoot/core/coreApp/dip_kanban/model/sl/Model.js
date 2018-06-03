Ext.define("core.dip_kanban.model.sl.Model",{
	extend:"Ext.data.Model",
    fields: [
         {name: 'RowNum'},
         {name: 'MOName'},
         {name: 'ProductName'},
         {name: 'InputDone'},
         {name: 'MOQtyRequired'},
         {name: 'ProductDescription'},
         {name: 'ProductSpecification'},
         {name:'WorkCenterName'}
    ]
});