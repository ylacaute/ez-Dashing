package com.thorpora.ezdashing;

import com.thorpora.ezdashing.dashboard.model.DashboardConfiguration;
import com.thorpora.ezdashing.dashboard.model.DataSource;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ExtendWith(SpringExtension.class)
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
