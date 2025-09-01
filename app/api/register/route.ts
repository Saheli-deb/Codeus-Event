
// // import { NextResponse } from 'next/server'
// // import { connectMongo } from '@/lib/db'
// // import Registration from '@/lib/models/Registration'
// // import { v2 as cloudinary } from 'cloudinary'

// // export const dynamic = 'force-dynamic' // don't cache
// // export const runtime = 'nodejs'

// // /** Optional Cloudinary setup (only used if all envs exist) */
// // const hasCloudinary =
// //   !!process.env.CLOUDINARY_CLOUD_NAME &&
// //   !!process.env.CLOUDINARY_API_KEY &&
// //   !!process.env.CLOUDINARY_API_SECRET

// // if (hasCloudinary) {
// //   cloudinary.config({
// //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //     api_key: process.env.CLOUDINARY_API_KEY,
// //     api_secret: process.env.CLOUDINARY_API_SECRET,
// //   })
// // }

// // async function uploadToCloudinary(file: File, folder: string) {
// //   if (!hasCloudinary || !file || file.size === 0) return null

// //   const buffer = Buffer.from(await file.arrayBuffer())

// //   // use upload_stream so we don't write temp files
// //   const res: any = await new Promise((resolve, reject) => {
// //     const stream = cloudinary.uploader.upload_stream(
// //       { folder, resource_type: 'image' },
// //       (error, result) => (error ? reject(error) : resolve(result))
// //     )
// //     stream.end(buffer)
// //   })

// //   return res?.secure_url ?? null
// // }

// // export async function POST(req: Request) {
// //   try {
// //     const form = await req.formData()

// //     // leader + team
// //     const collegeName = (form.get('collegeName') as string)?.trim()
// //     const teamName = (form.get('teamName') as string)?.trim()
// //     const leaderName = (form.get('leaderName') as string)?.trim()
// //     const leaderEmail = (form.get('leaderEmail') as string)?.trim()
// //     const leaderWhatsapp = (form.get('leaderWhatsapp') as string)?.trim()
// //     const leaderPhone = (form.get('leaderPhone') as string)?.trim()
// //     const leaderYear = (form.get('leaderYear') as string)?.trim()

// //     // members (2 required, 3rd optional)
// //     const teamSize = Number(form.get('teamSize') || 2)

// //     const members = [
// //       {
// //         name: (form.get('member1_name') as string)?.trim(),
// //         whatsapp: (form.get('member1_whatsapp') as string)?.trim(),
// //         year: (form.get('member1_year') as string)?.trim(),
// //       },
// //       {
// //         name: (form.get('member2_name') as string)?.trim(),
// //         whatsapp: (form.get('member2_whatsapp') as string)?.trim(),
// //         year: (form.get('member2_year') as string)?.trim(),
// //       },
// //     ] as Array<{ name: string; whatsapp: string; year: string }>

// //     if (teamSize === 3) {
// //       members.push({
// //         name: ((form.get('member3_name') as string) || '').trim(),
// //         whatsapp: ((form.get('member3_whatsapp') as string) || '').trim(),
// //         year: ((form.get('member3_year') as string) || '').trim(),
// //       })
// //     }

// //     // events (max 2)
// //     const events = form.getAll('events').map((v) => String(v))
// //     if (events.length < 1 || events.length > 2) {
// //       return NextResponse.json(
// //         { ok: false, message: 'Select 1 or 2 events.' },
// //         { status: 400 }
// //       )
// //     }

// //     // payment
// //     const transactionId = (form.get('transactionId') as string)?.trim()
// //     const paymentScreenshot = form.get('paymentScreenshot') as File | null
// //     const leaderId = form.get('leaderId') as File | null

// //     const amount = events.length === 1 ? 150 : 300

// //     // upload files if configured
// //     const [leaderIdUrl, paymentScreenshotUrl] = await Promise.all([
// //       leaderId ? uploadToCloudinary(leaderId, 'code-cauldron/ids') : null,
// //       paymentScreenshot
// //         ? uploadToCloudinary(paymentScreenshot, 'code-cauldron/payments')
// //         : null,
// //     ])

