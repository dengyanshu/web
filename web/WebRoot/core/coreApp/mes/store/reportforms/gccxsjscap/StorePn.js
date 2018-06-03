Ext.define("core.mes.store.reportforms.gccxsjscap.StorePn",{
	extend:'Ext.data.Store',
   	model:'core.mes.model.reportforms.gccxsjscap.ModelPn',
   	autoLoad:false,
	proxy:{
		url: '/web/mes/overall/gccxsjscap_pn.action',
		type:'ajax',
		reader:{
    		type:'json',
    		root:'data'
		}
	}
	
});	
