Ext.define("core.kanban.model.Model",{
	extend:"Ext.data.Model",
/*		fields: [
         {name: 'MOName'},
         {name: 'ProductSpecification'},
         {name: 'ItemsCompleteRate'},
         {name: 'AbsoluteCompleteRate'},
         {name: 'UtilizeRate'},
         {name: 'Productivity'}
    ],
    */
    fields: [
         {name: 'moname'},
         {name: 'ProductSpecification'},
         {name: '已备项数/应备项数'},
         {name: '已备总数/应备总数'},
         {name: 'UtilizeRate'}
         //{name: 'Productivity'}
    ]
});