Ext.define("core.dip_kanban.model.scx.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'Fdate'},
    	 {name: 'Shift'},
         {name: 'WorkcenterName'},
         {name: 'MoName'},
         {name: 'ProductName'},
         {name: 'ProductSpecification'},
          {name:'WorkprocedureFlowName_List'},
         {name: 'SumYield'},
         {name: 'MOQtyRequired'},
          {name:'JihuaTime'}, 
         {name: 'StandardTotalOfTime'},
         {name: 'ErrorMsg'},
          {name:'SumTime'},
         {name: 'FailTime'},   
         {name: 'Xiaolv',type:'string'}
        
    ]
});