//var mainPageItems=comm.get("mainPageItems");
Ext.define("core.smt_line_scan_interval_time.store.Store",{
	extend:'Ext.data.Store',
	//pageSize:mainPageItems,
	model:'core.smt_line_scan_interval_time.model.Model',
	autoLoad:false,
	sorters:[{
		property:'StartInterval',
		direction:'ASC'//DESC
	}],
	proxy:{
		url:'/web/mes/search/mes_smt_line_scan_interval_time_main!getResult.action',
		type:'ajax',
		//extraParams:{IsGroup:'0'},
		reader:{
			type:'json',
			root:'data',
			totalProperty: 'total'
		}
	}
});