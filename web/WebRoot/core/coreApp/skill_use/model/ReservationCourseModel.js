Ext.define("core.skill_use.model.ReservationCourseModel",{
	extend:'Ext.data.Model',
	fields:[
		{name:'WorkprocedureReservationCourseId'},
		{name:'WrokprocedureCourseId'},
		{name:'CourseTitle'},
		{name:'FinishTime'},
		{name:'ReservationTime'},
		{name:'ReservationSite'},
		{name:'Lecturer'},
		{name:'NumOfExpected'},
		{name:'NumOfActual'},
		{name:'CreateUserId'},
		{name:'CreateTime',type:'date'},
		{name:'ModifyUserId'},
		{name:'ModifyTime',type:'date'},
		{name:'ReservationRemark'}
	]
});