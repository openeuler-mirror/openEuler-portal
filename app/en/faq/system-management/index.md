---
title: FAQs
custom-layout: true
category: faq
anchor: true
---

<!-- <script setup>
  import TheFAQ from "~@/views/faq/TheFAQ.vue"
</script> -->

<div class="markdown">

# openEuler FAQs

## System Management

### 1. When the NFS service is enabled on openEuler 22.03 SP1, why does the server response speed drop sharply from more than a gigabit to around 2 MB/s after less than a day of write operations?

The performance drops sharply when the NFS server's cache uses more than 50% memory. This is mainly due to issues with memory allocation and reclamation mechanisms. The system reclaims memory in the background rather than during the memory allocation process. This is slower and will increase the waiting time (e.g., 500 ms latency) when the system cannot allocate enough memory in time. This issue is particularly pronounced under heavy loads since the NFS server requires substantial memory to process client requests. As the service runtime increases, the reduction in available memory leads to a dramatic performance drop, especially when there are intensive write operations.

### 2. What do I do if a file fails to be created on openEuler due to an inode error of the Ext4 file system?

Set the **rec_len** field of the **dx_node** block as follows:

1) Use `ext4_rec_len_from_disk()` to convert **rec_len** to **65536** and then perform a comparison. This ensures that the **rec_len** field is correctly set when a new **dx_node** block is added.
2) Calculate and set a correct checksum for the node. This correction will prevent the inode error caused by incorrect checksums and thus allow the system to create and manage a large number of files correctly.

### 3. How to reduce the excessive memory usage of service processes on openEuler due to the use of glibc tcache?

Disable the tcache feature by setting the environment variables before starting the program. Specifically, add **GLIBC_TUNABLES=glibc.malloc.tcache_count=0** to **bash_profile** to disable tcache. After the process starts, verify the process environment variables in **/proc/pid/environ** to ensure that the variable has been successfully added. Once tcache is disabled, the memory of this process will be managed in accordance with glibc 2.17, without any additional side effects. According to user feedback, this solution significantly reduces the memory usage of services on openEuler, resulting in lower memory usage than CentOS.

### 4. When performing a fio multi-drive stress test, why is the performance of the Arm architecture only half that of the x86 architecture?

The lower performance of the Arm architecture in the fio stress testing is due to differences in interrupt handling mechanisms. x86 achieves interrupt load balancing through APIC, while Arm's locality-specific peripheral interrupts (LPIs) are managed by Interrupt Translation Service (ITS), which by default assigns interrupts to the lowest-numbered core of each CPU. Therefore, performance bottlenecks occur on these cores during the multi-drive stress test.

### 5. After the server is powered off and restarted, why does an I/O error occur when I run `ls` in the XFS file system?

This error usually indicates that parts of the XFS file system failed to be loaded or read, possibly due to damaged file system metadata or incomplete write operations. If a power outage occurs during write operations, data may not be fully written to XFS, causing the XFS data to be inconsistent after the server reboots. Running a command such as `ls` at this time will result in an input/output error.

### 6. What do I do if the new kernel is not used upon system boot?

Replace the contents of the **/boot/grub2/grub.cfg** file with those of the **/boot/efi/EFI/xxxx/grub.cfg** file. This ensures that the system reads the correct configuration file containing the new kernel information upon system boot. In addition, check the system boot mode and confirm that UEFI is being used.

### 7. Why do `systemctl` and `systemd-cgtop` show different memory usage from `top`?

`systemctl` and `systemd-cgtop` (both managed by systemd) obtain memory usage from **memory.usage_in_bytes** in the related cgroup. `top`, on the other hand, directly calculates memory usage by collecting memory-related information from the **/proc** directory.

Service processes primarily use memory in different ways:

- **anon_rss**: anonymous pages in user space, like memory allocated by `malloc` or the `MAP_ANONYMOUS` flag of `mmap`. The kernel can swap this out when system memory is low.
- **file_rss**: mapped pages in user space, like memory mapped by `mmap` for a specified file or IPC shared memory for a temporary file system. This can be reclaimed by the kernel, but might require data synchronization in advance.
- **file_cache**: pages in the page cache of files from read/write operations. The kernel can reclaim this, but may need to synchronize data in advance.
- Buffer pages: cache related to reading block device files, part of the page cache.

In essence:

