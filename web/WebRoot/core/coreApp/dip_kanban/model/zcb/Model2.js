Ext.define("core.dip_kanban.model.zcb.Model2",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'RowNum'},
    	 {name: 'Workcenterid'},
         {name: 'WorkcenterName'},
         {name: 'StanTime'},
         {name: 'MoName'},
          {name:'MOId'},
         {name: 'SumYield'},
         {name: 'SumTime'},
          {name:'UPHStanTime'}, 
         {name: 'AvgYield'},
         {name: 'WorkprocedureFlowName_List'},
          {name:'UPH'},
         {name: 'AchieveRate'},   
         {name: 'Shift'}, 
         {name: 'ProductFamilyShortName'}, 
         {name: 'ProductName'},
         {name:'productDescription'},
         {name:'MOQtyRequired'},
         {name:'standardHuman'},
         {name:'Outtime'}
    ]
});