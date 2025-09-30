import { fileTypeFromBuffer } from 'file-type'

export const fetchFileByURL = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)

  const data = await res.arrayBuffer()
  const buffer = Buffer.from(data)

  const fileType = await fileTypeFromBuffer(buffer)

  return {
    name: url.split('/').pop() ?? `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: fileType?.mime ?? 'application/octet-stream',
    size: data.byteLength,
  }
}
