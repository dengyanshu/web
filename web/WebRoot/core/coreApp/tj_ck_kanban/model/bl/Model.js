Ext.define("core.tj_ck_kanban.model.bl.Model",{
	extend:"Ext.data.Model",
    fields: [
         {name: 'MOName'},
         {name: 'WorkCenterName'},
         {name: 'ProductSpecification'},
         {name: '已备项数/应备项数'},
         {name: '已备总数/应备总数'},
         {name: 'UtilizeRate'}
    ]
});