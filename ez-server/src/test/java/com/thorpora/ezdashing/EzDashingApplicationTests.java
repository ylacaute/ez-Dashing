package com.thorpora.ezdashing;

import com.thorpora.ezdashing.jenkins.JenkinsProperties;
import com.thorpora.ezdashing.sonar.JiraProperties;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EzDashingApplicationTests {

	@Autowired
	private JenkinsProperties jenkinsProperties;

	@Autowired
	private JiraProperties sonarProperties;

	@Test
	public void contextLoads() {
		Assertions.assertThat(jenkinsProperties.getBaseUrl()).isEqualTo("http://localhost:8080/jenkins");
		Assertions.assertThat(sonarProperties.getBaseUrl()).isEqualTo("https://sonarqube.com/projects");
	}

}
