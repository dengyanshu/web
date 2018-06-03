Ext.define("core.smt_kanban.model.sl.ListModel",{
	extend:"Ext.data.Model",
	fields: [
         {name: 'RowNum',type:'int'},
         {name: 'MOName'},
         {name: 'WorkCenterName'},
         {name:	'Side'},
         {name: 'ProductName'},
         {name: 'XBCStockLocationName'},
         {name: 'SLotNO'},
         {name: 'StationNo'},
         {name: 'RequiredMount'},
         {name: 'WaitMount'},      
         {name: 'OnLoadMount'},
         {name: 'SurplusMount'},
         {name: 'UnitQty'},
         {name: 'CanUsePCBQty',type:'int'},
         {name:	'alterQty'},
         {name:	'isAlert'},
         {name:'isAlertSum'},
         {name:'inputqty'}
    ]
});