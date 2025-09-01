import Image from 'next/image'

const members = [
  { name: 'Member One', img: '/member1.jpg' },
  { name: 'Member Two', img: '/member2.jpg' },
  { name: 'Member Three', img: '/member3.jpg' },
  { name: 'Member Four', img: '/member4.jpg' },
]

export default function Committee(){
  return (
    <section id="committee" className="max-w-6xl mx-auto px-4 py-8">
      <h3 className="font-hpTitle text-gold text-3xl md:text-4xl mb-3">Committee</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {members.map(m=>(
          <div key={m.name} className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-gold/60 relative">
              <Image src={m.img} alt={m.name} fill className="object-cover" />
            </div>
            <p className="mt-2">{m.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
