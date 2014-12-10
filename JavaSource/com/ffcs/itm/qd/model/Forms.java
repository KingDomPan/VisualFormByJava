package com.ffcs.itm.qd.model;

public class Forms {
	public String form_id;
	public String form_name;
	public String file_path;
	public String file_print_path;
	public String form_desc;
	public String form_prop;
	public String form_type = "flow";
	public String state = "0SA";
	public String audit_type = "none";
	@Override
	public String toString() {
		return "Forms [form_id=" + form_id + ", form_name=" + form_name
				+ ", file_path=" + file_path + ", file_print_path="
				+ file_print_path + ", form_desc=" + form_desc + ", form_prop="
				+ form_prop + ", form_type=" + form_type + ", state=" + state
				+ ", audit_type=" + audit_type + "]";
	}
}
