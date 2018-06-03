Ext.define("core.autoline_kanban.model.Model",{
	extend:'Ext.data.Model',
	fields:[
		{name:'TimeSlice1'},
		{name:'TimeSlice2'},
		{name:'ProductName'},
		{name:'MOName'},
		{name:'WG_WorkStation'},
		{name:'LastTimeQty',type:'int'},
		{name:'CurrTimeQty',type:'int'},
		{name:'MOQtyDone',type:'int'}
	]	
});



	
	
	