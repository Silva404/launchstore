// const input = document.querySelector('input[name=price]')
// input.addEventListener('keydown', e => {
//   setTimeout(() => {
//     let { value } = e.target

//     value = value.replace(/\D/g, '')

//     value = new Intl.NumberFormat('pt-br', {
//       style: 'currency',
//       currency: 'BRL'
//     }).format(value/100)

//     e.target.value = value
//   }, 1)
// })

const Mask = {
  apply(input, func){
    setTimeout(() => {
      input.value = Mask[func](input.value)
    }, 1)
  },
  convertBRL(value){
    value = value.replace(/\D/g, '')

    value = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(value/100)
  }
}