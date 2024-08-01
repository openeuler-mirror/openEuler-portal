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

## Application Development

### 1. Why does the self-compilation of some applications that depend on `java-devel` fail when the `rpmbuild` command is executed?

openEuler provides multiple versions of OpenJDK, such as OpenJDK 1.8.0 and OpenJDK 11, to support updated OpenJDK features and be compatible with Java applications. Certain applications require the `java-devel` package for compilation. However, installing the `java-devel` package may default to `java-11-openjdk`, causing compilation failures. To resolve this issue, execute the command below to install `java-1.8.0-openjdk` and then proceed with the **`rpmbuild`** command for self-compilation:

```shell
# yum install java-1.8.0-openjdk
# yum install java-1.8.0-openjdk-devel
```

<p style="margin-top:32px">

If the above FAQs cannot resolve your issue, please send an email to our [mailing lists](/en/community/mailing-list/) describing your issue or discuss it on the [openEuler Forum](https://forum.openeuler.org/).

</p>

</div>