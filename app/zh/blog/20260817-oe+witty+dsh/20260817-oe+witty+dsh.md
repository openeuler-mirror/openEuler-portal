---
title: openEuler 运维能力已 0 Day 适配 DeepSeek Harness：Witty Builtin Agents 直接集成，快速验证 CVE 查询与硬件兼容性能力
category: blog 
date: 2026-08-17
tags:
    - openEuler
    - DeepSeek Harness
archives: 2026-08-17
author:  openEuler
summary: 依托 Harness 的一切皆插件架构，Witty 的 Builtin Agents 以「角色提示词 + openEuler Portal MCP」的形式无缝衔接，CVE 查询、硬件兼容性分析等能力即刻可用。
---

OpenAtom openEuler（简称：“openEuler”或“开源欧拉”）运维能力已 0 Day 适配 DeepSeek Harness。依托 Harness 的一切皆插件架构，Witty 的 Builtin Agents 以「角色提示词 + openEuler Portal MCP」的形式无缝衔接，CVE 查询、硬件兼容性分析等能力即刻可用。

## 一、环境准备：openEuler + 硬件环境

**推荐系统**：

- openEuler 24.03 LTS / SP1 / SP3 / SP4（Linux Kernel 6.6）
- 架构：x86_64 或 AArch64（Kunpeng）

**硬件建议**：

| 场景 | CPU | 内存 | 存储 |
| ---- | --- | ---- | ---- |
| 轻量体验 | ≥8 核 | ≥16 GB | ≥60 GB |
| 生产运维 | ≥16~32 核 | ≥32~64 GB | ≥100 GB SSD |

**系统基础准备**（仅需 Harness 运行环境）：

- git、curl、unzip、tar 等基础工具
- Node.js ≥ 22.19（openEuler 仓库自带版本过旧，请按文末「附录：完整安装指南」安装新版）
- bubblewrap（DSH bash 工具的 Linux 沙箱后端）

详细安装命令见文末「附录：完整安装指南」。

---

## 二、Witty 项目及其 Agent 介绍

**Witty 定位**：

Witty 是 openEuler 的**运维入口**，本质是「多个智能体框架 + openEuler 场景下运维亲和的 Agent」。它把终端变成自然语言对话窗口，覆盖基础运维、南北向兼容性、系统故障诊断等场景。

**重点**：本次实践**不需要安装完整 Witty CLI**，只需下载其 **Builtin Agents**，直接集成到 DeepSeek Harness 使用。

**Agent 仓库位置**：

<https://atomgit.com/openeuler/euler-copilot-shell/tree/feat/witty-cli/packaging/builtin-agents>

**官方介绍参考**：

<https://atomgit.com/openeuler/witty/blob/master/promotional-materials/2026-07-22-witty-cli-intro.md>

**核心能力摘要：**

- 日志异常检测 + 知识检索 + 经验沉淀
- 南北向兼容性分析（板卡驱动、kABI 等）
- CVE / 安全公告查询与修复建议
- 「假设-验证」故障诊断范式
- 自然语言 → 系统操作自动转换

---

## 三、DeepSeek Harness 下如何使用 Builtin Agents

**DeepSeek Harness 简介**：

DeepSeek 开源的 Agent 运行时（Everything is a Plugin），基于 Cordis 内核。模型、工具、Skill、会话、Loop 全部可插拔。官方地址：<https://github.com/deepseek-ai/deepseek-harness>

**集成步骤（无需安装 Witty）**：

1. **安装运行环境与 DSH**

   先安装新版 Node.js、bubblewrap 等依赖，再安装 DSH 本体（npm 包 `@deepseek-ai/dsh`）。详细命令见「附录：完整安装指南」第 1、2 节。

2. **下载 Witty Builtin Agents**

   ```bash
   git clone --depth 1 --branch feat/witty-cli \
     https://atomgit.com/openeuler/euler-copilot-shell.git
   # 实际 Agent 路径：
   # euler-copilot-shell/packaging/builtin-agents/
   ```

