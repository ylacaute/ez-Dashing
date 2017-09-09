package com.thorpora.ezdashing.dashboard;

import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.annotation.PostConstruct;

import static io.restassured.config.DecoderConfig.decoderConfig;
import static io.restassured.config.EncoderConfig.encoderConfig;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
@ExtendWith(SpringExtension.class)
public class AbstractIT {

  @LocalServerPort
  int randomServerPort;

  @PostConstruct
  public void init() {
    RestAssured.port = randomServerPort;
    RestAssured.config = RestAssured.config()
            .decoderConfig(decoderConfig().defaultCharsetForContentType("UTF-8", "application/json"))
            .encoderConfig(encoderConfig().defaultCharsetForContentType("UTF-8", "application/json"));
  }


}
