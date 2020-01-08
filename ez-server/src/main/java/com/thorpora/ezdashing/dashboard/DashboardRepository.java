package com.thorpora.ezdashing.dashboard;

import com.thorpora.ezdashing.dashboard.model.Dashboard;

public interface DashboardRepository {

    Dashboard load();

    void save(Dashboard dashboard);

}
