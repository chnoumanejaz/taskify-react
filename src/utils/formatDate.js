export default function formatDate(dateString) {
  const dateObject = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  };
  const formattedDate = dateObject.toLocaleDateString(undefined, options);
  return formattedDate;
}
