---
title: 'Brief Introduction to Edge Computing'
category: blog
date: 2022-08-10
tags:
    - edge computing
archives: 2020-08
author:
    - zihao
summary: Brief introduction to edge computing.
---

# Brief Introduction to Edge Computing

Edge computing is a new computing mode that works at the network edge. It processes data through downstream cloud services and upstream device applications. Edge computing allocates computing and storage resources to edge nodes, which are closer to users. The nodes analyze data from nearby users and upload only important information such as computing results to the cloud, greatly releasing server pressure.

The edge nodes have lots of real-time and complete data to be processed. As a data entry, edge computing can better adapt to frequent data interaction and deal with real-time, deterministic, and diversified data. Therefore, edge computing can solve problems like **high bandwidth loads** and **network latency**, and reduce **data management costs**.

## Composition of Edge Computing

Edge computing consists of three parts:

- Endpoint: collects data, directs data to edge nodes or cloud centers, and is responsible for environment awareness.

- Edge node: processes data in real time and makes decisions quickly. However, it is usually integrated on the endpoint.

- Cloud computing center: Theoretically, computing tasks should be distributed on edge nodes. However, due to factors such as costs and solutions, the cloud computing center is still the main place for global, non-real-time, and long-period big data processing and analysis tasks, and stores a large amount of data.

Data storage plays an important role in actual applications. Limited by performance, endpoints cannot store a large amount of data. It can only upload data to the cloud center nearby (involving remote transmission, data compression, network speed control, and on-demand triggering), while results of edge computing are permanently stored by the cloud computing center.

Due to tight budget, it is hard to deploy workloads on the cloud, edge, and device at the same time or in a timely manner. Take smart vehicles as an example:

1. Sensors on a vehicle collect data and send the data to the TBOX or domain controller (VDCM/BDCM) through the CAN bus and SOME/IP protocol.

2. The TBOX on the vehicle or the MCU in the domain controller receives and calculates the data, and sends it to the MPU. The MPU runs Linux or QNX and performs feature calculation based on *model-driven on-board edge computing*, the on-board signal storage stores the original and the aggregated signals. The signals are transmitted to the HMI and the cloud computing center of the host factory through the gateway.

3. Environment in the cloud computing center of the host factory serves either for production or algorithm development. In the production environment, the IoV platform collects uploaded signals and the battery monitoring platform obtains battery data in real time. The signals and data are input to the big data computing cluster for batch computing and real-time warning analysis on the cloud. The results are stored in the data lake and data warehouse.

4. The algorithm development environment uses an independent test data pool to copy signals from the data lake. The developed cloud algorithm uses the latest data for exploration and analysis, and the successfully developed model is sent to the vehicle for deployment.

Edge computing ensures data to be processed in a timely and secure manner, even without network connection.

## Use of openEuler in Edge Computing

Integrated by openEuler 21.09 Edge, the edge-cloud synergy framework KubeEdge can perform unified management and provisioning of edge-cloud applications. Take the edge computing platform empowered by Kunpeng and openEuler as an example. By analyzing and comparing license plate images and vehicle information read by RSUs on edge computing nodes and reporting exceptions in real time to toll stations, openEuler **helps remove provincial toll gates on highways**. By cooperation with State Grid Corporation of China, data extraction, transfer, aggregation, analysis, and application are also achieved, creating a flexible network, computing, and storage environment. By collecting, analyzing, and automatically processing operating data, it improves O&M efficiency, reduces operating costs, and carries **monitoring applications for edge substations in the power system**.

## Building an Edge-Cloud Synergy Cluster

To learn more, see the process of [Building a Cloud-Edge Collaborative Cluster Using KubeEdge and iSulad on openEuler – CSDN Blog](https://gitee.com/link?target=https%3A%2F%2Fblog.csdn.net%2Fweixin_41033724%2Farticle%2Fdetails%2F121312708). 

And see the official document for deployment: [Deployment Guide on KubeEdge (openeuler.org)](https://gitee.com/link?target=https%3A%2F%2Fdocs.openeuler.org%2Fzh%2Fdocs%2F21.09%2Fdocs%2FKubeEdge%2FKubeEdge%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97.html).

## Conclusion

Edge computing is one of 10 strategic technologies in the future. With the implementation of applications such as smart city, autonomous driving, and industrial Internet, massive amounts of data will be generated at the edge. IDC predicts that the amount of data generated each year in China in 2025 will reach 48.6 ZB. Centralized cloud computing cannot meet the requirements of frequent data interactions in terms of bandwidth loads, network latency, and data management costs. The value of edge computing is highlighted.

As a technology emerging in recent years, edge computing is gradually entering our lives. openEuler keeps pace with the era. With the benefit of combination with hardware, openEuler has been establishing itself in edge computing. **The monitoring applications of edge substations in the power system** and **the cancellation of provincial toll stations on national highways** make these technologies closer to us.

## References

- [Edge Computing: Development and Challenges (Zhihu.com)](https://zhuanlan.zhihu.com/?url=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F432773278)
- [Building a Cloud-Edge Collaborative Cluster Using KubeEdge and iSulad on openEuler – CSDN Blog](https://gitee.com/link?target=https%3A%2F%2Fblog.csdn.net%2Fweixin_41033724%2Farticle%2Fdetails%2F121312708)
- [Kunpeng + openEuler Software and  Hardware Collaborative Edge Computing Platform – Edge Computing Consortium (ecconsortium.org)](http://www.ecconsortium.org/Lists/show/id/515.html)
- [openEuler-White Paper-2109.pdf](https://www.openeuler.org/whitepaper/openEuler-whitepaper-2109.pdf)