package com.ffcs.itm.qd.commons;

import java.io.File;
import java.io.IOException;
import java.util.Properties;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.taskdefs.SQLExec;

public class AntExecSql {

	private static Properties properties = new Properties();

	static {
		try {
			initProperties("jdbc.properties");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public AntExecSql() {

	}

	public static Properties getProperties(String configName)
			throws IOException {
		initProperties(configName);
		return properties;
	}

	public static void initProperties(String configName) throws IOException {
		properties.load(AntExecSql.class.getClassLoader().getResourceAsStream(
				configName));
	}

	public static void execSqlFile(String sqlFileName) throws IOException {
		SQLExec sqlExec = new SQLExec();
		sqlExec.setDriver(properties.getProperty("driver"));
		sqlExec.setUrl(properties.getProperty("url"));
		sqlExec.setUserid(properties.getProperty("userid"));
		sqlExec.setPassword(properties.getProperty("password"));
		sqlExec.setSrc(new File(sqlFileName));
		sqlExec.setPrint(true);
		sqlExec.setProject(new Project());
		sqlExec.execute();
	}
}
