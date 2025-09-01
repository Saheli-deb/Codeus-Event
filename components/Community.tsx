export default function Community(){
  return (
    <section id="community" className="max-w-6xl mx-auto px-4 py-8">
      <h3 className="font-hpTitle text-gold text-3xl md:text-4xl mb-3">Community</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-black/40 border border-gold/20 rounded-xl p-4">
          <h4 className="font-bold">Workshops</h4>
          <p>Hands-on sessions on prompt engineering, datasets, and agent frameworks.</p>
        </div>
        <div className="bg-black/40 border border-gold/20 rounded-xl p-4">
          <h4 className="font-bold">Mentors</h4>
          <p>Industry mentors to guide your builds throughout the event.</p>
        </div>
        <div className="bg-black/40 border border-gold/20 rounded-xl p-4">
          <h4 className="font-bold">Resources</h4>
          <p>Starter kits, API credits (subject to availability), templates and more.</p>
        </div>
      </div>
    </section>
  )
}
