import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

import { slugifyEvent } from '../../../.vitepress/src-new/shared/event-slug';

const __dirname = dirname(fileURLToPath(import.meta.url));

const eventsPath = resolve(__dirname, '../../../../.content/activity/events.yaml');
const events = yaml.load(readFileSync(eventsPath, 'utf8')) as any[];

export default {
  paths() {
    const seen = new Set<string>();
    const out: { params: { event: string } }[] = [];
    for (const ev of events) {
      const slug = slugifyEvent(ev);
      if (seen.has(slug)) continue;
      seen.add(slug);
      out.push({ params: { event: slug } });
    }
    return out;
  },
};
