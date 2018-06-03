Ext.define("core.xm_line_kanban.model.Model",{
	extend:'Ext.data.Model',
	fields:[
		{name:'time'},
		{name:'WS_Station'},
		{name:'SN',type:'int'},
		{name:'RFT',type:'int'},
		{name:'CAL',type:'int'}
		
	]	
});