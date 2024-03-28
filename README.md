<h1>
  <img src="https://one-dev.aexp.com/images/app.svg" width="100" alt="One App logo" /><br />
  know-your-customer-refresh-root
</h1>

## Summary
This is the [One App](https://one-app.aexp.com/) holocron root module used to create the 
know your customer [Refresh User Interface (RUI)](https://enterprise-confluence.aexp.com/confluence/x/Y8OxLQ) 
that allows the KYC team to change configurable properties and scheduled jobs within the 
[MAESTRO](https://enterprise-confluence.aexp.com/confluence/x/RytWJQ) application.

## Know Your Customer Refresh UI URLs
| [E1](https://kyc-refresh-dev.aexp.com) | [E2](https://kyc-refresh-qa.aexp.com) | [E3](https://kyc-refresh.aexp.com/) |
|----------------------------------------|---------------------------------------|-------------------------------------|

## Overview
To understand the module architecture and how they are integrated with the one app service please navigate to 
this [One App Overview](https://one-app.aexp.com/docs/documentation/one-app-overview).

## Local Setup
To set up the Refresh UI locally (in E0) please follow the [Maestro RUI setup guide](https://enterprise-confluence.aexp.com/confluence/x/0kfUKw).

## Security
This module uses use-authblue-sso for security. Please refer
to the [authblue documentation](https://github.aexp.com/pages/amex-eng/authblue-documentation/docs/software/use-authblue-sso/on-boarding-one-app/)
to see how we have configured it (for V5), and other general information about the library.

## Build and Deployment
Deployment of the One App server is currently handled by the GitHub Actions Workflows in this repo more information is 
available on the [One App GitHub Action deployment pages](https://one-app.aexp.com/docs/documentation/how-tos/building-and-deploying/actions/server-deploy).

Deployment of the Kyc Refresh Module is currently still handled by Jenkins pipelines information for which can be found 
on the [One App Jenkins deployment pages](https://one-app.aexp.com/docs/documentation/how-tos/building-and-deploying/jenkins/deploying-a-module).

For a whittled down guide for the above please refer also to the [Maestro RUI build and deployment page](https://enterprise-confluence.aexp.com/confluence/x/6JvsNQ).
