export const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function getDate(timestamp) {
    const date = new Date(timestamp)

    return {
        day: date.getDate(),
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
        hours: checkTime(date.getHours()),
        minutes: checkTime(date.getMinutes()),
        date
    }
}

function checkTime(time) {
    if (time < 10) {
        return '0' + time
    }
    return time
}