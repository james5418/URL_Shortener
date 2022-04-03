const moment = require('moment');

const check_date = (expire_date) => {
    let valid = moment(expire_date, "YYYY-MM-DDTHH:mm:ssZ", true).isValid();
    let now = new Date();
    let isafter = moment(expire_date).isAfter(now);

    return (valid&&isafter ? true : false);
}

module.exports = check_date;