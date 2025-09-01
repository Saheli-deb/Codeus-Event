'use server'

import { connectMongo } from '@/lib/db'
import Registration from '@/lib/models/Registration'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:    process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

function fileOk(file: File | null) {
  if (!file) return false
  const okTypes = ['image/jpeg', 'image/png', 'application/pdf']
  return okTypes.includes(file.type) && file.size <= 5 * 1024 * 1024
}

export async function createRegistration(formData: FormData) {
  try {
    // Basic validations
    const eventsRaw = formData.getAll('events').map(String)
    if (eventsRaw.length === 0 || eventsRaw.length > 2) {
      return { ok: false, error: 'Please select up to two sub-events.' }
    }

    const leaderId = formData.get('leaderId') as File | null
    const paymentScreenshot = formData.get('paymentScreenshot') as File | null
    if (!fileOk(leaderId) || !fileOk(paymentScreenshot)) {
      return { ok: false, error: 'Invalid file type/size.' }
    }

    // Upload files to Cloudinary
    async function uploadToCloudinary(file: File, folder: string) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const res = await cloudinary.uploader.upload_stream({
        folder,
        resource_type: 'auto',
      })
      // Convert stream-based API to Promise
      return await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder, resource_type: 'auto' },
          (err, result) => (err ? reject(err) : resolve(result as any))
        )
        stream.end(buffer)
      })
    }

    const [idUpload, payUpload] = await Promise.all([
      uploadToCloudinary(leaderId!, 'code-n-cauldron/ids'),
      uploadToCloudinary(paymentScreenshot!, 'code-n-cauldron/payments'),
    ])

    await connectMongo()

    await Registration.create({
      collegeName: formData.get('collegeName'),
      leaderName: formData.get('leaderName'),
      email: formData.get('email'),
      whatsapp: formData.get('whatsapp'),
      phone: formData.get('phone'),
      leaderYear: formData.get('leaderYear'),
      leaderIdUrl: idUpload.secure_url,

      teamSize: Number(formData.get('teamSize')),
      teamName: formData.get('teamName'),

      members: [
        { name: formData.get('m1_name'), whatsapp: formData.get('m1_whatsapp'), year: formData.get('m1_year') },
        { name: formData.get('m2_name'), whatsapp: formData.get('m2_whatsapp'), year: formData.get('m2_year') },
        ...(String(formData.get('m3_name') || '').trim()
          ? [{ name: formData.get('m3_name'), whatsapp: formData.get('m3_whatsapp'), year: formData.get('m3_year') }]
          : []),
      ],

      events: eventsRaw,                // ['gen-ai', 'agentic-ai']
      paidFor: Number(formData.get('paidFor')),
      txId: formData.get('txId'),
      paymentScreenshotUrl: payUpload.secure_url,

      consent: !!formData.get('consent'),
    })

    return { ok: true }
  } catch (err: any) {
    console.error(err)
    return { ok: false, error: 'Server error.' }
  }
}
