var mainPageItems=comm.get("mainPageItems");

Ext.define("core.skill_manage.store.SkillStore",{
	extend:'Ext.data.Store',
	model:'core.skill_manage.model.SkillModel',
	pageSize:mainPageItems,
	autoLoad:false,
	proxy:{
		type:'ajax',
		url:'/web/skill/skillmanage_skill!getResult.action',
		reader:{
			type:'json',
			root:'data'
		}
	}
});