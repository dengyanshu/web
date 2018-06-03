Ext.define("core.server_chart.model.Model",{
	extend:'Ext.data.Model',
	fields:[
		{name:'TIME'},
		{name:'CPU',type:'int'},
		{name:'Memory',type:'int'},
		{name:'Disk',type:'int'},
		{name:'Cnt',type:'int'}
		
	]	
});


