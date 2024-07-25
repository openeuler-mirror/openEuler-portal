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

## Migration

### 1. What guidelines and resources can I refer to during migration?

You can refer to the following resources to help you migrate to openEuler:

- [openEuler Migration page](https://www.openeuler.org/en/migration/)
- [x2openEuler Usage Guide](https://docs.openeuler.org/en/docs/20.03_LTS_SP1/docs/x2openEuler/Introduce.html)
- [x2openEuler tool download](https://repo.oepkgs.net/openEuler/rpm/openEuler-22.03-LTS/contrib/x2openEuler/noarch/Packages/)
- [x2openEuler source](https://forum.openeuler.org/t/topic/768)
- x2openEuler migration demo: [Watch here](https://youtu.be/tk7wlg9-Y3g?si=QDIq5e9m2z53gIHd)

### 2. Why does openEuler have less available memory than CentOS even when the amount of allocated physical memory is the same?

The difference in available memory is due to the difference in the amount of memory allocated for the crashkernel (memory area used during kernel crashes). For instance, with 4 GB of physical memory:

- CentOS: 3.7 GB available (161 MB reserved for crashkernel)
- openEuler: 3.3 GB available (512 MB reserved for crashkernel)

To match CentOS's memory availability, you can reduce openEuler's crashkernel reservation to 256 MB in the GRUB configuration file (/boot/grub2/grub.cfg).

### 3. What do I do if software packages cannot be parsed by macros during migration?

This issue often occurs during the migration from CentOS or Fedora to other systems and is caused by different operating systems having different macro definitions.

There are two solutions to this issue:

1. Query the specific meaning of the macros and replace them in the SPEC file with their expanded values.
2. Introduce the software packages that provide the macro definitions into the corresponding repository and add them to **BuildRequires**. This allows the software packages that fail to run to be parsed by macros.

### 4. Why is hardware compatibility testing necessary during the migration from CentOS to openEuler?

Migrating from CentOS to openEuler involves not only changing the OS but also replacing, adapting, migrating, and re-building the application software and service systems running on the OS. Ensuring hardware compatibility is essential to guarantee system stability and service continuity during the migration and to prevent application failures or performance degradation afterward. Therefore, hardware compatibility testing is a key part of OS migration.

### 5. How to migrate SQL Server data from Windows to openEuler?

To migrate SQL Server data from Windows to openEuler, follow these steps:

1. Back up the SQL Server database on Windows. You can use SQL Server Management Studio (SSMS) or SQL statements to perform the backup.
2. Once the backup is complete, transfer the backup file to openEuler using the SCP command or any other relevant method.
3. Create a new backup directory on openEuler and move the backup file into this directory.
4. Use the sqlcmd utility to execute SQL statements for restoring the database. If the database includes auxiliary files, make sure to add the **MOVE** option for these files in the **RESTORE DATABASE** statement.
5. Finally, verify the success of the data migration by listing all databases.

### 6. What should I do before migrating from CentOS to openEuler?

Before migrating from CentOS to openEuler, it is important to:

1. Verify if existing software can run on openEuler. This includes checking for compatibility of software installations and functionalities.
2. Ensure that hardware components are compatible with openEuler.
3. Evaluate if existing configurations can be seamlessly transferred to openEuler.
Additionally, during the migration, it is important to perform necessary data backups due to potential impacts on live-network services. You are recommended to follow a detailed migration plan, ideally with support from specialized personnel or the operating system vendor.

### 7. What can x2openEuler migration tool do and how is it used for migration assessment?

The x2openEuler migration tool provided by the openEuler community is primarily used for migration assessment and has the following functions:

1. Software assessment: It assesses various applications (such as RPM, TAR, ZIP, GZIP, JAR, PY, PYC, SH, BIN, etc.) by scanning the dependent software package list and generates assessment reports in HTML format.
2. Configuration collection and assessment: It supports the collection of user environment data and generates JSON files. This includes hardware configurations, configuration interfaces, kernel option configurations, system configurations (**sysctl**, **proc**, and **sys**), environment variables, services, processes, ports, command interfaces, system call items, and device driver interfaces. Then, it completes configuration analysis and assessment.
3. Hardware assessment: It evaluates the compatibility of the server and boards (such as RAID, NIC, FC, IB, GPU, SSD, TPM, etc.) with openEuler's compatibility list.
These functions help you identify potential compatibility issues before migration to ensure a smooth migration process.

### 8. How do I prepare the environment and check the prerequisites for VM live migration?

Before performing a VM live migration, it is essential to prepare two PMs (source and destination) and check necessary conditions to ensure a smooth migration process. These checks include:

Permission check: ensures that the current user has permission to perform live migration.

Network check: verifies network connectivity between the source and destination PMs, ensuring they are in the same network segment.

Storage resource check: verifies that the source and destination PMs can access the same storage resources and ensures that the destination PM has sufficient CPU, memory, and storage resources.

VM state check: confirms that the VM to be migrated is running.

Additionally, you need to set live migration parameters such as maximum downtime and bandwidth during migration as required. You also need to identify whether shared or non-shared storage is being used. If the storage mode is non-shared, you may need to perform additional operations such as using NFS to achieve shared storage.

### 9. What is VM live migration and how does it differ from cold migration?

Virtual machine (VM) live migration is a technology that enables the seamless migration of a running VM, including its in-memory and on-drive data, to another physical server without shutting down the VM. This process is transparent to users, meaning that there is no perceived service interruption or performance degradation. Live migration is typically used for hardware maintenance, upgrades, load balancing, and ensuring high availability of critical services.

In contrast, VM cold migration (also known as static migration) requires VM shutdown before migration. This means services on the VM are unavailable during the migration process. Cold migration is suitable for scenarios where downtime is acceptable, such as batch processing jobs or migrating non-critical services.

<p style="margin-top:32px">

If the above FAQs cannot resolve your issue, please send an email to our [mailing lists](/en/community/mailing-list/) describing your issue or discuss it on the [openEuler Forum](https://forum.openeuler.org/).

</p>

</div>