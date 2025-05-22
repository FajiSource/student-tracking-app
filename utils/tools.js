export const getDayByID = (day) => {
    switch (day) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return '';
    }
}

export const getYearName = (year) => {
    switch (year) {
        case 1:
            return '1st Year';
        case 2:
            return '2nd Year';
        case 3:
            return '3rd Year';
        case 4:
            return '4th Year';
        default:
            return '';
    }
}

export const yearlist = [
    {
        "id": 1,
        "level": 1,

    },
    {
        "id": 2,
        "level": 2,

    },
    {
        "id": 3,
        "level": 3,

    },
    {
        "id": 4,
        "level": 4,

    }
];


export const formatDateForLaravel = (date) => {
    const pad = (n, z = 2) => ('00' + n).slice(-z);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${(date.getMilliseconds() * 1000).toString().padStart(6, '0')}`;
};
