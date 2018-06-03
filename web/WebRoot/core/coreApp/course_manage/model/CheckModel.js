Ext.define("core.course_manage.model.CheckModel",{
	extend:'Ext.data.Model',
	fields:[
		{name:'code'},
		{name:'name'},
		{name:'WorkprocedureCourseId'},
		{name:'WorkprocedureReservationCourseId'},
		{name:'CourseTitle'},
		{name:'UserDuty'},
		{name:'ReservationTime'},
		{name:'ReservationSite'},
		{name:'Lecturer'},
		
		{name:'isCheck'}
	]
});