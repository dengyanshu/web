var mainPageItems=comm.get("mainPageItems");

Ext.define("core.skill_manage.store.CourseAndSkillStore",{
	extend:'Ext.data.Store',
	model:'core.skill_manage.model.CourseAndSkillModel',
	pageSize:mainPageItems,
	autoLoad:false,
	proxy:{
		type:'ajax',
		url:'/web/skill/skillmanage_courseskill!getCourseAndSkill.action',
		//编译解码
		actionMethods  : {
			read : 'post'
				
		},
		reader:{
			type:'json',
			root:'data'
		}
	}
});