package com.thorpora.ezdashing.dashboard;

import com.thorpora.ezdashing.dashboard.model.DashboardConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;

import static com.thorpora.ezdashing.config.DashboardConfig.FILENAME;

@Configuration
public class ContextIT {

  @Bean
  public DashboardConfiguration dashboardConfiguration() {
    File file = new File(this.getClass().getClassLoader().getResource(FILENAME).getFile());
    return new DashboardConfiguration(file);
  }

}
