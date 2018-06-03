Ext.define("core.xm_sc_kanban.model.sl.Model3",{
	extend:"Ext.data.Model",
    fields: [
    	 {name: 'num'},
         {name: 'MOName'},
         {name: 'ProductFamilyName'},
         {name: 'RequireQty'},
         {name: 'SumPlanQty'},
         {name: 'SumQtyIN'},
         {name: 'SumQtyOut'},
         {name: 'MOFinish'},
         
         {name: 'WorkcenterName'},
         {name: 'NumOfPeople'},
         {name: 'Attendence'},
         {name: 'Responsible'},
         {name: 'ProductDate'},
         {name: 'pass_yield'}             
    ]
});