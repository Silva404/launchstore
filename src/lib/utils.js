module.exports = {
  date(timestamp) {
    const date = new Date(timestamp)

    const day = `0${date.getDate()}`.slice(-2)
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const year = date.getFullYear()
    const minutes = date.getMinutes()
    const hours = date.getHours()

    return {
      day,
      month,
      year,
      hours,
      minutes,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }
  },
  formatPrice(price) {
    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(price / 100)
  },
  formatCpfCnpj(value) {
    value = value.replace(/\D/g, "")

    if (value.length > 14) {
      value = value.slice(0, -1)
    }

    if (value.length > 11) {
      value = value.replace(/(\d{2})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d)/, "$1/$2")
      value = value.replace(/(\d{4})(\d)/, "$1-$2")

    } else { // 080.641.843.55
      value = value.replace(/(\d{3})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d)/, "$1-$2")
    }

    return value
  },
  formatCep(value) {
    if (value.length > 9) {
      value = value.slice(0, -1)
    }

    value = value.replace(/\D/g, "")
    value = value.replace(/(\d{5})(\d)/, "$1-$2")

    return value
  }
}