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
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 6,
  input: '',
  files: [],
  handleFileInput(event) {
    const { files: fileList } = event.target  
    this.input = event.target
    
    if (this.hasLimit(event)) return

    Array.from(fileList).forEach(file => {
      this.files.push(file)

      const reader = new FileReader

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)
    
        const div = this.createContainer(image)
  
        PhotosUpload.preview.appendChild(div)             
      } 

      reader.readAsDataURL(file)
    })

    this.input.files = this.getAllFiles()
  },
  createContainer(image) {
    const div = document.createElement('div')
    div.classList.add('photo')

    div.onclick = this.removePhoto

    div.appendChild(image)      
    div.appendChild(this.getRemoveButton())

    return div
  },
  hasLimit(event) {
    const { uploadLimit, input: fileList } = PhotosUpload

    if (fileList.length > uploadLimit) {
      alert(`Upload limit ${PhotosUpload.uploadLimit}`)
      event.preventDefault()
      return true
    }

    return false
  },
  getRemoveButton() {
    const remove = document.createElement('i')
    remove.classList.add('material-icons')
    remove.innerHTML = 'close'

    return remove
  },
  getAllFiles(){
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer()

    this.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode // <i> event e o parentNode é a div acima
    const photosArray = Array.from(PhotosUpload.preview.children) // todos os elementos
    const index = photosArray.indexOf(photoDiv)

    console.log(PhotosUpload.preview)

    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()

    photoDiv.remove()
  }
} 