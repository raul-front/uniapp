import { showToastError } from '@/utils/func'
import { uniUploadFile } from '@/utils/uni'

// 上传图片
export const uploadImage = (filePath, loading = true) => {
  return uniUploadFile('/common/upload/image', filePath, loading).then(res => {
    if (res.image_url) {
      return Promise.resolve(res.image_url)
    } else {
      loading && showToastError('上传失败')
      return Promise.reject(new Error())
    }
  })
}
