/* eslint-disable no-console */
// print helpers

// console.log array data in more readable string format with JSON
function logArray(x) {
  console.log(JSON.stringify(x));
}

function clog(x) {
  console.log(x);
}
// eslint-disable-next-line import/prefer-default-export
export { logArray, clog };
