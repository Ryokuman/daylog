function getFirstDay(date) {
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDay = firstDate.getDay();
  return firstDay;
}

function getLastDay(date) {
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const lastDay = lastDate.getDay();
  return lastDay;
}

function getFullDate(date) {
  const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const fulldate = newDate.getDate();
  return fulldate;
}

function getNumberOfWeeks(date) {
  const firstDay = getFirstDay(date);
  const fullDate = getFullDate(date);
  const weeks = Math.ceil((firstDay + fullDate) / 7);

  return weeks;
}

function getFirstWeek(date) {
  const firstDay = getFirstDay(date);
  const firstWeek = [];

  for (let i = firstDay; i > 0; i--) {
    firstWeek.push(false);
  }

  for (let i = 7 - firstDay; i > 0; i--) {
    firstWeek.push(true);
  }

  return firstWeek;
}

function getLastWeek(date) {
  const firstDay = getFirstDay(date);
  const fullDate = getFullDate(date);
  const lastWeekDate = (firstDay + fullDate) % 7;
  const lastWeek = [];

  for (let i = lastWeekDate; i > 0; i--) {
    lastWeek.push(true);
  }

  for (let i = 7 - lastWeekDate; i > 0; i--) {
    lastWeek.push(false);
  }

  return lastWeek;
}

function getMiddleWeeks(date) {
  const middleWeekCount = getNumberOfWeeks(date) - 2;
  const weeks = [true, true, true, true, true, true, true];
  const middleWeeks = [];

  for (let i = middleWeekCount; i > 0; i--) {
    middleWeeks.push(...weeks);
  }

  return middleWeeks;
}

function getFullMonth(date) {
  const fullMonth = getFirstWeek(date).concat(getMiddleWeeks(date), getLastWeek(date));
  return fullMonth;
}

function addMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const newDate = new Date(year, month + 1);

  return newDate;
}

function subMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const newDate = new Date(year, month - 1);

  return newDate;
}

export {
  addMonth,
  subMonth,
  getLastWeek,
  getNumberOfWeeks,
  getFirstDay,
  getFullDate,
  getFirstWeek,
  getLastDay,
  getMiddleWeeks,
  getFullMonth,
};