- **RSS** of `top` = **anon_rss** + **file_rss**; **SHR** of `top` = **file_rss**
- **memory.usage_in_bytes** of the cgroup = cache + **RSS** + swap

This is the reason behind the different memory usage reported by systemd commands and `top`.

### 8. Why can't I set up a RAID 0 volume with `stripesize` set to 4?

openEuler supports only a 64 KB stripe size with the 64K page table. When running the `lvcreate` command, set the `stripesize` parameter to 64.


### 9. What should I do if I encounter difficulties compiling MariaDB using `rpmbuild`?

When you run the `rpmbuild` command as user **root** to compile the MariaDB source code, compilation may fail and the following information is displayed:
```text
+ echo 'mysql can'\''t run test as root'
mysql can't run test as root
+ exit 1`
```

This error occurs because the MariaDB does not allow user **root** to execute test cases. However, test cases are automatically executed during compilation, and as a result, the compilation process is blocked.

To resolve this, modify the value of the **runtest** variable in the **mariadb.spec** file, using a text editor, such as vi.
Before the modification:
```
%global runtest 1
```
After the modification:
```
%global runtest 0
```
The modification prevents test cases from running during compilation but does not affect the compilation process or the final RPM package.

### 10. What should I do if I cannot start the SNTP service using the default configuration?

If the SNTP service cannot be started with the default configuration, it could be because the domain name of the NTP server is not added to the default configuration. To resolve this, modify the **/etc/sysconfig/sntp** file and add the domain name of the NTP server, for example, **0.generic.pool.ntp.org**.

### 11. What should I do if I encounter an installation failure due to software package conflict, file conflict, or missing software packages?

Software package conflict, file conflict, or missing software packages may occur during software package installation. As a result, the installation fails.

The following is an example of software package conflict error information:
```
package libev-libevent-devel-4.24-11.oe1.aarch64 conflicts with libevent-devel provided by libevent-devel-2.1.11-2.oe1.aarch64  
 - cannot install the best candidate for the job
 - conflicting requests
```
The following is an example of file conflict error information:
```
Error: Transaction test error:
 file /usr/bin/containerd from install of containerd-1.2.0-101.oe1.aarch64 conflicts with file from package docker-engine-18.09.0-100.aarch64
 file /usr/bin/containerd-shim from install of containerd-1.2.0-101.oe1.aarch64 conflicts with file from package docker-engine-18.09.0-100.aarch64
```
The following is an example of package missing error message:
```
Error:  
  Problem: cannot install both blivet-data-1:3.1.1-6.oe1.noarch and blivet-data-1:3.1.1-5.noarch  
   - package python2-blivet-1:3.1.1-5.noarch requires blivet-data = 1:3.1.1-5, but none of the providers can be installed  
   - cannot install the best update candidate for package blivet-data-1:3.1.1-5.noarch  
   - problem with installed package python2-blivet-1:3.1.1-5.noarch(try to add '--allowerasing' to command line to replace conflicting packages or '--skip-broken' to skip uninstallable packages or '--nobest' to use not only best candidate packages)
