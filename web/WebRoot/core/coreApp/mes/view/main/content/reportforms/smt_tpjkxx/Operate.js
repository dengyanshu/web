 /***************************************************************************
  								<SMT贴片接口信息> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.smt_tpjkxx.Operate",{
  	extend:"core.mes.base.BaseForm",
 	alias:'widget.smt_tpjkxx.operate',
	items:[
		{
			xtype:'combo',
			fieldLabel: '手机工作中心',
			name:'smt_tpjkxx_workcenter',
			store:Ext.create("Ext.data.Store",{
				fields:['name'],
				data:[
					{name:'S01'},
					{name:'S02'},
					{name:'S03'},
					{name:'S04'},
					{name:'S05'},
					{name:'S06'},
					{name:'S07'},
					{name:'S08'}
				]
			}),
			queryMode: 'local',
			//emptyText:'请选择工作中心',
			displayField: 'name',
			allowBlank:false,
		    valueField: 'name'
		}

	]
 });