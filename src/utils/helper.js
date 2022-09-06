import dayjs from 'dayjs';



export const isNumber = (n) => {

    return !isNaN(parseFloat(n)) && isFinite(n);
}


export const formatDate = (date) => {
    return dayjs(date).format('DD.MM.YYYY HH:mm')
}

export const exFormatDate = (date, format) => {
    return dayjs(date).format(format)
}

// export const formatHourMinute = (time) => {
//     return `${dayjs().hour(time)}:${dayjs().minute(time)}`
// }

export const format = (date) => {
    return dayjs(date)
}