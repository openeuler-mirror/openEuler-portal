---
title: Open Source Contribution
category: wiki
---

# Open Source Contribution

The openEuler community is organized into Special Interest Groups (SIGs) to better coordinate and manage work processes. Developers communicate and collaborate through issues, mailing lists, SIG meetings, and technical exchange groups to ensure the smooth operation of the community. Contributions to the community extend far beyond coding. Every effort, big or small, is welcomed and valued.
Sign the [openEuler community Contributor License Agreement (CLA)](https://clasign.osinfra.cn/sign/gitee_openeuler-1611298811283968340) before contributing to the community. Choose a CLA type based on whether you are contributing as an individual, an employee, or on behalf of a corporation.

## What Can I Do?

### 1. Issue or PR Submission

Participating in projects you are interested in by submitting issues or PRs is one of the most common ways to contribute to the community. You can quickly find or submit issues through [QuickIssue](https://quickissue.openeuler.org/). Generally, issues and PRs are used for:

- Bug reporting and fixing

- Suggestion submission

- Task tracking

- Feedback on missing documentation or installation problems

- Discussion

### 2. Software Package Contribution

#### 2.1 Adding a Software Package

Perform the following procedure to add a software package to Gitee and create a repository with the same name as the added software package in OBS.

##### 2.1.1 Procedure

Add a new software package by modifying the openeuler/community repository on Gitee.

1. Go to the [community](https://gitee.com/openeuler/community) repository and fork it to your own repository.
2. Clone the forked community repository to the local host.

   ```shell
    git clone https://gitee.com/$username/community.git
   ```

   Modify the community repository. The following describes how to add the **zip** software package to Gitee and add the package to the **openEuler:Factory** project.

   - cd community/sig
   - Find the SIG to which the software package belongs. For example, the **zip** package belongs to the Base-service SIG. (See the *Contributor Guide* to find the SIG or project that you are interested in.)
   - Modify the contents in the corresponding subfolder of the **sig** folder, such as the project list.
   - Modify the **sig-info.yaml** file of the corresponding SIG in the **sig** folder and add the software package in the form of **- src-openeuler/zip**. The following uses the **zip** software package as an example to describe how to modify **sig/Base-service/sig-info.yaml**:

   ```yaml
   repositories:
     - repo:
         - openeuler/openEuler-rpm-config
         - src-openeuler/abseil-cpp
         - src-openeuler/acl
         - src-openeuler/acpica-tools
         - src-openeuler/adcli
         - src-openeuler/aide
         - src-openeuler/airline
         - ...
         - src-openeuler/jansson
         - src-openeuler/apr
         - src-openeuler/python-lxml
         - src-openeuler/zip
   ```

   - Add the corresponding YAML file to **sig/***{sig_directory}***/src-openeuler/***initial_letter_of the_software_name* to create a repository. (For projects maintained by the openEuler community, use the **openeuler** directory. For packages introduced from other communities, use the **src-openeuler** directory. Example: **sig/Base-service/src-openeuler/z/zip.yaml**)

   ```yaml
   name: pkgname
   description: about pkgname
   upstream: https://somepkg.org/
   branches:- name: master
   type: protected
   type: public
   ```

   - Submit a pull request (PR). For details, see the [_Pull Request Submission Guide_](https://gitee.com/openeuler/community/blob/master/en/contributors/pull-request.md). After the PR is merged, a repository with the same name as the added software package will be created in [src-openeuler](https://gitee.com/src-openeuler) on Gitee. A repository with the same name will be created on OBS. You can view the repository at <https://build.openeuler.org/project/show/openEuler:Factory>.

##### 2.1.2 OBS Code Pulling Method Modification

OBS uses the [source service](https://openbuildservice.org/help/manuals/obs-user-guide/cha.obs.source_service.html) to obtain the source code. The **\_service** file is required for using the source service. When a software package is added, openEuler uses the **tar_scm_kernel_repo** plug-in to pull code. You can modify the **\_service** file of the corresponding software package in the **src-openeuler/obs_meta** repository. The procedure is as follows:

1. Go to the obs_meta repository and fork it to your own repository.
2. Clone the forked obs_meta repository to the local host.

    ```shell
    git clone https://gitee.com/"$username"/obs_meta.git
    ```

3. Modify the obs_meta repository.
   - `cd obs_meta/master/openEuler:Factory/`
   - `vim "package_name"/service`: Modify the **_service** file as required. (*package_name* indicates the name of the software package whose **_service** file needs to be customized.)
   - Submit a PR. After the PR is merged, the modified **_service** file is synchronized to the repository.

#### 2.2 Software Package Building

##### 2.2.1 Local Build Using rpm-build

The basic process of building a software package locally using rpm-build is as follows:

1. Download source code from the openEuler community.
2. Use rpm-build to perform local build.
3. Obtain and install the built software package.

The specific steps are as follows:

1. Configure the repository. For details, see [Development Environment Preparations](https://gitee.com/openeuler/community/blob/master/en/contributors/prepare-environment.md#configuring-a-repo-source).
2. Use rpm-build to build locally.

(1) Find the source code to operate. openssl is used as an example. Change it as required.

```shell
dnf list | grep openssl
```

Check if there is a file containing the openssl package name in the printed information. If there is, continue with the following operations. If not, leave a message in the community.

(2) Download the source code file.

```shell
yumdownloader --source openssl
```

(3) Install the openssl package.

```shell
rpm -ivh openssl-1.1.1d-5.src.rpm
```

After the command is executed, the **rpmbuild** directory will be generated in the **$HOME** directory. The **rpmbuild** directory contains the following directories:

- **SOURCES**: source code directory, which stores the source code package (such as .tar package) and all patches
- **SPECS**: spec file directory, which stores the RPM package configuration (.spec) file

(4) Switch to the **$HOME/rpmbuild/SPECS** directory, and then run the `rpmbuild` command to build the software package. Note that `rpmbuild` does not require root privileges to run. It is strongly recommended that you run this command as a common user.

```bash
cd ~/rpmbuild/SPECS$ rpmbuild -ba openssl.spec
```

The command may result in error messages, which vary depending on the software package being built. Refer to the specific error message for troubleshooting.

- Error message of missing dependencies

  After the command is executed, if there is an error message indicating that dependencies are missing, install the dependencies as prompted. The following is an example:

  ```shell
  error: Failed build dependencies:
  lksctp-tools-devel is needed by openssl-1:1.1.1d-5.aarch64
  ```

  ```shell
  sudo dnf install lksctp-tools-devel -y
  ```

- Error message of self-check failure

  Some software packages, including coreutils, augeas, and diffutils, report a "FAIL test-localeconv (exit status: 134)" error message during the build process. This is because of conflicting char type definitions between the AArch64 and x86_64 architectures. To resolve this, add the `--fsigned-char` compilation option to the Makefile.

#### 2.3 Community Component Packaging and EUR Usage

You can also participate in community component packaging. For details, see the [_openEuler Packaging Guide_](https://gitee.com/openeuler/community/blob/master/en/contributors/packaging.md).
If you find that some software packages are missing or the existing packages do not satisfy your needs, you can help supplement openEuler by using [openEuler User Repo (EUR)](https://eur.openeuler.openatom.cn). For details, see [Introduction to the openEuler User Software Repository](https://www.openeuler.org/en/blog/waaagh/waaagh/openEuler-user-repo-intro.html) and [How to Use the openEuler User Repository](https://www.openeuler.org/en/blog/waaagh/waaagh/openEuler-user-repo-howto.html).

You can also participate in community component packaging. For details, see the [openEuler Packaging Guide](https://gitee.com/openeuler/community/blob/master/en/contributors/packaging.md).

### 3. Content Creation and Optimization

- Optimize openEuler documentation by participating in [document bug catching](https://docs-bug.openeuler.sh/).

- Create [blogs](https://www.openeuler.org/zh/interaction/blog-list/) or participate in the [community forum](https://forum.openeuler.org/) to share your technical solutions and achievements with the community.

- Participate in the writing of [Success Stories](https://www.openeuler.org/en/showcase/) to demonstrate the use of openEuler or projects of the openEuler community in service scenarios, and the positive effects they have brought.

### 4. Community Communication

Help guide newcomers to participate in community contributions and answer questions on the community through [mailing lists](https://www.openeuler.org/en/community/mailing-list/) and [community forum](https://forum.openeuler.org/).

### 5. Open Source Evangelism

Share your expertise on openEuler's architecture and your real-world experience at community events, both online and offline. Every contribution, from cutting-edge technical information to practical insights, helps build a more dynamic and prosperous openEuler ecosystem.

### 6. SIG Meeting Organization

Operate community communication tools, including assisting SIG maintainers to improve the [SIG homepages](https://www.openeuler.org/en/sig/sig-list/) and organizing [community meetings](https://www.openeuler.org/en/sig/meeting-guide/).

### 7. Other

Join the [infrastructure SIG](https://gitee.com/openeuler/infrastructure) to participate in community infrastructure construction.

Join the [OpenDesign SIG](https://gitee.com/openeuler/opendesign) to participate in community visual design.

Join the [Doc SIG](https://gitee.com/openeuler/docs) to participate in document writing.

Join the [G11N SIG](https://gitee.com/openeuler/G11N) to participate in community translation services.
