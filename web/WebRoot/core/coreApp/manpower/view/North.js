var childStore;
Ext.define("core.manpower.view.North",{
	extend:'Ext.form.Panel',
	alias:'widget.m-northpanel-north',
    region:'north',
    frame:true,
    bodyPadding: 5,
    height:123,
    layout:'absolute',
    items: [{
		xtype:'textfield',
	    fieldLabel: '产品编码',
	    name: 'chanpinbianma',
	    id: 'chanpinbianma',
	    x:260,y:5,
	    allowBlank: false
	    ,
	    listeners:{ blur : function(f){
	    	Ext.getCmp("workprocedureflowname").setValue('');
	    	childStore = Ext.data.StoreManager.map['core.manpower.store.Store3'];
	    	childStore.removeAll();
			childStore.getProxy().extraParams={vals:this.value};
			childStore.load();
			
	    } }
    },{
		xtype:'combo',
	    fieldLabel: '制程代码',
	    //name: 'workprocedureflowname',
	    id: 'workprocedureflowname',
	    emptyText:'请选择',
	    mode: 'local',
	    hiddenName:'Workprocedureflowname',
	    displayField: 'Workprocedureflowname',
		valueField: 'Workprocedureflowname',
	    triggerAction: 'all',
	    editable : false,// 是否允许输入 
	    store : 'core.manpower.store.Store3',
	    x:560,y:5,
	    allowBlank: false
    }],
    buttons: [{
        text: '重置',
        ref:'reset',
        	handler:function(){
        		
    			this.up('form').getForm().reset();
    		}
    }, {
        text: '查询',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        ref:'submit'
    }],
	bbar:[
		  {forId: '1',xtype:'label',text: '产品编码:',margin: '0 0 0 5'},
		    {forId: '2',xtype:'label',text: '0.0',margin: '0 0 0 10' 		},
		    { xtype: 'tbspacer', width: 50 }, 
		  	'-',
		  	{forId: '3',xtype:'label',text: '产品规格:',margin: '0 0 0 5'},
		    {forId: '4',xtype:'label',text: '0.0',margin: '0 0 0 10' 		},
		    { xtype: 'tbspacer', width: 50 }, 
		  	'-',
		    {forId: '1',xtype:'label',text: '日期:',margin: '0 0 0 5'},
		    {forId: '2',xtype:'label',text: '0.0',margin: '0 0 0 10' 		},
		    { xtype: 'tbspacer', width: 50 },
		  	'-',
		  	{forId: '3',xtype:'label',text: '版本:',margin: '0 0 0 5'},
		    {forId: '4',xtype:'label',text: '0.0',margin: '0 0 0 10' 		},
		    { xtype: 'tbspacer', width: 50 }
	    ]
	
});