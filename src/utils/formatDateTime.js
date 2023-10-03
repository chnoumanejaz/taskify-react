export function formatDateTime(dateString) {
  const currentDate = new Date();
  const parsedDate = new Date(dateString);

  const timeDifference = currentDate - parsedDate;
  const secondsDifference = timeDifference / 1000;
  const minutesDifference = secondsDifference / 60;
  const hoursDifference = minutesDifference / 60;
  const daysDifference = hoursDifference / 24;
  const monthsDifference = daysDifference / 30;

  if (monthsDifference >= 12) {
    const years = Math.floor(monthsDifference / 12);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  } else if (monthsDifference >= 1) {
    const months = Math.floor(monthsDifference);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else if (daysDifference >= 7) {
    const weeks = Math.floor(daysDifference / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (daysDifference >= 1) {
    const days = Math.floor(daysDifference);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (hoursDifference >= 1) {
    const hours = Math.floor(hoursDifference);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutesDifference >= 1) {
    const minutes = Math.floor(minutesDifference);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    const seconds = Math.floor(secondsDifference);
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  }
}
