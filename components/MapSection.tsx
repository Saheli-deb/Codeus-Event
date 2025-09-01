
'use client';

export default function MapSection() {
  return (
    <section id="venue" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-8">
      <h2 className="font-hpTitle text-gold text-3xl sm:text-4xl mb-4">
        Venue: Godrej Genesis
      </h2>

      <div className="map-shell">
        {/* golden inner halo */}
        <div aria-hidden className="halo" />
        {/* ornamental corners */}
        <span aria-hidden className="orn tl" />
        <span aria-hidden className="orn tr" />
        <span aria-hidden className="orn bl" />
        <span aria-hidden className="orn br" />
        {/* faint sparkles */}
        <div aria-hidden className="sparkles">
          <i /><i /><i /><i /><i />
        </div>

        {/* Google Maps embed */}
        <iframe
          title="Godrej Genesis on Google Maps"
          aria-label="Map showing Godrej Genesis building"
          src="https://www.google.com/maps?q=Godrej%20Genesis%2C%20Kolkata&z=16&output=embed"
          className="map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* info bar */}
        <div className="info">
          <span>📍 Godrej Genesis, Sector V, Kolkata</span>
          <div className="actions">
            <a
              className="btn-ghost"
              href="https://www.google.com/maps/dir/?api=1&destination=Godrej%20Genesis%2C%20Kolkata"
              target="_blank" rel="noreferrer"
            >
              Get Directions
            </a>
            <a
              className="btn-ghost"
              href="https://maps.google.com/?q=Godrej%20Genesis%2C%20Kolkata"
              target="_blank" rel="noreferrer"
            >
              Open in Maps
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .map-shell{
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          /* glass card */
          background: rgba(18,14,8,.55);
          border: 1.5px solid rgba(212,175,55,.45);
          box-shadow:
            0 14px 40px rgba(0,0,0,.5),
            inset 0 0 0 1px rgba(255,220,140,.1);
          backdrop-filter: blur(3px);
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .map-shell:hover{
          transform: translateY(-2px);
          box-shadow:
            0 20px 60px rgba(0,0,0,.55),
            0 0 28px rgba(212,175,55,.18);
        }

        .map{
          display:block;
          width:100%;
          height: 360px;
        }
        @media(min-width:640px){ .map{ height:420px } }
        @media(min-width:1024px){ .map{ height:480px } }

        /* inner golden glow rim */
        .halo{
          position:absolute; inset:0;
          border-radius:22px;
          pointer-events:none;
          box-shadow:
            inset 0 0 0 1px rgba(212,175,55,.28),
            inset 0 0 60px rgba(212,175,55,.08);
        }

        /* ornamental corners */
        .orn{
          position:absolute; width:46px; height:46px;
          border:2px solid rgba(212,175,55,.75);
          filter: drop-shadow(0 0 10px rgba(212,175,55,.35));
          border-radius:10px;
          mask: 
            linear-gradient(#000 0 0) content-box, 
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          padding:8px; /* creates corner “L” */
        }
        .orn.tl{ top:10px; left:10px; border-right:0; border-bottom:0; }
        .orn.tr{ top:10px; right:10px; border-left:0; border-bottom:0; }
        .orn.bl{ bottom:56px; left:10px; border-right:0; border-top:0; }  /* above info bar */
        .orn.br{ bottom:56px; right:10px; border-left:0; border-top:0; }

        /* subtle shimmer along top edge */
        .map-shell::before{
          content:'';
          position:absolute; left: -40%;
          top:-2px; width: 80%; height: 2px;
          background: linear-gradient(90deg, transparent, #ffd666, transparent);
          opacity:.7; filter: blur(.5px);
          animation: sweep 5.5s linear infinite;
        }
        @keyframes sweep{
          0%{ transform: translateX(0) }
          100%{ transform: translateX(250%) }
        }

        /* twinkling dots */
        .sparkles{ position:absolute; inset:0; pointer-events:none }
        .sparkles i{
          position:absolute; width:4px; height:4px; border-radius:9999px;
          background:#ffe29a; opacity:.65;
          box-shadow: 0 0 10px #ffe29a, 0 0 18px rgba(255,210,120,.45);
          animation: twinkle 2.8s ease-in-out infinite;
        }
        .sparkles i:nth-child(1){ top:8%; left:12%; animation-delay:.2s }
        .sparkles i:nth-child(2){ top:20%; right:14%; animation-delay:.6s }
        .sparkles i:nth-child(3){ bottom:30%; left:18%; animation-delay:1.1s }
        .sparkles i:nth-child(4){ bottom:18%; right:22%; animation-delay:1.6s }
        .sparkles i:nth-child(5){ top:42%; left:48%; animation-delay:2.1s }
        @keyframes twinkle{ 0%,100%{opacity:.2; transform:scale(.8)} 50%{opacity:1; transform:scale(1)} }

        /* info bar (glass pill) */
        .info{
          position:absolute; left:12px; right:12px; bottom:10px;
          display:flex; gap:10px; align-items:center; justify-content:space-between;
          background: rgba(28,20,12,.82);
          border:1px solid rgba(212,175,55,.45);
          border-radius: 14px;
          padding: 8px 10px;
          color:#ffe29a; font-weight:600;
          box-shadow: 0 8px 24px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,220,140,.12);
          backdrop-filter: blur(3px);
        }
        .actions{ display:flex; gap:8px; flex-wrap:wrap }
        .btn-ghost{
          display:inline-flex; align-items:center; justify-content:center;
          padding:6px 12px; border-radius:9999px;
          border:1px solid rgba(212,175,55,.55);
          color:#f5d882; background: rgba(212,175,55,.08);
          text-decoration:none; font-weight:600; font-size:14px;
          transition: box-shadow .2s ease, background .2s ease, transform .1s ease;
        }
        .btn-ghost:hover{
          box-shadow: 0 0 18px rgba(212,175,55,.45);
          background: rgba(212,175,55,.14);
          transform: translateY(-1px);
        }

        @media (prefers-reduced-motion: reduce){
          .map-shell:hover{ transform:none }
          .map-shell::before{ animation:none }
          .sparkles i{ animation:none }
        }
      `}</style>
    </section>
  );
}
