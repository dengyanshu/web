Ext.define("core.hw_line_kanban.model.sl.Model",{
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
        {name:	'isOver'}, { name:'FlowName' },
          {name:	'headman'},
           {name:	'CompleteQTY'},
           {name:	'UnComplete'},
           {name:	'Efficiency'}, 
            {name:	'CustomerModel'}
          


            
    ]
});