```

Some software packages provided by openEuler, despite having different names, offer the same functionality, leading to installation conflicts due to file duplication, and upgrade issues where dependencies on older package versions cause installation failures.

If a software package conflict occurs, for example, **libevent-devel-2.1.11-2.oe1.aarch64** conflicts with **libev-libevent-devel-4.24-11.oe1.aarch64** to be installed, run the `dnf remove libevent-devel-2.1.11-2.oe1.aarch64` command to uninstall the conflicting software package and perform the installation again.

If a file conflict occurs, for example, files installed with **containerd-1.2.0-101.oe1.aarch64** and **docker-engine-18.09.0-100.aarch64** conflict, determine the software package that does not need to be installed (**docker-engine-18.09.0-100.aarch64** for example), run the `dnf remove docker-engine-18.09.0-100.aarch64` command, and perform the installation again.

If a software package is missing, for example, **python2-blivet-1:3.1.1-5.noarch** depends on **blivet-data-1:3.1.1-5.noarch**, which is to be upgraded, you can resolve the issue in either of the following ways:

- Uninstall python2-blivet-1:3.1.1-5.noarch by running `dnf remove python2-blivet-1:3.1.1-5.noarch`
- Add the `--allowerasing` parameter when upgrading blivet-data-1:3.1.1-5.noarch:

```
yum update blivet-data-1:3.1.1-5.noarch -y –allowerasing
```

### 12. What should I do if I cannot downgrade libiscsi?

When you try to downgrade libiscsi-1.19.4 or later versions to libiscsi-1.19.3 or earlier versions, the following information may be displayed:

```
Error:
Problem: problem with installed package libiscsi-utils-1.19.0-4.oe1.x86_64
- package libiscsi-utils-1.19.0-4.oe1.x86_64 requires libiscsi(x86-64) = 1.19.0-4.oe1, but none of the providers can be installed
- cannot install both libiscsi-1.19.0-3.oe1.x86_64 and libiscsi-1.19.0-4.oe1.x86_64
- cannot install both libiscsi-1.19.0-4.oe1.x86_64 and libiscsi-1.19.0-3.oe1.x86_64
- conflicting requests
(try to add '--allowerasing' to command line to replace conflicting packages or '--skip-broken' to skip uninstallable packages or '--nobest' to use not only best candidate packages)
```

Such failure occurs because in libiscsi-1.19.3 or earlier, binary files such as **iscsi-xxx** are packed into the main package **libiscsi**. However, these binary files introduce improper dependency CUnit. To solve this problem, in libiscsi-1.19.4, these binary files are separated into the **libiscsi-utils** subpackage. The main package is weakly dependent on the subpackage, allowing users to choose whether to integrate it during image building. If the subpackage is not integrated or is uninstalled, the functions of the **libiscsi** main package are not affected. When libiscsi-1.19.4 or later is downgraded to libiscsi-1.19.3 or earlier on a system where the **libiscsi-utils** subpackage is installed, the downgrade will fail because libiscsi-1.19.3 or earlier does not contain a **libiscsi-utils** version for downgrading **libiscsi-utils**. Due to the fact that **libiscsi-utils** depends on the **libiscsi** main package before the downgrade, a dependency problem occurs and the **libiscsi** downgrade fails.

To resolve this downgrading failure, run the following command to uninstall the **libiscsi-utils** subpackage and then perform the downgrade:
```
yum remove libiscsi-utils
```

### 13. What should I do if I fail to downgrade xfsprogs?

When you try to downgrade xfsprogs-5.6.0-2 or later versions to xfsprogs-5.6.0-1 or earlier versions, the following information may be displayed:
```
Error:
Problem: problem with installed package xfsprogs-xfs_scrub-5.6.0-2.oe1.x86_64
- package xfsprogs-xfs_scrub-5.6.0-2.oe1.x86_64 requires xfsprogs = 5.6.0-2.oe1, but none of the providers can be installed
- cannot install both xfsprogs-5.6.0-1.oe1.x86_64 and xfsprogs-5.6.0-2.oe1.x86_64
- cannot install both xfsprogs-5.6.0-2.oe1.x86_64 and xfsprogs-5.6.0-1.oe1.x86_64
- conflicting requests
```

This failure arises from the restructuring in xfsprogs-5.6.0-2, where the `xfs_scrub*` commands have been relocated to the **xfsprogs-xfs_scrub** subpackage to minimize unnecessary dependencies on the main **xfsprogs** package and segregate experimental commands.

The **xfsprogs** main package is weakly dependent on the **xfsprogs-xfs_scrub** sub-package, allowing users to choose whether to integrate it during image creation. If the subpackage is not integrated or is uninstalled, the functions of the **xfsprogs** main package are not affected.

When xfsprogs-5.6.0-2 or later is downgraded to xfsprogs-5.6.0-1 or earlier on a system where the **xfsprogs-xfs_scrub** subpackage is installed, the downgrade will fail because xfsprogs-5.6.0-1 or earlier does not contain a **xfsprogs-xfs_scrub** version for downgrading **xfsprogs-xfs_scrub**. Due to the fact that **xfsprogs-xfs_scrub** depends on the **xfsprogs** main package before the downgrade, a dependency problem occurs and the **xfsprogs** downgrade fails.

To resolve this downgrading failure, run the following command to uninstall the **xfsprogs-xfs_scrub** subpackage and then perform the downgrade:
```
yum remove xfsprogs-xfs_scrub
```

### 14. How do I deal with CVE-2019-9674?

CVE-2019-9674 refers to a vulnerability found in Python versions 3.7.2 and earlier related to ZIP files. Attackers can exploit this vulnerability by sending ZIP bombs, which are compressed files that, when extracted, consume excessive system resources, resulting in high resource usage and leading to denial-of-service (DoS) conditions. To address this issue, it is recommended to add the alarm information to [zipfile](https://github.com/python/cpython/blob/3.7/Doc/library/zipfile.rst).

### 15. Why does improper use of glibc regular expressions cause ReDoS attacks?

Using glibc's `regcomp` and `regexec` interfaces for programming, or shell commands like `grep` and `sed` that apply glibc regular expressions, can lead to Regular Expression Denial of Service (ReDoS) attacks if the regular expressions or inputs are not used properly (CVE-2019-9192/CVE-2018-28796).

The typical regular expression pattern is a combination of the "reverse reference (\1)" with an "asterisk (*)" (zero match or multiple matches), "plus sign (+)" (one match or multiple matches), or "{m,n}" (minimum match: m; maximum match: n) or the combination of ultra-long character strings with regular expressions. The following is an example:
```
$ echo D | grep -E "$(printf '(\0|)(\\1\\1)*')"Segmentation fault (core dumped)
$ grep -E "$(printf '(|)(\\1\\1)*')"
Segmentation fault (core dumped)
$ echo A | sed '/\(\)\(\1\1\)*/p'
Segmentation fault (core dumped)
$ time python -c 'print "a"*40000' | grep -E "a{1,32767}"
Segmentation fault (core dumped)
$ time python -c 'print "a"*40900' | grep -E "(a)\\1"
Segmentation fault (core dumped)
```
The possible causes may be:

A core dump occurs on the process that uses the regular expression. The glibc regular expression is implemented using the NFA/DFA hybrid algorithm. The internal principle is to use a greedy algorithm for recursive query to match as many character strings as possible. The greedy algorithm causes the ReDoS attack when processing the recursive regular expression.

To solve this issue:
1. Implement strict permission controls to minimize the attack surface. 
2. Always verify that your regular expression is valid and avoid using invalid expressions or excessively long character strings combined with regular expressions (such as references or asterisks) that could lead to infinite recursion. 
   ```text
   # ()(\1\1)*
   # "a"*400000
   ```
3. After a user program detects a process exception, the program will restart the process to restore services, improving the overall reliability of the program.

### 16. Why do I encounter an error when installing or uninstalling **gdbm-devel-1.18.1-1** while setting up **httpd-devel** and **apr-util-devel** software packages, and how can I fix it?

The likely reason for this issue is that the **gdbm-devel-1.18.1-1** package lacks a necessary help package. Because of this, when **gdbm-devel** is installed independently, the required information package cannot be included, resulting in a warning message stating:
```text
install-info: No such file or directory for /usr/share/info/gdbm.info.gz
```
By default, the **gdbm-1.18.1-1** main package is installed in the system, but the **gdbm-devel** package is not installed. The software packages depending on **gdbm-devel** still match the version of the **gdbm** main package and install **gdbm-devel-1.18.1-1**. As a result, the error persists.

To solve the issue, first upgrade the **gdbm** package to version **gdbm-1.18.1-2**, which will remove the warning message after installing the relevant software packages.

Next, after upgrading **gdbm**, install the **gdbm-devel** package, ensuring it relies on the higher version of the **gdbm** package, hence eliminating the warning message.

### 17. How can I fix the rpmdb error when running the `yum` or `dnf` command after rebooting my system?

```
error: db5 error(-30973) from dbenv->open: BDB0087 DB_RUNRECOVERY: Fatal error, run database recovery
error: cannot open Packages index using db5 - (-30973)
error: cannot open Packages database in /var/lib/rpm
Error: Error: rpmdb open failed
```

When you encounter an error as above, please perform the following steps:

1. Run the `kill -9` command to terminate all running RPM-related commands.
2. Run `rm -rf /var/lib/rpm/__db.00*` to delete all **`db.00`** files.
3. Run the `rpmdb --rebuilddb` command to rebuild the RPM database.

### 18. Why does the `rpmrebuild -d /home/test filesystem` command fail to rebuild the **filesystem** package, and how can I fix it?

When attempting to run the `rpmrebuild --comment-missing=y --keep-perm -b -d /home/test filesystem-3.16-3.oe1.aarch64` command to rebuild the **filesystem** package, the following error messages may be displayed:

```text
/usr/lib/rpmrebuild/rpmrebuild.sh:Error:(RpmBuild) Package 'filesystem-3.16-3.oe1.aarch64' build failed.
/usr/lib/rpmrebuild/rpmrebuild.sh:Error: RpmBuild
```
The issue arises because the software package creates a directory in the **%pretrans -p** phase and modifies it in the **%ghost** phase. If you create a file or directory in this directory and use `rpmrebuild` to build the package, the created file or directory will be included in the package. However, 
 `rpmrebuild` cannot include these processes in the package because they are not files or directories, leading to the failure of the package rebuild.

The recommended solution is not to use ` rpmrebuild ` to rebuild the **filesystem** package.

### 19. An error is reported when `modprobe ` or `insmod` is executed with the `-f ` option. What can I do to resolve it?

The issue arises because the Linux kernel added support for compressed modules in version 5.17, but kmod doesn't fully support this. `modprobe` and `insmod` use the `finit_module()` system call to load uncompressed ko files. However, for compressed ko files, kmod uses the `init_module()` system call to decompress them. `init_module()` does not take the ignore check flag. As a result, `mod_verify_sig()` is always executed by the kernel. The `-f` option of `modprobe` and `insmod` changes verification information about the ko file, resulting in verification failure of `mod_verify_sig()`. To avoid this error, it is best to avoid using the `-f` option when loading compressed modules with `insmod` or `modprobe`.

### 20. What should I do if the related process does not recover after a hot upgrade?

1. Check whether the nvwa service is running. If the nvwa service is running, the service or process may fail to be recovered.
2. Run the `service nvwa status` command to view the nvwa logs. 
3. If the service fails to be started, check whether the service is enabled, and then run the `systemd` command to view the logs of the corresponding service. Additional logs are stored in the process or service folder named after the path specified by **criu_dir**. The **`dump.log`** file contains the logs generated when the running information is retained, and the **`restore.log`** file contains the logs generated for process recovery.

### 21. Why does the recovery fail, displaying the log message "Can't fork for 948: File exists"?

This error occurs because the program's PID is already in use during recovery. Currently, you need to manually restart the affected processes to resolve the issue.

### 22. When the nvwa command is used to save and recover a simple program (such as "hello world"), the system displays a message indicating that the operation fails or the program is not running. Why does this occur and how to resolve it?

This mainly because there are many restrictions on the use of CRIU. 

To solve this issue, check the nvwa logs. If the errors are related to CRIU, examine the ` dump.log`  or ` restore.log`  in the corresponding directory. For information on CRIU usage limitations, refer to the [CRIU Wiki](https://criu.org/What_cannot_be_checkpointed).

### 23. Why does the train command fail to train a model and the message "training data failed" is displayed?

When the train command is used for model training, if only one type of data is collected by running the collection command, this message is displayed. Therefore, you need to collect at least two types of data for retraining.

### 24. Why does `atune-adm` not have the access to the `atuned` service?

Here are three possible causes of the problem and their solutions:

1. Check whether the `atuned` service is started and verify the `atuned` listening address:

    ```shell
    # systemctl status atuned
    # netstat -nap | grep atuned
    ```
    If the `atuned` service is not started, run the following command to start the service:

    ```shell
    # systemctl start atuned
    ```

2. Ensure the firewall is not blocking the `atuned` listening port.

    Run the following commands on the `atuned` and `atune-adm` servers to allow the listening port to receive network packets. In     these commands, `60001` is the listening port number of the `atuned` server:

    ```shell
    # iptables -I INPUT -p tcp --dport 60001 -j ACCEPT
    # iptables -I INPUT -p tcp --sport 60001 -j ACCEPT
    ```

3. Verify that the HTTP proxy is not configured in the system, which can cause connection failures.

    You can run the following command to delete the HTTP proxy or disable the HTTP proxy for the listening IP address without     affecting services:

    ```shell
    # no_proxy=$no_proxy,Listening_IP_address
    ```

### 25. Why is the `atuned` service unable to start, resulting in the message "Job for atuned.service failed due to a timeout being exceeded"?

This issue occurs because the **hosts** file does not contain the **localhost** configuration. You can add **localhost** to the `127.0.0.1` line in the **`/etc/hosts`** file.

```
127.0.0.1 localhost localhost.localdomain localhost4 localhost4.localdomain4
```
<p style="margin-top:32px">

If the above FAQs cannot resolve your issue, please send an email to our [mailing lists](/en/community/mailing-list/) describing your issue or discuss it on the [openEuler Forum](https://forum.openeuler.org/).

</p>

</div>