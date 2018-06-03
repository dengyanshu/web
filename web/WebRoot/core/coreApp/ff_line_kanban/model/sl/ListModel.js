Ext.define("core.ff_line_kanban.model.sl.ListModel",{
	extend:"Ext.data.Model",
	fields: [
         {name: 'RowNum',type:'int' ,sortable:true},
         {name: 'MOName'},
         {name: 'WorkcenterName'},
          {name: 'ProductFamilyName'},
            {name: 'headman'},
         {name: 'ProductName'},
           {name: 'ProductDescription'},
           {name: 'WorkprocedureFlowName'},
           {name: 'MOQtyRequired'},
            {name:'UnitQty'},
             {name:'RequiredMount'},
             {name:'OnLoadMount'},
             {name:'OweMount'},
             //1111
            {name:'SurplusMount'},
            {name:'CanUsePCBQty'},
             {name:'AlreadyQty'},
             {name:'isAlert'},
	        {name: 'inputqty'},
	        {name: 'StockMount'},
	        
	        
	        {name: 'UseQty'},
	        {name: 'beiQty'},
	        {name: 'rece_material'},
	        {name: 'beiTime' },
	        {name: 'receTime' }
	        
	        
	       
	        
	        
	        //2222
	        
    ]
});



