import moment from 'moment-business-days';

moment.updateLocale('', {
    workingWeekdays: [1, 2, 3, 4, 5]
 });


export const getBusinessDayDifference = ({today, applied_date}) =>{
    return moment(today, 'MM-DD-YYYY').businessDiff(moment(applied_date,'MM-DD-YYYY'), true);
}