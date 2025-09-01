// components/RegistrationAssistant.tsx
'use client'

import { useEffect, useState } from 'react'

export default function RegistrationAssistant() {
  const [open, setOpen] = useState(false)

  // keep away from your music toggle (bottom-right); we sit bottom-left
  return (
    <div className="fixed bottom-5 left-4 z-[120]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          w-12 h-12 rounded-full border border-gold/40 bg-black/70
          flex items-center justify-center
          shadow-[0_0_20px_rgba(212,175,55,.35)]
          hover:bg-gold/10 transition
        "
        aria-label="Open registration helper"
        title="Need help?"
      >
        {/* hat icon */}
        <span className="text-gold text-xl">🎩</span>
      </button>

      {open && (
        <div
          className="
            mt-3 w-[300px] sm:w-[360px]
            rounded-2xl border border-gold/25 bg-black/80 backdrop-blur
            p-4 text-sm leading-relaxed shadow-[0_0_35px_rgba(212,175,55,.18)]
          "
        >
          <p className="font-semibold text-gold mb-2">
            Quick tips for registration
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Team size must be 2 or 3 members.</li>
            <li>You may pick up to <b>two</b> events.</li>
            <li>
              Pay ₹150 (one event) or ₹300 (two events), enter the{' '}
              <b>Transaction ID</b>, and upload a payment screenshot.
            </li>
            <li>Leader must upload a photo of a valid college ID.</li>
          </ul>
          <div className="flex gap-2 mt-3">
            <button
              className="px-3 py-2 rounded-lg border border-gold/35 hover:bg-gold/10"
              onClick={() =>
                document
                  .querySelector<HTMLInputElement>('input[name="collegeName"]')
                  ?.focus()
              }
            >
              Start filling
            </button>
            <button
              className="px-3 py-2 rounded-lg border border-gold/35 hover:bg-gold/10"
              onClick={() => setOpen(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
