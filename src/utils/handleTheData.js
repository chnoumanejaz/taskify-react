export function handleTheLongData(data) {
  if (data.toString().length > 60) return data.toString().slice(0, 60) + ' ...';
  else return data;
}

export function handleTheShortData(data) {
  if (data.toString().length > 25) return data.toString().slice(0, 25) + ' ...';
  else return data;
}
