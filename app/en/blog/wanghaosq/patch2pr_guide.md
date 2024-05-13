---
title: 'Submitting a Patch PR Through the Mailing List'
category: blog 
date: 2023-07-11
tags:
    - openEuler
    - patch2pr
archives: 2023-07
author: wanghaosq
sig: Infrastructure
summary: Submit a patch PR through the mailing list'
---

# Submitting a Patch PR Through the Mailing List
## I. Introduction
### 1. Overview
This function is built based on open source tools such as patchwork, git-pw, and getmail, and uses a custom script as the processing service. <br>
### 2. Tools
patchwork: a web-based patch tracking system developed based on Django. <br>
getmail: a mail download tool, which can be used together with the patchwork to parse mails and save them to the database.  <br>
git-pw: a patch download tool, which can be used together with the patchwork to download patches.  <br>

### 3. Tool Addresses and Scripts <br>
[patchwork](https://github.com/getpatchwork/patchwork) <br>
[getmail](https://github.com/getmail6/getmail6) <br>
[git-pw](https://patchwork.readthedocs.io/projects/git-pw/en/latest/) <br>
[Custom script](https://gitee.com/openeuler/infrastructure/blob/master/ci/tools/patch2pr/multi_patch2pr.py)

## II. Usage Guide
### 1. Creating an Issue
Create an issue under [infrastructure repository](https://gitee.com/openeuler/infrastructure/issues) and identify the repository, branch, and mailing list to be managed by the service.

### 2. Submitting a PR
Submit a configuration-related pull request.<br>
Configuration file path: https://gitee.com/openeuler/infrastructure/tree/master/ci/tools/patch2pr/repositories_branches_map.yaml <br>

```yaml
# Configuration reference
mapping:
  src-openeuler/kernel:                            # Organization/Repository
    mailing-list: "kernel-build@openeuler.org"     # Mailing list address
    env:                                           # Environment variable required by the service
      host: "SRC_OPENEULER_KERNEL_HOST"            # Email host. The recommended format is SRC_OPENEULER_REPO_HOST. Change the REPO value based on the repository name.
      pass: "SRC_OPENEULER_KERNEL_PASS"            # Email password. The recommended format is SRC_OPENEULER_REPO_PASS. Change the REPO value based on the repository name.
    branches:                                      # Branch information
      build-5.10-rc: 'build-5.10-rc'
      master: 'master'
      openEuler-20.03-LTS: 'openEuler-20.03-LTS'
```

## III. Process and Functions
### 1. Configuring the Service
The infrastructure team configures the service based on the parameters provided in the preceding issue and merges PR. After the service is configured, the infrastructure team will comment and close the issue, and notify the owner that the functions are available.

### 2. Creating a Patch
Run the `git format-patch` command to create one or more patches.<br>

 Create a patch using either of the following commands:
```shell
1. Patch with a cover letter
git format-patch -1 --subject-prefix="PATCH branch_name" --cover-letter

2. Patch only
git format-patch -1 --subject-prefix="PATCH branch_name"
```

Create multiple patches.
```shell
n means the number of commits
git format-patch -n --subject-prefix="PATCH branch_name" --cover-letter
```

Note:
```text
Allowed subject-prefix:
1. Branch name and version number: [PATCH branch_name v2], [PATCH v2 branch_name]
2. Branch name: [PATCH branch_name]

Disallowed subject-prefix:
1. Missing "PATCH": [branch_name], [v2 branch_name], [branch_name v2],
2. Lowercase PATCH: [patch ...]
3. Missing branch: [PATCH]
```

### 3. Sending the Patch Email to the Mailing List
Send an email to the mailing list by running `git send-email`. For details, see [git send-email](https://git-scm.com/docs/git-send-email)
<br>Example command: ·`git send-email *.patch --to "" --cc "" --suppress-cc=all`

Note:
```text
1. If the created patch contains a cover letter, send the cover letter and patch email together. If the cover letter is not sent, the PR cannot be created.
2. Send the complete collection of patches.
```

### 4. Creating a PR from the Patch
The background service polls the email box every 5 minutes (if a task is performed, the polling will be delayed) to check whether the email box receives the new email and uses the getmail tool to pull the email. Then, it uses the git-pw tool to download the patch, merges the patch to the corresponding branch, submits the PR, sends an email to the patch sender, and copies the email to the mailing list.