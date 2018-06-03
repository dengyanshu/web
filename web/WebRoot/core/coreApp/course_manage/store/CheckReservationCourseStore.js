Ext.define("core.course_manage.store.CheckReservationCourseStore",{
	extend:'Ext.data.Store',
	fields:['WorkprocedureReservationCourseId','CourseTitle'],
	autoLoad:false,
	proxy:{
		type:'ajax',
		url:'/web/skill/skillmanage_userReservationCourse!getReservationCourse.action',
		reader:{
			type:'json',
			root:'data'
		}
	}
});