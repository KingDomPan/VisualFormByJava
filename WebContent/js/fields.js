var forms_items = [{
                fieldLabel: '表单标识',
                name: 'form_id',
                id:'form_id_forms',
                allowBlank: false
            }, {
                fieldLabel: '表单名称',
                name: 'form_name',
                allowBlank: false
            }, {
                fieldLabel: '表单文件地址',
                name: 'file_path',
                allowBlank: false
            }, {
                fieldLabel: '打印文件地址',
                name: 'file_print_path'
            }, {
                fieldLabel: '表单描述',
                name: 'form_desc'
            }, {
                layout: 'column',
                xtype: 'panel',
                defaults: {
                    labelSeparator: ':',
                    labelWidth: 100,
                    labelAlign: 'left',
                    anchor: '100%'
                },
                items: [{
                    xtype: 'panel',
                    layout: 'form',
                    columnWidth: .5,
                    items: [new Ext.ffcs.LocalCombobox({
                        name: 'form_prop',
                        anchor: '100%',
                        value: 'A',
                        allowBlank: false,
                        store: new Ext.data.ArrayStore({
                            fields: ['value', 'text'],
                            data: [['A', 'A(自动控制)'], ['P', 'P(程序控制)']]
                        }),
                        fieldLabel: '表单属性'
                    })]
                
                }, {
                    xtype: 'panel',
                    layout: 'form',
                    columnWidth: .5,
                    bodyStyle: 'padding-left:30px;',
                    items: [new Ext.ffcs.LocalCombobox({
                        name: 'form_type',
                        value: 'flow',
                        anchor: '100%',
                        columnWidth: .5,
                        store: new Ext.data.ArrayStore({
                            fields: ['value', 'text'],
                            data: [['flow', 'flow'], ['CI', 'CI'], ['normal', 'normal']]
                        }),
                        fieldLabel: '表单类型',
                        allowBlank: false
                    })]
                }]
            }, {
                layout: 'column',
                xtype: 'panel',
                defaults: {
                    labelSeparator: ':',
                    labelWidth: 100,
                    labelAlign: 'left',
                    anchor: '100%'
                },
                items: [{
                    xtype: 'panel',
                    layout: 'form',
                    columnWidth: .5,
                    items: [new Ext.ffcs.LocalCombobox({
                        name: 'state',
                        value: '0SA',
                        anchor: '100%',
                        allowBlank: false,
                        store: new Ext.data.ArrayStore({
                            fields: ['value', 'text'],
                            data: [['0SA', '0SA'],['0SX', '0SX']]
                        }),
                        fieldLabel: '是否有效'
                    })]
                
                }, {
                    xtype: 'panel',
                    layout: 'form',
                    columnWidth: .5,
                    bodyStyle: 'padding-left:30px;',
                    items: [new Ext.ffcs.LocalCombobox({
                        id: 'audit_type_forms',
                        name:'audit_type',//bingo
                        value: 'none',
                        anchor: '100%',
                        allowBlank: false,
                        store: new Ext.data.ArrayStore({
                            fields: ['value', 'text'],
                            data: [['none', '(none)不记录'], ['audit', '(audit)表单审核']]
                        }),
                        fieldLabel: '日志类型'
                    })]
                }]
            }];
            
            var data_table_items = [new Ext.ffcs.LocalCombobox({
                name: 'table_name',
                id: 'table_name_data_tables',
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text']
                }),
                allowBlank: false,
                fieldLabel: '表名'
            }), {
                fieldLabel: '表名中文名称',
                name: 'table_name_cn',
                id: 'table_name_cn_data_tables',
                allowBlank: false
            }, {
                fieldLabel: '表说明',
                name: 'table_desc'
            }, {
                fieldLabel: '主键字段',
                name: 'key_fields',
                allowBlank: true
            }, new Ext.ffcs.LocalCombobox({
                id: 'audit_type_data_tables',
                name:'audit_type',
                value: 'none',
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text'],
                    data: [['none', '(none)不记录'], ['audit', '(audit)表单审核']]
                }),
                allowBlank: false,
                fieldLabel: '日志记录类型'
            })];
            
            var form_tables_items = [{
                fieldLabel: '表单标识',
                id: 'form_id_form_tables',
                name:'form_id',
                allowBlank: false
            }, new Ext.ffcs.LocalCombobox({
                name: 'table_name',
                id: 'table_name_form_tables',
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text']
                }),
                fieldLabel: '数据表名',
                allowBlank: false
            }), new Ext.ffcs.LocalCombobox({
                name: 'get_type',
                value: 'table',
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text'],
                    data: [['table', 'table']]
                }),
                allowBlank: false,
                fieldLabel: '获取类型'
            }), new Ext.ffcs.LocalCombobox({
                name: 'table_type',// 这里是表的记录类型 // 区分表单的记录类型
                value: 'regular',
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text'],
                    data: [['regular', 'regular']]
                }),
                allowBlank: false,
                fieldLabel: '数据表类型'
            }), new Ext.ffcs.LocalCombobox({
                id: 'audit_type_form_tables',
                name:'audit_type',
                value: 'none',
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text'],
                    data: [['none', '(none)不记录'], ['audit', '(audit)表单审核']]
                }),
                allowBlank: false,
                fieldLabel: '日志记录类型'
            })];
            
            var table_reference_items = [{
                fieldLabel: '表单标识',
                id: 'form_id_table_reference',
                name:'form_id',
                allowBlank: false
            }, new Ext.ffcs.LocalCombobox({
                name: 'main_table',
                id: 'main_table',
                allowBlank: false,
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text']
                }),
                fieldLabel: '主表名'
            }), new Ext.ffcs.LocalCombobox({
                name: 'sub_table',
                id: 'sub_table',
                allowBlank: false,
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text']
                }),
                fieldLabel: '从表名'
            }), {
                fieldLabel: '主表关键字段',
                name: 'main_table_field',
                allowBlank: false
            }, {
                fieldLabel: '从表关键字段',
                name: 'sub_table_field',
                allowBlank: false
            }, {
                layout: 'column',
                xtype: 'panel',
                defaults: {
                    labelSeparator: ':',
                    labelWidth: 100,
                    labelAlign: 'left',
                    anchor: '100%'
                },
                items: [{
                    xtype: 'panel',
                    layout: 'form',
                    columnWidth: .5,
                    items: [new Ext.ffcs.LocalCombobox({
                        name: 'table_reference',// 这里是表的记录类型 // 区分表单的记录类型
                        value: '1',
                        anchor: '100%',
                        store: new Ext.data.ArrayStore({
                            fields: ['value', 'text'],
                            data: [['1', '1.一对一'], ['2', '2.一对多']]
                        }),
                        fieldLabel: '表对应关系'
                    })]
                
                }, {
                    xtype: 'panel',
                    layout: 'form',
                    columnWidth: .5,
                    bodyStyle: 'padding-left:30px;',
                    items: [{
                        fieldLabel: '取值顺序',
                        xtype: 'spinnerfield',
                        anchor: '100%',
                        allowDecimals: false,// 不允许输入小数
                        nanText: '请输入有效的整数',// 无效数字提示
                        minValue: 1,
                        value: 1,
                        minText: '最小值输入错误',
                        mouseWheelEnabled: true,
                        name: 'get_value_order',
                        allowBlank: false
                    }]
                }]
            }];
            
            var form_element_items = [{
                fieldLabel: '元素标识',
                name: 'form_element_id',
                id:'form_element_id_form_element',
                allowBlank: false
            }, {
                fieldLabel: '元素名',
                name: 'element_name',
                id: 'element_name',
                allowBlank: false
            }, {
                fieldLabel: '元素中文名',
                name: 'element_name_cn',
                id: 'element_name_cn'
            }, new Ext.ffcs.XmlRemoteCombobox({
                name: 'element_type',
                anchor: '100%',
                url:'../data/form_element_types.xml',
                fieldLabel: '元素类型',
                allowBlank:false
            }), {
                fieldLabel: '元素初始取值sql',
                name: 'init_sql',
                xtype: 'textarea',
                height: 40
            }, {
                fieldLabel: '元素初始列表列数',
                xtype: 'spinnerfield',
                allowDecimals: false,// 不允许输入小数
                nanText: '请输入有效的整数',// 无效数字提示
                minValue: 1,
                minText: '最小值输入错误',
                mouseWheelEnabled: true,
                name: 'init_list_col_num'
            }, {
                fieldLabel: '元素默认值',
                name: 'default_value'
            }, new Ext.ffcs.XmlRemoteCombobox({
                name: 'default_value_type',
                fieldLabel: '元素默认值类型',
                anchor: '100%',
                url:'../data/default_value_type.xml'
            }), new Ext.ffcs.LocalCombobox({
                name: 'is_empty',
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text'],
                    data: [['T', 'T.(是)'], ['F', 'F.(否)']]
                }),
                fieldLabel: '是否可空'
            }), new Ext.ffcs.LocalCombobox({
                name: 'bind_type',
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text'],
                    data: [['0', '0(后台绑定)'], ['1', '1(前台绑定)']]
                }),
                fieldLabel: '绑定类型'
            }), {
                fieldLabel: '备注',
                id: 'remark_form_element',
                name:'remark',
                xtype: 'textarea',
                height: 40,
                maxLength: 250
            }];
            
            var form_element_bind_items = [
            	new Ext.ffcs.LocalCombobox({
                fieldLabel: '元素标识',
                id: 'form_element_id_form_element_bind',
                name: 'form_element_id',
                allowBlank: false,
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text']
                }),
                listeners : {
						'focus' : {
							fn : function(e) {
								e.getStore().loadData(form_element_id_array);
								e.expand();
								this.doQuery(this.allQuery, true);
							},
							buffer : 200
						},
						'select':function(combobox,r,index){
							var text=r.data.text.split(' ');
							Ext.getCmp('element_name_form_element_bind').setValue(text[1]);
							Ext.getCmp('element_name_cn_form_element_bind').setValue(text[2]);
						}
					}
            }),new Ext.ffcs.LocalCombobox({
                id: 'table_field_id_form_element_bind',
                name:'table_field_id',
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text']
                }),
                fieldLabel: '字段标识',
                allowBlank: false,
                listeners : {
						'focus' : {
							fn : function(e) {
								e.getStore().loadData(table_fields_array);
								e.expand();
								this.doQuery(this.allQuery, true);
							},
							buffer : 200
						}
					}
            }), {
                fieldLabel: '元素名',
                id: 'element_name_form_element_bind',
                name:'element_name',
                allowBlank: false
            }, {
                fieldLabel: '元素中文名',
                id: 'element_name_cn_form_element_bind',
                name:'element_name_cn'
            }, new Ext.ffcs.LocalCombobox({
                id: 'is_empty_form_element_bind',
                name:'is_empty',
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text'],
                    data: [['T', 'T.(是)'], ['F', 'F.(否)']]
                }),
                fieldLabel: '是否可空'
            }), {
                fieldLabel: '表单标识',
                id: 'form_id_form_element_bind',
                name:'form_id',
                allowBlank: false,
                disabled:true,
                value: '0'
            }];
            
            
            var tache_form_items = [{
                fieldLabel: '表单标识',
                id: 'form_id_tache_form',
                name:'form_id',
                allowBlank: false
            }, new Ext.ffcs.LocalCombobox({
                id: 'flow_mod_tache_form',
                name:'flow_mod',
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text']
                }),
                allowBlank: false,
                fieldLabel: '流程模版标识'
            }), new Ext.ffcs.LocalCombobox({
                id: 'tache_mod_tache_form',
                name:'tache_mod',
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text']
                }),
                allowBlank: false,
                fieldLabel: '环节模版标识'
            }), new Ext.ffcs.LocalCombobox({
                name: 'form_action',
                value: 'C',
                allowBlank: false,
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text'],
                    data: [['C', 'C(创建)'], ['R', 'R(只读)'], ['E', 'E(编辑)']]
                }),
                fieldLabel: '表单操作行为'
            })];
            
            
            var form_element_right_items = [{
                fieldLabel: '权限标识',
                name: 'form_element_right_id',
                id:'form_element_right_id',
                allowBlank: false
            }, new Ext.ffcs.LocalCombobox({
                id: 'table_field_id_form_element_right',
                name:'table_field_id',
                allowBlank: false,
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text']
                }),
                fieldLabel: '字段标识',
                listeners : {
						'focus' : {
							fn : function(e) {
								e.getStore().loadData(table_fields_array);
								e.expand();
								this.doQuery(this.allQuery, true);
							},
							buffer : 200
						}
					}
            }), new Ext.ffcs.LocalCombobox({
                name: 'is_show',
                value: 'T',
                allowBlank: false,
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text'],
                    data: [['T', 'T(是)'], ['F', 'F(否)']]
                }),
                fieldLabel: '是否显示'
            }), new Ext.ffcs.LocalCombobox({
                name: 'is_readonly',
                value: 'T',
                allowBlank: false,
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text'],
                    data: [['T', 'T(是)'], ['F', 'F(否)']]
                }),
                fieldLabel: '是否只读'
            }), new Ext.ffcs.LocalCombobox({
                name: 'is_require',
                value: 'T',
                allowBlank: false,
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text'],
                    data: [['T', 'T(是)'], ['F', 'F(否)']]
                }),
                fieldLabel: '是否必填'
            })];
            
            
            
            var flow_form_element_right_items = [
            new Ext.ffcs.LocalCombobox({
                fieldLabel: '字段权限标识',
                name: 'form_element_right_id',
                id:'form_element_right_id_flow_form_element_right',
                allowBlank: false,
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text']
                }),
                listeners : {
						'focus' : {
							fn : function(e) {
								e.getStore().loadData(form_element_right_id_array);
								e.expand();
								this.doQuery(this.allQuery, true);
							},
							buffer : 200
						}
                }
            }),new Ext.ffcs.LocalCombobox({
                name: 'tch_mod',
                id:'tch_mod_flow_form_element_right',
                allowBlank: false,
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text']
                }),
                fieldLabel: '环节模版标识'
            }), new Ext.ffcs.LocalCombobox({
                name: 'flow_mod',
                id:'flow_mod_flow_form_element_right',
                allowBlank: false,
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text']
                }),
                fieldLabel: '流程模版标识'
            }), new Ext.ffcs.LocalCombobox({
                name: 'is_append',
                value: 'T',
                allowBlank: false,
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text'],
                    data: [['T', 'T(是)'], ['F', 'F(否)']]
                }),
                fieldLabel: '是否加载到层'
            })];