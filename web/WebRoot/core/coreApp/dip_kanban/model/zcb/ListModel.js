Ext.define("core.dip_kanban.model.zcb.ListModel",{
	extend:"Ext.data.Model",
    fields: [
    	 {name:'Time'},
         {name: 'StandardCapacity',type:'int'},//标准产能(即目标)
         {name: 'sj',type:'int'},	//实际产出
         {name: 'cy',type:'int'},	//差异
         {name: 'AchievingRate',type:'float'},//达成率
         {name: 'ToAchievingRate',type:'float'},//达成率的一个比较值，如果达成率小于此值，则报表红色显示，否则，绿色显示
         {name: 'RepairCount',type:'int'},//维修品数
         {name: 'InputCount',type:'int'},//投入数
         {name: 'BadRate',type:'float'}//不良率
    ]
});