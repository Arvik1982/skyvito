export default function dataFormat(data){

    const createData = String(data)
    const year={
      0:'января',1:'февраля',2:'мара',3:'апреля',4:'мая',5:'июня',6:'июля', 7:'августа',
      8:'сентября', 9:'октября', 10:'ноябрья', 11:'декабря'}

      const elementDate=new Date(createData) 
      const day = elementDate.getDate()
      const month = elementDate.getMonth()
      const monthName = year[month]
      const dateYear = elementDate.getFullYear()
      const fullDate = `${day.toString()} ${monthName} ${dateYear.toString()}`
      
      return fullDate
}