---
title: 'openEuler × DeepSeek 1: Quick Deployment of DeepSeek-R1 on openEuler 24.03 LTS'
category: blog 
date: 2025-02-12
tags:
    - DeepSeek
archives: 2025-02
author: OpenAtom openEuler 
summary: DeepSeek is making waves in the AI community with its cutting-edge capabilities for deploying LLMs. As AI continues to evolve, tools like DeepSeek are empowering developers to unlock new levels of performance, scalability, and efficiency.Today, we're kicking off with a simple guide to help you deploy DeepSeek-R1 on openEuler 24.03 LTS.
---

Welcome to the first blog in our **openEuler × DeepSeek** series! 

DeepSeek is making waves in the AI community with its cutting-edge capabilities for deploying LLMs. As AI continues to evolve, tools like DeepSeek are empowering developers to unlock new levels of performance, scalability, and efficiency.

Today, we're kicking off with a simple guide to help you deploy **DeepSeek-R1 on openEuler 24.03 LTS** ([download](https://www.openeuler.org/en/download/archive/detail/?version=openEuler%2024.03%20LTS)), so you can start leveraging its power in your own AI applications. Whether you're a developer ready to dive into the world of AI or just curious about DeepSeek's potential, this guide will walk you through everything you need to get started!

## Preparing for DeepSeek-R1 Deployment on openEuler

Before you jump into deploying DeepSeek-R1, here are the hardware specifications to ensure smooth sailing:

|  Model  |  CPU  |  Memory  |  Storage  |
|  --------  | --------  | --------  | --------  |
| DeepSeek-R1-Distill-Qwen-1.5B  | ≥ 4 cores (8 recommended) | ≥ 16 GB  | ≥ 60 GB |
| DeepSeek-R1-Distill-Qwen-7B  | ≥ 8 cores (16 recommended) | ≥ 16 GB  | ≥ 60 GB  |
| DeepSeek-R1-Distill-Llama-8B | ≥16 cores (32 recommended) | ≥ 16 GB  | ≥ 60 GB  |


### Method 1: Automatic Deployment

If you're using openEuler 24.03 LTS, the Ollama inference framework makes it super easy to get DeepSeek-R1-Distill-Qwen-7B up and running. But heads up — network speed may affect download times. If you're dealing with a slow connection, don't worry, we've also included a manual method later on!

**Step 1: Install Ollama**

Run the following command to install Ollama from the official website:

```
curl -fsSL https://ollama.com/install.sh | sh
```

**Step 2: Deploy DeepSeek**

Once Ollama is installed, you can deploy DeepSeek-R1-Distill-Qwen-7B by running:

```
ollama run deepseek-r1:7b
```

And that's it! DeepSeek is now deployed, and you can start interacting via the command line. 


### Method 2: Manual Deployment

If you're experiencing slow downloads from the Ollama website, here's how to manually download and install Ollama and DeepSeek-R1 models.

**Step 1: Install Ollama Manually**

1.For Arm-based machines, use the following command:

```
wget https://github.com/ollama/ollama/releases/download/v0.5.7/ollama-linux-arm64.tgz
tar -xzvf ollama-linux-arm64.tgz -C /usr/
```

2.For x86-based machines, use the following command:

```
wget https://github.com/ollama/ollama/releases/download/v0.5.7/ollama-linux-amd64.tgz
tar -xzvf ollama-linux-amd64.tgz -C /usr/
```


**Step 2: Download the DeepSeek Model**

Since Ollama currently supports gguf format models, you'll need to download the correct model based on your system's hardware configuration. Choose the appropriate link for your chosen model:

- Download [DeepSeek-R1-Distill-Qwen-1.5B](https://www.modelscope.cn/models/unsloth/DeepSeek-R1-Distill-Qwen-1.5B-GGUF/resolve/master/DeepSeek-R1-Distill-Qwen-1.5B-Q4_K_M.gguf)

- Download [DeepSeek-R1-Distill-Qwen-7B](https://www.modelscope.cn/models/unsloth/DeepSeek-R1-Distill-Qwen-7B-GGUF/resolve/master/DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf)

- Download [DeepSeek-R1-Distill-Llama-8B](https://www.modelscope.cn/models/unsloth/DeepSeek-R1-Distill-Llama-8B-GGUF/resolve/master/DeepSeek-R1-Distill-Llama-8B-Q4_K_M.gguf)


If you are using a Linux distro, you can also download the DeepSeek-R1-Distill-Qwen-7B model with the following command:

```
wget https://www.modelscope.cn/models/unsloth/DeepSeek-R1-Distill-Qwen-7B-GGUF/resolve/master/DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf
```

**Step 3: Create a Systemd Service**

Next, let's create and configure a systemd service for Ollama by running the following commands:

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

**Step 4: Create the Modelfile**
Next, configure the parameters for the DeepSeek model by creating a Modelfile:

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

**Step 5: Create the Model Instance**

Now, create the model instance with the following command:

```
ollama create -f ./Modelfile deepseek-r1:7b
Step 6: Run the Model
Finally, you can start the model instance by running:
ollama run deepseek-r1:7b
```

## What's Next?

There you have it — a complete guide to deploying DeepSeek-R1 on openEuler! Whether you went for the automatic deployment or the manual setup, you're now ready to unlock the full potential of DeepSeek. 

Stay tuned for the next part of our DeepSeek series where we will discuss deploying DeepSeek with vLLM on Kunpeng + NVIDIA processors and openEuler 24.03 LTS. 

Any further questions or comments, feel free to join our technical community by reaching out to openEuler's [Intelligent SIG](https://www.openeuler.org/en/sig/sig-intelligence).

## Quick Links for More openEuler × DeepSeek Blogs

- [DeepSeek-R1 671B Distributed Training Achieved on openEuler 24.03](https://www.linkedin.com/pulse/deepseek-r1-671b-distributed-training-achieved-openeuler-2403-pdg4c/?trackingId=6OJRE%2F4OxlftBPasgwkXwA%3D%3D)