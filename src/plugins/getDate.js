export const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function getDate(timestamp) {
    const date = new Date(timestamp)


    return {
        day: date.getDate(),
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        date
    }
}