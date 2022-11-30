/**
 * Use this file to register any variables or functions that should be
 * available globally ideally you should make it available via the window
 * object as well as the Vue prototype for access throughout the app
 * (register globals with care, only when it makes since to be accessible app wide)
 */


export const util = {
  getErrorString: (error) => {
    return (error.response && error.response.data && error.response.data.message)
      || error.message
      || error.toString();  
  },
  capitalizeFirstLetter: (string) => {
    if (!string.length) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  isEmptyJson: (obj) => {
    return Object.keys(obj).length === 0;
  }
}
