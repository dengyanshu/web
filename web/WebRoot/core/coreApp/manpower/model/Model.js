Ext.define("core.manpower.model.Model",{
	extend:'Ext.data.Model',
//	fields:[
//	   {name:'Sequence',type:'int'},
//	   {name:'WorkprocedureDescription',type:'string'}, 
//	   {name:'GetTime',type:'float'}, 
//	   {name:'DeviceTime',type:'float'}, 
//	   {name:'OperationTime',type:'float'}, 
//	   {name:'PutTime',type:'float'}, 
//	   {name:'TotalTime',type:'float'},
//	   {name:'NumOfPeople',type:'string'},
//	   {name:'MaterialMan',type:'string'},
//	   {name:'Instrument',type:'string'},
//	   {name:'QualityControlPoint',type:'string'},
//	   {name:'Ranknum',type:'int'}
//	   ]

fields:[
 	   {name:'Ranknum',type:'int'},
 	   {name:'Workprocedurename',type:'string'}, 
 	   {name:'gettime',type:'string'}, 
 	   {name:'DeviceTime',type:'string'}, 
 	   {name:'OperationTime',type:'string'}, 
 	   {name:'PutTime',type:'string'}, 
 	   {name:'TotalTime',type:'string'},
 	   {name:'NumOfPeople',type:'string'},
 	   {name:'Ranknum',type:'int'},
 	   {name:'EffectiveWorkTime',type:'string'},
 	   {name:'EffectiveWorkTimepercent',type:'string'},
 	   {name:'Material',type:'string'},
 	   {name:'Instrument',type:'string'},
 	   {name:'QualityControlPoint',type:'string'}
 	   ]
});