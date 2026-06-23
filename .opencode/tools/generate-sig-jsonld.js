import { tool } from "@opencode-ai/plugin";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

function sigToJsonLd(lang, sigData, sigRepoInfo) {
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": `openEuler SIG - ${sigData.sig_name}`,
    "description": sigData.description,
    "url": `https://www.openeuler.org/${lang}/sig/${sigData.sig_name}`,
    "member": [],
    "hasPart": []
  };

  // Maintainers
  if (sigData.maintainer_info) {
    sigData.maintainer_info.forEach(m => {
      jsonld.member.push({
        "@type": "Person",
        "name": m.atomgit_id || m.gitee_id,
        "role": "Maintainer",
        "email": m.email,
        "affiliation": m.organization,
        "url": m.user_homepage_url
      });
    });
  }

  // Committers
  if (sigData.committer_info) {
    sigData.committer_info.forEach(c => {
      jsonld.member.push({
        "@type": "Person",
        "name": c.atomgit_id || c.gitee_id,
        "role": "Committer",
        "email": c.email,
        "url": c.user_homepage_url
      });
    });
  }

  // Repositories
  if (sigRepoInfo) {
    sigRepoInfo.forEach(repo => {
      jsonld.hasPart.push({
        "@type": "SoftwareSourceCode",
        "name": repo.repo,
        "codeRepository": `https://atomgit.com/${repo.repo}`,
        'committers': repo.committers.map(c => {
          return {
            "@type": "Person",
            "name": c.atomgit_id || c.gitee_id,
            "role": "Committer",
            "email": c.email,
            "url": c.user_homepage_url
          }
        }),
        'maintainers': repo.maintainers.map(m => {
          return {
            "@type": "Person",
            "name": m.atomgit_id || m.gitee_id,
            "role": "Maintainer",
            "email": m.email,
            "affiliation": m.organization,
            "url": m.user_homepage_url
          }
        }),
      });
    });
  }

  return jsonld;
}

export default tool({
  description: "Generate JSON-LD for sig detail pages (/{zh,en}/sig/*)",
  args: {
    sigName: tool.schema.string().describe('Name of sig'),
    lang: tool.schema.string().describe('Page language'),
  },
  async execute({ sigName, lang }, { worktree }) {
    const geoDir = join(worktree, '.geo');
    const jsonldDir = join(geoDir, 'jsonld');

    const [sigInfo, sigRepoInfo] = await Promise.all(
      [
        `https://www.openeuler.org/api-magic/stat/sig/info?community=openeuler&sig=${sigName}`,
        `https://www.openeuler.org/api-magic/sig/new/repo/committers?community=openeuler&sig=${sigName}`
      ].map(async (url) => {
          try {
            const resp = await fetch(url);
            if (!resp.ok) {
              return '';
            }
            const res = await resp.json();
            return res.data ?? '';
          } catch {
            return '';
          }
        })
    );

    if (!sigInfo || !sigRepoInfo) {
      return `Process failed: ${sigName}, cannot access urls`;
    }

    const jsonLd = sigToJsonLd(lang, sigInfo, sigRepoInfo);

    const targetFile = join(jsonldDir, `${lang}/sig`, sigName, 'index.json');
    const targetDir = dirname(targetFile);
    try {
      if (!existsSync(targetDir)) {
        await mkdir(targetDir, { recursive: true });
      }

      await writeFile(targetFile, JSON.stringify(jsonLd, null, 2));
      return `Done: ${sigName}`;
    } catch (error) {
      return `Process failed: ${sigName}, ${error}`;
    }
  },
});
