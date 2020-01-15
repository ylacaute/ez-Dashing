
# Useful links
- [Jest configuration](https://jestjs.io/docs/en/configuration)
- [babel-plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)
- [React Code Splitting](https://reactjs.org/docs/code-splitting.html)
- [Storybook for React tutorial](https://www.learnstorybook.com/intro-to-storybook/react/en/get-started/)
- [Storybook doc](https://storybook.js.org/docs/basics/introduction/)

- [Openshift Authentication](https://docs.openshift.com/container-platform/3.11/rest_api/index.html#rest-api-example-curl)
  
  
# Openshift authentication

I assume you will use the project "pipeline" to create your user.
It can be an existing project or a new one. Of course you may be cluster admin to do these operations. 

```shell
# Select the project
oc project pipeline

# Create the user account "ez-dashing"
oc create serviceaccount ez-dashing

# Add permissions
oc policy add-role-to-user cluster-status system:serviceaccount:pipeline:ez-dashing

# Retrieve the JWT
oc serviceaccounts get-token ez-dashing
```

Now, we got a long-lived token which allow us to request Openshfit by the web API. 
We just put this token in the dashboard configuration.json:

