export default function getDateDifference(date) {
    const today = new Date()
    const todayTime = today.getTime()
    const secondTime = date.date.getTime()
    return parseInt((todayTime - secondTime)/(24*3600*1000))

}