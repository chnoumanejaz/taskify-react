export function calculateTimeDifference(targetDate) {
  const currentDate = new Date();
  const target = new Date(targetDate);
  const timeDifference = target - currentDate;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); 

  if (daysDifference <= 0) {
    return 'Today';
  } else if (daysDifference === 1) {
    return 'Tomorrow';
  } else if (daysDifference <= 7) {
    return `After ${daysDifference} days`;
  } else if (daysDifference <= 14) {
    return 'After 1 week';
  } else if (daysDifference <= 21) {
    return 'After 2 weeks';
  } else {
    const numberOfWeeks = Math.floor(daysDifference / 7);
    return `After ${numberOfWeeks} weeks`;
  }
}
