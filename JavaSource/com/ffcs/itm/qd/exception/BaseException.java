package com.ffcs.itm.qd.exception;

import java.sql.SQLException;

public class BaseException extends Exception
{
    public BaseException(String errorCode)
    {
        super(errorCode);
    }

    public BaseException(String errorCode, Throwable ex)
    {
        super(errorCode, ex);
    }

    public BaseException(Throwable ex)
    {
        super(ex);
    }

    public BaseException(SQLException ex)
    {
        super("380029", ex);
    }

    public String getErrMsg()
    {
        return super.getMessage();
    }

    public String getMessage()
    {
        Throwable cause = this.getCause();
        StringBuffer sReturn = new StringBuffer(super.getMessage());
        if (cause != null)
        {
            sReturn.append(":").append(cause.getMessage());
        }
        return sReturn.toString();
    }
}
