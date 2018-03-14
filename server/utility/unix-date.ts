export function UnixToDate(unix) {
  const monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let date = new Date(parseInt(unix));
  let year = date.getFullYear();
  let month = monthArray[date.getMonth()];
  let day = date.getDate();
  let convertedDate = `${month}-${day}-${year}`;
  return convertedDate;
}
