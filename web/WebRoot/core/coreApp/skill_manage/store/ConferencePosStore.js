var mainPageItems=comm.get("mainPageItems");

Ext.define("core.skill_manage.store.ConferencePosStore",{
	extend:'Ext.data.Store',
	fields:['CP_id','ConferenceRoot','POS'],
	pageSize:mainPageItems,
	autoLoad:false,
	proxy:{
		type:'ajax',
		url:'/web/skill/skillmanage_conferencePos!getResult.action',
		reader:{
			type:'json',
			root:'data'
		}
	}
});