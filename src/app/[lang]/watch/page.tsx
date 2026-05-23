import type { Metadata } from 'next'
import { WatchIndexClient } from './WatchIndexClient'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: 'Watch Free Live TV Online – All Countries | CartoTV',
    description: 'Browse 179 countries and watch free live TV channels online on CartoTV. Select a country to start streaming instantly. No signup required.',
    alternates: { canonical: `https://cartotv.com/${params.lang}/watch` },
  }
}

export default function WatchIndexPage({ params }: { params: { lang: string } }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Watch Free Live TV – All Countries</h1>
        <p className="text-muted-foreground mb-6">Choose a country below to browse and stream free live TV channels.</p>
        <WatchIndexClient lang={params.lang} />
      </div>
    </div>
  )
}
