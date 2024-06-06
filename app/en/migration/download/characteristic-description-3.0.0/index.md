---
title: Feature Description
titleTemplate: openEuler official website
category: migration
---


## 3.0.0-1230 Features

- ### New Features
    1. Supported the English GUI.
2. Optimized the upgrade process of solution 2.
    3. Added the SSH timeout duration configuration during the upgrade.
4. Deleted duplicate check items (whether the core package is installed) and irrelevant check items (Python environment check) from the environment check.
    5. Optimized the prompts of some check items.
6. Improved the webpage loading speed.
    7. Minimized log permissions.


- ### Resolved Issues
    1. Certificates that have expired or are about to expire can be uploaded.

    2. Log files and x2openEuler files on the node to be upgraded cannot be cleared after the environment is cleaned up.

    3. The SSH connection fails due to the incorrect format of the ifcfg-eth file after the upgrade.

    4. CentOS 6.4 fails to be upgraded.

    5. The backup command fails to be executed.

    6. Software packages are  not removed under specific conditions.

    7. The login can be refreshed when the initial password is not changed or the password expires in special cases.

    8. The server certificate cannot be viewed on the webpage under certain conditions.

    9. The rollback consistency check cannot be performed after it is interrupted.

    10. The environment fails to be cleaned up after the upgrade is successful.

    11. The time statistics in some phases of the upgrade task are inaccurate.

    12. Some soft links are  not removed after x2openEuler is uninstalled.


## 3.0.0-930 Features

- ### New Features
    1. Added the general OS upgrade solution that allows you to select solution 2 in the advanced options.
    
    2. Supported the upgrade from CentOS 6 to openEuler in solution 2. (Place the **x2openEule-upgrade-for6** software package in the **/etc/x2openEuler/rpms** directory on the WebServer node.)
    
    3. Supported the upgrade from openEuler 20.03 to openEuler 22.03.
    
    4. Added the summary page for viewing the status and distribution of all nodes.
    
    5. Supported retry during the upgrade to enable you to retry the upgrade after manually rectifying the fault.
    
    6. Added a search bar to the pre-upgrade check report to facilitate search.
    
    7. Supported IPv6 nodes to be upgraded.
    
    8. Added pre-upgrade check items, environment check items, and environment inspection items.



- ### Resolved Issues
    1. The post-processing script conflicts with the pre-processing script in an imported table.

    2. The built-in Python of the system cannot be used due to libpath conflicts.
    
    3. Modified some entries to facilitate reading and fault locating.


## 3.0.0-630 Features

- ### New Features
    1. Supported 1,000 concurrent nodes.

    2. Changed the x2openEuler backend database from SQLite to MariaDB, and added MariaDB initialization to the initialization script.

    3. Modified the pre-upgrade check scheme of x2openEuler to improve the pre-upgrade check accuracy.

    4. Added user-defined check items to the pre-upgrade check to enable users to customize check items as required.

    5. Supported the configuration file migration policy to be selected for specific RPM packages during the pre-upgrade check.

    6. Added check items to ensure smooth node upgrade.

    7. Added the software package analysis task to support independent software package analysis by incorporating Visual Studio Code-related functions.

    8. Supported version update using scripts.



- ### Resolved Issues
    1. During batch import, the GUI does not respond when data is imported for multiple times.

    2. Assigned the importing status to a node during file migration.

    3. Added an error message after a delay of 0.5s when the uploaded file fails to be verified.

    4. Changed the length of the host name field in the database to 256 characters.

    5. Added the timeout interval for collecting file system information. The default value is 300s.

    6. Added excluded directories that are not collected during rollback consistency collection.

    7. The rollback is not a fake rollback when the upgrade fails and the system is not restarted.

    8. An error is reported when the owner of a common user file is different from the common user name during remote connection.

    9. Added verification for the space for downloading RPM packages during the pre-upgrade check.

    10. Fixed CVEs of the used open source software.

    11. Separated logs of each node to facilitate fault locating.

    12. Added the total size of backup files to the GUI.

    13. Moved dependency package installation to the environment check so that it can be completed before the upgrade check.

    14. Specific file drivers mounted in the fstab file are not inserted to initramfs when the rollback startup item is generated.

    15. lsattr scanning on soft links fails.

    16. Added lsattr scanning to the pre-upgrade check.

    17. The password prompt is in lowercase during SSH connection.

    18. The software package assessment report contains English characters.

    19. Merged the **x2openEuler-client** and **x2openEuler-upgrade** packages.

    20. Made the sizes of the pre- and post-processing script packages and the number of files configurable.

    21. The network is interrupted for retry when the upgrade is abnormal due to the modification of the SSH return value.

    22. Enabled you to add custom software for the software conflict check.

    23. The rollback button is occasionally not displayed on the upgrade details page.

    24. Verified the SHA256 values of all RPM packages during the pre-upgrade check.

    25. Tasks are deleted in batches together with nodes after nodes are filtered.

    26. Implemented lazy loading in the XLSX library and installed the webpack-bundle-analyzer plug-in.

    27. A loading error occurs occasionally in the report after the upgrade.

    28. Deleted **-e** from the pre- and post-processing scripts.

    29. Displayed the failure cause when a software package fails to be uploaded.

    30. Duplicate configuration policy data exists after being filtered.

    31. Logs cannot be downloaded when the node alias is in Chinese.

    32. Enabled you to set the public key-free authentication for SSH connection during the initialization phase.

    33. **createrepo** fails to be executed after user environment variables are modified.

    34. Added the **Upgrade** button to the pre-upgrade check progress after a successful rollback.

    35. The dialog box for exporting an HTML report cannot be displayed again after you click the close button in the upper right corner.

    36. The write permission assignment error is not recorded in the log file.

    37. Ignored the warning displayed during yum-utils installation.

    38. Added the IP address, port number, actor name, and task thread ID to the print information of task scheduling.

    39. The data in the exported HTML report is not changed when the assessed package is changed.

    40. A task exception occasionally occurs when a task is modified or deleted.

    41. Optimized page polling and added software package assessment filtering for task management.

    42. Deleted extra packages after software conflict data is collected.

    43. The dependency relationship **is_uncompatible** is incorrectly displayed.

    44. Cleared the uploaded files when the browser is closed, and added the login failure processing to the software package upload component.

    45. Deleted the route cache and **noarch** architecture option, and rectified the error reported for the configuration file upgrade policy.

    46. Added the **hostname_length** configuration item and adjusted the SSH window size.

    47. The database cannot be read or written when no operation is performed for a long time.

    48. The rollback does not take effect after the post-processing script is executed.

    49. Added conflict detection for the **conflict** and **provide** software packages conflict after the upgrade.

    50. The configuration report search is suspended.


