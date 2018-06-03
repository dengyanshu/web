var mainPageItems=comm.get("mainPageItems");

Ext.define("core.skill_manage.store.CourseStore",{
	extend:'Ext.data.Store',
	model:'core.skill_manage.model.CourseModel',
	pageSize:mainPageItems,
	autoLoad:false,
	proxy:{
		type:'ajax',
		url:'/web/skill/skillmanage_course!getResult.action',
		reader:{
			type:'json',
			root:'data'
		}
	}
});