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
