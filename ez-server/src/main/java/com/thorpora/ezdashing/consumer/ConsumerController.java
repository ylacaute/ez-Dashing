package com.thorpora.ezdashing.consumer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RestController
@RequestMapping("/api/consumer")
public class ConsumerController {

    private ConsumerRegistry registry;

    @Autowired
    public ConsumerController(ConsumerRegistry registry) {
        this.registry = registry;
    }

    @GetMapping(
            value = "/{queryId}",
            produces = APPLICATION_JSON_VALUE)
    public String getSummary(@PathVariable String queryId, @RequestParam Map<String, String> params) {
        log.debug("GET /api/consumer/{}", queryId);
        Consumer consumer = registry.getConsumer(queryId);
        String consumerResponse = consumer.doQuery(queryId, params);
        log.trace("Response of queryId '{}' : {}", queryId, consumerResponse);
        return consumerResponse;
    }

}
