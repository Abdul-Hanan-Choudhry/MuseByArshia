export function getPaintingUrl(
  publicId: string,
  opts?: { width?: number; quality?: number; format?: 'auto' | 'webp' }
) {
  const { width = 800, quality = 80, format = 'auto' } = opts ?? {}
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},q_${quality},f_${format}/${publicId}`
}

export function isCloudinaryUrl(url: string): boolean {
  return url.includes('cloudinary.com')
}
