import JSONPath from "jsonpath";
import { assert } from "chai";

describe("JsonPATH", () => {

  it("query() should return good values from sonar response", () => {
    let json = {
      "component": {
        "id": "systemA",
        "key": "systemA",
        "name": "201701poolobject",
        "qualifier": "TRK",
        "measures": [{
          "metric": "lines",
          "value": "128"
        }, {
          "metric": "coverage",
          "value": "0.0"
        }, {
          "metric": "violations",
          "value": "12"
        }]
      }
    };
    let result = JSONPath.query(json, "$.component.measures[?(@.metric == 'lines')].value");
    assert.equal(result[0], 128);
  });

  it("query() should return good values from a jenkins response", () => {
    let json = {
      "actions": [
        {
          "causes": [
            {
              "shortDescription": "Started by an SCM change"
            }
          ]
        },
        {},
        {
          "buildsByBranchName": {
            "origin/master": {
              "buildNumber": 78,
              "buildResult": null,
              "marked": {
                "SHA1": "57afeabe10282eb255ce437dce5a22854a7a70ff",
                "branch": [
                  {
                    "SHA1": "57afeabe10282eb255ce437dce5a22854a7a70ff",
                    "name": "origin/master"
                  }
                ]
              },
              "revision": {
                "SHA1": "57afeabe10282eb255ce437dce5a22854a7a70ff",
                "branch": [
                  {
                    "SHA1": "57afeabe10282eb255ce437dce5a22854a7a70ff",
                    "name": "origin/master"
                  }
                ]
              }
            }
          },
          "lastBuiltRevision": {
            "SHA1": "57afeabe10282eb255ce437dce5a22854a7a70ff",
            "branch": [
              {
                "SHA1": "57afeabe10282eb255ce437dce5a22854a7a70ff",
                "name": "origin/master"
              }
            ]
          },
          "remoteUrls": [
            "git@hermes.edelia.net:devinterne/bc-gas-client.git"
          ],
          "scmName": ""
        },
        {},
        {},
        {},
        {
          "failCount": 0,
          "skipCount": 0,
          "totalCount": 109,
          "urlName": "testReport"
        },
        {},
        {}
      ],
      "artifacts": [],
      "building": false,
      "description": null,
      "displayName": "#78",
      "duration": 37902,
      "estimatedDuration": 33027,
      "executor": null,
      "fullDisplayName": "bc-gas-client_-_Analyse_reccurente » master #78",
      "id": "78",
      "keepLog": false,
      "number": 78,
      "queueId": 380178,
      "result": "SUCCESS",
      "timestamp": 1492782440396,
      "url": "http://tools-29a.admin.edelia.net:37777/job/bc-gas-client_-_Analyse_reccurente/branch/master/78/",
      "builtOn": "",
      "changeSet": {
        "items": [
          {
            "affectedPaths": [
              "bc-gas-api-client/pom.xml",
              "sensor-gas-api-client/pom.xml",
              "pom.xml",
              "bc-gas-api-client-model/pom.xml"
            ],
            "commitId": "4d3d6715c3464d5158d3106ad7240d5705ec38ed",
            "timestamp": 1492782154000,
            "author": {
              "absoluteUrl": "http://tools-29a.admin.edelia.net:37777/user/jenkins",
              "fullName": "jenkins1"
            },
            "comment": "create new release branch 0.49\n",
            "date": "2017-04-21 15:42:34 +0200",
            "id": "4d3d6715c3464d5158d3106ad7240d5705ec38ed",
            "msg": "create new release branch 0.49",
            "paths": [
              {
                "editType": "edit",
                "file": "sensor-gas-api-client/pom.xml"
              },
              {
                "editType": "edit",
                "file": "bc-gas-api-client/pom.xml"
              },
              {
                "editType": "edit",
                "file": "bc-gas-api-client-model/pom.xml"
              },
              {
                "editType": "edit",
                "file": "pom.xml"
              }
            ]
          },
          {
            "affectedPaths": [
              "bc-gas-api-client/pom.xml",
              "sensor-gas-api-client/pom.xml",
              "pom.xml",
              "bc-gas-api-client-model/pom.xml"
            ],
            "commitId": "8173d44e1ede0876e54a8ed3c858502c16c44c0c",
            "timestamp": 1492782311000,
            "author": {
              "absoluteUrl": "http://tools-29a.admin.edelia.net:37777/user/jenkins",
              "fullName": "jenkins2"
            },
            "comment": "[maven-release-plugin] prepare release bc-gas-client-0.49.0\n",
            "date": "2017-04-21 15:45:11 +0200",
            "id": "8173d44e1ede0876e54a8ed3c858502c16c44c0c",
            "msg": "[maven-release-plugin] prepare release bc-gas-client-0.49.0",
            "paths": [
              {
                "editType": "edit",
                "file": "bc-gas-api-client-model/pom.xml"
              },
              {
                "editType": "edit",
                "file": "bc-gas-api-client/pom.xml"
              },
              {
                "editType": "edit",
                "file": "sensor-gas-api-client/pom.xml"
              },
              {
                "editType": "edit",
                "file": "pom.xml"
              }
            ]
          },
          {
            "affectedPaths": [
              "bc-gas-api-client/pom.xml",
              "pom.xml",
              "sensor-gas-api-client/pom.xml",
              "bc-gas-api-client-model/pom.xml"
            ],
            "commitId": "1c49e9d9ef9b8965cac15c2e6e9f77bd275ced66",
            "timestamp": 1492782315000,
            "author": {
              "absoluteUrl": "http://tools-29a.admin.edelia.net:37777/user/jenkins",
              "fullName": "jenkins3"
            },
            "comment": "[maven-release-plugin] prepare for next development iteration\n",
            "date": "2017-04-21 15:45:15 +0200",
            "id": "1c49e9d9ef9b8965cac15c2e6e9f77bd275ced66",
            "msg": "[maven-release-plugin] prepare for next development iteration",
            "paths": [
              {
                "editType": "edit",
                "file": "pom.xml"
              },
              {
                "editType": "edit",
                "file": "bc-gas-api-client/pom.xml"
              },
              {
                "editType": "edit",
                "file": "sensor-gas-api-client/pom.xml"
              },
              {
                "editType": "edit",
                "file": "bc-gas-api-client-model/pom.xml"
              }
            ]
          }
        ],
        "kind": "git"
      },
      "culprits": [
        {
          "absoluteUrl": "http://tools-29a.admin.edelia.net:37777/user/jenkins",
          "fullName": "jenkins"
        }
      ],
      "mavenArtifacts": {},
      "mavenVersionUsed": "3.0.5"
    };
    let result = JSONPath.query(json, "$.result", 1);
    let lastAuthor = JSONPath.query(json, "$.changeSet.items[-1:].author.fullName", 1);
    assert.equal(result, "SUCCESS");
    assert.equal(lastAuthor[0], "jenkins3");
  });

});

