Ext.define("core.mes.store.reportforms.gccxsjscap.StoreSum",{
	extend:'Ext.data.Store',
	model:'core.mes.model.reportforms.gccxsjscap.ModelSum',
	autoLoad:false,
	proxy:{
		type:'ajax',
		url:'/web/mes/overall/gccxsjscap_sum.action',
		reader:{
			type:'json',
			root:'data'
		},
		writer:{
			type:'json'
		}
	}
	
});