Ext.define("core.course_manage.model.UserSkillModel",{
	extend:'Ext.data.Model',
	fields:[
		{name:'UserNumber'},		//工号
		{name:'UserName'},	
		{name:'UserDuty'},	
		{name:'SkillName'},	
		{name:'SkillCategory'},
		{name:'SkillRemark'}
	]
});