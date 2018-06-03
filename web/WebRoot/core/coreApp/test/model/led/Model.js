Ext.define("core.test.model.led.Model",{
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
         {name: 'AvgYield'},
          {name:'UPHStanTime'}, 
         {name: 'AchieveRate'},  
         {name:'UPHStanTime'},
         {name: 'Shift'}, 
         {name: 'ProductFamilyShortName'}, 
         {name: 'ProductName'},
         {name:'productDescription'},
         {name:'MOQtyRequired'},
         {name:'standardHuman'}
    ]
});