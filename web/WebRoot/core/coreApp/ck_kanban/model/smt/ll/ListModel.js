Ext.define("core.ck_kanban.model.smt.ll.ListModel",{
	extend:"Ext.data.Model",
	fields: [
         {name: 'RowNum'},
         {name: 'WorkCenterName'},
         {name: 'ProductName'},
         {name: 'ProductDescript'},
         {name: 'QtyRequired'},
         {name: 'QtySend'},
         {name: 'QtyUsed'},
         {name: 'QtyLeft'},
         {name: 'QtyUnit'},
         {name: 'PCBCanUsed',type:'int'},
         {name: 'isAlert'}
         ]
});