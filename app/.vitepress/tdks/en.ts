const tdks: {
  [path: string]: { title: string; description: string; keywords?: string };
} = {
  'en/showcase': {
    title: 'Success Stories',
    description:
      'Success stories and case studies of projects launched with openEuler.',
    keywords: 'success stories, case studies, open source, Linux os',
  },
  'en/showcase/technical-white-paper': {
    title: 'Technical White Papers',
    description:
      'Explore the key features and advancements of each openEuler realease.',
    keywords: 'white paper, Linux os, digital infrastructure, open source',
  },
  'en/learn/mooc': {
    title: 'MOOCs',
    description:
      'Dive into no-cost tutorials and hands-on projects to learn everything from the basics to advanced features of openEuler.',
    keywords: 'tutorial, hands-on, basics, feature, Linux os',
  },
  'en/migration': {
    title: 'Migrate to openEuler',
    description:
      "Discover seamless OS migration with openEuler and elevate your system's performance and security.",
    keywords: 'OS migration, Linux os, open source, centos',
  },
  'en/migration/background': {
    title: 'Why Migrate to openEuler',
    description:
      'Discover why openEuler is a must-try alternative Linux distro.',
    keywords: 'OS migration, Linux os, open source, centos',
  },
  'en/migration/advantage': {
    title: 'Advantages of x2openEuler | Migration Tool',
    description:
      'Find out what makes x2openEuler a great choice for migrating your OS to openEuler.',
    keywords: 'OS migration, Linux os, open source, centos',
  },
  'en/migration/guidance': {
    title: 'Guidelines for Migrating to openEuler',
    description:
      'Effortlessly migrate to openEuler with our comprehensive solutions, enhancing system efficiency, security, and performance',
    keywords: 'OS migration, Linux os, open source, centos',
  },
  'en/migration/download': {
    title: 'Download x2openEuler for Easy Migration',
    description:
      'Get the x2openEuler migration tool to perform in-place upgrade of OSs in batches.',
    keywords: 'OS migration, Linux os, open source, centos',
  },
  'en/migration/user-cases': {
    title: 'Migration Best Practices',
    description:
      'Discover real cases and best practices for migrating to openEuler in big data, storage, virtualization, container, and database scenarios.',
    keywords: 'best practices, OS migration, Linux os, centos',
  },
  'en/migration/transplantation-cases': {
    title: 'Software Porting Guides',
    description:
      'Find essential openEuler porting guides for MySQL, Apache, Nginx, and more to ensure seamless deployment and compatibility.',
    keywords: 'porting guide, OS migration, Linux os, centos',
  },
  'en/migration/contribution': {
    title: 'Share Your OS Migration Story',
    description:
      'Help others by sharing your openEuler migration experiences. Contribute best practices, follow our guides, and make migration smoother for everyone.',
    keywords: 'OS migration, porting, Linux os, centos',
  },
  'en/migration/faq': {
    title: 'Migration FAQs',
    description:
      'Get answers to common questions about migrating to openEuler, including upgrade tutorials, VM support, hardware compatibility tests, and more.',
    keywords: 'FAQ, OS migration, Linux os, centos',
  },
  'en/migration/contact': {
    title: 'Get Support for Migration',
    description:
      'Get support for migration issues, connect with our community on Discord, and access video tutorials on YouTube for openEuler.',
    keywords: 'OS migration, Linux os, open source, centos',
  },
  'en/compatibility': {
    title: 'Certified Hardware & Software | Compatibility',
    description:
      'Check hardware and software compatibility with openEuler. Explore servers, cards, and software certified for different openEuler OS versions.',
    keywords: 'compatibility, hardware, software, Linux os',
  },
  'en/compatibility/hardware': {
    title: 'Hardware Compatibility Test',
    description:
      "Test your hardware's compatibility with openEuler and get ready for seamless integration.",
    keywords: 'hardware, compatibility, integration, Linux os',
  },
  'en/security/security-bulletins': {
    title: 'CVEs | Security',
    description:
      'Get the latest CVE details and security patches. Stay protected with the openEuler vulnerability bulletin.',
    keywords: 'security advisories, CVE, vulnerability, Linux os, open source',
  },
  'en/security/vulnerability-reporting': {
    title: 'Vulnerability Management',
    description:
      'Check how openEuler protects your OS from threats with robust vulnerability management.',
    keywords: 'vulnerability, CVE, Linux os, open source',
  },
  'en/security/certificate-center': {
    title: 'Public Keys & Certificates',
    description:
      'Access the essential public key and certificate to secure your OS.',
    keywords: 'public key, certificate, Linux os, open source',
  },
  'en/security/bug-bulletins': {
    title: 'Latest Bugs',
    description:
      'Track the latest software bugs in openEuler. Visit our bug bulletin for up-to-date issue reports and fixes.',
    keywords: 'bug, Linux os, advisory, open source',
  },
  'en/security/management': {
    title: 'Bug Management',
    description:
      'Get to know how openEuler handles bugs promptly for quick resolution.',
    keywords: 'bug reporting, Linux os, open source',
  },
  'en/interaction/news-list': {
    title: 'News',
    description:
      'Catch up with the latest developments, releases, and community updates from openEuler.',
    keywords: 'update, Linux os, news, open source, monthly bulletin',
  },
  'en/interaction/blog-list': {
    title: 'Blogs',
    description:
      'Gain in-depth knowledge and fresh perspectives on openEuler through our insightful blogs.',
    keywords: 'blogs, insight, Linux os, open source',
  },
  'en/interaction/event-list': {
    title: 'Annual Events & Releases',
    description:
      "Stay informed with openEuler's community calendar. Explore key events, conferences, and release schedules for the year, and never miss any update.",
    keywords:
      'open source event, developer event, open source conference, open source summit, meetup',
  },
  'en/interaction/event-list/latest': {
    title: 'Event Replays',
    description:
      'Catch up on openEuler events you missed. Access video replays and recordings of past community activities, all in one place.',
    keywords:
      'meetup, open source event, developer event, open source conference, open source summit',
  },
  'en/interaction/summit-list/sig-gathering-2024': {
    title: 'SIG Gathering 2024',
    description:
      "Join the excitement at openEuler's SIG Gathering 2024. Connect with developers, explore tech insights, and experience a vibrant community like no other.",
    keywords:
      'open source event, developer event, open source conference, open source summit, meetup',
  },
  'en/monthly-summary': {
    title: 'Monthly Newsletter',
    description:
      "Stay connected with openEuler's monthly newsletter. Get the latest updates, news, and insights from the community delivered straight to you each month.",
    keywords: 'monthly bulletin, update, news, insight, open source',
  },
  'en/community/mailing-list': {
    title: 'Mailing Lists',
    description:
      'Discuss and stay updated on Linux, cloud computing, and open source innovation through our mailing lists.',
    keywords: 'Linux, mailing list, cloud computing, open source, OS',
  },
  'en/#footer': {
    title: 'Social Media',
    description:
      'Follow us on social media for news, updates, and discussions on Linux, cloud computing, and open source innovation.',
    keywords: 'Linux, cloud, open source, social media, OS',
  },
  'en/community/contribution': {
    title: 'Contribute to openEuler',
    description:
      'Explore our infographic roadmap to see how you can get involved and make an impact in our community.',
    keywords: 'OS, Linux, contribute, open source, guide',
  },
  'en/community/contribution/detail.html': {
    title: 'Complete Guide for Contributing to openEuler',
    description:
      'Access detailed docs with step-by-step guidance on making meaningful contributions to our community.',
    keywords: 'OS, contribute, Linux, open source, community',
  },
  'en/sig/sig-list': {
    title: 'Special Interest Groups',
    description:
      "Discover openEuler's SIGs covering Linux, cloud, AI, and more. Collaborate on diverse projects with SIG members.",
    keywords: 'OS, SIG, Linux, open source community, cloud',
  },
  'en/sig/sig-detail': {
    title: 'SIG Details',
    description:
      'Explore key information about SIGs, including maintainers, meeting schedules, repositories, contribution stats, and mailing lists for effective collaboration',
    keywords: 'openEuler, SIGs, mailing lists, maintainers, repositories',
  },
  'en/sig/sig-guidance': {
    title: 'Set up a SIG',
    description:
      'Learn how to establish a SIG within openEuler. Follow our guide to start your own SIG and drive innovation in key technology areas.',
    keywords: 'OS, SIG, Linux, open source, contribute',
  },
  'en/sig/role-description': {
    title: 'Community Roles',
    description:
      'Learn about the different roles within the openEuler community - contributor, committer, and maintainer.',
    keywords: 'OS, Linux, open source community, contributor, maintainer',
  },
  'en/community/organization': {
    title: 'Governance Structure',
    description:
      "Explore the openEuler community's organizational structure, committees, and code of conduct.",
    keywords: 'OS, Linux, leadership, committee, open source community',
  },
  'en/community/member': {
    title: 'Members',
    description:
      'Discover the companies and organizations actively contributing code and shaping the future of openEuler.',
    keywords: 'OS, Linux, open source community, cloud, edge computing',
  },
  'en/community/program': {
    title: 'Call for X Program',
    description:
      "Contribute to openEuler's Call for X Program. Share ideas, collaborate, and innovate digital infrastructure. ",
    keywords: 'OS, Linux, cloud, open source software, AI',
  },
  'en/community/program/join-oEVP': {
    title: '"Call for openEuler Valuable Professionals',
    description:
      'Meet the openEuler Valuable Professionals, experts contributing significantly to the openEuler community.',
    keywords: 'Linux, cloud computing, open source, valuable professional',
  },
  'en/community/program/technical-tutorial': {
    title: 'Call for Tutorials',
    description:
      'Share your expertise with openEuler! Contribute tutorials and help us build a richer resource base for our community.',
    keywords: 'Linux, open source, cloud native, tutorials',
  },
  'en/other/projects/atune': {
    title: 'A-Tune - AI-Powered Performance Tuning',
    description:
      'A-Tune leverages AI for dynamic service optimization and resource configuration.',
    keywords: 'OS, AI, performance, Linux, cloud',
  },
  'en/other/projects/bishengjdk': {
    title: 'BiSheng JDK - JDK for Enterprise Performance',
    description:
      'BiSheng JDK delivers enhanced performance and stability for cloud, edge, and enterprise applications.',
    keywords: 'JDK, Java, open source, Linux, compiler',
  },
  'en/other/projects/isula': {
    title: 'iSula - Lightweight Container Engine',
    description:
      'Experience the power of iSula, a lightweight container engine built for enhanced efficiency and security on openEuler.',
    keywords: 'container, OS, Linux, cloud, virtualization',
  },
  'en/other/projects/secgear': {
    title: 'secGear - Confidential Computing Dev Kit',
    description:
      'secGear offers a unified framework for simplified development of secure apps across various architectures.',
    keywords: 'confidential computing, Intel, Arm, open source project, OS',
  },
  'en/other/projects/stratovirt': {
    title: 'StratoVirt - Enterprise Virtualization Platform',
    description:
      'StratoVirt is a lightweight, secure, open source virtualization platform. Learn more about its features & benefits.',
    keywords:
      'open source software, virtualization, cloud, virtual machine, open source software',
  },
  'en/download/get-os': {
    title: 'How to Get openEuler OS',
    description:
      'Learn how to access openEuler OS. Find details on downloading ISO and container images for server, cloud, or edge setups.',
    keywords: 'OS, download, Linux, cloud, container',
  },
  'en/download/?version=openEuler%2024.03%20LTS': {
    title: 'Download Community Edition',
    description:
      'Download the latest openEuler community edition. Find the perfect Linux distro for your deployments.',
    keywords: 'OS, Linux, cloud, open source software, server Linux',
  },
  'en/download/commercial-release': {
    title: 'Download Commercial Edition',
    description:
      'Get the openEuler commercial editions. Download ISOs, find supported architectures, and explore vendor options.',
    keywords: 'OS, Linux, commercial, cloud, server Linux',
  },
  'en/download/archive': {
    title: 'Historical Version Downloads',
    description:
      'Download previous openEuler versions. Find archived ISO, cloud, and container images, and more for your preferred architecture.',
    keywords: 'OS, download, Linux, cloud, container',
  },
  'en/mirror/list': {
    title: 'Mirrors',
    description:
      'Find fast and reliable openEuler repository mirrors worldwide. Download everything you need to install & run openEuler.',
    keywords: 'OS, download, mirror, Linux, ISO',
  },
  'en/other/brand': {
    title: 'Brand Resources',
    description:
      'Download openEuler logos and access brand guidelines. Get the resources you need to use and represent our open source OS.',
    keywords: 'OS, logo, trademark, brand, open source software',
  },
  'en/other/privacy': {
    title: 'Privacy Policy',
    description:
      'Learn how openEuler collects, uses, and protects your data. We are committed to user privacy and transparency.',
    keywords: 'OS, Linux, open source software, privacy',
  },
  'en/other/legal': {
    title: '"Legal Notice',
    description:
      'View the legal notice and disclaimer for openEuler, the open source OS for various scenarios.',
    keywords: 'OS, Linux, legal notice, open source software, license',
  },
  'en/other/lifecycle': {
    title: 'Version Lifecycles',
    description:
      'Understand the version lifecycles of openEuler, featuring innovation versions and long-term support (LTS) releases.',
    keywords: 'OS, Linux, LTS, lifecycle, open source software, cloud',
  },
  'en/blog/Dingziwei/dzw/DingZiwei.html': {
    title: 'Ding Ziwei: My openEuler Journey | Developer Story',
    description:
      'Discover the journey with openEuler of our developers – Ding Ziwei, Maintainer of the openEuler Compliance SIG.',
    keywords: 'openEuler, open source, community',
  },
  'en/blog/G11N-SIG/20240513-eulercopilot/Let%20EulerCopilot%20Ride%20Shotgun%20Along%20Your%20openEuler%20Journey.html':
    {
      title: 'Let EulerCopilot Guide Your openEuler Journey',
      description:
        'AI-assisted EulerCopilot leverages LLMs to offer capabilities that revolutionize your management of the openEuler environment.',
      keywords: 'EulerCopilot, LLM, OS',
    },
  'en/blog/G11N-SIG/20240412-SysCare/SysCare—openEuler%20Secret%20Weapon%20for%20Live%20Patching.html':
    {
      title: 'SysCare, Secret Weapon for Live Patching',
      description:
        'SysCare is a system-level hotfix software that provides security patches and hot fixes for operating systems.',
      keywords: 'SysCare, operating systems, security patches, live patching',
    },
  'en/blog/2024.0411-ltf/LTF.html': {
    title: 'Kylinsec Linux Test Framework',
    description:
      'Linux Test Framework (LTF) is an automatic test framework developed by the Kylinsec automation team for testing Linux distributions. ',
    keywords: 'Linux test framework, LTF, Linux distributions, Kylinsec',
  },
  'en/blog/cve-3094.html': {
    title: 'xz Vulnerability (CVE-2024-3094) Analysis',
    description:
      'Explore our detailed analysis of the xz vulnerability with malicious backdoors in XZ Utils 5.6.0 and 5.6.1.',
    keywords: 'xz, backdoors, SSH authentication',
  },
  'en/blog/20240320-risc-v/openEuler%20RISC-V-based%20Robot%20Car%20Debuted%20at%20the%20XuanTie%20Conference.html':
    {
      title: 'openEuler RISC-V-based Robot Car',
      description:
        'RISC-V MicroROS, a ROS robot car solution, made it debut at the 2024 XuanTie RISC-V Partner Conference.',
      keywords: 'RISC-V, ROS, robot car, XuanTie',
    },
  'en/blog/20240306-lkvs/20240306-lkvs.html': {
    title: 'Linux Kernel Validation Suite',
    description:
      'Linux Kernel Validation Suite (LKVS), developed by Intel and open-sourced in openEuler, is suitable for diverse development and validation scenarios.',
    keywords: 'Linux kernel, validation suite, LKVS, Intel',
  },
  'en/blog/20240306vmware/20240306vmware.html': {
    title: 'Easy Setup of openEuler Using VMware',
    description:
      'Describe how to use VMware and how to install openEuler OS using VMware.',
    keywords: 'Vmware, openEuler OS, CentOS',
  },
  'en/blog/G11N-SIG/20240312-CPU-isolation/CPU%20Isolation%20by%20openEuler.html':
    {
      title: 'CPU Isolation by openEuler',
      description:
        'Discover how openEuler leverage CPU isolation to reduce OS jitter.',
      keywords: 'CPU isolation, OS jitter, isolcpus, cgroups',
    },
  'en/blog/G11N-SIG/20240223-safeguard-your-os/Safeguard%20Your%20OS.html': {
    title: 'Safeguard Your OS',
    description:
      'Ensure comprehensive OS protection with safeguard, an open source project using eBPF for auditing and security.',
    keywords: 'OS, eBPF, Linux',
  },
  'en/blog/20240122-gala/20240122-gala.html': {
    title: 'Cloud Native Observability for openEuler',
    description:
      'Explore cloud native observability insights and practices in the openEuler community based on the eBPF technology.',
    keywords: 'cloud native, observability, eBPF',
  },
  'en/blog/G11N-SIG/20240116-memory-management/20240116-memory-management.html':
    {
      title: 'Generalized Memory Management',
      description:
        'Generalized Memory Management (GMEM) provides a centralized management mechanism for heterogeneous memory connections.',
      keywords: 'generalized memory management, GMEM, memory connections',
    },
  'en/blog/20240111-sec/20240111-sec.html': {
    title: 'Securing Data with SecGear and QingTian Enclave',
    description:
      'Discover how to use the confidential computing development suite secGear and QingTian Enclave to ensure data security.',
    keywords:
      'confidential computing, QingTian Enclave, Huawei Cloud, data security',
  },
  'en/blog/20240111-blog1/20240111-blog1.html': {
    title: "HiSilicon's innovation in A² MCU and MPU",
    description:
      'HiSilicon A² MCU and MPU now support openEuler, offering a new solution for home appliances, energy, industry, and automobile fields.',
    keywords: 'HiSilicon, MCU, A² MCU, MPU',
  },
  'en/blog/20231226-MICA/MICA%20Facilitates%20Mixed-Criticality%20Deployments.html':
    {
      title: 'MICA Facilitates Mixed-Criticality Deployments',
      description:
        'MICA is a SoC framework supporting mixed-criticality deployment of real-time/non-real-time or secure/non-secure OSs.',
      keywords: 'mixed-criticality, MICA, SoC framework, OSs',
    },
  'en/blog/ftboy/20231221-SqlServerMigration.html': {
    title: 'Migrating SQL Server to openEuler',
    description: 'Discover how to migrate SQL Server 2019 to openEuler.',
    keywords: 'SQL Server, migration, openEuler',
  },
  'en/blog/20231205-ziyuan/20231205-ziyuan.html': {
    title: 'Introduction to PAWS',
    description:
      'Performance Aware System (PAWS) is developed to improve resource utilization and ensure the QoS while addressing issues caused by interference.',
    keywords:
      'PAWS, performance aware system, CPU utilization, resource allocation',
  },
  'en/blog/20231127-iSulad/20231127-iSulad.html': {
    title: 'Leveraging WASM by iSulad and Kuasar',
    description:
      'Explore how iSulad and Kuasar leverage WebAssembly (WASM) sandboxes.',
    keywords: 'container engine, Kuasar, WASM, sandboxes',
  },
  'en/blog/20231120-agith/20231120-agith.html': {
    title: 'Agith: openEuler O&M Change Observation Tool',
    description:
      'OSMind team developed Agith, an eBPF-based tool that identifies changes in openEuler O&M.',
    keywords: 'OSMind, Agith, eBPF, O&M',
  },
  'en/blog/G11N-SIG/20231113-sysMaster/sysMaster%20Is%20openEuler%20New%20Implementation%20of%20PID%201.html':
    {
      title: 'sysMaster: New Implementation of PID 1',
      description:
        "Introducing openEuler's sysMaster, a collection of service management programs that provides an innovative implementation of PID 1.",
      keywords: 'SysMaster, PID 1, init process, service management',
    },
  'en/blog/G11N-SIG/20231113-openGemini/openGemini%20Time%20Series%20Database.html':
    {
      title: 'openGemini Time Series Database',
      description:
        'openGemini is an MPP database capable of managing hundreds of millions of timelines accurate to nanoseconds.',
      keywords:
        'openGemini, massively parallel processing, MPP, time series databases',
    },
  'en/blog/20231101-KconfigDetector/KconfigDetector%20Helps%20Check%20Value%20Errors%20in%20Kernel%20Configurations.html':
    {
      title: 'KconfigDetector: Catch Value Errors with Ease',
      description:
        'Introducing KconfigDetector, a tool that automaticallt detects value errors in kernel configurations.',
      keywords: 'KconfigDetector, value errors, kernel configurations, Kconfig',
    },
  'en/blog/20231103-isulad/20231103-isulad.html': {
    title: 'Simplied Sandbox API Call',
    description:
      'Sandbox API connects iSulad, Kuasar, and StratoVirt to form a fast, lightweight, and secure container solution.',
    keywords: 'sandbox API, container, container engine, call chain',
  },
  'en/blog/20231103-dpu/20231103-dpu.html': {
    title: 'openEuler-Based DPU-OS',
    description:
      'Explore how openEuler’s DPU-OS boosts performance with tailored, lightweight solutions for cloud and data centers.',
    keywords: 'data processing unit, DPU, acceleration, DPU operating system',
  },
  'en/blog/20231027-23.09/20231027-23.09.html': {
    title: 'One-Click Deployment of Secure Containers',
    description:
      'Hands-on guidance on deploying a ultra-fast, lightweight secure container solution of iSulad+Kuasar+StratoVirt. ',
    keywords: 'one-click deployment, secure containers, container runtime',
  },
  'en/blog/20231020-HPC/20231020-HPC.html': {
    title: 'Cloud HPC Chooses openEuler as Default OS',
    description:
      'Cloud HPC, powered by openEuler, delivers a stable, scalable, and user-friendly HPC solution available on major cloud platforms.',
    keywords: 'Cloud HPC, openEuler OS, HPC',
  },
  'en/blog/20231019-WSL-package/Exploring%20openEuler%20on%20Windows%20with%20the%20WSL%20Package.html':
    {
      title: 'Run openEuler on Windows with the WSL Package',
      description:
        'Install openEuler on Windows via WSL, enjoy native features, updates, and a smooth cross-OS experience.',
      keywords:
        'Windows subsystem for Linux, WSL package, Windows, Linux distribution',
    },
  'en/blog/20231019-NFS/Multipathing%20NFS%20for%20High%20Performance%20and%20Reliability.html':
    {
      title: 'Multipathing NFS for High Reliability',
      description:
        'NFS multipathing ensures multiple links between the client and the server are connected, supporting I/O transmission.',
      keywords: 'network file system, NFS, I/O transmission, multipathing',
    },
  'en/blog/20231020-EulerPublisher/20231020-EulerPublisher.html': {
    title: 'EulerPublisher: A Toolchain for Cloud Native',
    description:
      'Introducing EulerPublisher, a toolchain for automatically building, testing, and releasing openEuler images.',
    keywords: 'cloud native, openEuler images, toolchain, ISO images',
  },
  'en/blog/20231020-nestos/20231020-nestos.html': {
    title: 'Dual-Mode, Cloud-based NestOS',
    description:
      "Explore openEuler's NestOS: a dual-mode, cloud-based OS optimized for containers and virtualization, ensuring robust performance and security.",
    keywords: 'NestOS, dual-mode, containerization, virtualization, base OS',
  },
  'en/blog/20231009-CANTIAN.html': {
    title: 'Cantian Engine for Distributed Database Storage',
    description:
      'Cantian engine, middleware with a decoupled storage and compute architecture, enables distributed database storage.',
    keywords:
      'Cantian engine, middleware, decoupled storage and compute, distributed database storage',
  },
  'en/blog/phoebe/2023-09-26-Run-openEuler-RISC-V-On-Qemu.html': {
    title: 'Boot openEuler for RISC-V in the QEMU Environment',
    description:
      'Discover how to boot openEuler for RISC-V under the QEMU environment.',
    keywords: 'RISC-V, QEMU, quick emulator',
  },
  'en/blog/znzjugod/2023-09-26-Use-LLM-On-openEuler.html': {
    title: 'openEuler Support for LLMs',
    description: 'Discover how to install and develop a LLM on openEuler',
    keywords: 'LLMs, large language model, AI models, human languages',
  },
  'en/blog/20230925-fangtian/20230925-fangtian.html': {
    title: 'FangTian Window Engine for Multi-Window Display',
    description:
      'Explore the FangTian window engine: advanced management with multi-device support, offering full-screen, split-screen, freeform, and PiP modes.',
    keywords: 'window engine, window management, multi-window display',
  },
  'en/blog/zengchen1024/use-dnf-with-metalink.html': {
    title: 'Metalink: Speed Up DNF Package Installation',
    description:
      'Discover how to use metalink to speed up DNF software package installation and compare metalink with baseurl.',
    keywords: 'metalink, DNF, software package installation, baseurl',
  },
  'en/blog/20230922-sysMaster/20230922-sysMaster.html': {
    title: 'Updates in sysMaster v0.5.0',
    description:
      'Discover sysMaster 0.5.0 with new devmaster for device management, VM support, and improved scalability, now integrated into openEuler 23.09.',
    keywords: 'SysMaster, device management, VM',
  },
  'en/blog/20230915-Cantian/20230915-Cantian.html': {
    title: 'openEuler Cantian Engine',
    description:
      'Cantian is middleware that enables a regular single-node database to achieve similar capabilities as Oracle RAC',
    keywords:
      'Cantian engine, middleware, Oracle RAC, database storage engines',
  },
  'en/blog/20230908-KubeOS/Schedule%20Container%20OS%20Upgrades%20Using%20KubeOS.html':
    {
      title: 'Schedule Container OS Upgrades Using KubeOS',
      description:
        'KubeOS works as a Kubernetes operator to schedule container OS upgrades and upgrade all container OSs collectively.',
      keywords: 'KubeOS, Kubernetes operator, OS upgrades, container OSs',
    },
  'en/blog/20230908-user-repo/openEuler%20User%20Repo%20Is%20Released.html': {
    title: 'openEuler User Repo Is Released',
    description:
      'The openEuler community has recently launched openEuler User Repo, a hosting platform for personal software packages.',
    keywords:
      'openEuler User Repo, hosting platform, personal software packages ',
  },
  'en/blog/20230908-omnidata/20230908-omnidata.html': {
    title: 'omnidata-hive-connector Big Data Service',
    description:
      'Introducing omnidata-hive-connector, a service that pushes operators of the big data component Hive to storage nodes for near-data computing.',
    keywords: 'big data, Hive, near-data computing',
  },
  'en/blog/20230908-EulerPublisher.html': {
    title: 'Periodic Updates of openEuler Container Images',
    description:
      'The openEuler basic container images can now receive regular updates.',
    keywords: 'container images, regular updates, WSL',
  },
  'en/blog/yushi-Icy/2023-08-20-introduce-to-rpm.html': {
    title: 'Basics About Software Packages (RPM/SPEC/DNF)',
    description: 'Dive into basics about RPM, SPEC, and DNF software packages.',
    keywords: 'RPM, SPEC, DNF, software packages',
  },
  'en/blog/20230818-AMIs/AMIs.html': {
    title: 'Many AMI Versions Available in AWS Marketplace',
    description:
      'openEuler is now providing multiple versions of Amazon Machine Images (AMIs) in AWS Marketplace.',
    keywords: 'Amazon machine images, AMIs, AWS regions',
  },
  'en/blog/20230818-secGear/Getting%20to%20Know%20Confidential%20Computing%20with%20secGear.html':
    {
      title: 'Get to Know Confidential Computing with secGear',
      description:
        'secGear is a unified confidential computing framework for openEuler. It uses TEEs to protect data in use.',
      keywords: 'confidential computing, trusted execution environment, TEEs',
    },
  'en/blog/20230818-gala-ops/Enable%20Full-Stack%20Performance%20Monitoring%20with%20gala-ops%20Flame%20Graph.html':
    {
      title: 'gala-ops Flame Graphs for Full-Stack Monitoring',
      description:
        'Discover how to enable full-stack performance monitoring with gala-ops flame graph.',
      keywords: 'flame graphs, performance monitoring, Aops',
    },
  'en/blog/20230818-BLAS/20230818-BLAS.html': {
    title: 'VectorBLAS: A Java-Based Vectorized BLAS Library',
    description:
      'VectorBLAS is a high-performance library that implements vectorized BLAS using the Java programming language.',
    keywords: 'VectorBLAS, BLAS, basic linear algebra subprograms, Java',
  },
  'en/blog/20230810-ros/Robot%20Operating%20System.html': {
    title: 'Robot Operating System',
    description:
      'openEuler 22.03 LTS SP1 has the Robot Operating System (ROS) inside to help you build robot applications.',
    keywords: 'robot operating system, ROS,  robot applications',
  },
  'en/blog/20230811-yidong/20230811-yidong.html': {
    title: 'OS Rebuild Practices and Cross-OS ECS Migration',
    description:
      "Discover how China Mobile Cloud's Tianyuan OS and Yixing tool ensure seamless CentOS migration with cross-OS virtualization.",
    keywords: 'cloud OS, ECS migration, live migration',
  },
  'en/blog/20230811-NKD/20230811-NKD.html': {
    title: 'NKD: An O&M Tool for Cloud Container Clusters',
    description:
      'Short for NestOS-Kubernetes-Deployer, NKD is a solution for the O&M of Kubernetes clusters deployed on NestOS.',
    keywords: 'Kubernetes, NestOS, NKD',
  },
  'en/blog/waaagh/waaagh/groups_supported_in_EUR.html': {
    title: 'Software Package Management by SIGs in EUR',
    description:
      "Learn how openEuler's updated EUR empowers SIG members to create and manage software packages.",
    keywords: 'software package, SIG, EUR group',
  },
  'en/blog/20230731-container-problem-detection-system/Harden%20Your%20Container%20Clusters%20with%20the%20Container%20Problem%20Detection%20System.html':
    {
      title: 'Harden Container Clusters with CPDS',
      description:
        'Learn how the Container Problem Detection System (CPDS) improves container management by detecting faults in services, OSs, and apps.',
      keywords: 'container clusters, OSs, container problem detection system',
    },
  'en/blog/20230728-metalink/20230728-metalink.html': {
    title: '20x Faster Software Download with Metalink',
    description:
      'Metalink accelerates software download from openEuler repositories by more than 20 times.',
    keywords: 'metalink, software download, openEuler repositories',
  },
  'en/blog/20230728-FangTian/20230728-FangTian.html': {
    title: 'Quick Understanding of FangTian Engine',
    description:
      'Dive into basics about the FangTian Engine, including its display service and modules for graphics drawing and composition.',
    keywords: 'FangTian Engine, graphics drawing, display service',
  },
  'en/blog/G11N-SIG/20230725-Bioconductor/Bridging%20the%20Gap%20Arm64%20Compatibility%20and%20BioConductor%20on%20openEuler.html':
    {
      title: 'BioConductor’s compatibility with Arm64 on openEuler',
      description:
        'Discover how Martin Grigorov and Jiang Yikun enabled BioConductor’s compatibility with Arm64 on openEuler.',
      keywords: 'BioConductor, Arm64 architecture, bioinformatics',
    },
  'en/blog/20230811-waaagh/openEuler-DE-in-WSL.html': {
    title: 'Run a Desktop Environment on openEuler WSL',
    description:
      'Run openEuler on Windows with WSL, enhance with EUR, and set up GNOME desktop via xrdp for a seamless Linux experience.',
    keywords: 'WSL, development environment, Windows',
  },
  'en/blog/G11N-SIG/20230721-BiSheng-JDK/Dynamic%20CDS%20of%20BiSheng%20JDK%208%20Enables%20Dynamic%20Archiving%20of%20Classes%20in%20openEuler.html':
    {
      title: 'Dynamic CDS for Dynamic Archiving of Classes',
      description:
        'Dynamic Class-Data Sharing (CDS) of BiSheng JDK 8 enables dynamic archiving of classes in openEuler.',
      keywords: 'BiSheng JDK, class-data sharing, CDS, dynamic archiving',
    },
  'en/blog/G11N-SIG/20230721-WasmEngine/openEuler%20Supports%20WasmEngine%20for%20Sandboxed%20Function%20Management.html':
    {
      title: 'WasmEngine for Sandboxed Function Management',
      description:
        'openEuler provides WasmEngine based on the WebAssembly sandbox isolation model to isolate functions in WASM sandboxes.',
      keywords: 'WasmEngine, WebAssembly, sandbox isolation',
    },
  'en/blog/wanghaosq/patch2pr_guide.html': {
    title: 'Submitting a Patch PR Through the Mailing List',
    description: 'Learn how to submit a patch PR through the mailing list.',
    keywords: 'patch PR, pull request, mailing list',
  },
  'en/blog/20230630-newcomer/0630-newcomer.html': {
    title: 'Begin Your Journey into openEuler',
    description: 'Follow the steps and kickstart your openEuler journey!',
    keywords: 'issue, PR, contributions, CLA',
  },
  'en/blog/G11N-SIG/20230630-cpu-preemption/CPU%20Preemption%20in%20openEuler.html':
    {
      title: 'CPU Preemption in openEuler',
      description:
        'For hybrid deployment of online/offline services, openEuler provides CPU preemption to improve resource utilization. ',
      keywords: 'CPU preemption, hybrid deployment, resource utilization',
    },
  'en/blog/G11N-SIG/20230630-memory-tiering/Memory%20Tiering%20in%20openEuler.html':
    {
      title: 'Memory Tiering in openEuler',
      description:
        'Explore how memory tiering in openEuler classifies memory with different priorities and reliabilities.',
      keywords: 'memory tiering, host memory buffer,  address range mirror',
    },
  'en/blog/20230630-RocketMQ/20230630-RocketMQ.html': {
    title: 'RocketMQ: Enhance Stability for Message Queues',
    description:
      'RocketMQ on openEuler is a stability solution that deploys message queue middleware on openEuler in container mode.',
    keywords:
      'RocketMQ, stability solution, message queue middleware, container',
  },
  'en/blog/G11N-SIG/20230615-StratoVirt/Why%20StratoVirt%20Instead%20of%20QEMU.html':
    {
      title: 'Why StratoVirt Instead of QEMU',
      description:
        'Explore why StratoVirt, rather than QEMU, is used as the virtualization platform in openEuler. ',
      keywords: 'StratoVirt, QEMU, virtualization platform',
    },
  'en/blog/G11N-SIG/20230615-embedded/openEuler%20Embedded%20--%20Towards%20Multi-Scenario%20Embedded%20Platforms.html':
    {
      title: 'openEuler Embedded: Multi-Scenario Platform',
      description:
        'Discover how openEuler Embedded transforms into a high-quality Linux-centric platform for diverse embedded scenarios.',
      keywords:
        'openEuler Embedded, Linux distribution, embedded, multi-scenario',
    },
  'en/blog/G11N-SIG/20230605-Rancher%20and%20openEuler%20%E2%80%93%20Move%20into%20the%20Future%20with%20AWS%20AMIs/Rancher%20and%20openEuler%20%E2%80%93%20Move%20into%20the%20Future%20with%20AWS%20AMIs.html':
    {
      title: 'Rancher: Move into the Future with AWS AMIs',
      description:
        'Learn how to combine openEuler with AWS cloud services and run cloud-init to start the Rancher RKE2 cluster.',
      keywords: 'Rancher, AMI, cloud-init',
    },
  'en/blog/G11N-SIG/20230605-openEuler%20Embedded%20for%20Multi-OS%20Hybrid%20Deployment/openEuler%20Embedded%20for%20Multi-OS%20Hybrid%20Deployment.html':
    {
      title: 'openEuler Embedded: Multi-OS Hybrid Deployment',
      description:
        'Experience multi-OS hybrid deployment, OS isolation & protection, and mixed-criticality scheduling with openEuler Embedded. ',
      keywords: 'multi-OS,  hybrid deployment, mixed-criticality scheduling',
    },
  'en/blog/20230602-Arm/20230602-Arm.html': {
    title: 'Arm NN Adapts to openEuler Embedded',
    description:
      'Arm Neural Network (Arm NN) has been adapted to openEuler Embedded to speed up high-performance neural network inference.',
    keywords:
      'Arm NN, Arm neural network, neural network inference, openEuler Embedded',
  },
  'en/blog/20230530-OrbStack/Orbstack%E6%94%AF%E6%8C%81openEuler%E5%8F%91%E8%A1%8C%E7%89%88.html':
    {
      title: 'OrbStack Supports openEuler Distributions',
      description:
        'OrbStack, a lightweight virtual machine platform for Mac, supports the openEuler distributions. ',
      keywords: 'OrbStack, virtual machine, openEuler distributions',
    },
  'en/blog/20230529-zhongyi/20230529-zhongyi.html': {
    title: 'China Mobile’s Successful OS Migration to openEuler',
    description:
      'China Mobile Online swiftly migrated 1,050 call platform systems from CentOS to openEuler in just 6 hours. ',
    keywords: 'China Mobile, CentOS, OS migration',
  },
  'en/blog/G11N-SIG/20230527-openEuler%20in%20Edge-Cloud%20Synergy/openEuler%20in%20Edge-Cloud%20Synergy.html':
    {
      title: 'openEuler in Edge-Cloud Synergy',
      description:
        'Explore how openEuler 22.09 leverages the KubeEdge+ framework for seamless edge-cloud synergy.',
      keywords: 'edge computing, central cloud computing, edge-cloud synergy ',
    },
  'en/blog/G11N-SIG/20230527-Open%20the%20Door%20to%20openEuler/Open%20the%20Door%20to%20openEuler.html':
    {
      title: 'Open the Door to openEuler',
      description: 'Dive into basics of openEuler and its key features.',
      keywords: 'open source OS, openEuler, Linux kernel',
    },
  'en/blog/20230529-Musl/20230529-Musl.html': {
    title: 'Adapting musl libc for openEuler Embedded',
    description:
      "Discover how openEuler Embedded's adaptation of musl libc improves performance on Raspberry Pi 4.",
    keywords: 'musl libc, glibc library, ecosystem development',
  },
  'en/blog/20230519-EUR/20230519-EUR.html': {
    title: 'Introduction to new projects in EUR',
    description:
      'Explore new projects in openEuler User Repo (EUR): i3 window manager & tide command prompt tool.',
    keywords: 'EUR, openEuler, OS, projects',
  },
  'en/blog/20230519-infrastructure/20230519-infrastructure.html': {
    title: 'Open Source Promotion Plan 2023',
    description:
      'Join the worldwide college students at Open Source Promotion Plan (OSPP) 2023 and boost open source development by real-world cases.',
    keywords: 'open source, SIG, promotion',
  },
  'en/blog/20230506-riscv/riscv.html': {
    title: 'openEuler RISC-V Is Compatible with LicheePi 4A',
    description:
      'The RISC-V SIG has successfully made openEuler RISC-V compatible with the LicheePi 4A development board. ',
    keywords: 'RISC-V, SIG, LicheePi 4A, development board',
  },
  'en/blog/20230428-syscare/20230428-syscare.html': {
    title: 'SysCare: Safeguarding Your Operating System',
    description:
      "Let's explore SysCare, a unified hot patch service for Linux distributions, launched by the openEuler community.",
    keywords: 'SysCare, hot patch, Linux distributions',
  },
  'en/blog/20230428-NFS/20230428-NFS.html': {
    title: 'New Release of the openEuler NFS+ Protocol',
    description:
      'The NFS+ protocol improves reliability of single-client access to NAS storage by 3 times, and performance by 6 times.',
    keywords: 'NFS+, single-client access, NAS storage',
  },
  'en/blog/20230428-rust/20230428-rust.html': {
    title: 'Rust-Shyper: Embedded Hypervisor Built with Rust',
    description:
      'Rust-Shyper is an embedded type-1 hypervisor built with Rust for embedded scenarios with unmanned vehicles and robots.',
    keywords: 'hypervisor, Rust, type-1, Rust-Shyper',
  },
  'en/blog/20230428-isulad/20230428-isulad.html': {
    title: 'iSulad + Kuasar: Container Runtime Solution',
    description:
      'iSulad + Kuasar is a next-generation container runtime solution, reducing management-plane resource consumption by 99%.',
    keywords:
      'container runtime, resource consumption, cloud computing, container engines',
  },
  'en/blog/20230428-K3s/20230428-K3s.html': {
    title: 'K3s Arm64 Cluster Management',
    description:
      'Explore how to create an elastic K3s cluster in an Arm64 environment, and enhance its service capabilities.',
    keywords: 'K3s cluster, ARM64, cluster management',
  },
  'en/blog/20230325-ZVM/20230325-ZVM.html': {
    title: 'Zephyr-based Virtual Machine',
    description:
      'Explore the Zephyr-based virtual machine, virtualization software developed from Zephyr, a real-time operating system.',
    keywords: 'Zephyr, virtual machine, ZVM, real-time operating system, RTOS',
  },
  'en/blog/20230320-Aops/20230320-Aops.html': {
    title: 'Online App Performance Diagnosis with A-Ops',
    description:
      'Learn how to diagnose performance issues in database apps with real-time fault injection examples.',
    keywords: 'A-Ops, performance diagnosis, database',
  },
  'en/blog/20230303-RISC-V/20230303-RISC-V.html': {
    title: 'Recap of openEuler X CNRV RISC-V Meetup in Wuhan',
    description:
      "Join the RISC-V Meetup recap: Discover openEuler's latest RISC-V progress, hear from industry experts, and connect with developers.",
    keywords: 'RISC-V, openEuler community, CNRV, Wuhan, meetup',
  },
  'en/blog/20230303-member/20230303-member.html': {
    title: 'User Groups Are Recruiting in 12 Cities!',
    description:
      'Join the openEuler city user groups to connect with local users, share insights, and enhance your digital transformation journey.',
    keywords: 'user group, openEuler community, recruitment',
  },
  'en/blog/20230303-kechongfu/20230303-kechongfu.html': {
    title: 'Reproducible Builds Secure Software Supply Chain',
    description:
      'Explore how reproducible builds, a set of software development practices, secure the software supply chain.',
    keywords: 'reproducible builds, supply chain, security',
  },
  'en/blog/20230224-A-Ops/20230224-A-Ops.html': {
    title: 'A-Ops Flame Graphs for Performance Diagnosis',
    description:
      'Discover how to quickly locate system/application performance issues using A-Ops flame graphs.',
    keywords: 'A-Ops, flame graphs, performance diagnosis',
  },
  'en/blog/waaagh/waaagh/openEuler-user-repo-intro.html': {
    title: 'Introduction to User Software Repository',
    description:
      'Basics about what EUR is, why it is used, the types of EUR needed, its capabilities, and its intended audience.',
    keywords: 'openEuler User Repo, EUR, software package, software repository',
  },
  'en/blog/waaagh/waaagh/openEuler-user-repo-howto.html': {
    title: 'How to Use the openEuler User Repository',
    description:
      'Learn how to use the openEuler user repository for building and managing software packages.',
    keywords: 'user repository, basic concepts, openEuler',
  },
  'en/blog/RabeLi/SeqKit2.2.0/SeqKit-2.2.0-migrate.html': {
    title: 'Porting SeqKit-2.2.0 to openEuler',
    description:
      'Detailed instructions to seamlessly port SeqKit-2.2.0 to openEuler.',
    keywords: 'SeqKit, openEuler, porting',
  },
  'en/blog/RabeLi/Autodockvina/AutoDockvina-1.2.3-migrate.html': {
    title: 'Porting AutoDock Vina 1.2.3 to openEuler',
    description:
      'Detailed instructions to seamlessly port AutoDock Vina 1.2.3 to openEuler.',
    keywords: 'AutoDock Vina, openEuler, porting',
  },
  'en/blog/20230213-rancher/20230210-rancher.html': {
    title: 'Avoid Container Rebuilding Due to containerd Bugs',
    description:
      'Learn how to prevent container rebuilding triggered by containerd issues.',
    keywords: 'containerd, container rebuilding, containerd runtime',
  },
  'en/blog/20230208-Etcd-openEuler-porting-guide/etcd-3.76%20Porting%20Guide%20(openEuler%2022.03%20LTS).html':
    {
      title: 'Porting etcd-3.76 to openEuler',
      description:
        'Detailed instructions to seamlessly port etcd-3.76 to openEuler.',
      keywords: 'etcd, openEuler, porting',
    },
  'en/blog/20230206-RocksDB-openEuler%E7%A7%BB%E6%A4%8D%E6%A1%88%E4%BE%8B/20230206-RocksDB-openEuler%E7%A7%BB%E6%A4%8D%E6%A1%88%E4%BE%8B/RocksDB%206.10.2%20%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97(openEuler%2022.03%20LTS).html':
    {
      title: 'Porting RocksDB 6.10.2 to openEuler',
      description:
        'Detailed instructions to seamlessly port RocksDB 6.10.2 to openEuler.',
      keywords: 'RocksDB, openEuler, porting',
    },
  'en/blog/20230118-ziyuan/ziyuan.html': {
    title: 'OpenStack Scheduling for VM Hybrid Deployment',
    description:
      'Discover hybrid VM deployment in OpenStack Nova with openEuler. Optimize node resource use by prioritizing VMs, ensuring QoS for high-priority tasks.',
    keywords: 'VM, hybrid deployment, OpenStack,  scheduling, compute node',
  },
  'en/blog/20230118-xiasenlin/xiasenlin.html': {
    title: 'Xia Senlin: My openEuler Journey | Developer Story',
    description:
      'Meet Xia Senlin, one of the openEuler Star winners, as he shares his involvement in and contributions to the openEuler community.',
    keywords: 'interview, openEuler community, contributor story',
  },
  'en/blog/20230118-liufushou/liufushou.html': {
    title: 'Liu Fushou: My openEuler Journey | Developer Story',
    description:
      'Meet Liu Fushou, one of the openEuler Star winners, as he shares his learning and work in the openEuler community.',
    keywords: 'interview, openEuler community, contributor story',
  },
  'en/blog/20230113-segear/secGear.html': {
    title: 'Get to Know Confidential Computing with secGear',
    description:
      'Discover the basics of the secGear confidential computing framework and its application scenarios.',
    keywords: 'confidential computing, TEE, REE, data protection',
  },
  'en/blog/20230113-%E8%B5%84%E6%BA%90/ZIYUAN5.html': {
    title: 'VM Hybrid Deployment and Power Consumption Mgmt.',
    description:
      'Discover the basic concepts of power consumption and technical details of power consumption mgmt. in VM hybrid deployment.',
    keywords: 'power consumption, hybrid deployment, VM, resource utilization ',
  },
  'en/blog/20230113-RISC/RISC.html': {
    title: 'Firefox on openEuler RISC-V Boosts Performance',
    description:
      'Enabling JIT in the new Firefox version boosts JavaScript performance up to 40x, making it the fastest Firefox yet.',
    keywords: 'RISC-V, JavaScript, Firefox, JIT',
  },
  'en/blog/2023-1-6-Rancher/Rancher.html': {
    title: 'Official General Availability of Rancher RFO',
    description:
      'Introducing Rancher for openEuler (RFO), a secure, Kubernetes-based platform tailored for the openEuler ecosystem.',
    keywords: 'Rancher, availability, Kubernetes distribution',
  },
  'en/blog/2022-12-16-eBPF/ebpf.html': {
    title: 'openEuler Calls for eBPF Release Standards',
    description:
      'openEuler calls for eBPF software release standards to facilitate promotion of eBPF in more industries and scenarios.',
    keywords: 'eBPF, cloud native, sandbox',
  },
  'en/blog/2022-12-16-CPDS/CPDS.html': {
    title: 'Open Source Project: CPDS',
    description:
      'Discover the CPDS, an open-source project by Linx Software on openEuler, designed to detect and diagnose top container faults.',
    keywords: 'container, open source project, openEuler community',
  },
  'en/blog/viikei/park-migrate.html': {
    title: 'iSoftStone Assists a Campus with CentOS Migration',
    description:
      'With openEuler DevKit, iSoftStone helped a campus replace all server hardware, OSs, and upper-layer service software.',
    keywords: 'OSs, campus, migration',
  },
  'en/blog/2022-11-25-cla/CLA%E7%AD%BE%E7%BD%B2%E6%B5%81%E7%A8%8B.html': {
    title: 'A Guide to Signing the openEuler Corporation CLA',
    description:
      "Here's a comprehensive guide on how to sign the openEuler corporation CLA, with step-by-step instructions and tips.",
    keywords: 'CLA, corporation CLA, openEuler community',
  },
  'en/blog/wanghaosq/merge_method_guide.html': {
    title: 'Instructions on Merging PRs to a Repository',
    description:
      'Provide guidelines for merging pull requests into an openEuler repository.',
    keywords: 'pull requests, PRs, repository',
  },
  'en/blog/2022-11-12-06/06.html': {
    title: 'Xu Yanqi: My openEuler Journey | Developer Story',
    description:
      'Meet Xu Yanqi, one of the openEuler Star winners, as he shares his involvement in and contributions to the openEuler community.',
    keywords: 'interview, openEuler community, contributor story',
  },
  'en/blog/georgecao/QuickIssue.html': {
    title: 'Introduction to the QuickIssue Service',
    description:
      'The QuickIssue service commits to provide users and developers with a convenient way to submit issues. ',
    keywords: 'issues, pull requests, PRs, openEuler community',
  },
  'en/blog/2011-11-12-01/01.html': {
    title: 'Chen Guokai: My openEuler Journey | Developer Story',
    description:
      'Meet Chen Guokai, one of the openEuler Star winners, as he shares his involvement in and contributions to the openEuler community.',
    keywords: 'interview, openEuler community, contributor story',
  },
  'en/blog/2022-11-12-02/02.html': {
    title: 'Automatic OpenStack Deployment Through opensd',
    description:
      'opensd, a tool for seamless OpenStack deployment on openEuler, automates configurations for complex cloud environments with Ansible-based precision.',
    keywords: 'OpenStack, deployment, opensd',
  },
  'en/blog/2022-11-12-04/04.html': {
    title: 'openEuler SIG Role Division and Management',
    description:
      'Introduce what a SIG is, the roles of its members, the role permissions, and the management of SIG members.',
    keywords: 'SIG, roles, role permissions',
  },
  'en/blog/2022-11-12-RFO/RFO.html': {
    title: 'Guide to openEuler AWS AMI Building',
    description: 'Describe how to create an openEuler AWS AMI.',
    keywords: 'AMI, image, Amazon machine image',
  },
  'en/blog/2022-10-20-NestOS/NestOS.html': {
    title: 'Release of NestOS Built on openEuler 22.09',
    description:
      'Key features of NestOS, a cloud-based OS built on openEuler 22.09.',
    keywords: 'Kylinsoft, NestOS, openEuler community, rpm-ostree',
  },
  'en/blog/2022-11-12-03/03.html': {
    title:
      'KylinSec and openEuler to Implement Digital Converter Station Pilot Projects | openEuler',
    description:
      "KylinSec + openEuler support safe operations of the first batch of State Grid's digital converter station pilot projects.",
    keywords: 'safe operations, digital converter station, electrical grid',
  },
  'en/community/certification-services': {
    title: 'Certification',
    description:
      "Discover openEuler's certification options to boost your career and enhance your skills within the community.",
    keywords: 'certification, openEuler, community',
  },
  'en/community/conduct': {
    title: 'Code of Conduct',
    description:
      'Explore the openEuler Code of Conduct to foster respect and collaboration for an enjoyable community experience.',
    keywords: 'code of conduct, community, open source, openEuler',
  },
  'en/community/certification-services/search.html': {
    title: 'Query Result | Certification',
    description:
      'Easily query your certification results to track your progress and achievements within the openEuler ecosystem.',
    keywords: 'certification, openEuler, career',
  },
  'en/compatibility/software': {
    title: 'Software Compatibility',
    description:
      "Enhance your project's efficiency by exploring compatibility options for software within the openEuler ecosystem.",
  },
  'en/download/archive/detail': {
    title: 'Download Archived Release',
    description:
      'Uncover a selection of openEuler releases to elevate your projects and interests.',
    keywords: 'download, archived, releases, openEuler',
  },
  'en/faq': {
    title: 'FAQs',
    description: 'Get answers to frequently asked questions about openEuler.',
    keywords: 'frequently asked questions, openEuler, FAQ',
  },
  'en/faq/application-development': {
    title: 'Application Development | FAQs',
    description:
      'Get answers to frequently asked questions regarding application development on openEuler.',
    keywords:
      'application development, FAQ, openEuler, frequently asked questions',
  },
  'en/download': {
    title: 'Download Community Release',
    description:
      'Download the latest openEuler community release. Find the next go-to Linux distro for your deployments.',
    keywords: 'download, community, release, Linux distro, openEuler',
  },
  'en/faq/migration': {
    title: 'Migrate to openEuler | FAQs',
    description:
      'Get answers to frequently asked questions about migrating to openEuler.',
    keywords:
      'migrating, migration, openEuler, FAQ, frequently asked questions',
  },
  'en/faq/cloud-native': {
    title: 'Cloud Native | FAQs',
    description:
      'Get answers to frequently asked questions related to cloud native on openEuler.',
    keywords: 'cloud native, openEuler, FAQ, frequently asked questions',
  },
  'en/faq/system-management': {
    title: 'System Management | FAQs',
    description:
      'Get answers to frequently asked questions about system management on openEuler.',
    keywords: 'openEuler, system management, FAQ, Linux',
  },
  en: {
    title: 'openEuler | OS for Digit Infrastructure',
    description:
      'An open source OS run by the OpenAtom Foundation that builds a global community to enhance digital infrastructure and support diverse architectures.',
    keywords: 'openEuler, community, projects, developments, resources',
  },
  'en/faq/virtualization': {
    title: 'Virtulization | FAQs',
    description:
      'Get answers to frequently asked questions about virtualization on openEuler.',
    keywords: 'Virtualization, migration, openEuler, FAQ, Linux',
  },
  'en/interaction/post-blog/blog_example/20220901-sample-post.html': {
    title: 'Blog Formatting Template',
    description:
      'Explore our blog formatting template, specifically designed to ensure clear and effective content presentation for your readers.',
    keywords: 'openEuler, blog, template, sample, formatting',
  },
  'en/interaction/post-blog': {
    title: 'Instructions to Post a Blog',
    description:
      'Learn the step-by-step process of posting a blog, from drafting your content to publishing and promoting it.',
    keywords: 'openEuler, blog, post, instructions',
  },
  'en/interaction/summit-list/summit2023': {
    title: 'openEuler Summit 2023',
    description:
      'Discover emerging OS technologies at openEuler Summit 2023, where AI intersects with digital intelligence innovation.',
    keywords: 'OS, openEuler, open source, summit, AI',
  },
  'en/interaction/summit-list/summit2024': {
    title: 'openEuler Summit 2024',
    description:
      'Discover the future of OS innovation and AI at openEuler Summit 2024. Connect with industry pioneers.',
    keywords: 'OS, openEuler, open source, summit, AI',
  },
  'en/migration/download/characteristic-description-3.0.0': {
    title: 'x2openEuler Feature Updates | Migration Tool',
    description:
      'Find out about the new features, enhancements, and resolved issues in x2openEuler.',
    keywords:
      'x2openEuler, new features, enhancements, resolved issues, openEuler',
  },
  'en/migration/download/patch_description-3.0.0': {
    title: 'x2openEuler Patches | Migration Tool',
    description: 'Download and install the patches for x2openEuler.',
    keywords: 'x2openEuler, openEuler, patch, patch download',
  },
  'en/other/cookies': {
    title: 'Cookies',
    description:
      'openEuler respects your privacy. Read more about how we collect information about your use of our websites.',
    keywords: 'cookies, openEuler, privacy, data, Linux, operating system',
  },
  'en/other/search': {
    title: 'Search',
    description:
      'Effortlessly discover information, resources, and updates related to openEuler to stay informed and engaged.',
    keywords: 'search, information, resources, updates, openEuler',
  },
  'en/security/cve': {
    title: 'CVEs | Security',
    description:
      'The list of Common Vulnerabilities and Exposures (CVEs) relevant to openEuler, helping you stay updated on security issues.',
    keywords: 'openEuler, CVE, security',
  },
  'en/security/cve/detail': {
    title: 'CVE Details | Security',
    description:
      'Stay informed about CVEs impacting openEuler. Access in-depth information to safeguard your projects.',
    keywords: 'CVEs, security, openEuler',
  },
  'en/security/security-bulletins/detail': {
    title: 'Security Advisory Details',
    description:
      'Get detailed information on the security advisories for openEuler.',
    keywords: 'openEuler, security, bulletin format',
  },
  'en/wiki/about/introduce': {
    title: 'About openEuler | Wiki',
    description:
      'Explore the basics of openEuler, an open source OS for digital infrastructure with a vibrant community-driven ecosystem.',
    keywords: 'openEuler basics, openEuler, open source, OS',
  },
  'en/wiki/contribution': {
    title: 'Community Contribution | Wiki',
    description:
      'Learn how to contribute to openEuler through code, content, and community collaboration. Enhance your open source skills.',
    keywords: 'open source, openEuler, contribution, OS, community',
  },
  'en/wiki/install/cloud': {
    title: 'Master openEuler on Clouds | Wiki',
    description:
      'Learn to get openEuler images on AWS, Azure, and more with ease.',
    keywords: 'Linux, cloud, image, openEuler, installation',
  },
  'en/wiki/about/quick-start': {
    title: 'openEuler Community Resources | Wiki',
    description:
      'Access a plethora of resources about openEuler, from download to community engagement.',
    keywords: 'openEuler, Linux, OS, source code, software packages',
  },
  'en/wiki/install/virtualization': {
    title: 'openEuler Virtual Machine Setup | Wiki',
    description: 'Learn to set up openEuler in a virtualized environment.',
    keywords: 'Linux, openEuler, virtualization, virtual machine, installation',
  },
  'en/wiki/install/image': {
    title: 'Container Deployment with openEuler | Wiki',
    description:
      'Deploy containers on openEuler for efficient cloud solutions.',
    keywords: 'openEuler, Linux, container, cloud, deploy',
  },
  'en/wiki/install/wsl': {
    title: 'Use openEuler on WSL | Wiki',
    description:
      'Discover how to set up openEuler on WSL, connect via remote desktop, and utilize user-contributed packages.',
    keywords: 'openEuler, WSL, Linux, Windows, operating system',
  },
};

export default tdks;
