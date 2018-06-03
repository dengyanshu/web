var mainPageItems=comm.get("mainPageItems");

Ext.define("core.course_manage.store.CourseUserSkill3Store",{
	extend:'Ext.data.Store',
	model:'core.course_manage.model.CourseUserSkill3Model',
	pageSize:mainPageItems,
	autoLoad:false,
	proxy:{
		type:'ajax',
		url:'/web/skill/skillmanage_courseskill!getCourseUserSkill3.action',
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