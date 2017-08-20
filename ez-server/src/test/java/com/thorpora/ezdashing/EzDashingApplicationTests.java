package com.thorpora.ezdashing;

import com.thorpora.ezdashing.dashboard.model.DashboardConfiguration;
import com.thorpora.ezdashing.dashboard.model.DataSource;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EzDashingApplicationTests {

	@Autowired
	private DashboardConfiguration dashboardConfig;

	@Test
	public void contextLoads() {
		assertThat(dashboardConfig).isNotNull();
		List<DataSource> ds = dashboardConfig.getDataSources();
		assertThat(ds).hasSize(3);
	}

}
