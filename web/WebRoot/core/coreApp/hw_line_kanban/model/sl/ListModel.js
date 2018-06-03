Ext.define("core.hw_line_kanban.model.sl.ListModel",{
	extend:"Ext.data.Model",
	fields: [
         //{name: 'RowNum',type:'int' ,sortable:true},
         {name: 'MoName'},
         {name: 'WorkcenterName'},
          {name: 'ProductName'},
            {name: 'StandardProductivity'},
         {name: 'StandardNumOfPeople'},
           {name: 'WOSN'},
           {name: 'CustomerModel'},
           {name: 'Productivity'},
            {name:'StandardNumOfPeople'},
             {name:'MOQtyRequired'},
             {name:'MOQtyDone'},
            {name:'TimeSlice1'},
            {name:'StandardProduct1'},
             {name:'Productivity1'},
             {name:'Efficiency1'},
              {name:'TimeSlice2'},
            {name:'StandardProduct2'},
             {name:'Productivity2'},
             {name:'Efficiency2'}
	     
    ]
});





