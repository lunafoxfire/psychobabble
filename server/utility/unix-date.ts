export function UnixToDate(unix) {
  const monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let date = new Date(parseInt(unix));
  let year = date.getFullYear();
  let month = monthArray[date.getMonth()];
  let day = date.getDate();
  let convertedDate = `${month}-${day}-${year}`;
  return convertedDate;
}

/** Returns a UNIX timestamp as MM-DD-YYYY */
export function timestampToMMDDYYYY(timestamp: number) {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = zeroify(date.getMonth() + 1);
  let day = zeroify(date.getDate());
  return `${month}-${day}-${year}`;
}

/** Pads single digit numbers with a leading zero */
function zeroify(n: number): string {
  let isInt = (Math.floor(n) === n);
  if (!isInt || n < 0) { return null; }
  if(n < 10) {
    return `0${n}`;
  }
  else {
    return `${n}`;
  }
}
