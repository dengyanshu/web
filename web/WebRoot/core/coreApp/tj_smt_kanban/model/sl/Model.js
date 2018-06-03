Ext.define("core.tj_smt_kanban.model.sl.Model",{
	extend:"Ext.data.Model",
    fields: [
    /*
    	 {name:'orders'},
         {name: 'MOName'},
         {name: 'workCenter'},
         {name: 'ProductName'},
         {name: 'RankA'},
         {name: 'RankB'},
         {name: 'ProductSpecification'},
         {name: 'ProductDescription'},
         {name: 'MOQtyRequired'},
         {name: '产出'},
         {name: '投入'}
         */
         {name: 'RowNum'},
         {name: 'MOName'},
         {name: 'MOQtyRequired'},
         {name: 'InputDone'},
         {name: 'ProductName'},
         {name: 'WorkCenterName'},       
         {name: 'ProductDescription'},
         {name: 'ProductSpecification'}
    ]
});