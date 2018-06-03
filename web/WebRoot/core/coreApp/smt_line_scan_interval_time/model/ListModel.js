Ext.define("core.smt_line_scan_interval_time.model.ListModel",{
	extend:'Ext.data.Model',
	fields:[
		{name:'RowNum',type: 'string'},
		{name:'Resource',type: 'string'},
		{name:'ScanBarcode',type: 'string'},
		{name:'ScanTime',type: 'string'},
		{name:'LastTimeScanBarcode',type: 'string'},
		{name:'LastTimeScanTime',type: 'string'},
		{name:'IntervalTime',type: 'string'}
	]
});