// //     // minimal validation
// //     if (
// //       !collegeName ||
// //       !teamName ||
// //       !leaderName ||
// //       !leaderEmail ||
// //       !leaderWhatsapp ||
// //       !leaderPhone ||
// //       !leaderYear
// //     ) {
// //       return NextResponse.json(
// //         { ok: false, message: 'Please fill all required fields.' },
// //         { status: 400 }
// //       )
// //     }

// //     if (teamSize < 2 || teamSize > 3) {
// //       return NextResponse.json(
// //         { ok: false, message: 'Team size must be 2 or 3.' },
// //         { status: 400 }
// //       )
// //     }

// //     await connectMongo()

// //     const doc = await Registration.create({
// //       collegeName,
// //       teamName,
// //       leader: {
// //         name: leaderName,
// //         email: leaderEmail,
// //         whatsapp: leaderWhatsapp,
// //         phone: leaderPhone,
// //         year: leaderYear,
// //         idImageUrl: leaderIdUrl,
// //       },
// //       teamSize,
// //       members,
// //       events,
// //       payment: {
// //         amount,
// //         transactionId,
// //         screenshotUrl: paymentScreenshotUrl,
// //       },
// //     })

// //     return NextResponse.json({ ok: true, id: String(doc._id) })
// //   } catch (err: any) {
// //     console.error('Register POST error:', err)
// //     return NextResponse.json(
// //       { ok: false, message: err?.message || 'Server error' },
// //       { status: 500 }
// //     )
// //   }
// // }
// // import { NextResponse } from 'next/server'
// // import { connectMongo } from '@/lib/db'
// // import Registration from '@/lib/models/Registration'
// // import { v2 as cloudinary } from 'cloudinary'

// // export const dynamic = 'force-dynamic'
// // export const runtime = 'nodejs'

// // const hasCloudinary =
// //   !!process.env.CLOUDINARY_CLOUD_NAME &&
// //   !!process.env.CLOUDINARY_API_KEY &&
// //   !!process.env.CLOUDINARY_API_SECRET

// // if (hasCloudinary) {
// //   cloudinary.config({
// //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //     api_key: process.env.CLOUDINARY_API_KEY,
// //     api_secret: process.env.CLOUDINARY_API_SECRET,
// //   })
// // }

// // async function uploadToCloudinary(file: File | null, folder: string) {
// //   if (!hasCloudinary || !file || file.size === 0) return null
// //   const buffer = Buffer.from(await file.arrayBuffer())
// //   const res: any = await new Promise((resolve, reject) => {
// //     const stream = cloudinary.uploader.upload_stream(
// //       { folder, resource_type: 'image' },
// //       (error, result) => (error ? reject(error) : resolve(result))
// //     )
// //     stream.end(buffer)
// //   })
// //   return res?.secure_url ?? null
// // }

// // // --- helper to read the first present field name
// // const getStr = (f: FormData, ...keys: string[]) => {
// //   for (const k of keys) {
// //     const v = f.get(k)
// //     if (typeof v === 'string' && v.trim()) return v.trim()
// //   }
// //   return ''
// // }
// // const getFile = (f: FormData, ...keys: string[]) => {
// //   for (const k of keys) {
// //     const v = f.get(k)
// //     if (v instanceof File) return v
// //   }
// //   return null
// // }

// // export async function POST(req: Request) {
// //   try {
// //     const form = await req.formData()

// //     // ---- read both old and new field names ----
// //     const collegeName   = getStr(form, 'collegeName', 'college')
// //     const teamName      = getStr(form, 'teamName')

// //     const leaderName    = getStr(form, 'leaderName', 'leader.name')
// //     const leaderEmail   = getStr(form, 'leaderEmail', 'leader.email')
// //     const leaderWhatsapp= getStr(form, 'leaderWhatsapp', 'leader.whatsapp')
// //     const leaderPhone   = getStr(form, 'leaderPhone', 'leader.phone')
// //     const leaderYear    = getStr(form, 'leaderYear', 'leader.year')

