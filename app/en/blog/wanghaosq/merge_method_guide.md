---
title: Instructions on Merging Pull Requests to an openEuler Repository
category: blog 
date: 2022-11-24
tags:
    - openEuler
    - PR merging
archives: 2022-11
author: wanghaosq
sig: Infrastructure
summary: This blog introduces how to merge pull requests to an openEuler repository.
---

# Instructions on Merging Pull Requests to an openEuler Repository
## PR Merge Methods
### **1. rebase merge**
In this method, all commits are merged to the target branch, and the changelog of the target branch in the target repository does not contain any information about the pull requests (PRs).<br>
Example:<br>

<img src=./pictures/rebase.png>

<img src=./pictures/rebase-git.png>

<br>

### **2. squash merge**
If this method is used, all commits are merged into a new commit with the PR title as **changelog**, and then merged to the target branch.<br>
Example: <br>

<img src=./pictures/squash.png>

<img src=./pictures/squash-git.png>

### **3. default merge**
In the default merge method, all commits and a new commit with the PR title as **changelog** are merged to the target branch.

<img src=./pictures/default.png>

<img src=./pictures/default-git.png>

Tips: The test cases in the examples have two PRs each, and three merge methods are tested.

Comparison of the three merge methods:<br>
<img src=./pictures/three-merge-methods.png>

## Adding the merge_method Field in a Repository File
Currently, the Gitee platform provides three PR merge methods: **merge**, **rebase merge**, and **squash merge**. **merge** is the default method and does not require extra configuration.

For the **rebase merge** method:
```yaml
name: A-Tune-BPF-Collection
description: A-Tune-BPF-Collection is BPF based tunning tools collection
branches:
- name: master
  type: protected
type: public
merge_method: rebase
```

For the **squash merge** method:
```yaml
name: A-Tune-BPF-Collection
description: A-Tune-BPF-Collection is BPF based tunning tools collection
branches:
- name: master
  type: protected
type: public
merge_method: squash
```

For the default **merge** method:
```yaml
name: A-Tune-BPF-Collection
description: A-Tune-BPF-Collection is BPF based tunning tools collection
branches:
- name: master
  type: protected
type: public
```

## Changing the Merge Method Through PR Comments
For details about command usage, visit
https://gitee.com/openeuler/community/blob/master/en/sig-infrastructure/command.md.

#### (1) Using the **/rebase** command
Use the **/rebase** command to add the **merge/rebase** tag to the PR, indicating that the **rebase merge** method is to be used. To change the merge method, use **/rebase cancel** to remove the **merge/rebase** tag.
#### (2) Using the **/squash** command
Use the **/squash** command to add the **merge/squash** tag to the PR, indicating that the **squash merge** method is to be used. To change the merge method, use **/squash cancel** to remove the **merge/squash** tag.
#### (3) Using neither of the two commands
PRs are merged in the default **merge** method.

## Priority of Merge Method Changes
The priority of a PR comment is higher than that of **merge_method** field configuration in the repository file.
