Ext.define("core.skill_use_test.view.ReservationCourseInfo", {
			extend : 'Ext.Panel',
			alias:'widget.skilluse_reservationcourseinfo',
			layout : 'border',
			items : [{
						xtype : 'form',
						bodyPadding : 5,
						region : 'north',
						height : 300,
						margins : '5 5 5 5',
						frame : true,
						layout : 'absolute',
						title : '课题信息',
						defaultType : 'label',
						items : [{
									text : '课题:',
									margin : '0 0 0 10',
									style : {
										fontSize : '24px'
									},
									x : 40,
									y : 20
								}, {
									forId : 'course_title',
									text : '消防演练',
									margin : '0 0 0 10',
									style : {
										fontSize : '24px',
										color : '#000066'
									},
									x : 100,
									y : 20
								}, {
									text : '时间:',
									margin : '0 0 0 10',
									style : {
										fontSize : '24px'
									},
									x : 340,
									y : 20
								}, {
									forId : 'course_time',
									text : '2014-08-07:13:40',
									margin : '0 0 0 10',
									style : {
										fontSize : '24px',
										color : '#000066'
									},
									x : 400,
									y : 20
								}, {
									text : '地点:',
									margin : '0 0 0 10',
									style : {
										fontSize : '24px'
									},
									x : 40,
									y : 60
								}, {
									forId : 'course_site',
									text : '培训室',
									margin : '0 0 0 10',
									style : {
										fontSize : '24px',
										color : '#000066'
									},
									x : 100,
									y : 60
								}, {
									text : '讲师:',
									margin : '0 0 0 10',
									style : {
										fontSize : '24px'
									},
									x : 340,
									y : 60
								}, {
									forId : 'course_lecturer',
									text : '张三',
									margin : '0 0 0 10',
									style : {
										fontSize : '24px',
										color : '#000066'
									},
									x : 400,
									y : 60
								}, {
									text : '应到人数:',
									margin : '0 0 0 10',
									style : {
										fontSize : '24px'
									},
									x : 40,
									y : 100
								}, {
									forId : 'course_requirementNum',
									text : '100',
									margin : '0 0 0 10',
									style : {
										fontSize : '24px',
										color : '#000066'
									},
									x : 150,
									y : 100
								}, {
									text : '实到人数:',
									margin : '0 0 0 10',
									style : {
										fontSize : '24px'
									},
									x : 340,
									y : 100
								}, {
									forId : 'course_actualNum',
									text : '80',
									margin : '0 0 0 10',
									style : {
										fontSize : '24px',
										color : '#000066'
									},
									x : 450,
									y : 100
								}, {
									text : '刷卡:',
									margin : '0 0 0 10',
									style : {
										fontSize : '24px',
										color : '#330099'
									},
									x : 200,
									y : 170
								}, {
									xtype : 'textfield',
									name : 'workNumber',
									x : 280,
									y : 170
								},
								{
									xtype : 'textfield',
									name : 'ReservationCourseId',
									hidden:true
								}],
						buttons : [{
									text : '提交',
									action : 'submit'
								}]
					}, {
						title : '刷卡结果',
						region : 'center', // position for region
						xtype : 'form',
						split : true, // enable resizing
						margins : '0 5 5 5',
						bodyStyle : 'padding:5px 5px 0',
						labelAlign : "left",
						layout : 'fit',
						frame : true,
						items : [{
									xtype : 'textarea',
									grow : true,
									labelAlign : 'top',
									name : 'return_msg',
									fieldLabel : '处理信息'
								}]
					}]
		});
