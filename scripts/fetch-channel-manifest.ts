/**
 * Pre-build script — fetches all M3U channel lists and generates channel-manifest.json
 * Run: npx tsx scripts/fetch-channel-manifest.ts
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Node 18/20 compatible __dirname replacement
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COUNTRIES = [
  { name: "Afghanistan", url: "https://iptv-org.github.io/iptv/countries/af.m3u" },
  { name: "Albania", url: "https://iptv-org.github.io/iptv/countries/al.m3u" },
  { name: "Algeria", url: "https://iptv-org.github.io/iptv/countries/dz.m3u" },
  { name: "Andorra", url: "https://iptv-org.github.io/iptv/countries/ad.m3u" },
  { name: "Angola", url: "https://iptv-org.github.io/iptv/countries/ao.m3u" },
  { name: "Argentina", url: "https://iptv-org.github.io/iptv/countries/ar.m3u" },
  { name: "Armenia", url: "https://iptv-org.github.io/iptv/countries/am.m3u" },
  { name: "Australia", url: "https://iptv-org.github.io/iptv/countries/au.m3u" },
  { name: "Austria", url: "https://iptv-org.github.io/iptv/countries/at.m3u" },
  { name: "Azerbaijan", url: "https://iptv-org.github.io/iptv/countries/az.m3u" },
  { name: "Bahrain", url: "https://iptv-org.github.io/iptv/countries/bh.m3u" },
  { name: "Bangladesh", url: "https://iptv-org.github.io/iptv/countries/bd.m3u" },
  { name: "Belarus", url: "https://iptv-org.github.io/iptv/countries/by.m3u" },
  { name: "Belgium", url: "https://iptv-org.github.io/iptv/countries/be.m3u" },
  { name: "Bolivia", url: "https://iptv-org.github.io/iptv/countries/bo.m3u" },
  { name: "Bosnia and Herzegovina", url: "https://iptv-org.github.io/iptv/countries/ba.m3u" },
  { name: "Brazil", url: "https://iptv-org.github.io/iptv/countries/br.m3u" },
  { name: "Bulgaria", url: "https://iptv-org.github.io/iptv/countries/bg.m3u" },
  { name: "Cambodia", url: "https://iptv-org.github.io/iptv/countries/kh.m3u" },
  { name: "Cameroon", url: "https://iptv-org.github.io/iptv/countries/cm.m3u" },
  { name: "Canada", url: "https://iptv-org.github.io/iptv/countries/ca.m3u" },
  { name: "Chile", url: "https://iptv-org.github.io/iptv/countries/cl.m3u" },
  { name: "China", url: "https://iptv-org.github.io/iptv/countries/cn.m3u" },
  { name: "Colombia", url: "https://iptv-org.github.io/iptv/countries/co.m3u" },
  { name: "Croatia", url: "https://iptv-org.github.io/iptv/countries/hr.m3u" },
  { name: "Cuba", url: "https://iptv-org.github.io/iptv/countries/cu.m3u" },
  { name: "Czech Republic", url: "https://iptv-org.github.io/iptv/countries/cz.m3u" },
  { name: "Denmark", url: "https://iptv-org.github.io/iptv/countries/dk.m3u" },
  { name: "Dominican Republic", url: "https://iptv-org.github.io/iptv/countries/do.m3u" },
  { name: "Ecuador", url: "https://iptv-org.github.io/iptv/countries/ec.m3u" },
  { name: "Egypt", url: "https://iptv-org.github.io/iptv/countries/eg.m3u" },
  { name: "Ethiopia", url: "https://iptv-org.github.io/iptv/countries/et.m3u" },
  { name: "Finland", url: "https://iptv-org.github.io/iptv/countries/fi.m3u" },
  { name: "France", url: "https://iptv-org.github.io/iptv/countries/fr.m3u" },
  { name: "Georgia", url: "https://iptv-org.github.io/iptv/countries/ge.m3u" },
  { name: "Germany", url: "https://iptv-org.github.io/iptv/countries/de.m3u" },
  { name: "Ghana", url: "https://iptv-org.github.io/iptv/countries/gh.m3u" },
  { name: "Greece", url: "https://iptv-org.github.io/iptv/countries/gr.m3u" },
  { name: "Guatemala", url: "https://iptv-org.github.io/iptv/countries/gt.m3u" },
  { name: "Honduras", url: "https://iptv-org.github.io/iptv/countries/hn.m3u" },
  { name: "Hungary", url: "https://iptv-org.github.io/iptv/countries/hu.m3u" },
  { name: "India", url: "https://iptv-org.github.io/iptv/countries/in.m3u" },
  { name: "Indonesia", url: "https://iptv-org.github.io/iptv/countries/id.m3u" },
  { name: "Iran", url: "https://iptv-org.github.io/iptv/countries/ir.m3u" },
  { name: "Iraq", url: "https://iptv-org.github.io/iptv/countries/iq.m3u" },
  { name: "Ireland", url: "https://iptv-org.github.io/iptv/countries/ie.m3u" },
  { name: "Israel", url: "https://iptv-org.github.io/iptv/countries/il.m3u" },
  { name: "Italy", url: "https://iptv-org.github.io/iptv/countries/it.m3u" },
  { name: "Japan", url: "https://iptv-org.github.io/iptv/countries/jp.m3u" },
  { name: "Jordan", url: "https://iptv-org.github.io/iptv/countries/jo.m3u" },
  { name: "Kazakhstan", url: "https://iptv-org.github.io/iptv/countries/kz.m3u" },
  { name: "Kenya", url: "https://iptv-org.github.io/iptv/countries/ke.m3u" },
  { name: "Kuwait", url: "https://iptv-org.github.io/iptv/countries/kw.m3u" },
  { name: "Latvia", url: "https://iptv-org.github.io/iptv/countries/lv.m3u" },
  { name: "Lebanon", url: "https://iptv-org.github.io/iptv/countries/lb.m3u" },
  { name: "Libya", url: "https://iptv-org.github.io/iptv/countries/ly.m3u" },
  { name: "Lithuania", url: "https://iptv-org.github.io/iptv/countries/lt.m3u" },
  { name: "Malaysia", url: "https://iptv-org.github.io/iptv/countries/my.m3u" },
  { name: "Mexico", url: "https://iptv-org.github.io/iptv/countries/mx.m3u" },
  { name: "Moldova", url: "https://iptv-org.github.io/iptv/countries/md.m3u" },
  { name: "Mongolia", url: "https://iptv-org.github.io/iptv/countries/mn.m3u" },
  { name: "Morocco", url: "https://iptv-org.github.io/iptv/countries/ma.m3u" },
  { name: "Mozambique", url: "https://iptv-org.github.io/iptv/countries/mz.m3u" },
  { name: "Myanmar", url: "https://iptv-org.github.io/iptv/countries/mm.m3u" },
  { name: "Nepal", url: "https://iptv-org.github.io/iptv/countries/np.m3u" },
  { name: "Netherlands", url: "https://iptv-org.github.io/iptv/countries/nl.m3u" },
  { name: "New Zealand", url: "https://iptv-org.github.io/iptv/countries/nz.m3u" },
  { name: "Nicaragua", url: "https://iptv-org.github.io/iptv/countries/ni.m3u" },
  { name: "Nigeria", url: "https://iptv-org.github.io/iptv/countries/ng.m3u" },
  { name: "Norway", url: "https://iptv-org.github.io/iptv/countries/no.m3u" },
  { name: "Oman", url: "https://iptv-org.github.io/iptv/countries/om.m3u" },
  { name: "Pakistan", url: "https://iptv-org.github.io/iptv/countries/pk.m3u" },
  { name: "Panama", url: "https://iptv-org.github.io/iptv/countries/pa.m3u" },
  { name: "Peru", url: "https://iptv-org.github.io/iptv/countries/pe.m3u" },
  { name: "Philippines", url: "https://iptv-org.github.io/iptv/countries/ph.m3u" },
  { name: "Poland", url: "https://iptv-org.github.io/iptv/countries/pl.m3u" },
  { name: "Portugal", url: "https://iptv-org.github.io/iptv/countries/pt.m3u" },
  { name: "Qatar", url: "https://iptv-org.github.io/iptv/countries/qa.m3u" },
  { name: "Romania", url: "https://iptv-org.github.io/iptv/countries/ro.m3u" },
  { name: "Russia", url: "https://iptv-org.github.io/iptv/countries/ru.m3u" },
  { name: "Rwanda", url: "https://iptv-org.github.io/iptv/countries/rw.m3u" },
  { name: "Saudi Arabia", url: "https://iptv-org.github.io/iptv/countries/sa.m3u" },
  { name: "Senegal", url: "https://iptv-org.github.io/iptv/countries/sn.m3u" },
  { name: "Serbia", url: "https://iptv-org.github.io/iptv/countries/rs.m3u" },
  { name: "Singapore", url: "https://iptv-org.github.io/iptv/countries/sg.m3u" },
  { name: "Slovakia", url: "https://iptv-org.github.io/iptv/countries/sk.m3u" },
  { name: "Somalia", url: "https://iptv-org.github.io/iptv/countries/so.m3u" },
  { name: "South Africa", url: "https://iptv-org.github.io/iptv/countries/za.m3u" },
  { name: "South Korea", url: "https://iptv-org.github.io/iptv/countries/kr.m3u" },
  { name: "Spain", url: "https://iptv-org.github.io/iptv/countries/es.m3u" },
  { name: "Sri Lanka", url: "https://iptv-org.github.io/iptv/countries/lk.m3u" },
  { name: "Sudan", url: "https://iptv-org.github.io/iptv/countries/sd.m3u" },
  { name: "Sweden", url: "https://iptv-org.github.io/iptv/countries/se.m3u" },
  { name: "Switzerland", url: "https://iptv-org.github.io/iptv/countries/ch.m3u" },
  { name: "Syria", url: "https://iptv-org.github.io/iptv/countries/sy.m3u" },
  { name: "Taiwan", url: "https://iptv-org.github.io/iptv/countries/tw.m3u" },
  { name: "Tanzania", url: "https://iptv-org.github.io/iptv/countries/tz.m3u" },
  { name: "Thailand", url: "https://iptv-org.github.io/iptv/countries/th.m3u" },
  { name: "Tunisia", url: "https://iptv-org.github.io/iptv/countries/tn.m3u" },
  { name: "Turkey", url: "https://iptv-org.github.io/iptv/countries/tr.m3u" },
  { name: "Uganda", url: "https://iptv-org.github.io/iptv/countries/ug.m3u" },
  { name: "Ukraine", url: "https://iptv-org.github.io/iptv/countries/ua.m3u" },
  { name: "United Arab Emirates", url: "https://iptv-org.github.io/iptv/countries/ae.m3u" },
  { name: "United Kingdom", url: "https://iptv-org.github.io/iptv/countries/gb.m3u" },
  { name: "United States", url: "https://iptv-org.github.io/iptv/countries/us.m3u" },
  { name: "Uruguay", url: "https://iptv-org.github.io/iptv/countries/uy.m3u" },
  { name: "Uzbekistan", url: "https://iptv-org.github.io/iptv/countries/uz.m3u" },
  { name: "Venezuela", url: "https://iptv-org.github.io/iptv/countries/ve.m3u" },
  { name: "Vietnam", url: "https://iptv-org.github.io/iptv/countries/vn.m3u" },
  { name: "Yemen", url: "https://iptv-org.github.io/iptv/countries/ye.m3u" },
  { name: "Zambia", url: "https://iptv-org.github.io/iptv/countries/zm.m3u" },
  { name: "Zimbabwe", url: "https://iptv-org.github.io/iptv/countries/zw.m3u" },
  { name: "Côte d'Ivoire", url: "https://iptv-org.github.io/iptv/countries/ci.m3u" },
  { name: "DR Congo", url: "https://iptv-org.github.io/iptv/countries/cd.m3u" },
  { name: "North Macedonia", url: "https://iptv-org.github.io/iptv/countries/mk.m3u" },
  { name: "Bosnia and Herzegovina", url: "https://iptv-org.github.io/iptv/countries/ba.m3u" },
  { name: "El Salvador", url: "https://iptv-org.github.io/iptv/countries/sv.m3u" },
]

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function parseM3UChannelNames(content: string): string[] {
  const lines = content.split('\n')
  const names: string[] = []
  const seen = new Set<string>()
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('#EXTINF:')) {
      const match = trimmed.match(/,(.+)$/)
      if (match) {
        const name = match[1].trim()
        const slug = toSlug(name)
        if (slug && !seen.has(slug)) {
          seen.add(slug)
          names.push(name)
        }
      }
    }
  }
  return names
}

// Use pre-existing manifest as fallback if network fails
function loadExistingManifest(): Record<string, string[]> {
  try {
    const p = path.join(__dirname, 'channel-manifest.json')
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, 'utf-8'))
      return data.countries ?? {}
    }
  } catch {}
  return {}
}

async function main() {
  console.log('Fetching channel manifest from iptv-org...')

  const existing = loadExistingManifest()
  const countries: Record<string, string[]> = { ...existing }
  let totalChannels = 0

  const BATCH = 15
  for (let i = 0; i < COUNTRIES.length; i += BATCH) {
    const batch = COUNTRIES.slice(i, i + BATCH)
    await Promise.allSettled(
      batch.map(async ({ name, url }) => {
        try {
          const controller = new AbortController()
          const timer = setTimeout(() => controller.abort(), 12000)
          const res = await fetch(url, { signal: controller.signal })
          clearTimeout(timer)
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const text = await res.text()
          const channels = parseM3UChannelNames(text)
          if (channels.length > 0) {
            countries[name] = channels
            console.log(`  ✓ ${name}: ${channels.length} channels`)
          } else {
            console.log(`  - ${name}: 0 channels (skipped)`)
          }
        } catch (err) {
          // Fall back to existing manifest data for this country
          if (existing[name]) {
            console.log(`  ~ ${name}: using cached (${existing[name].length} channels)`)
          } else {
            console.log(`  ✗ ${name}: failed, no cache`)
          }
        }
      })
    )
  }

  // Count totals
  for (const channels of Object.values(countries)) {
    totalChannels += channels.length
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalChannels,
    countries,
  }

  const outPath = path.join(__dirname, 'channel-manifest.json')
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2))
  console.log(`\nManifest saved: ${Object.keys(countries).length} countries, ${totalChannels} channels`)
}

main().catch(err => {
  console.error('fetch-channels failed:', err)
  // Exit 0 so the build continues using the existing manifest
  process.exit(0)
})
