//Функция которая возврвщает массив дат за период от startDate до endDate, которые фильтруются по дням недели
//и ограничены возврвщает limitDate
async function getDatesByLastDate(startDate, endDate, limitDate, days) {
  const dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate || dates.length >= 300) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates.filter((day) => {
    if (day >= limitDate) return false;
    return days.includes(day.getDay());
  });
}

//Функция которая возврвщает массив дат с указанным количество count которые 
//начинаются с startDate и фильтруются по дням недели
async function getDatesByCount(startDate, count, limitDate, days) {
  const dates = [];
  let start = 1;
  let currentDate = startDate;
  while (start <= count || currentDate >= limitDate) {
    if (days.includes(currentDate.getDay())) {
      dates.push(currentDate);
      start++;
    }
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
}

const addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export { getDatesByLastDate, getDatesByCount };
