package com.thorpora.ezdashing.exception;

import static java.lang.String.format;

public class QueryConfigNotFound extends ApplicationException {

    public QueryConfigNotFound(String queryid) {
        super(format("The queryId %s has not been found in the configuration", queryid));
    }

}
