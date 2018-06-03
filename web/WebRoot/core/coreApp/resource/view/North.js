//var childStore;
Ext.define("core.resource.view.North",{
	extend:'Ext.form.Panel',
	alias:'widget.m-northpanel-north',
    region:'north',
    frame:true,
    bodyPadding: 5,
    height:180,
    layout:'absolute',
    items: [{
		xtype:'combo',
	    fieldLabel: '线体',
	    emptyText:'请选择',
	    name: 'xianti',
	    id: 'xianti',
	    displayField: 'WorkcenterName',
		valueField: 'WorkcenterName',
	    x:50,y:5,
	    store : 'core.resource.store.Store',
	    editable : false,// 是否允许输入 
	    allowBlank: false
	    ,
	    listeners : {//选择一行后触发的事件 
            'select' : function() {
            	Ext.getCmp("gongdan").setValue('');
    	    	Ext.getCmp("zhicheng").setValue('');
    	    	Ext.getCmp("banzhi").setValue('');
    	    	Ext.getCmp("kaji").setValue('');
    	    	Ext.getCmp("machine").setValue('');
    	    	var childStore = Ext.data.StoreManager.map['core.resource.store.Store2'];
    	    	childStore.removeAll();
    			childStore.getProxy().extraParams={QueryParameter:this.value};
    			childStore.load();
    			Ext.Ajax.request({
						url : '/web/technology/resource!getResult4.action', 
						params : 
						{WorkcenterName:this.value},
						success : function(response, opts) {
//							alert(response.responseText);
							var obj = Ext.decode(response.responseText);
							var data=obj.data;
//							alert(data[0].name);
							if(data[0].name!=null&&data[0].name!='')
								{
								Ext.getCmp("machine").setValue(data[0].name);
								}else{
									alert('此线体未设置卡机信息');
								}
						},
							failure : function(response, opts) {
							obj = Ext.decode(response.responseText);
							Ext.Msg.alert("系统提示",obj.returnMsg);
						}
						});
            }}
//	    listeners:{ blur : function(f){
//	    	Ext.getCmp("gongdan").setValue('');
//	    	Ext.getCmp("zhicheng").setValue('');
//	    	Ext.getCmp("kaji").setValue('');
//	    	var childStore = Ext.data.StoreManager.map['core.resource.store.Store2'];
//	    	childStore.removeAll();
//			childStore.getProxy().extraParams={QueryParameter:this.value};
//			childStore.load();
//	    } }
    },{
		xtype:'combo',
	    fieldLabel: '工单',
	    name: 'gongdan',
	    id: 'gongdan',
	    emptyText:'请选择',
//	    mode: 'local',
//	    triggerAction: 'all',
	    allowBlank: false,
	    displayField: 'MOName',
		valueField: 'MOName',
	    editable : false,// 是否允许输入 
	    store : 'core.resource.store.Store2',
	    x:350,y:5
	    ,
	    listeners : {//选择一行后触发的事件 
            'select' : function() { 
	    	Ext.getCmp("zhicheng").setValue('');
	    	Ext.getCmp("banzhi").setValue('');
	    	Ext.getCmp("kaji").setValue('');
	    	var xianti=Ext.getCmp("xianti").getRawValue();
	    	var childStores = Ext.data.StoreManager.map['core.resource.store.Store3'];
	    	childStores.removeAll();
			childStores.getProxy().extraParams={QueryParameter:xianti,WorkprocedureFlow:this.value};
			childStores.load();
	    } }
    }, {
    	xtype:'textfield',
	    fieldLabel: '卡机名',
	    name: 'machine',
	    id: 'machine',
	    x:650,y:5,
	    allowBlank: false,
	    readOnly:'true'
	    //editable : false,// 是否允许输入 
    },{
    	xtype:'combo',
	    fieldLabel: '制程',
	    name: 'zhicheng',
	    id: 'zhicheng',
	    emptyText:'请选择',
	    displayField: 'WorkprocedureFlowNameList',
		valueField: 'WorkprocedureFlowNameList',
	    x:50,y:50,
	    editable : false,// 是否允许输入 
	    store : 'core.resource.store.Store3',
	    allowBlank: false
    },{
    	xtype:'combo',
	    fieldLabel: '（白/晚）班',
	    name: 'banzhi',
	    id: 'banzhi',
	    emptyText:'请选择',
	    x:350,y:50,
	    editable : false,// 是否允许输入 
	    allowBlank: false,
	    displayField:'key',  //哪个字段作为标签
		valueField:'value', // 值,可选
	    store:Ext.create("Ext.data.Store",{
			fields:['key','value'],
			data:[
				{key:'白班',value:'白班'},
				{key:'晚班',value:'晚班'}
			]
		})
	 },{
    	xtype:'combo',
	    fieldLabel: '（上/下）岗',
	    name: 'kaji',
	    id: 'kaji',
	    emptyText:'请选择',
	    x:650,y:50,
	    editable : false,// 是否允许输入 
	    allowBlank: false,
	    displayField:'key',  //哪个字段作为标签
		valueField:'value', // 值,可选
	    store:Ext.create("Ext.data.Store",{
			fields:['key','value'],
			data:[
				{key:'上岗',value:'1'},
				{key:'下岗',value:'2'}
			]
		})
    }
	 
	 ],
    buttons: [{
        text: '重置',
        ref:'reset',
        	handler:function(){
    			this.up('form').getForm().reset();
    		}
    },{
        text: '开始刷卡',
        formBind: true,
        disabled: true,
        ref:'submit'
    },{
        text: '停止刷卡',
        formBind: true,
        disabled: true,
        ref:'stopsubmit'
    }],
    bbar:[
		  {forId: '1',xtype:'label',text: '线体:',margin: '0 0 0 5'},
		  {forId: '2',xtype:'label',text: '0',margin: '0 0 0 10' 		},
		  { xtype: 'tbspacer', flex : 5.3 }, 
		  '-',
          {forId: '3',xtype:'label',text: '工单:',margin: '0 0 0 5'},
          {forId: '4',xtype:'label',text: '0',margin: '0 0 0 10' 		},
          { xtype: 'tbspacer', flex : 5.3 }, 
          '-',
          {forId: '5',xtype:'label',text: '制程信息:',margin: '0 0 0 5'},
          {forId: '6',xtype:'label',text: '0',margin: '0 0 0 10' 		},
          { xtype: 'tbspacer', flex : 5.3 }, 
          '-',
		  {forId: '1',xtype:'label',text: '卡机名:',margin: '0 0 0 5'},
          {forId: '2',xtype:'label',text: '0',margin: '0 0 0 10' 		},
          { xtype: 'tbspacer', flex : 5.3 }, 
          '-',
		  {forId: '3',xtype:'label',text: '目前刷卡状态:',margin: '0 0 0 5'},
		  {forId: '4',xtype:'label',text: '停止刷卡',margin: '0 0 0 10' 		},
		  { xtype: 'tbspacer', flex : 5.3 }
		  
          
      ]
	
});