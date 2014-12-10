package com.ffcs.itm.qd.exception;

import java.sql.SQLException;

@SuppressWarnings("serial")
public class SystemException extends BaseException
{
    public SystemException(String errorCode, Throwable ex)
    {
        super(errorCode, ex);
    }

    public SystemException(String errorCode)
    {
        super(errorCode);
    }

    public SystemException(SQLException ex)
    {
        super(ex);
    }
}
