export default {
    zh: {
        template: [
            {
                title: '工具检测',
                lists: [
                    {
                        name: '核心包',
                        desc: '核心包一致性比例',
                        result: '通过'
                    },
                    {
                        name: '软件包',
                        desc: 'L1/L2 软件包一致性比例',
                        result: '通过'
                    },
                    {
                        name: '内核KABI接口',
                        desc: 'OSV内核KABI接口白名单与openEuler内核KABI接口白名单一致性比例',
                        result: '通过'
                    },
                    {
                        name: '用户态ABI接口',
                        desc: 'OSV软件包ABI接口与openEuler软件包ABI一致性比例',
                        result: '通过'
                    },
                    {
                        name: 'Service默认配置',
                        desc: 'OSV软件包Service文件与openEuler软件包Service文件一致性比例',
                        result: '通过'
                    },
                    {
                        name: '软件包默认配置',
                        desc: 'OSV软件包配置文件与openEuler软件包配置文件一致性比例',
                        result: '通过'
                    },
                    {
                        name: '内核特性配置',
                        desc: 'OSV的内核配置与openEuler一致性比例',
                        result: '通过'
                    },
                ]
            },
            {
                title: '平台验证',
                lists: [
                    {
                        name: '仓库',
                        desc: 'EPOL仓/软件所仓库在OSV版本上安装成功比例',
                        result: '通过'
                    },
                    {
                        name: '基本功能',
                        desc: '社区AT用例运行结果',
                        result: '通过'
                    },
                    {
                        name: '基础性能',
                        desc: '基础性能测试结果',
                        result: '通过'
                    },

                    {
                        name: '运行时默认配置',
                        desc: 'OSV版本运行时默认配置一致性',
                        result: '通过'
                    },
                ]
            }

        ],

        flushbonading: [
            {
                title: '源码',
                lists: [
                    {
                        name: '内核',
                        desc: '基于openEuler嵌入式内核',
                        result: '通过'
                    },
                    {
                        name: '基础中间件',
                        desc: 'libc保持同openEuler嵌入式一致',
                        result: '通过'
                    },
                    {
                        name: '其他软件包',
                        desc: '如果openEuler社区有，超过70%都选自openEuler社区',
                        result: '通过'
                    },
                ]
            },
            {
                title: '构建',
                lists: [
                    {
                        name: '编译器',
                        desc: '使用openEuler嵌入式的交叉编译器',
                        result: '通过'
                    },
                    {
                        name: '构建工程',
                        desc: '使用openEuler嵌入式yocto工程',
                        result: '通过'
                    },
                    {
                        name: '包列表',
                        desc: '构建结束生成的包列表信息和社区一致',
                        result: '通过'
                    },
                ]
            },
            {
                title: '运行时',
                lists: [
                    {
                        name: '内核',
                        desc: '内核KABI一致',
                        result: '通过'
                    },
                    {
                        name: '基础中间件',
                        desc: 'libc版本一致',
                        result: '通过'
                    },
                    {
                        name: '基础功能',
                        desc: '社区AT测试用例测试通过',
                        result: '通过'
                    },
                    {
                        name: 'POSIX',
                        desc: '和社区接口保持一致',
                        result: '通过'
                    },

                ]
            },
        ]
    }
}
