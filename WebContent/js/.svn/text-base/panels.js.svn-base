            var forms_panel;
            var data_tables_panel;
            var form_tables_panel;
            var table_reference_panel;
            var data_table_fields_panel;
            
            var four_panel = new Ext.Panel({
                layout: 'vbox',
                frame: true,
                border: false,
                id: 'four_panel',
                title: '表单和表单数据表及其关系配置(四配置项)',
                layoutConfig: {
                    align: 'stretch',
                    pack: 'start'
                },
                items: [{
                    // 上面面板
                    padding: 0,
                    flex: 1.2,
                    layout: 'column',
                    border: true,
                    frame: true,
                    items: [ // 左上方面板
            forms_panel = new Ext.ffcs.LocalPanel({
                        columnWidth: .5,
                        title: '表单页面表配置(forms)',
                        tbar: [{
                            text: '点击获取表单主键标识',
                            icon:'../images/add.png',
                            handler: function(btn, e){
                                //获取表单标识 绑定所有的表单标识
                            	Ext.Ajax.request({
                            		url:'handler?tag=2',
                            		method:'post',
                            		success: function(response, opts) {
	      								var doc = response.responseXML;
	      								var root=doc.documentElement||doc;
										var rows=Ext.query('row',root);
										console.log(rows[0].childNodes[0].firstChild.nodeValue);
										if(rows==null||rows.length==0){
											Ext.MessageBox.alert('提示','获取表单标识失败,请重新获取');
										}else{
											var fids = Ext.query('input[name^=form_id]');
											Ext.each(fids, function(item, index, length) {
												Ext.getCmp(item.id).setValue(rows[0].childNodes[0].firstChild.nodeValue).setDisabled(true);
											});
											Ext.getCmp('form_id_form_element_bind').setValue('0').setDisabled(true);
										}
   									},
									failure:function(response, opts){
										Ext.MessageBox.alert('提示','获取表单标识失败,请重新获取');
									}
                            	});
                            }
                        }, '-', {
                            text: '修改删除',
                            id:'forms_oper',
                            handler: function(btn, e){
                                previous(btn, Forms_array,Forms_model);
                            }
                        }, '-', {
                            text: '配置完毕',
                            handler: function(btn, e){
                                /*if(forms_panel.getForm().isValid()){
                                 var forms=new Forms_model({});
                                 forms_panel.getForm().items.each(function(item, index, length){
                                 forms.set(item.getName(),item.getValue());
                                 });
                                 Forms_array.push(forms);
                                 var _null=forms.copy();
                                 for(var key in _null.data)
                                 _null.data[key]='';
                                 forms_panel.getForm().loadRecord(_null);
                                 }*/
                                var item = new Forms_model({});
                                next(btn, Forms_array, item);
                            }
                        }],
                        items: forms_items
                    }), // 右上方面板
             table_reference_panel = new Ext.ffcs.LocalPanel({
                        columnWidth: .5,
                        autoHeight:true,
                        title: '主从表关系配置(table_reference)',
                        tbar: [{
                            text: '修改删除',
                            handler: function(btn, e){
                                previous(btn, Table_reference_array,Table_reference_model);
                            }
                        }, '-', {
                            text: '配置完毕',
                            handler: function(btn, e){
                                var item = new Table_reference_model({});
                                next(btn, Table_reference_array, item);
                            }
                        }],
                        items: table_reference_items
                    })]
                }, {
                    // 下面面板
                    padding: 0,
                    flex: 1,
                    layout: 'column',
                    border: true,
                    frame: true,
                    items: [ // 左下方面板
            data_tables_panel = new Ext.ffcs.LocalPanel({
                        columnWidth: .5,
                        title: '表单数据存储表配置(data_tables)',
                        tbar: [{
                            text: '修改删除',
                            handler: function(btn, e){
                                previous(btn, Data_tables_array,Data_tables_model);
                            }
                        }, '-', {
                            text: '配置完毕',
                            handler: function(btn, e){
                                var item = new Data_tables_model({});
                                next(btn, Data_tables_array, item);
                            }
                        }],
                        items: data_table_items
                    }), //		
                    // 右下方面板
                    form_tables_panel = new Ext.ffcs.LocalPanel({
                        columnWidth: .5,
                        autoHeight: true,
                        title: '表单页面与数据存储表关联配置(form_tables)',
                        tbar: [{
                            text: '修改删除',
                            handler: function(btn, e){
                                previous(btn, Form_tables_array,Form_tables_model);
                            }
                        }, '-', {
                            text: '配置完毕',
                            handler: function(btn, e){
                                var item = new Form_tables_model({});
                                next(btn, Form_tables_array, item);
                            }
                        }],
                        items: form_tables_items
                    })]
                }]
            });
            
            var data_table_fields_panel = new Ext.ffcs.LocalPanel({
                id: 'data_table_fields_panel',
                title: '数据表字段信息配置(data_table_fields)',
                tbar: [{
                    text: '修改删除',
                    handler: function(btn, e){
                        previous(btn, Data_table_fields_array,Data_table_fields_model);
                    }
                }, '-', {
                    text: '配置完毕',
                    handler: function(btn, e){
                    	if (btn.ownerCt.ownerCt.getForm().isValid()) {
	                    	var field=Ext.getCmp('field_name_data_table_fields').getValue();
	                    	var tn=Ext.getCmp('table_name_data_table_fields').getValue();
	                    	var tf=Ext.getCmp('table_field_id').getValue();
	                    	var array=[tf,tf+' ('+field+') IN TABLE ('+tn+')'];
	                    	table_fields_array.push(array);
                    	}
                        var item = new Data_table_fields_model({});
                        next(btn, Data_table_fields_array, item);
                    }
                }],
                items: [{
                    fieldLabel: '字段标识',
                    xtype: 'textfield',
                    name: 'table_field_id',
                    id:'table_field_id',
                    allowBlank: false
                }, new Ext.ffcs.LocalCombobox({
                    name: 'table_name',
                    id: 'table_name_data_table_fields',
                    store: new Ext.data.ArrayStore({
                        fields: ['value', 'text'],
                        data:[['FORMS','FORMS'],['DATA_TABLES','DATA_TABLES']]
                    }),
                    listeners :{
                    	'select':function(combobox,r,index){
                    		Ext.Ajax.request({
                        		url:'/handler?tag=1',
                        		method:'post',
                        		xmlData:xmlHead+'<root>'+'<table_name>'+r.data.value+'</table_name>'+'</root>',
                        		success:function(response,opts){
									var doc=response.responseXML;
									var root=doc.documentElement||doc;
									var rows=Ext.query('row',root);
									var table_fields=[];
									if(rows==null||rows.length==0){
										Ext.MessageBox.alert('提示','对应的表是不存在滴!!!')
									}else{
										Ext.each(rows,function(item,index,length){
											var row=[];
											row.push(item.childNodes[0].firstChild.nodeValue);
											row.push(item.childNodes[1].firstChild.nodeValue);
											table_fields.push(row);
										});
										Ext.getCmp('field_name_data_table_fields').getStore().loadData(table_fields);
										Ext.getCmp('field_name_data_table_fields').setDisabled(false);
									}
                        		},
                        		failure:function(response ,opts){
                        			Ext.MessageBox.alert('提示','查询出错!!!')
                        		}
                        	});
                    	}
                    },
                    allowBlank: false,
                    fieldLabel: '数据表名'
                }), new Ext.ffcs.LocalCombobox({
                    name: 'field_name',
                    anchor: '100%',
                    id:'field_name_data_table_fields',
                    disabled:true,
					store: new Ext.data.ArrayStore({
                        fields: ['value', 'text']
                    }),
                    allowBlank: false,
                    fieldLabel: '字段名称'
                }), {
                    fieldLabel: '字段中文名',
                    name: 'field_name_cn',
                    allowBlank: true,
                    anchor: '100%'
                }, new Ext.ffcs.XmlRemoteCombobox({
                    name: 'field_type',
                    anchor: '100%',
                    url:'../data/oracle_types.xml',
                    fieldLabel: '字段类型',
                    allowBlank:false
                }), {
                    xtype: 'spinnerfield',
                    incrementValue: 5,
                    minValue: 1,
                    allowDecimals: false,
                    minText: '最小值输入错误',
                    maxValue: 5000,
                    maxText: '最大值输入错误',
                    fieldLabel: '字段长度',
                    name: 'field_length',
                    anchor: '100%',
                    mouseWheelEnabled: true,
                    allowBlank: true
                }, {
                    xtype: 'spinnerfield',
                    mouseWheelEnabled: true,
                    incrementValue: 0.01,
                    minValue: 0,
                    allowDecimals: true,
                    minText: '最小值输入错误',
                    maxValue: 5000,
                    maxText: '最大值输入错误',
                    fieldLabel: '字段精度',
                    name: 'field_scale',
                    anchor: '100%',
                    allowBlank: true
                }, new Ext.ffcs.LocalCombobox({
                    name: 'is_nullable',
                    anchor: '100%',
                    store: new Ext.data.ArrayStore({
                        fields: ['value', 'text'],
                        data: [['T', 'T'], ['F', 'F']]
                    }),
                    fieldLabel: '是否可空'
                }), {
                    fieldLabel: '字段格式',
                    allowBlank: true,
                    name: 'field_format',
                    anchor: '100%'
                }, new Ext.ffcs.LocalCombobox({
                    id: 'audit_type_data_table_fields',
                    name: 'audit_type',//bingo
                    anchor: '100%',
                    value: 'none',
                    store: new Ext.data.ArrayStore({
                        fields: ['value', 'text'],
                        data: [['none', 'none(不记录)'], ['audit', 'audit(审核)']]
                    }),
                    allowBlank: false,
                    fieldLabel: '日志记录类型'
                }), {
                    fieldLabel: '备注',
                    xtype: 'textarea',
                    maxLength: 250,
                    name: 'remark',
                    height: 40,
                    anchor: '100%'
                }, {
                    fieldLabel: '关联表',
                    name: 'ref_table',
                    anchor: '100%'
                }, {
                    fieldLabel: '关联字段',
                    name: 'ref_field',
                    anchor: '100%'
                }, {
                    fieldLabel: '关联的值字段',
                    name: 'ref_value_field',
                    anchor: '100%'
                }, new Ext.ffcs.LocalCombobox({
                    name: 'get_ref_type',
                    anchor: '100%',
                    store: new Ext.data.ArrayStore({
                        fields: ['value', 'text'],
                        data: [['sql', 'sql'], ['ref', 'ref']]
                    }),
                    fieldLabel: '取关联值类型'
                }), {
                    xtype: 'textarea',
                    fieldLabel: '取关联值sql',
                    name: 'get_ref_sql',
                    anchor: '100%'
                }]
            });
            
            var form_element_panel = new Ext.ffcs.LocalPanel({
                title: '表单元素配置(form_element)',
                id: 'form_element_panel',
                frame: true,
                tbar: [{
                    text: '修改删除',
                    handler: function(btn, e){
                        previous(btn, Form_element_array,Form_element_model);
                    }
                }, '-', {
                    text: '配置完毕',
                    handler: function(btn, e){
                    	if (btn.ownerCt.ownerCt.getForm().isValid()) {
                    		var feid=Ext.getCmp('form_element_id_form_element').getValue();
	                    	var en=Ext.getCmp('element_name').getValue();
	                    	var encn=Ext.getCmp('element_name_cn').getValue();
	                    	var array=[feid,feid+' '+en+' '+encn];
	                    	form_element_id_array.push(array);
                    	}
                        var item = new Form_element_model({});
                        next(btn, Form_element_array, item);
                    }
                }],
                items: form_element_items
            });
            
            var form_element_bind_panel = new Ext.ffcs.LocalPanel({
                title: '表单元素字段绑定配置(form_element_bind)',
                id: 'form_element_bind_panel',
                frame: true,
                tbar: [{
                    text: '修改删除',
                    handler: function(btn, e){
                        previous(btn, Form_element_bind_array,Form_element_bind_model);
                    }
                }, '-', {
                    text: '配置完毕',
                    handler: function(btn, e){
                        var item = new Form_element_bind_model({});
                        next(btn, Form_element_bind_array, item);
                    }
                }],
                items: form_element_bind_items
            });
            
            var tache_form_panel = new Ext.ffcs.LocalPanel({
                title: '环节表单关联流程配置(tache_form)',
                id: 'tache_form_panel',
                frame: true,
                tbar: [{
                    text: '修改删除',
                    handler: function(btn, e){
                        previous(btn, Tache_form_array,Tache_form_model);
                    }
                }, '-', {
                    text: '配置完毕',
                    handler: function(btn, e){
                        var item = new Tache_form_model({});
                        next(btn, Tache_form_array, item);
                    }
                }],
                items: tache_form_items
            });
            
            var form_element_right_panel = new Ext.ffcs.LocalPanel({
                title: '表单字段处理权限定义配置(form_element_right)',
                id: 'form_element_right_panel',
                frame: true,
                tbar: [{
                    text: '修改删除',
                    handler: function(btn, e){
                        previous(btn, Form_element_right_array,Form_element_right_model);
                    }
                }, '-', {
                    text: '配置完毕',
                    handler: function(btn, e){
                    	if (btn.ownerCt.ownerCt.getForm().isValid()) {
                    		var ferid=Ext.getCmp('form_element_right_id').getValue();
                    		var tfid=Ext.getCmp('table_field_id_form_element_right').el.dom.value;
	                    	var array=[ferid,ferid+'  --->字段信息--->'+tfid];
	                    	form_element_right_id_array.push(array);
                    	}
                        var item = new Form_element_right_model({});
                        next(btn, Form_element_right_array, item);
                    }
                }],
                items: form_element_right_items
            });
            
			var flow_form_element_right_panel=new Ext.ffcs.LocalPanel({
				 title: '环节表单字段权限控制表(flow_form_element_right)',
			                id: 'flow_form_element_right_panel',
			                frame: true,
			                tbar: [{
			                    text: '修改删除',
			                    handler: function(btn, e){
			                        previous(btn, Flow_form_element_right_array,Flow_form_element_right_model);
			                    }
			                }, '-', {
			                    text: '配置完毕',
			                    handler: function(btn, e){
			                        var item = new Flow_form_element_right_model({});
			                        next(btn, Flow_form_element_right_array, item);
			                    }
			                }],
			                items: flow_form_element_right_items
			});