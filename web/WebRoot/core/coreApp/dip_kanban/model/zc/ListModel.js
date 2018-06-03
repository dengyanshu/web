Ext.define("core.dip_kanban.model.zc.ListModel",{
	extend:"Ext.data.Model",
	fields: [
         {name: 'RowNum'},
         {name: 'WorkCenterName'},
         {name: 'MOQty'},
         {name: 'WorkingProcedure'},
         {name: 'OutputQty'},
         {name: 'OnMakeQty'}
    ]
});