// //     const teamSize      = Number(getStr(form, 'teamSize')) || 2

// //     // members (from dot-notation fields used in the form)
// //     const members = [
// //       {
// //         name:     getStr(form, 'member1_name', 'member1.name'),
// //         whatsapp: getStr(form, 'member1_whatsapp', 'member1.whatsapp'),
// //         year:     getStr(form, 'member1_year', 'member1.year'),
// //       },
// //       {
// //         name:     getStr(form, 'member2_name', 'member2.name'),
// //         whatsapp: getStr(form, 'member2_whatsapp', 'member2.whatsapp'),
// //         year:     getStr(form, 'member2_year', 'member2.year'),
// //       },
// //     ] as Array<{ name: string; whatsapp: string; year: string }>

// //     if (teamSize === 3) {
// //       members.push({
// //         name:     getStr(form, 'member3_name', 'member3.name'),
// //         whatsapp: getStr(form, 'member3_whatsapp', 'member3.whatsapp'),
// //         year:     getStr(form, 'member3_year', 'member3.year'),
// //       })
// //     }

// //     // events: normalize old keys -> schema enum
// //     const normalizeEvent = (s: string) =>
// //       ({ genai: 'gen-ai', agentic: 'agentic-ai', nocode: 'no-code' } as Record<string,string>)[s] || s

// //     const events = form.getAll('events').map(v => normalizeEvent(String(v))).slice(0, 2)
// //     if (events.length < 1 || events.length > 2) {
// //       return NextResponse.json({ ok: false, message: 'Select 1 or 2 events.' }, { status: 400 })
// //     }

// //     // payment
// //     const transactionId = getStr(form, 'transactionId', 'txnId')
// //     const amountFromForm = Number(getStr(form, 'amount', 'payable')) || 0
// //     const computedAmount = events.length === 1 ? 150 : 300
// //     const amount = amountFromForm || computedAmount

// //     const leaderIdFile         = getFile(form, 'leaderId', 'leader.idImage')
// //     const paymentScreenshotFile= getFile(form, 'paymentScreenshot')

// //     const [leaderIdUrl, paymentScreenshotUrl] = await Promise.all([
// //       uploadToCloudinary(leaderIdFile, 'code-cauldron/ids'),
// //       uploadToCloudinary(paymentScreenshotFile, 'code-cauldron/payments'),
// //     ])

// //     // minimal validation aligned with your UI
// //     if (!collegeName || !teamName || !leaderName || !leaderEmail ||
// //         !leaderWhatsapp || !leaderPhone || !leaderYear) {
// //       return NextResponse.json(
// //         { ok: false, message: 'Please fill all required fields.' },
// //         { status: 400 }
// //       )
// //     }
// //     if (teamSize < 2 || teamSize > 3) {
// //       return NextResponse.json(
// //         { ok: false, message: 'Team size must be 2 or 3.' },
// //         { status: 400 }
// //       )
// //     }

// //     await connectMongo()

// //     const doc = await Registration.create({
// //       collegeName,
// //       teamName,
// //       leader: {
// //         name: leaderName,
// //         email: leaderEmail,
// //         whatsapp: leaderWhatsapp,
// //         phone: leaderPhone,
// //         year: leaderYear,
// //         idImageUrl: leaderIdUrl || undefined,
// //       },
// //       teamSize,
// //       members,
// //       events,
// //       payment: {
// //         amount,
// //         transactionId: transactionId || undefined,
// //         screenshotUrl: paymentScreenshotUrl || undefined,
// //       },
// //     })

// //     return NextResponse.json({ ok: true, id: String(doc._id) })
// //   } catch (err: any) {
// //     console.error('Register POST error:', err)
// //     return NextResponse.json(
// //       { ok: false, message: err?.message || 'Server error' },
// //       { status: 500 }
// //     )
// //   }
// // }
// // app/api/register/route.ts
// import { NextResponse } from 'next/server'
// import { connectMongo } from '@/lib/db'
// import Registration from '@/lib/models/Registration'
// import { v2 as cloudinary } from 'cloudinary'

