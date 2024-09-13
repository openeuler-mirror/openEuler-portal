const tdks: {
  [path: string]: { title: string; description: string; keywords: string };
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
};

export default tdks;
