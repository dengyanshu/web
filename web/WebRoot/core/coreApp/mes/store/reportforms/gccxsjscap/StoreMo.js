Ext.define("core.mes.store.reportforms.gccxsjscap.StoreMo",{
	extend:'Ext.data.Store',
   	model:'core.mes.model.reportforms.gccxsjscap.ModelMo',
   	autoLoad:false,
	proxy:{
		url: '/web/mes/overall/gccxsjscap_mo.action',
		type:'ajax',
		reader:{
    		type:'json',
    		root:'data'
		}
	}
	
});	
