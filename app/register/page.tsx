
// import type { Metadata } from 'next'
// import RegisterForm from '@/components/RegisterForm'
// import RegistrationAssistant from '@/components/RegistrationAssistant'

// export const metadata: Metadata = {
//   title: 'Register Now — The Triwizard Trials',
//   description: 'Register your team (2–3 including leader) for up to 2 events.',
// }

// export default function RegisterPage() {
//   return (
//     <main className="relative min-h-screen">
//       {/* Fixed wallpaper layer */}
//       <div className="register-bg" />

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
//         <h1 className="font-hpTitle text-gold text-3xl sm:text-4xl md:text-5xl mb-6">
//           Registration Form
//         </h1>

//         {/* NO bg-black here */}
//         <RegisterForm />
//       </div>

//       <RegistrationAssistant />
//     </main>
//   )
// }
// app/register/page.tsx
import type { Metadata } from 'next'
import RegisterForm from '@/components/RegisterForm'
import RegistrationAssistant from '@/components/RegistrationAssistant' // if you have it

export const metadata: Metadata = {
  title: 'Register Now — The Triwizard Trials',
  description: 'Register your team (2–3 including leader) for up to 2 events.',
}

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen">
      {/* fixed background layer from your globals.css .register-bg */}
      <div className="register-bg" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <h1 className="font-hpTitle text-gold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-center sm:text-left">
          Registration Form
        </h1>
        <RegisterForm />
      </div>
      {/* optional helper */}
      <RegistrationAssistant />
    </main>
  )
}