// export const dynamic = 'force-dynamic'
// export const runtime = 'nodejs'

// // Cloudinary is optional
// const hasCloudinary =
//   !!process.env.CLOUDINARY_CLOUD_NAME &&
//   !!process.env.CLOUDINARY_API_KEY &&
//   !!process.env.CLOUDINARY_API_SECRET

// if (hasCloudinary) {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//     api_key: process.env.CLOUDINARY_API_KEY!,
//     api_secret: process.env.CLOUDINARY_API_SECRET!,
//   })
// }

// async function uploadToCloudinary(file: File | null, folder: string) {
//   if (!hasCloudinary || !file || file.size === 0) return null
//   const buffer = Buffer.from(await file.arrayBuffer())
//   const res: any = await new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder, resource_type: 'image' },
//       (err, result) => (err ? reject(err) : resolve(result))
//     )
//     stream.end(buffer)
//   })
//   return res?.secure_url ?? null
// }

// export async function POST(req: Request) {
//   try {
//     const form = await req.formData()

//     // Core fields (names MUST match the form below)
//     const collegeName = String(form.get('collegeName') || '').trim()
//     const teamName    = String(form.get('teamName') || '').trim()

//     const leader = {
//       name:     String(form.get('leader.name') || '').trim(),
//       email:    String(form.get('leader.email') || '').trim(),
//       whatsapp: String(form.get('leader.whatsapp') || '').trim(),
//       phone:    String(form.get('leader.phone') || '').trim(),
//       year:     String(form.get('leader.year') || '').trim(),
//     }

//     const teamSize = Number(form.get('teamSize') || 2)

//     const members = [
//       {
//         name:     String(form.get('member1.name') || '').trim(),
//         whatsapp: String(form.get('member1.whatsapp') || '').trim(),
//         year:     String(form.get('member1.year') || '').trim(),
//       },
//       {
//         name:     String(form.get('member2.name') || '').trim(),
//         whatsapp: String(form.get('member2.whatsapp') || '').trim(),
//         year:     String(form.get('member2.year') || '').trim(),
//       },
//     ] as Array<{ name: string; whatsapp: string; year: string }>

//     if (teamSize === 3) {
//       members.push({
//         name:     String(form.get('member3.name') || '').trim(),
//         whatsapp: String(form.get('member3.whatsapp') || '').trim(),
//         year:     String(form.get('member3.year') || '').trim(),
//       })
//     }

//     // events: only allowed values
//     const events = form.getAll('events').map(v => String(v))
//     if (events.length < 1 || events.length > 2) {
//       return NextResponse.json({ ok: false, message: 'Select 1 or 2 events.' }, { status: 400 })
//     }

//     // payment & files
//     const transactionId = String(form.get('transactionId') || '').trim()
//     const amount = events.length === 1 ? 150 : 300

//     const leaderIdFile          = form.get('leader.idImage') as File | null
//     const paymentScreenshotFile = form.get('paymentScreenshot') as File | null

//     const [leaderIdUrl, paymentScreenshotUrl] = await Promise.all([
//       uploadToCloudinary(leaderIdFile, 'triwizard/ids'),
//       uploadToCloudinary(paymentScreenshotFile, 'triwizard/payments'),
//     ])

//     // required checks
//     if (!collegeName || !teamName || !leader.name || !leader.email || !leader.whatsapp || !leader.phone || !leader.year) {
//       return NextResponse.json({ ok: false, message: 'Please fill all required fields.' }, { status: 400 })
//     }
//     if (teamSize < 2 || teamSize > 3) {
//       return NextResponse.json({ ok: false, message: 'Team size must be 2 or 3.' }, { status: 400 })
//     }

//     await connectMongo()

//     const doc = await Registration.create({
//       collegeName,
//       teamName,
//       leader: { ...leader, idImageUrl: leaderIdUrl || undefined },
//       teamSize,
//       members,
//       events,
//       payment: {
//         amount,
//         transactionId: transactionId || undefined,
//         screenshotUrl: paymentScreenshotUrl || undefined,
//       },
//     })

