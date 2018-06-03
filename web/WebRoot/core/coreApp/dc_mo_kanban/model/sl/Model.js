Ext.define("core.dc_mo_kanban.model.sl.Model",{
	extend:"Ext.data.Model",
    fields: [
    	  {name: 'Num'},
         {name: 'MOName'},
         {name: 'MOQtyRequired'},
         {name: 'ProductName'},
         {name: 'flag'},
         {name:'BeginTime'},
         {name:'firstMoName'},
         {name:'planToOnlineTime'}
         
    ]
});