package com.thorpora.ezdashing;

import io.restassured.RestAssured;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.annotation.PostConstruct;

import static io.restassured.config.DecoderConfig.decoderConfig;
import static io.restassured.config.EncoderConfig.encoderConfig;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;


@SpringBootTest(webEnvironment = RANDOM_PORT)
@ExtendWith(SpringExtension.class)
@Import(ContextIT.class)
public class AbstractIT {

  @LocalServerPort
  protected int randomServerPort;

  @PostConstruct
  public void init() {
    RestAssured.port = randomServerPort;
    RestAssured.config = RestAssured.config()
            .decoderConfig(decoderConfig().defaultCharsetForContentType("UTF-8", "application/json"))
            .encoderConfig(encoderConfig().defaultCharsetForContentType("UTF-8", "application/json"));
  }

}
