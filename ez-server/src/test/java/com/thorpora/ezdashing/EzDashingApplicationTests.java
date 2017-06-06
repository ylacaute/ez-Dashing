package com.thorpora.ezdashing;

import com.thorpora.ezdashing.core.DashboardProperties;
import com.thorpora.ezdashing.jenkins.JenkinsProperties;
import com.thorpora.ezdashing.jira.JiraProperties;
import com.thorpora.ezdashing.sonar.SonarProperties;
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
	private SonarProperties sonarProperties;

	@Autowired
	private JiraProperties jiraProperties;

	@Autowired
	private DashboardProperties dashboardProperties;

	@Test
	public void contextLoads() {
		Assertions.assertThat(jenkinsProperties.getBaseUrl()).isEqualTo("http://localhost:8080/jenkins");
		Assertions.assertThat(sonarProperties.getBaseUrl()).isEqualTo("http://localhost:8080/sonar");
		Assertions.assertThat(jiraProperties.getBaseUrl()).isEqualTo("http://localhost:8080/jira");
		Assertions.assertThat(dashboardProperties.getConfigLocation()).isEqualTo("/user/config.json");
	}

}