## 3.0.0-330 Features

- ### New Features

    1. Enabled x2openEuler to support migration from Red Hat 7 to openEuler 20.03 and openEuler 22.03, and from Red Hat 8 to openEuler 22.03.

    2. Added the rollback consistency check function to x2openEuler to check the files that are different before the upgrade and after the rollback.

    3. Added the upgrade integrity check to x2openEuler to compare the check results before and after the upgrade.

    4. Enabled x2openEuler to offload conflict analysis and compatibility analysis to the upgrade node, and changed the database usage during the upgrade. You need to place the database RPM package to the **/etc/x2openEuler/rpms/databases** directory on the server.

    5. Replaced the x2openEuler connectivity test with the upgrade check. The upgrade check procedure can be customized, and check items can be added or deleted.

    6. Added environment inspection to x2openEuler. After the upgrade is successful, inspection can be performed. The inspection procedure can be customized, and inspection items can be added or deleted.

    7. Added the function of forcibly deleting nodes to x2openEuler, so that a node can be forcibly deleted when it fails.

    8. Downloaded software packages before the upgrade.

- ### Resolved Issues

    1. The kernel package of the required version does not exist during the upgrade, so **rd.break** exists and the OS boots into emergency mode after the upgrade is complete.

    2. The SSH connection cannot be used after the NSS and NSPR software is uninstalled due to the conflict between them.

    3. A backup directory with multiple levels of subdirectories cannot be created recursively.

    4. The FAT file system driver is not loaded by default during the rollback after the upgrade to openEuler 22.03. As a result, the drive cannot be mounted and the rollback fails.

    5. No message is displayed when an invalid task name is entered.

    6. The repository is found residual occasionally during the environment check.

    7. rsync causes SSH to time out.

    8. Made the SSH timeout interval configurable. The default value is 600s.

    9. The system displays a message indicating that the password is incorrect when a non-root user logs in to the system during the upgrade retry.

    10. The pre-upgrade check fails because a common user exits due to timeout.

    11. Error message "No such file or directory" is displayed when the database does not exist.

    12. Resolved the allowlist query issue.

    13. The tool cannot be installed in openEuler 22.03.

    14. libpython cannot be found during the first upgrade check.

    15. The i686 package in the original system interferes with the pre-upgrade check.

    16. The server certificate does not take effect.

    17. Modified display text.

    18. The program breaks down due to abnormal input of the swap package.

    19. Added the check that **x2openEuler-core** cannot be installed on the node to be upgraded.

    20. Updated the hardware compatibility list.

    21. Fixed the issue that the default swap package cannot be replaced.

    22. Fixed the issue that there is no matching character during SSH matching.

    23. Added full-disk scanning before a rollback, and added a message for directories whose permissions cannot be modified to prevent rollback failures caused by files and directories whose permissions cannot be modified.

    24. An error is reported during Chinese decoding.

    25. The dependency of the RPM package path is missing.

    26. Improved the accuracy of the pre-upgrade check.

    27. Strengthened security.

    28. Added the timeout interval for remote command execution to prevent command suspension.

    29. Advanced **x2openEuler-upgrade** dependency installation.

    30. An error is reported when the retained package is empty but the service package is entered.

    31. The restart command does not take effect.

    32. Garbled characters are displayed in SSH transmission.

    33. Resolved the glibc-header conflict.

    34. The management page does not respond.

    35. Modified the rollback process to improve its robustness.

    36. The collection evaluation polling fails.

    37. Node names are not displayed on the upgrade page.
