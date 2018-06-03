var mainPageItems=comm.get("mainPageItems");

Ext.define("core.course_manage.store.CourseUserSkillStore",{
	extend:'Ext.data.Store',
	model:'core.course_manage.model.CourseUserSkillModel',
	pageSize:mainPageItems,
	autoLoad:false,
	proxy:{
		type:'ajax',
		url:'/web/skill/skillmanage_courseskill!getCourseUserSkill.action',
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