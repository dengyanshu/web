Ext.define("core.dc_mo_kanban.model.sl.ListModel",{
	extend:"Ext.data.Model",
	fields: [
         {name: 'Num',type:'float',sortDir:"DESC"},
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
           {name: 'StockUserCode'},
           {name: 'PStockUserCode'},
           {name: 'PickIssueQty'},
           {name: 'PickingListNameS'}
           
           	
    ]
});



