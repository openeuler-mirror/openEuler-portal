---
title: 'secGear'
---

<MarkdownLayout>

![Banner](./assets/banner.jpg)

# secGear

## Confidential computing framework for developing secure applications

</MarkdownLayout>

<MarkdownLayout>

# Overview

## 

secGear is a confidential computing development suite used to develop secure applications in the computing industry. It aims to provide a unified development framework for different hardware devices, shielding the differences between underlying confidential computing architectures and APIs. Currently, secGear supports Intel® SGX hardware and Arm TrustZone (iTrustee supported).

secGear provides rich extensibility capabilities at both the middleware layer and service layer, allowing developers to easily call security components and even directly use the confidential computing services.

</MarkdownLayout>

<MarkdownLayout>

# Architecture

## 

As shown in the figure, secGear consists of three layers. Currently, only the base layer is open source. The service layer and middleware layer will be gradually brought to open source.

The service layer provides complete security services based on confidential computing. You can directly use related services to enjoy the security brought by confidential computing.

The middleware layer provides common security protocol components and various security function libraries. You can directly call related APIs on the secure and non-secure sides without creating them by yourself. Currently, PKCS11 and PAKE are being built.

The base layer provides rich enclave development APIs or tools, including code generation tools and enclave life cycle management APIs. POSIX APIs and standard OpenSSL APIs are supported on the secure side. You can develop secure applications based on these APIs.

![示意图](./assets/business.jpg)

</MarkdownLayout>

<MarkdownLayout>

# Documentation

## Overview

&nbsp;

[Read me](https://atomgit.com/openeuler/secGear/blob/master/docs/en/2403_LTS_SP2/introduction_to_secgear.md)

## Installation

&nbsp;

[Read me](https://atomgit.com/openeuler/secGear/blob/master/docs/en/2403_LTS_SP2/secgear_installation.md)

## Developer Guide

&nbsp;

[Read me](https://atomgit.com/openeuler/secGear/blob/master/docs/en/2403_LTS_SP2/developer_guide.md)

## Tools Use Document

&nbsp;

[Read me](https://atomgit.com/openeuler/secGear/blob/master/docs/en/2403_LTS_SP2/using_secgear_tools.md)

## API Reference

&nbsp;

[Read me](https://atomgit.com/openeuler/secGear/blob/master/docs/en/2403_LTS_SP2/api_reference.md)

## Scenarios

&nbsp;

[Read me](https://atomgit.com/openeuler/secGear/blob/master/docs/en/2403_LTS_SP2/application_scenarios.md)

</MarkdownLayout>
