Ext.define("core.mes.store.reportforms.gyswlxx.StoreGYS",{
	extend:'Ext.data.Store',
    model:'core.mes.model.reportforms.gyswlxx.ModelGYS',
   	autoLoad:false,
	proxy:{
		url: '/web/mes/overall/gyswlxx_gys.action',
		type:'ajax',
		reader:{
    		type:'json',
    		root:'data'
		}
	}
	
});	
