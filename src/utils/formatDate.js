export default function formatDate(dateString) {
  const dateObject = new Date(dateString);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = dateObject.toLocaleDateString(undefined, options);
  return formattedDate;
}

export function formatDateWithTime(dateString) {
  const dateObject = new Date(dateString);
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  };
  const formattedDate = dateObject.toLocaleDateString(undefined, options);
  return formattedDate;
}
