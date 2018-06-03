var mainPageItems=comm.get("mainPageItems");

Ext.define("core.course_manage.store.CourseUserSkill2Store",{
	extend:'Ext.data.Store',
	model:'core.course_manage.model.CourseUserSkill2Model',
	pageSize:mainPageItems,
	autoLoad:false,
	proxy:{
		type:'ajax',
		url:'/web/skill/skillmanage_courseskill!getCourseUserSkill2.action',
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