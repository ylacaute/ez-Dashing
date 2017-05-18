package com.thorpora.ezdashing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties
@SpringBootApplication
public class EzDashingApplication {

	public static void main(String[] args) {
		SpringApplication.run(EzDashingApplication.class, args);
	}
}