3. **集成到 Harness**

   本步骤需要做两件事：

   - 创建 Cordis 配置文件 `witty.cordis.yml`，声明 Witty Agent 的 role prompt、模型 Provider 与 openEuler Portal MCP；
   - 配置 DeepSeek API Key。

   具体配置内容见「附录：完整安装指南」第 3 节。

4. **启动 DeepSeek Harness**

   ```bash
   # Headless 模式：跑一个任务并输出最终回答
   dsh --profile headless --patch /opt/witty-dsh/witty.cordis.yml "你的问题"

   # Web 模式：启动后通过浏览器对话
   dsh web --patch /opt/witty-dsh/witty.cordis.yml
   ```

5. **基本能力**

   - 自然语言驱动的 openEuler 运维操作
   - CVE 安全查询与修复建议
   - 硬件兼容性查询
   - 日志分析与经验检索
   - 可扩展 Skill 沉淀

启动后直接在 Harness Web UI 或 Headless 模式对话即可调用这些 Builtin Agents。

---

## 四、验证 Case（Harness + Builtin Agents）

### Case 1：基于当前 openEuler 内核版本查询 CVE 并给出修复建议

**自然语言指令示例**：

```text
我当前系统是 openEuler 24.03 LTS（Kernel 6.6 系列），请查询与 kernel 相关的高危 CVE，重点关注 CVE-2026-31414 和 CVE-2026-46135，给出影响范围、修复版本和具体修复建议。参考 https://www.openeuler.org/zh/security/cve/
```

**演示效果（视频）**：

<video controls src="video/oe+witty+dsh.case01.mov" title="Title"></video>


### Case 2：兼容性查询——查询一系列板卡在 openEuler 上的适配情况

**自然语言指令示例**：

```text
请查询以下板卡在 openEuler 24.03 LTS 上的兼容性适配情况（参考 https://www.openeuler.org/zh/compatibility/）：

1. Broadcom 9500-8i（RAID 卡）
2. Mellanox ConnectX-6 / ConnectX-7（网卡）
3. NVIDIA A100 / A800（GPU）
4. 华为昇腾 Atlas 300I Pro（Ascend 310P NPU）

请给出兼容状态、驱动安装方式、已知问题和安装建议。
```

**演示效果（视频）**：

<video controls src="video/oe+witty+dsh.case02.mov" title="Title"></video>

---

## 五、总结

通过「只下载 Witty Builtin Agents + 集成到 DeepSeek Harness」的方式，可以零成本把 openEuler 运维亲和的 Agent 能力快速落地，无需完整安装 Witty CLI。

**核心价值**：

- 轻量：只取 Agent，不装整套入口
- 灵活：Harness 的一切皆插件架构天然适配
- 实用：直接覆盖 CVE 查询与硬件兼容性等高频运维场景

**相关链接**：

- Builtin Agents：<https://atomgit.com/openeuler/euler-copilot-shell/tree/feat/witty-cli/packaging/builtin-agents>
- Witty 介绍：<https://atomgit.com/openeuler/witty/blob/master/promotional-materials/2026-07-22-witty-cli-intro.md>
- DeepSeek Harness：<https://github.com/deepseek-ai/deepseek-harness>
- openEuler 安全中心：<https://www.openeuler.org/zh/security/cve/>
- openEuler 兼容性：<https://www.openeuler.org/zh/compatibility/>

---

## 附录：完整安装指南

以下命令可在 openEuler 24.03 LTS 及以上环境直接照做。

### 1. 安装新版 Node.js

