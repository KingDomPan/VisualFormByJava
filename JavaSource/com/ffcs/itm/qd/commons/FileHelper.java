package com.ffcs.itm.qd.commons;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import com.ffcs.itm.qd.exception.ApplicationException;
import com.ffcs.itm.qd.exception.SystemException;

public class FileHelper {
	public static long writeToFile(List<List<String>> inserts) throws SystemException,ApplicationException, IOException{
		long filename=System.currentTimeMillis();
		String filepath=Constants.UPLOAD+File.separator+String.valueOf(filename)+".sql";
		PrintWriter pw=new PrintWriter(new FileWriter(new File(filepath)));
		for(List<String> insert:inserts){
			for(String insertsql:insert){
				pw.println(insertsql+";");
			}
		}
		pw.close();
		return filename;
	}
}
