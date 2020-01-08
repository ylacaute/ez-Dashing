package com.thorpora.ezdashing.utils.spring.error;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ErrorDTO {

    private String timeStamp;
    private String path;
    private String message;
    private List<Object> details;

}
