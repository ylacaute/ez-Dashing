package com.thorpora.ezdashing.config;

import com.thorpora.ezdashing.dashboard.DashboardFileRepository;
import com.thorpora.ezdashing.dashboard.DashboardRepository;
import com.thorpora.ezdashing.dashboard.model.Dashboard;
import com.thorpora.ezdashing.exception.DashboardConfigNotFound;
import com.thorpora.ezdashing.exception.MissingApplicationArgumentException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.io.File;
import java.io.FileNotFoundException;

import static java.lang.String.format;
import static org.springframework.util.ResourceUtils.getFile;

@Slf4j
@Configuration
public class DashboardConfig {

    private static final String JSON_CONFIG_FILENAME = "dashboard.json";
    private static final String LOCATION_PROP_KEY = "spring.config.additional-location";

    @Bean
    public DashboardRepository dashboardRepository(Environment env) {
        return new DashboardFileRepository(getConfigFile(env));
    }

    @Bean
    public Dashboard dashboard(DashboardRepository dashboardRepository) {
        return dashboardRepository.load();
    }

    /**
     * Retrieve the dashboard config. We assume this config is always in the same directory
     * as the application.yml.
     */
    private File getConfigFile(Environment env) {
        String location = env.getProperty(LOCATION_PROP_KEY);
        log.debug("{} is set to '{}'", LOCATION_PROP_KEY, location);
        if (location == null || location.isEmpty()) {
            throw new MissingApplicationArgumentException(format("No arg '%s' defined", LOCATION_PROP_KEY));
        }
        try {
            File file = getFile(location + JSON_CONFIG_FILENAME);
            if (!file.exists()) {
                throw new DashboardConfigNotFound(format(
                        "Unable to locate the dashboard configuration from location '%s'", location));
            }
            return file;
        } catch (FileNotFoundException ex) {
            throw new DashboardConfigNotFound(format(
                    "Unable to locate the dashboard configuration from location '%s'", location));
        }
    }

}
