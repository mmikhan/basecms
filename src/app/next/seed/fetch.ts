export const fetchFileByURL = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  const extension = url.split('.').pop()?.toLowerCase()
  let mimetype = `image/${extension}`

  if (extension === 'jpg') {
    mimetype = 'image/jpeg'
  } else if (extension === 'svg') {
    mimetype = 'image/svg+xml'
  }

  return {
    name: url.split('/').pop() ?? `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype,
    size: data.byteLength,
  }
}