```bash
NODE_VERSION=v24.19.0
case "$(uname -m)" in
  x86_64)  NODE_ARCH=x64 ;;
  aarch64) NODE_ARCH=arm64 ;;
esac

curl -fsSL "https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-${NODE_ARCH}.tar.xz" \
  -o /tmp/node.tar.xz
sudo mkdir -p /opt/nodejs
sudo tar -xJf /tmp/node.tar.xz -C /opt/nodejs --strip-components=1
echo 'export PATH=/opt/nodejs/bin:$PATH' | sudo tee /etc/profile.d/nodejs.sh
export PATH=/opt/nodejs/bin:$PATH

node -v
npm -v
```

### 2. 安装系统依赖、DSH 与 openEuler Portal MCP

```bash
sudo dnf install -y git curl unzip tar bubblewrap
sudo npm install -g @deepseek-ai/dsh
sudo npm install -g openeuler-portal-mcp
```

### 3. 下载 Builtin Agents 并创建集成配置

```bash
mkdir -p /opt/witty-dsh && cd /opt/witty-dsh
git clone --depth 1 --branch feat/witty-cli \
  https://atomgit.com/openeuler/euler-copilot-shell.git
mkdir -p builtin-agents
cp -rf euler-copilot-shell/packaging/builtin-agents/. builtin-agents/
```

创建 `/opt/witty-dsh/witty.cordis.yml`：

```yaml
# Witty Builtin Agent overlay for DeepSeek Harness
- id: system-prompt
  config:
    persona: !!js "process.getBuiltinModule('node:fs').readFileSync('/opt/witty-dsh/builtin-agents/agents/witty-builtin-agent/witty-builtin-agent.md', 'utf8')"
- id: agent-default-model
  config:
    provider: deepseek-official
    model: deepseek-v4-pro
- id: llm-deepseek
  config:
    thinking: enabled
    reasoningEffort: max
    models:
      - id: deepseek-v4-pro
        contextWindow: 128000
      - id: deepseek-v4-flash
        contextWindow: 128000
- insert:
    - id: mcp-openeuler-portal
      name: '@deepseek-ai/dsh-mcp-client'
      config:
        serverName: openeuler_portal
        transport: stdio
        command: npx
        args: ['-y', 'openeuler-portal-mcp']
        failOnStartupError: false
        toolCallTimeoutMs: 60000
```

配置 DeepSeek API Key：

```bash
mkdir -p ~/.dsh
printf 'DEEPSEEK_API_KEY: %s\n' 'sk-你的Key' > ~/.dsh/.credentials.yaml
chmod 700 ~/.dsh
chmod 600 ~/.dsh/.credentials.yaml
```

### 4. 安装 Skills（可选）

```bash
mkdir -p ~/.dsh/skills /opt/witty-dsh/skill-dl
cd /opt/witty-dsh/skill-dl
for spec in \
  manpage-skill:1.0.0 \
  log-anomaly-detector:1.0.0 \
  html-report-generator:1.0.0 \
  brainstorm-beagle:1.0.5 \
  plantuml-skill:1.4.1
do
  slug="${spec%%:*}"
  curl -sSL --max-time 60 \
    -H "Referer: https://skillhub.cn/" \
    -H "Origin: https://skillhub.cn" \
    "https://api.skillhub.cn/api/v1/download?slug=${slug}" -o "${slug}.zip"
  mkdir -p ~/.dsh/skills/"${slug}"
  unzip -oq "${slug}.zip" -d ~/.dsh/skills/"${slug}"
done
```

### 5. Headless 使用

```bash
cd /opt/witty-dsh
dsh --profile headless --patch /opt/witty-dsh/witty.cordis.yml "你的问题"
```

### 6. Web 使用与远程访问

```bash
cd /opt/witty-dsh
nohup dsh web --patch /opt/witty-dsh/witty.cordis.yml > web.log 2>&1 &
```

本地电脑建立 SSH 隧道：

```bash
ssh -L 3080:127.0.0.1:3080 <用户名>@<服务器地址>
```

浏览器打开 <http://127.0.0.1:3080>，点过“内测声明”后即可新建会话。
