Ext.define("core.mes.store.reportforms.cn.StorePn",{
	extend:'Ext.data.Store',
   	model:'core.mes.model.reportforms.cn.ModelPn',
   	autoLoad:false,
	proxy:{
		url: '/web/mes/overall/cn_pn.action',
		type:'ajax',
		reader:{
			type:'json',
			root:'data'
		}
	}
	
});	
