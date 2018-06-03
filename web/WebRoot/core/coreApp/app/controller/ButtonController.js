/**
 * 
 * Md5加密
 * @type Number
 */
var hexcase = 0;  
var b64pad  = "";
var chrsz   = 8; 
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function calcMD5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}
 
function core_md5(x, len)
{
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;
  
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
 
  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
  
}
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
 
  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++) 
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }
 
  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}
 
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}
 
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}
 
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}
 
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}
 
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}




/**
 * 程序主控制器
 */
Ext.define("core.app.controller.ButtonController",{
	extend:"Ext.app.Controller",
	initBtn:function(){
		var self=this;
		var btnCtr={
			/**
			 * 通用表格添加进表单
			 */
			"basegrid button[ref=gridInsertF]":{
					click:function(btn){
						var baseGrid=btn.up("basegrid");
						var funCode=baseGrid.funCode;
						var basePanel=baseGrid.up("basepanel[itemId="+funCode+"_basepanel]");
						var baseForm=basePanel.down("baseform[itemId="+funCode+"_baseform]");
						var baseCenterPanel=baseGrid.up("basecenterpanel[itemId="+funCode+"_basecenterpanel]");
						var funData=basePanel.funData;
						var defaultObj=funData.defaultObj;
						var formObj=baseForm.getForm();
						var insertObj=self.getDefaultValue(defaultObj);
//						for(var field in insertObj){
//							var value=insertObj[field];
//							//@createTime@   @createUser@  @createDept@
//							var f=formObj.findField(field);
//							if(f){
//								f.setValue(value);
//							}
//						}
						/**----------------主子功能处理开始----------------------*/
						if(funData.isChildren){
							//得到主功能的记录
							var mainRecord=basePanel.mainRecord;
							var parentObj={};
							if(funData.connectFields){
								Ext.each(funData.connectFields,function(connectField){
									if(connectField.foreignKey){
										parentObj[connectField.foreignKey]=mainRecord[connectField.mainFieldCode];
									}else{
										parentObj[connectField.childFieldCode]=mainRecord[connectField.mainFieldCode];
									}
								});
							}
							insertObj=Ext.apply(insertObj,parentObj);
						}
						/**----------------主子功能处理结束----------------------*/
						self.setFormValue(formObj,insertObj);
						if(baseCenterPanel){
							baseCenterPanel.hide();
						}else{
							baseGrid.hide();
						}
						baseForm.show();
						//执行回调函数						
						if(btn.callback){
							btn.callback();
						}
					}
			},
			/**
			 * 通用表格添加事件
			 */
			"basegrid button[ref=gridInsert]":{
					click:function(btn){
						//得到组件
						var baseGrid=btn.up("basegrid");						
						var store=baseGrid.getStore();
						//得到编辑插件
						var edit=baseGrid.editing;
						//得到模型
						var Model=store.model;
						var funCode=baseGrid.funCode;
						var basePanel=baseGrid.up("basepanel[itemId="+funCode+"_basepanel]");
						//得到配置信息
						var funData=basePanel.funData;
						var defaultObj=funData.defaultObj;
						//处理特殊默认值
						var insertObj=self.getDefaultValue(defaultObj);
						/**----------------主子功能处理开始----------------------*/
						if(funData.isChildren){
							//得到主功能的记录
							var mainRecord=basePanel.mainRecord;
							var parentObj={};
							if(funData.connectFields){
								Ext.each(funData.connectFields,function(connectField){
									if(connectField.foreignKey){
										parentObj[connectField.foreignKey]=mainRecord[connectField.mainFieldCode];
									}else{
										parentObj[connectField.childFieldCode]=mainRecord[connectField.mainFieldCode];
									}
								});
							}
							insertObj=Ext.apply(insertObj,parentObj);
						}
						/**----------------主子功能处理结束----------------------*/
						var resObj=self.ajax({url:funData.action+"!doSave.action",params:insertObj});
//						var resObj={success:true,obj:{name:"zsp",birthday:"2012-01-01"}};
						if(resObj.success){					
							var obj=new Model(resObj.obj);
							edit.cancelEdit(); //取消其他插件的编辑活动								
							store.insert(0,obj);
							obj.commit();
							//设置第一行第二列编辑
							edit.startEditByPosition({
								row:0,
								column:2
							});
							var editBtn=baseGrid.down("button[ref=gridEdit]");
							if(editBtn){
								editBtn.setDisabled(false);
							}							
							self.msgbox("添加成功");	
							
						}else{
							alert(resObj.obj);
						}
						//执行回调函数
						if(btn.callback){
							btn.callback();
						}
						
				}
			},
			/**
			 * 通用表格编辑事件
			 */
			"basegrid button[ref=gridEdit]":{
					click:function(btn){
						//得到组件
						var baseGrid=btn.up("basegrid");
						var funCode=baseGrid.funCode;
						var basePanel=baseGrid.up("basepanel[itemId="+funCode+"_basepanel]");
						var baseForm=basePanel.down("baseform[itemId="+funCode+"_baseform]");
						//得到选中数据
						var rescords=baseGrid.getSelectionModel().getSelection();
						var baseCenterPanel=baseGrid.up("basecenterpanel[itemId="+funCode+"_basecenterpanel]");
						var funData=basePanel.funData;
						if(rescords.length==1){							
							var data=rescords[0].data;
							var insertObj=data;
							/**----------------主子功能处理开始----------------------*/
							if(funData.isChildren){
								//得到主功能的记录
								var mainRecord=basePanel.mainRecord;
								var parentObj={};
								if(funData.connectFields){
									Ext.each(funData.connectFields,function(connectField){
										if(connectField.foreignKey){
											parentObj[connectField.foreignKey]=mainRecord[connectField.mainFieldCode];
										}else{
											parentObj[connectField.childFieldCode]=mainRecord[connectField.mainFieldCode];
										}
									});
								}
								insertObj=Ext.apply(insertObj,parentObj);
							}
							/**----------------主子功能处理结束----------------------*/
							//表单赋值
							self.setFormValue(baseForm.getForm(),insertObj);
							
							/**--------------------主子功能处理开始----------------------*/
							if(funData.children){
								Ext.each(funData.children,function(child){
									if(child.funCode){
										//拿到子功能的布局对象
										var childPanel=basePanel.down("basepanel[itemId="+child.funCode+"_basepanel]");
										//赋值主功能记录对象
										childPanel.mainRecord=data;
										var childFunData=childPanel.funData;
										var parentSql="";
										//拼接parentSql
										if(childFunData.connectFields && childFunData.connectFields.length>0){
											Ext.each(childFunData.connectFields,function(connectField){
												if(connectField.isQuery){
													parentSql+=" and "+connectField.childFieldCode+"='"+rescords[0].get(connectField.mainFieldCode)+"'";
												}
											});
										}else{
											parentSql=" and 1!=1";
										}
										//加载子功能数据
										var childGrid=childPanel.down("basegrid[itemId="+child.funCode+"_basegrid]");
										var store=childGrid.getStore();
										var proxy=store.getProxy();
										proxy.extraParams.parentSql=parentSql;
										store.load();									
									}
								});
							}
							/**--------------------主子功能处理结束----------------------*/
						if(baseCenterPanel){
							baseCenterPanel.hide();
						}else{
							baseGrid.hide();
						}
						baseForm.show();						
						}else{
							alert("请选择数据");
						}
						//执行回调函数
						if(btn.callback){
							btn.callback();
						}
					}
			},
			/**
			 *  通用表格删除事件
			 */
			"basegrid button[ref=gridDelete]":{
					click:function(btn){
						//得到组件
						var baseGrid=btn.up("basegrid");
						var funCode=baseGrid.funCode;
						var basePanel=baseGrid.up("basepanel[itemId="+funCode+"_basepanel]");
						//得到配置信息
						var funData=basePanel.funData;
						var pkName=funData.pkName;
						//得到选中数据
						var records=baseGrid.getSelectionModel().getSelection();
						if(records.length>0){
							//封装ids数组
							var ids=new Array();
							Ext.each(records,function(rec){
								var pkValue=rec.get(pkName);
								ids.push(pkValue);
							});
							//发送ajax请求
							var resObj=self.ajax({url:funData.action+"!doRemove.action",params:{ids:ids.join(","),pkName:pkName}});
							if(resObj.success){
								baseGrid.getStore().load();
								self.msgbox(resObj.obj);
							}else{
								alert(resObj.obj);
							}
						}else{
							alert("请选择数据!");
						}
						//执行回调函数
						if(btn.callback){
							btn.callback();
						}
					}
			},
			/**
			 * 通用表格保存事件
			 */
			"basegrid button[ref=gridSave]":{
					click:function(btn){
						//得到组件
						var baseGrid=btn.up("basegrid");
						var funCode=baseGrid.funCode;
						var basePanel=baseGrid.up("basepanel[itemId="+funCode+"_basepanel]");
						var baseForm=basePanel.down("baseform[itemId="+funCode+"_baseform]");
						//得到配置信息
						var funData=basePanel.funData;
						var pkName=funData.pkName;
						var store=baseGrid.getStore();
						//得到修改的记录
						var records=store.getUpdatedRecords();
						if(records.length>0){
							//封装修改的字段数组
							var updates=new Array();
							Ext.each(records,function(rec){
								var obj=rec.getChanges();
								if(obj.password&&obj.password.length!=32){
									obj.password=hex_md5(obj.password);
								};
								obj[pkName]=rec.get(pkName);	
								updates.push(obj);								
							});
							//得到更新的字符串
							var strData=self.getUpdateSql(updates,funData.modelName,funData.pkName);
							//发送ajax					
							var resObj=self.ajax({url:funData.action+"!doUpdateList.action",params:{strData:strData}});
							if(resObj.success){
								store.load();
								self.msgbox(resObj.obj);
							}else{
								alert(resObj.obj);
							}
						}else{
							self.msgbox("保存成功");
						}
						//执行回调函数
						if(btn.callback){
							btn.callback();
						}	
						
					}
			},
			/**
			 * 表单的保存
			 */
			"baseform button[ref=formSave]":{
				click:function(btn){
					//拿到组件和配置信息
					var baseForm=btn.up("baseform");
					var funCode=baseForm.funCode;
					var basePanel=baseForm.up("basepanel[itemId="+funCode+"_basepanel]");
					var baseGrid=basePanel.down("basegrid[itemId="+funCode+"_basegrid]");
					var funData=basePanel.funData;
					var pkName=funData.pkName;
					//拿到formObj对象
					var formObj=baseForm.getForm();
					var pkField=formObj.findField(pkName);
					//判断当前是保存还是修改操作
					var act=Ext.isEmpty(pkField.getValue())?"doSave":"doUpdate";
					var params={};
					if(funData.uploadFields){
						params.uploadFields=funData.uploadFields;
					}
					formObj.submit({
						url:funData.action+"!"+act+".action",
						params:params,
						//可以提交空的字段值
						submitEmptyText:true,
						//成功回调函数
						success:function(form,action){
							var obj=action.result.obj;
							if(action.result.success){
								//对象成功后处理
								var insertObj=obj;
								/**----------------主子功能处理开始----------------------*/
								if(funData.isChildren){
									//得到主功能的记录
									var mainRecord=basePanel.mainRecord;
									var parentObj={};
									if(funData.connectFields){
										Ext.each(funData.connectFields,function(connectField){
											if(connectField.foreignKey){
												parentObj[connectField.foreignKey]=mainRecord[connectField.mainFieldCode];
											}else{
												parentObj[connectField.childFieldCode]=mainRecord[connectField.mainFieldCode];
											}
										});
									}
									insertObj=Ext.apply(insertObj,parentObj);
								}
								/**----------------主子功能处理结束----------------------*/
								//刷新表单
								self.setFormValue(formObj,insertObj);
								//load表格
								baseGrid.getStore().load();
								if(act=="doSave"){
									self.msgbox("数据添加成功");
								}else{
									self.msgbox("数据保存成功");
								}
								/**--------------------主子功能处理开始----------------------*/
								if(funData.children){
									Ext.each(funData.children,function(child){
										if(child.funCode){
											//拿到子功能的布局对象
											var childPanel=basePanel.down("basepanel[itemId="+child.funCode+"_basepanel]");
											//赋值主功能记录对象
											childPanel.mainRecord=obj;
											var childFunData=childPanel.funData;
											var parentSql="";
											//拼接parentSql
											if(childFunData.connectFields && childFunData.connectFields.length>0){
												Ext.each(childFunData.connectFields,function(connectField){
													if(connectField.isQuery){
														parentSql+=" and "+connectField.childFieldCode+"='"+obj[connectField.mainFieldCode]+"'";
													}
												});
											}else{
												parentSql=" and 1!=1";
											}
											//加载子功能数据
											var childGrid=childPanel.down("basegrid[itemId="+child.funCode+"_basegrid]");
											var store=childGrid.getStore();
											var proxy=store.getProxy();
											proxy.extraParams.parentSql=parentSql;
											store.load();									
										}
									});
								}
								/**--------------------主子功能处理结束----------------------*/
							}else{
								alert(obj);
							}
						},
						//错误信息处理
						failure:function(form, action){
							//前台表单校验错误
							if(action.failureType=="client"){
								var errors=["前台验证失败，错误信息："];
								formObj.getFields().each(function(f){
									if(!f.isValid()){
										errors.push("<font color=red>"+f.fieldLabel+"</font>:"+f.getErrors().join(","));
									}
								});
								alert(errors.join("<br/>"));								
							}else{
								alert("后台数据保存错误");
							}
						}						
					});
					//执行回调函数
					if(btn.callback){
						btn.callback();
					}
				}
			},
			/**
			 *  通用表单返回事件
			 */
			"baseform button[ref=formReturn]":{
					click:function(btn){
						var baseForm=btn.up("baseform");
						var funCode=baseForm.funCode;
						var basePanel=baseForm.up("basepanel[itemId="+funCode+"_basepanel]");
						var baseGrid=basePanel.down("basegrid[itemId="+funCode+"_basegrid]");
						var baseCenterPanel=baseGrid.up("basecenterpanel[itemId="+funCode+"_basecenterpanel]");
						if(baseCenterPanel){
							baseCenterPanel.show();
						}else{
							baseGrid.show();
						}
						baseForm.hide();
						//执行回调函数
						if(btn.callback){
							btn.callback();
						}
					}
			}
		}
		Ext.apply(self.ctr,btnCtr);
	}
});