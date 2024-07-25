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

## Virtualization

### 1. How do I prepare the environment and check the prerequisites for VM live migration?

Before performing a VM live migration, it is essential to prepare two PMs (source and destination) and check necessary conditions to ensure a smooth migration process. These checks include:

Permission check: ensures that the current user has permission to perform live migration.

Network check: verifies network connectivity between the source and destination PMs, ensuring they are in the same network segment.

Storage resource check: verifies that the source and destination PMs can access the same storage resources and ensure the destination PM has sufficient CPU, memory, and storage resources.

VM state check: confirms that the VM to be migrated is running.

Additionally, you need to set live migration parameters such as maximum downtime and bandwidth during migration as required. You also need to identify whether shared or non-shared storage is being used. If the storage mode is non-shared, you may need to perform additional operations such as using NFS to achieve shared storage.

### 2. What is VM live migration and how does it differ from cold migration?

Virtual machine (VM) live migration is a technology that enables the seamless migration of a running VM, including its in-memory and on-drive data, to another physical server without shutting down the VM. This process is transparent to users, meaning that there is no perceived service interruption or performance degradation. Live migration is typically used for hardware maintenance, upgrades, load balancing, and ensuring high availability of critical services.

In contrast, VM cold migration (also known as static migration) requires VM shutdown before migration. This means services on the VM are unavailable during the migration process. Cold migration is suitable for scenarios where downtime is acceptable, such as batch processing jobs or migrating non-critical services.

### 3. Why is the QEMU hot patch created with the libcareplus tool unable to be loaded?

This issue occurs because the QEMU version is inconsistent with the hot patch version. You can download the source code of the corresponding QEMU version and use the buildID to ensure that the environment for creating a hot patch matches the environment for creating a QEMU package. If you do not have the environment for making the QEMU version, you can compile and install the QEMU version and use the buildID of **`/usr/libexec/qemu-kvm`** in the self-compiled package.

### 4. Why is the hot patch made using the libcareplus tool loaded but not working?

Check whether the functions of the patch are infinite loop, non-exit, and recursive functions or initialization functions, inline functions, and short functions that are shorter than 5 bytes. These functions are within the constraints.

<p style="margin-top:32px">

If the above FAQs cannot resolve your issue, please send an email to our [mailing lists](/en/community/mailing-list/) describing your issue or discuss it on the [openEuler Forum](https://forum.openeuler.org/).

</p>

</div>