//var mainPageItems=comm.get("mainPageItems");
Ext.define("core.smt_line_scan_interval_time.store.ListStore",{
	extend:'Ext.data.Store',
	//pageSize:mainPageItems,
	pageSize:25,
	model:'core.smt_line_scan_interval_time.model.ListModel',
	autoLoad:false,
	proxy:{
		url:'/web/mes/search/mes_smt_line_scan_interval_time_list!getResult.action',
		type:'ajax',
		//extraParams:{IsGroup:'1'},
		reader:{
			type:'json',
			root:'data',
			totalProperty: 'total'
		}
	}
});