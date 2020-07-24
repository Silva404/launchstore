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
    formatPrice(price){    
        return new Intl.NumberFormat('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }).format(price/100)
      }
}