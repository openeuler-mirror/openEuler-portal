---
title: 'DeepSeek专栏1：5分钟速通，openEuler部署DeepSeek全攻略'
date: '2025-02-12'
category: blog
tags:
  - openEuler
author: 'openEuler'
summary: 'openEuler操作系统已实现DeepSeek大模型本地化部署支持，充分挖掘AI模型潜能！'
---

# 引言

【科技圈顶流+本地化部署=开发者新利器】DeepSeek大模型近期强势突围，凭借突破性的算法优化和极具竞争力的训推成本，在行业掀起技术风暴。现在，openEuler操作系统已实现DeepSeek大模型本地化部署支持，充分挖掘AI模型潜能！

【三步开启AI革命】

✅ 配置推理引擎（您的人工智能"货轮"）

✅ 选择适配模型（1.5B/7B/8B按需装载）

✅ 本地一键部署

下文将手把手带您完成从环境配置到模型调优的全流程，让开源大模型真正"跑"进你的开发机！(下文开始技术部署细节)

# 系统环境硬件要求

<table>
  <tr>
    <th>模型</th>
    <th>CPU</th>
    <th>内存</th>
    <th>存储</th>
  </tr>
  <tr>
    <td>DeepSeek-R1-Distill-Qwen-1.5B</td>
    <td>至少4核，推荐8核</td>
    <td rowspan="3">16GB以上</td>
    <td rowspan="3">60GB以上</td>
  </tr>
  <tr>
    <td>DeepSeek-R1-Distill-Qwen-7B</td>
    <td>至少8核，推荐16核</td>
  </tr>
  <tr>
    <td>DeepSeek-R1-Distill-Llama-8B</td>
    <td>至少16核，推荐32核</td>
  </tr>
</table>

# 使用Ollama推理框架的DeepSeek部署过程

## 方式一：自动部署方式

以下部署流程是在openEuler 24.03 LTS版本上使用Ollama推理框架部署DeepSeek-R1-Distill-Qwen-7B的流程。注意：该方式可能会存在下载速度缓慢的问题，后面提供了手动下载部署安装的方式，便于在网络环境不好的情况下进行部署安装。

* Ollama下载安装采用Ollama官网下载方式：

```
curl -fsSL https://ollama.com/install.sh | sh
```

* Ollama部署DeepSeek-R1-Distill-Qwen-7B

```
ollama run deepseek-r1:7b
```

至此，DeepSeek部署完成，可以通过命令行来进行交互提问。

## 方式二：手动部署方式

* 在国内使用官网下载Ollama会很慢，下面提供了Ollama的手动安装方式。注意，本文中提供了github的下载链接，下载链接用户可以自行选择替换。
* 对于x86架构的计算机，采用如下链接进行下载

```
wget https://github.com/ollama/ollama/releases/download/v0.5.7/ollama-linux-amd64.tgz
tar -xzvf ollama-linux-amd64.tgz -C /usr/
```

* 对于arm架构的计算机，采用如下链接进行下载

```
wget https://github.com/ollama/ollama/releases/download/v0.5.7/ollama-linux-arm64.tgz
tar -xzvf ollama-linux-arm64.tgz -C /usr/
```

* 使用Ollama官网下载模型同样会出现下载缓慢的问题，这里提供了手动下载DeepSeek大模型来进行手动部署的方式。需要注意的是，Ollama当前只支持gguf格式的模型。

大模型下载链接，可根据自己机器的硬件配置来选择模型：

|  模型                           |  下载链接                                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
|  DeepSeek-R1-Distill-Qwen-1.5B  |  https://www.modelscope.cn/models/unsloth/DeepSeek-R1-Distill-Qwen-1.5B-GGUF/resolve/master/DeepSeek-R1-Distill-Qwen-1.5B-Q4\_K\_M.gguf  |
|  DeepSeek-R1-Distill-Qwen-7B    |  https://www.modelscope.cn/models/unsloth/DeepSeek-R1-Distill-Qwen-7B-GGUF/resolve/master/DeepSeek-R1-Distill-Qwen-7B-Q4\_K\_M.gguf      |
|  DeepSeek-R1-Distill-Llama-8B   |  https://www.modelscope.cn/models/unsloth/DeepSeek-R1-Distill-Llama-8B-GGUF/resolve/master/DeepSeek-R1-Distill-Llama-8B-Q4\_K\_M.gguf    |

```
wget https://www.modelscope.cn/models/unsloth/DeepSeek-R1-Distill-Qwen-7B-GGUF/resolve/master/DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf
```

* 设置并启动Ollama服务，将下述命令完整复制到命令行执行

```
cat <<EOF | tee /etc/systemd/system/ollama.service >/dev/null
[Unit]
Description=Ollama Service
After=network-online.target
[Service]
ExecStart=/usr/bin/ollama serve
User=ollama
Group=ollama
Restart=always
RestartSec=3
Environment="PATH=\$PATH"
[Install]
WantedBy=default.target
EOF

systemctl daemon-reload
systemctl enable ollama --now
```

3、选择模型适配

* Modelfile编写，当前脚本是在CPU上的部署方式。将下列命令完整复制到命令行中执行。

```
cat <<EOF | tee ./Modelfile >/dev/null
FROM ./DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf
TEMPLATE """{{- if .System }}{{ .System }}{{ end }}
{{- range $i, $_ := .Messages }}
{{- $last := eq (len (slice $.Messages $i)) 1}}
{{- if eq .Role "user" }}< | User | >{{ .Content }}
{{- else if eq .Role "assistant" }}< | Assistant | >{{ .Content }}{{- if not $last }}< | end_of_sentence | >{{- end }}
{{- end }}
{{- if and $last (ne .Role "assistant") }}< | Assistant | >{{- end }}
{{- end }}"""
SYSTEM ""
PARAMETER temperature 0.7
PARAMETER top_p 0.7
PARAMETER top_k 30
PARAMETER num_ctx 4096
EOF
```

* 在Ollama中导入DeepSeek。下面命令中，`deepseek-r1:qwen-7b`为模型名称，用户可以自定义。

```
ollama create -f ./Modelfile deepseek-r1:qwen-7b
```

* 通过该命令可以实现在命令行中的大模型交互。下面的命令中，`deepseek-r1:qwen-7b`为模型名称，需要与上一步的模型名称相对应。

```
ollama run deepseek-r1:qwen-7b
```


