Ext.define("core.dip_kanban.model.lts.Model",{
	extend:"Ext.data.Model",
    fields: [

{name: 'OrgName'},	
{name: 'Fdate'},			
{name: 'PlanSumQty'},		
{name: 'ActualSumQty'},		
{name: 'AchieveRate'},	
{name: 'StandardTotalOfTime'}, 	
{name: 'ActualLaborTime'},	
{name: 'UnusualLaborTime'},		
{name: 'Efficiency'},		
{name: 'ReMadeLaborTime'},		
{name: 'CheckinSumTime'},				         
{name: 'NotOnLaborTime'}   
    ]
});