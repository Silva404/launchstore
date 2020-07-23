const Mask = {
  apply(input, func) {
    setTimeout(() => {
      input.value = Mask[func](input.value)
    }, 1)
  },
  formatBRL(value) {
    value = value.replace(/\D/g, '')

    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(value / 100)
  }
}

const PhotosUpload = {
  input: '',
  preview: document.querySelector('#photos-preview'),
  files: [],
  uploadLimit: 6,
  handleFileInput(event) {
    const { files: fileList } = event.target    
    PhotosUpload.input = event.target

    if (PhotosUpload.hasLimit(event)) return

    Array.from(fileList).forEach(file => {
      const reader = new FileReader()

      PhotosUpload.files.push(file)
      console.log(this.files)

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const div = PhotosUpload.getContainer(image)

        PhotosUpload.preview.appendChild(div)
      }

      reader.readAsDataURL(file)
    })

    PhotosUpload.input.files = PhotosUpload.getAllFiles()
  },
  hasLimit(event) {
    const { uploadLimit, input: fileList } = PhotosUpload
    // const { files: fileList } = event.target

    if (fileList.length > uploadLimit) {
      alert(`Selecione no máximo ${uploadLimit} fotos`)
      event.preventDefault()
      return true
    }

    return false
  },
  getAllFiles() {
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer()

    PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },
  getContainer(image) {
    const div = document.createElement('div')
    div.classList.add('photo')
    div.onclick = this.removePhoto
    div.appendChild(image)
    div.appendChild(this.getRemoveButton())

    return div
  },
  getRemoveButton() {
    const remove = document.createElement('i')
    remove.classList.add('material-icons')
    remove.innerHTML = 'close'

    return remove
  },
  removePhoto(event) {
    // event.target = i e um item acima dele = img
    const photoDiv = event.target.parentNode
    const photosArray = Array.from(PhotosUpload.preview)

    const index = photosArray.indexOf(photoDiv)
    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()


    photoDiv.remove()
  }
}