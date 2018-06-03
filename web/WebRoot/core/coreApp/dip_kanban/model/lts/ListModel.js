Ext.define("core.dip_kanban.model.lts.ListModel",{
	extend:"Ext.data.Model",
    fields: [

{name: 'OrgName'},	
{name: 'Fdate'},		
{name: 'Shift'},		
{name: 'PlanSumQty',type:'int'},		
{name: 'ActualSumQty',type:'int'},		
{name: 'AchieveRate',type:'float'},	
{name: 'StandardTotalOfTime',type:'float'}, 	
{name: 'ActualLaborTime',type:'float'},	
{name: 'UnusualLaborTime',type:'float'},		
{name: 'Efficiency',type:'float'},		
{name: 'ReMadeLaborTime',type:'float'},		
{name: 'CheckinSumTime',type:'float'},				         
{name: 'NotOnLaborTime',type:'float'}   


    ]
});