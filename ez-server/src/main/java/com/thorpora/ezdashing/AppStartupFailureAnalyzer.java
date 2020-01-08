package com.thorpora.ezdashing;

import com.thorpora.ezdashing.exception.ApplicationException;
import com.thorpora.ezdashing.exception.DashboardConfigNotFound;
import com.thorpora.ezdashing.exception.MissingApplicationArgumentException;
import org.springframework.boot.diagnostics.AbstractFailureAnalyzer;
import org.springframework.boot.diagnostics.FailureAnalysis;

import java.io.PrintWriter;
import java.io.StringWriter;

public class AppStartupFailureAnalyzer extends AbstractFailureAnalyzer<ApplicationException> {

    @Override
    protected FailureAnalysis analyze(Throwable throwable, ApplicationException cause) {
        return new FailureAnalysis(getDescription(cause), getAction(cause), cause);
    }

    private String getDescription(ApplicationException ex) {
        StringWriter description = new StringWriter();
        PrintWriter printer = new PrintWriter(description);
        printer.println("There is a configuration problem with your Spring Boot application.");
        if (ex instanceof MissingApplicationArgumentException) {
            printer.println("You must start the application with some parameters.");
        } else if (ex instanceof DashboardConfigNotFound) {
            printer.println("You must provide a valid config directory.");
        }
        printer.printf("Error details: %s", ex.getMessage());
        return description.toString();
    }

    private String getAction(ApplicationException ex) {
        StringWriter action = new StringWriter();
        PrintWriter printer = new PrintWriter(action);
        printer.printf("Please verify your configuration. ");
        if (ex instanceof MissingApplicationArgumentException ||
                ex instanceof DashboardConfigNotFound) {
            printer.println("" +
                    "You must start the application by giving a valid 'spring.config.additional-location' property.\n" +
                    "Example argument: \n" +
                    "  -Dspring-boot.run.jvmArguments=\"-Dspring.config.additional-location=/home/user/ezconfig\"\n" +
                    "The given directory must contains 'dashboard.json'. If you want to override spring " +
                    "properties, you just have to create the 'application.yml' file inside the specified " +
                    "directory above.");
        }
        return action.toString();
    }

}
