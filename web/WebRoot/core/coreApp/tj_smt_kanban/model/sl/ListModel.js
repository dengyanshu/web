Ext.define("core.tj_smt_kanban.model.sl.ListModel",{
	extend:"Ext.data.Model",
	fields: [
         {name: 'RowNum'},
         {name: 'WorkCenterName'},
         {name: 'ProductName'},
         {name: 'OnLoadMount'},
         {name: 'SurplusMount'},
         {name: 'SLotNO'},
         {name: 'StationNo'},
         {name: 'UnitQty'},
         {name: 'CanUsePCBQty'}
    ]
});