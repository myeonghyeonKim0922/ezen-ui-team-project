export function getDist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function debounce(callback, limit = 100) {
  let timeout
  return function(...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
          callback.apply(this, args)
      }, limit)
  }
}

export function numToString(num) {
  const strArr = num.toString().split("");

  const arr = [];
  for (let i = strArr.length - 1; i >= 0; i--) {
    if ((arr.length + 1) % 4 === 0) {
      arr.unshift(",");
    }
    arr.unshift(strArr[i]);
  }

  return arr.join("");
}