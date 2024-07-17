import { FormatDateProps, FormatTimeProps, DateSlot } from '@/types'
import { format, isValid, parse } from 'date-fns'
import { vi } from 'date-fns/locale'
import Decimal from 'decimal.js'
import currency from 'currency.js'

export const FormatDate: React.FC<FormatDateProps> = ({ dateString }) => {
  try {
    const dateParts = dateString.split('/')
    const day = parseInt(dateParts[0], 10)
    const month = parseInt(dateParts[1], 10)
    const year = parseInt(dateParts[2], 10)

    const date = new Date(year, month - 1, day)

    const formattedDate = format(date, "cccc, 'ngày' dd 'tháng' MM, yyyy", { locale: vi })

    return formattedDate
  } catch (error) {
    //console.log("Error formatting date: ", error)
    return ""
  }
}

export function formatDateFunc(dateString: string): string {
  try {
    const dateParts = dateString.split('/')
    const day = parseInt(dateParts[0], 10)
    const month = parseInt(dateParts[1], 10)
    const year = parseInt(dateParts[2], 10)

    const date = new Date(year, month - 1, day)

    const formattedDate = format(date, "cccc 'ngày' dd 'tháng' MM 'năm' yyyy", { locale: vi })

    return formattedDate
  } catch (error) {
    //console.log("Error formatting date: ", error)
    return ""
  }
}

export function getDates(dateString: string): string[] {
  try {
    const [days, months, years] = dateString.split("/").map(part => part.split(";"))
    const dates: string[] = []
    let lastDay = 0
    let currentMonthIndex = 0

    for (let i = 0; i < days.length; i++) {
      let day = parseInt(days[i])
      let month = parseInt(months[currentMonthIndex])
      const year = parseInt(years[i % years.length])

      if (day < lastDay) {
        currentMonthIndex++
        month = parseInt(months[currentMonthIndex % months.length])
      }

      const parsedDate = parse(`${day}/${month}/${year}`, "dd/MM/yyyy", new Date())
      if (isValid(parsedDate)) {
        dates.push(format(parsedDate, "dd/MM/yyyy"))
      }

      lastDay = day
    }

    return dates
  } catch (error) {
    //console.log("Error formatting get dates: ", error)
    return []
  }
}

export const GetFirstDate: React.FC<{ dateString: string }> = ({ dateString }) => {
  try {
    const [days, months, years] = dateString.split("/").map(part => part.split(";"))
    const dates: string[] = []
    let lastDay = 0
    let currentMonthIndex = 0

    for (let i = 0; i < days.length; i++) {
      let day = parseInt(days[i])
      let month = parseInt(months[currentMonthIndex])
      const year = parseInt(years[i % years.length])

      if (day < lastDay) {
        currentMonthIndex++
        month = parseInt(months[currentMonthIndex % months.length])
      }

      const parsedDate = parse(`${day}/${month}/${year}`, "dd/MM/yyyy", new Date())
      if (isValid(parsedDate)) {
        dates.push(format(parsedDate, "dd/MM/yyyy"))
      }

      lastDay = day
    }

    const firstDate: string | undefined = dates[0]

    return firstDate
  } catch (error) {
    //console.log("Error formatting get first date: ", error)
    return ""
  }
}

export const FormatTime: React.FC<FormatTimeProps> = ({ timeString }) => {
  try {
    const formattedTime = timeString.replace(":", "h")

    return formattedTime
  } catch (error) {
    //console.log("Error formatting time: ", error)
    return ""
  }
}

export function formatTimeFunc(timeString: string): string {
  try {
    const formattedTime = timeString.replace(":", "h")

    return formattedTime
  } catch (error) {
    //console.log("Error formatting time: ", error)
    return ""
  }
}

export function formatMoney(data: Decimal): string {
  try {
    const numberValue = data.toNumber()
    const roundedNumber = Math.round(numberValue)
    const formattedNumber = currency(roundedNumber, { symbol: "", separator: ".", decimal: ",", precision: 0 }).format()
    return formattedNumber + " VNĐ"
  } catch (error) {
    //console.log("Error formatting money: ", error)
    return ""
  }
}

export function formatAddress(data: string): string[] {
  try {
    const address = data.split(",")

    return address
  } catch (error) {
    //console.log("Error formatting address: ", error)
    return []
  }
}

export function formatURL(data: string): string[] {
  try {
    const url = data.split(";").filter(item => item !== "")

    return url
  } catch (error) {
    //console.log("Error formatting url: ", error)
    return []
  }
}

export function parseSlots(value: string[]): DateSlot[] {
  return value.map((item) => {
    const [date, slot] = item.split(":")
    return { date, slot: Number(slot) }
  })
}

export function processBase64Image(dataString: string) {
  const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  if (matches === null || matches.length !== 3) {
    return dataString
  }
  return matches[2];
}

export function removeVietnameseTones(str: string) {
  str = str.trim().toLowerCase()
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  str = str.replace(/(đ)/g, 'd');
  return str
}
