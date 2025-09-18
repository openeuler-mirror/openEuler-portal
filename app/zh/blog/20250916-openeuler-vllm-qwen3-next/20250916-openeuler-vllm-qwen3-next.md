---
title: 在 openEuler 上使用 KServe 部署 Qwen3
category: blog 
date: 2025-07-31
tags:
    - openEuler
    - MySQL
archives: 2025-07-31
author:  openEuler
summary: KServe 是一种基于 Kubernetes 的模型服务（Model Serving）平台，能够简化机器学习模型在生产环境中的部署和管理。通过标准化的接口和 CRD（自定义资源定义），KServe 支持多种主流推理后端（如 TensorFlow Serving、TorchServe、Triton Inference Server 及 Hugging Face Server），适用于各类深度学习模型的在线推理服务。本文将演示如何在 OpenAtom openEuler（简称“openEuler”）操作系统上部署并使用 KServe，进行 Hugging Face Qwen3 模型的文本生成任务。
---

# 元信息
- 网页类型: 普通网站
- 标题: openEuler + vLLM Ascend 快速上手Qwen3-Next，实操指南

# 内容

![cover_image]()

## openEuler + vLLM Ascend 快速上手Qwen3-Next，实操指南

[OpenAtom openEuler]()  _2025年09月16日 20:11_ _广东_

9 月 12 日，阿里云通义团队宣布推出其下一代基础模型架构 Qwen3-Next，并开源了基于该架构的 Qwen3-Next-80B-A3B 系列模型，包括：Qwen3-Next-80B-A3B-Instruct 和 Qwen3-Next-80B-A3B-Thinking。相较于 Qwen3 MoE，Qwen3-Next 采用全新的模型架构：混合架构创新、极致稀疏 MoE、更稳的训练以及多 token 预测机制（MTP），进一步提升了模型在长上下文和大规模总参数场景下的训练和推理效率。

vLLM 是 PyTorch Foundation 下的开源 LLM 推理引擎，为用户和开发者提供快速、易用的 LLM 推理能力。vLLM 社区在 9 月 15 日发布了 vLLM Ascend v0.10.2rc1 版本，提供了昇腾对 Qwen3-Next 的支持。本指南将帮助你在 openEuler （简称：“openEuler”或“开源欧拉”）上使用 vLLM Ascend 运行 Qwen3-Next。

# 使用 vLLM Ascend 运行 Qwen3-Next

本指南将采用 vLLM Ascend 的镜像的方式，在昇腾上运行 Qwen3-Next：

- 步骤 1 ：在拉起容器镜像前，请先确保昇腾驱动已经正常安装，可使用npu-smi info 命令进行查看。
- 步骤 2 ：使用如下命令拉起 vLLM Ascend 容器镜像：

```bash
# Update the vllm-ascend image
export IMAGE=quay.io/ascend/vllm-ascend:v0.10.2rc1-openeuler

docker run --rm \
--name vllm-ascend \
--device /dev/davinci0 \
--device /dev/davinci1 \
--device /dev/davinci2 \
--device /dev/davinci3 \
--device /dev/davinci_manager \
--device /dev/devmm_svm \
--device /dev/hisi_hdc \
-v /usr/local/dcmi:/usr/local/dcmi \
-v /usr/local/bin/npu-smi:/usr/local/bin/npu-smi \
-v /usr/local/Ascend/driver/lib64/:/usr/local/Ascend/driver/lib64/ \
-v /usr/local/Ascend/driver/version.info:/usr/local/Ascend/driver/version.info \
-v /etc/ascend_install.info:/etc/ascend_install.info \
-v /root/.cache:/root/.cache \
-p 8000:8000 \
-it $IMAGE bash
```

步骤 3 ：准备运行环境

在容器内安装毕昇编译器及 Triton Ascend

```bash
#  Install Bisheng compiler
wget https://vllm-ascend.obs.cn-north-4.myhuaweicloud.com/vllm-ascend/Ascend-BiSheng-toolkit_aarch64.run

chmod a+x Ascend-BiSheng-toolkit_aarch64.run
./Ascend-BiSheng-toolkit_aarch64.run --install
source /usr/local/Ascend/8.3.RC1/bisheng_toolkit/set_env.sh

# Install Triton Ascend
wget https://vllm-ascend.obs.cn-north-4.myhuaweicloud.com/vllm-ascend/triton_ascend-3.2.0.dev20250914-cp311-cp311-manylinux_2_27_aarch64.manylinux_2_28_aarch64.whl

pip install triton_ascend-3.2.0.dev20250914-cp311-cp311-manylinux_2_27_aarch64.manylinux_2_28_aarch64.whl
```

步骤 4 ：部署推理服务

进入容器环境后，可通过 vllm serve 命令启动在线推理服务，模型下载需要很长时间，国内用户建议配置 VLLM _USE_ MODELSCOPE 环境变量提高模型下载速度

```bash
# 使用 VLLM_USE_MODELSCOPE 提高模型下载速度
export VLLM_USE_MODELSCOPE=true

# Qwen3-Next 目前发布了两个 80B 的模型
# Qwen3-Next-80B-A3B-Thinking
# Qwen3-Next-80B-A3B-Instruct
# 启动在线推理服务

vllm serve Qwen/Qwen3-Next-80B-A3B-Instruct --tensor-parallel-size 4 --enforce-eager


# 使用 curl 访问推理服务
curl http://localhost:8000/v1/completions \
-H "Content-Type: application/json" \
-d '{"model": "Qwen/Qwen3-Next-80B-A3B-Instruct ", "prompt": "The future of AI is", "max_tokens": 5, "temperature": 0}' | python3 -m json.tool
```

除了在线推理， vLLM Ascend 也支持部署离线推理服务，示例代码（example.py）如下：

```python
import gc
import torch
from vllm import LLM, SamplingParams
from vllm.distributed.parallel_state import (destroy_distributed_environment,
destroy_model_parallel)

def clean_up():
destroy_model_parallel()
destroy_distributed_environment()
gc.collect()
torch.npu.empty_cache()
if __name__ == '__main__':
prompts = [
"Who are you?",
]

sampling_params = SamplingParams(temperature=0.6, top_p=0.95, top_k=40, max_tokens=32)
llm = LLM(model="Qwen/Qwen3-Next-80B-A3B-Instruct",
tensor_parallel_size=4,
enforce_eager=True,
distributed_executor_backend="mp",
max_model_len=4096)

outputs = llm.generate(prompts, sampling_params)
for output in outputs:
prompt = output.prompt
generated_text = output.outputs[0].text
print(f"Prompt: {prompt!r}, Generated text: {generated_text!r}")

del llm
clean_up()
```

运行 example 脚本，即可验证离线推理：

```bash
# 使用 VLLM_USE_MODELSCOPE 提高模型下载速度
export VLLM_USE_MODELSCOPE=true
python example.py
```


# 相关链接

- 项目仓库：https://github.com/vllm-project/vllm-ascend
- 文档链接：https://vllm-ascend.readthedocs.io
- 问题反馈：https://github.com/vllm-project/vllm-ascend/issues
- 教程指引：https://vllm-ascend.readthedocs.io/en/latest/tutorials
- Gitcode AI 社区链接：https://ai.gitcode.com/vLLM_Ascend/Qwen3-Next-80B-A3B-Instruct
- 魔乐社区链接：https://modelers.cn/models/vLLM_Ascend/Qwen3-Next-80B-A3B-Instruct
