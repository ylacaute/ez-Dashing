package com.thorpora.ezdashing.utils.spring.error;

import java.lang.annotation.*;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SilentException {

    boolean value() default true;

}
