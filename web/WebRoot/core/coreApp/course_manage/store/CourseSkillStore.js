Ext.define("core.course_manage.store.CourseSkillStore",{
	extend:'Ext.data.Store',
	fields:['WorkprocedureSkillId','SkillName'],
	autoLoad:false,
	proxy:{
		type:'ajax',
		url:'/web/skill/skillmanage_courseskill!getCourseSkill.action',
		reader:{
			type:'json',
			root:'data'
		}
	}
});