Ext.define("core.course_manage.store.SearchReservationCourseStore",{
	extend:'Ext.data.Store',
	remoteSort:true,
	model:'core.course_manage.model.SearchReservationCourseModel',
	proxy:{
		type:'memory',
		url:'/web/skill/skillmanage_reservationCourse!getReservationCourseResult.action',
		reader:{
			type:'json',
			root:'data'
		}
	}
	
});