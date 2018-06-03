Ext.define("core.dip_kanban.model.zcb.Model",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'id'},
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
          {name:'ErrorMsg'},
          //{name: 'OnGwkName'},//上岗卡机号
          //{name:'OffGwkName'},//下岗卡机号
          {name:'Specificationid_End'},
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