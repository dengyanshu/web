Ext.define("core.dc_pmc_kanban.model.sl.ListModel",{
	extend:"Ext.data.Model",
	fields: [
         {name: 'Num',type:'int' ,sortable:true},
         {name: 'flag'},
         {name: 'ProductName'},
         {name: 'ProductDescription'},
          {name: 'ProductFamilyName'},
            {name: 'BOMQty'},
         {name: 'IssueQty'},
           {name: 'RestQty'},
           {name: 'ExecuteTime'},
           {name: 'ColorFlag'},
           {name: 'IsInBatches'},
           {name: 'FlowName'},
           {name: 'RestIssueQty'},
           {name: 'PickingListName'},
           {name: 'IssueTime'},
           {name: 'StockName'},
           {name: 'StockLocationName'},
           {name: 'scbltime'},
           {name: 'PickingListQty'},
           {name: 'IssueTime'},
           {name: 'StockUserCode'}
    ]
});



