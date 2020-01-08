package com.thorpora.ezdashing.utils.spring.error;

import org.slf4j.event.Level;

import java.lang.annotation.*;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ExceptionLog {

    Level level() default Level.ERROR;

    boolean stackTrace() default true;

}
