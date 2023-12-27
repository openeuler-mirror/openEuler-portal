---
title: Introduction to the QuickIssue Service
category: blog 
date: 2022-11-01
tags:
    - openEuler
    - QuickIssue
    - Issue
    - Issue tracking
    - PR
archives: 2022-10
author: georgecao
sig: Infrastructure
summary: This blog introduces the QuickIssue service, including its background and main functions.
---

# Introduction to the QuickIssue Service
## Background
An active open source community has a large number of issues and pull requests (PRs). PR management is closely related to the code hosting platform, be it a third-party platform or community-built platform. Issue management varies with communities.
Since the establishment of the openEuler community, its issue management platform has undergone several rounds of iterations.

## Development Path
####  Issue Management on Gitee
Since the establishment of openEuler, the community uses the issue management service provided by Gitee, a code hosting platform.

On the one hand, this service has the following benefits:
 - Associates issue information that records a problem with the PR for solving this problem.  
 - Supports operations such as submitting, modifying, and querying issues.  
 - Provides basic statistics functions to collect statistics on and export all issues in the community.  

On the other hand, the system has some disadvantages:
 - The entry for submitting issues varies with code repositories. Many community users or developers do not know the repository to which they need to submit their issues.  
 - The Gitee platform requires that issue submitters use a Gitee account to log in to the system before submitting an issue. However, some community users do not have a Gitee account.  
 - In addition, the response speed of the Gitee platform may be hindered due to the large amount of data on the platform. Its processing logic is different from that expected by community developers, which brings inconvenience.  

####  Bugzilla Service
Community developers called on the openEuler community to provide an issue tracking service.
In early 2021, the community infrastructure SIG proposed the Bugzilla management system, an open source service developed in the perl language. Its first version was released in 1998.
After the system was rolled out, it attracted few users due to difficulties in connecting to the existing issues on the Gitee platform, outdated GUI, and complex user registration.

#### Birth of QuickIssue
In 2022, after in-depth analysis of community requirements, the infrastructure SIG decided to provide an issue tracking system that could solve the preceding problems.
QuickIssue was developed to:

 - Provide a unified issue submission entry on the openEuler official website.  
 - Allow issue submission no matter whether the submitter has a code hosting platform account.  
 - Instruct users or developers to submit issues to a target repository and provide a default repository if the target repository is uncertain.  
 - Provide services only for openEuler to ensure smooth operations such as query, search, and filtering.  
 - Exchange information with existing services in the community, such as SIG management and contribution statistics.  
 - ...

## Introduction to QuickIssue
The QuickIssue service commits to provide users and developers with a convenient way to submit issues. User can directly access [https://quickissue.openeuler.org/en/issues/](https://quickissue.openeuler.org/en/issues/) to create issues, query issues, and query PRs.

### Creating Issues
The issue creation function has the following features:
- The issue submission entry is unified. All issues in the openEuler community can be submitted through this entry.  
- A code hosting platform account is not a must. Issue submitters can use an email and verification code to submit issues.  
- Issue submitters can search for the repository to which their issues belong according to guidance or directly submit issues to the default repository.  

<img src=./pictures/new_issue.png width=700 height=400 />

If an issue is submitted by a Gitee account, QuickIssue provides guidance for the submitter to select a proper SIG by field and then determine a target repository to submit the issue. After the issue is submitted, developers can comment on the issue.
If an issue is submitted by email, QuickIssue checks the validity of the email address through a verification code. After the verification is successful, QuickIssue notifies the robot to submit an issue. If there is any comment left in the issue comment area after the issue is submitted, QuickIssue notifies the submitter of each comment by email.

### Querying Issues
Information about all issues in the openEuler community is displayed, including the SIG label, status, and creator.

<img src=./pictures/query_issue.png width=700 height=130/>

QuickIssue provides convenient filtering. You can search for information as required.
To search for issues submitted by email, enter the first part of an email address in the filter of the **Creator** column. To protect the privacy of submitters' mailbox information, the **Creator** column records only part of mailbox information.

### Query PRs
All PR information of the openEuler community is displayed, including open, incorporated, and closed PRs. You can filter PRs as required based on the PR status, creator, and label.

<img src=./pictures/query_pr.png width=700 height=150/>

QuickIssue contains only full PRs of the openEuler community, which is much less than PRs managed by the code hosting platform. In addition, QuickIssue uses cache data, ensuring fast query.

## Expectations
The openEuler community is developing rapidly, and this service is iterated fastly. If you encounter any problems or have new requirements or ideas for QuickIssue, please contact the infrastructure SIG via infra@openeuler.org.