//     return NextResponse.json({ ok: true, id: String(doc._id) })
//   } catch (err: any) {
//     console.error('Register POST error:', err)
//     return NextResponse.json({ ok: false, message: err?.message || 'Server error' }, { status: 500 })
//   }
// }
import { NextResponse } from 'next/server'
import { connectMongo } from '@/lib/db'
import Registration from '@/lib/models/Registration'
import { v2 as cloudinary } from 'cloudinary'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Cloudinary (optional)
const hasCloudinary =
  !!process.env.CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  })
}

async function uploadToCloudinary(file: File | null, folder: string) {
  if (!hasCloudinary || !file || file.size === 0) return null
  const buffer = Buffer.from(await file.arrayBuffer())
  const res: any = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (err, result) => (err ? reject(err) : resolve(result))
    )
    stream.end(buffer)
  })
  return res?.secure_url ?? null
}

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    const collegeName = String(form.get('collegeName') || '').trim()
    const teamName    = String(form.get('teamName') || '').trim()

    const leader = {
      name:     String(form.get('leader.name') || '').trim(),
      email:    String(form.get('leader.email') || '').trim(),
      whatsapp: String(form.get('leader.whatsapp') || '').trim(),
      phone:    String(form.get('leader.phone') || '').trim(),
      year:     String(form.get('leader.year') || '').trim(),
    }

    const teamSize = Number(form.get('teamSize') || 2)

    const members = [
      { name: String(form.get('member1.name') || '').trim(),
        whatsapp: String(form.get('member1.whatsapp') || '').trim(),
        year: String(form.get('member1.year') || '').trim() },
      { name: String(form.get('member2.name') || '').trim(),
        whatsapp: String(form.get('member2.whatsapp') || '').trim(),
        year: String(form.get('member2.year') || '').trim() },
    ] as Array<{ name: string; whatsapp: string; year: string }>

    if (teamSize === 3) {
      members.push({
        name: String(form.get('member3.name') || '').trim(),
        whatsapp: String(form.get('member3.whatsapp') || '').trim(),
        year: String(form.get('member3.year') || '').trim(),
      })
    }

    const events = form.getAll('events').map(v => String(v))
    if (events.length < 1 || events.length > 2) {
      return NextResponse.json({ ok: false, message: 'Select 1 or 2 events.' }, { status: 400 })
    }

    const transactionId = String(form.get('transactionId') || '').trim()
    const leaderIdFile          = form.get('leader.idImage') as File | null
    const paymentScreenshotFile = form.get('paymentScreenshot') as File | null

    // *** Make payment mandatory ***
    if (!transactionId || !paymentScreenshotFile || paymentScreenshotFile.size === 0) {
      return NextResponse.json(
        { ok: false, message: 'Payment is required (transaction ID and screenshot).' },
        { status: 400 }
      )
    }

    const amount = events.length === 1 ? 150 : 300

    const [leaderIdUrl, paymentScreenshotUrl] = await Promise.all([
      uploadToCloudinary(leaderIdFile, 'triwizard/ids'),
      uploadToCloudinary(paymentScreenshotFile, 'triwizard/payments'),
    ])

    if (!collegeName || !teamName || !leader.name || !leader.email || !leader.whatsapp || !leader.phone || !leader.year) {
      return NextResponse.json({ ok: false, message: 'Please fill all required fields.' }, { status: 400 })
    }
    if (teamSize < 2 || teamSize > 3) {
      return NextResponse.json({ ok: false, message: 'Team size must be 2 or 3.' }, { status: 400 })
    }

    await connectMongo()

    const doc = await Registration.create({
      collegeName,
      teamName,
      leader: { ...leader, idImageUrl: leaderIdUrl || undefined },
      teamSize,
      members,
      events,
      payment: {
        amount,
        transactionId,
        screenshotUrl: paymentScreenshotUrl || undefined,
      },
    })

    return NextResponse.json({ ok: true, id: String(doc._id) })
  } catch (err: any) {
    console.error('Register POST error:', err)
    return NextResponse.json({ ok: false, message: err?.message || 'Server error' }, { status: 500 })
  }
}
