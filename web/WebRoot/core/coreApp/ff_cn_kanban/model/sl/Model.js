Ext.define("core.ff_cn_kanban.model.sl.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'Num'},
         {name: 'MOName'},
         {name: 'MOQtyRequired'},
         {name: 'InputDone'},
         {name: 'ProductName'},
         {name: 'WorkcenterName'},       
         //{name: 'ProductDescription'},
         {name: 'ProductSpecification'},
         {name:	'isAlert'},
         {name:	'PlannedDateFrom'},
         {name:	'PlannedDateTo'},
         {name:	'ExecuteDateFrom'},
         {name:	'ExecuteDateTo'},
        {name:	'isOver'},
          {name:	'headman'}
    ]
});