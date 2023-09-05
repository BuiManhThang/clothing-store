import baseApi from '@/apis/baseApi'

export const uploadFiles = async (files) => {
  try {
    const formData = new FormData()
    const filesLength = files.length
    if (!filesLength) return []
    for (let index = 0; index < filesLength; index++) {
      const file = files[index]
      formData.append('files', file)
    }
    const res = await baseApi.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const generateFileNameUrl = (fileName) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${fileName}`
}
