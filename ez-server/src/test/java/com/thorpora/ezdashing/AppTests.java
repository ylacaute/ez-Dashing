package com.thorpora.ezdashing;

import com.thorpora.ezdashing.dashboard.model.Dashboard;
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
class AppTests {

	@Autowired
	private Dashboard dashboardConfig;

	@Test
	void contextLoads() {
		assertThat(dashboardConfig).isNotNull();
		List<DataSource> ds = dashboardConfig.getDataSources();
		assertThat(ds).hasSize(3);
	}

}
