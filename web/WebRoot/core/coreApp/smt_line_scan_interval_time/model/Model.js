Ext.define("core.smt_line_scan_interval_time.model.Model",{
	extend:'Ext.data.Model',
	fields:[
		{name:'Title',type: 'string'},
		{name:'StartInterval',type: 'string'},
		{name:'EndInterval',type: 'string'},
		{name:'TotalTime',type: 'string'},
		{name:'IntervalTime',type: 'string'},
		{name:'Rate',type: 'string'}
	]
});