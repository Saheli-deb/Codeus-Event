// components/FAQ.tsx
export default function FAQ() {
    const items = [
      {
        q: 'What is the total team size?',
        a: 'Minimum 2 and maximum 3 members per team.',
      },
      {
        q: 'What is the number of sub events, my team can participate?',
        a: 'Up to 2 sub-events per team.',
      },
      {
        q: 'How many rounds will be there?',
        a: 'Two rounds: Prelims and Final.',
      },
    ];
  
    return (
      <section id="faq" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-hpTitle text-gold text-4xl md:text-5xl mb-6">
          FAQ
        </h2>
  
        <div className="space-y-3">
          {items.map(({ q, a }, i) => (
            <details
              key={i}
              className="
                group rounded-2xl border border-gold/25 bg-black/40 backdrop-blur-sm
                p-4 md:p-5 open:shadow-[0_0_30px_rgba(212,175,55,.18)]
              "
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-cream font-medium text-lg md:text-xl">
                  {q}
                </span>
  
                {/* gold + that turns into × on open */}
                <span
                  aria-hidden="true"
                  className="
                    ml-4 shrink-0 h-7 w-7 grid place-items-center rounded-full
                    border border-gold/40 text-gold transition
                    group-open:rotate-45
                  "
                >
                  +
                </span>
              </summary>
  
              <div className="pt-3 md:pt-4 text-cream/90 leading-relaxed">
                {a}
              </div>
            </details>
          ))}
        </div>
      </section>
    );
  }
  