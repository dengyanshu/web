Ext.define("core.mes.store.reportforms.dip_wx.StoreMo",{
	extend:'Ext.data.Store',
   	model:'core.mes.model.reportforms.dip_wx.ModelMo',
    autoLoad:false,
    proxy:{
    	type:'memory',
    	reader:{
    		type:'json',
    		root:'data'
    	}
    }
	
});	
