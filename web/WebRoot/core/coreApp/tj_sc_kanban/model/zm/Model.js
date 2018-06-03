Ext.define("core.tj_sc_kanban.model.zm.Model",{
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
          {name:'UPHStanTime'},
         {name: 'AchieveRate'},   
         {name: 'Shift'}, 
         {name: 'ProductFamilyShortName'}, 
         {name: 'ProductName'},
         {name:'productDescription'},
         {name:'MOQtyRequired'},
         {name:'standardHuman'}
    ]
});