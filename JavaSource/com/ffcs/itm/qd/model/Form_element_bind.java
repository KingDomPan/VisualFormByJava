package com.ffcs.itm.qd.model;

public class Form_element_bind {
	public String form_element_id;
	public String table_field_id;
	public String element_name;
	public String element_name_cn;
	public String is_empty;
	public String form_id;
	@Override
	public String toString() {
		return "Form_element_bind [form_element_id=" + form_element_id
				+ ", table_field_id=" + table_field_id + ", element_name="
				+ element_name + ", element_name_cn=" + element_name_cn
				+ ", is_empty=" + is_empty + ", form_id=" + form_id + "]";
	}
}
