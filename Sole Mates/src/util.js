const itemName = 'userData';
//Важно - тук е sessionStorage
export function getUserData() {
    return JSON.parse(sessionStorage.getItem(itemName));
}
export function setUserData(data) {
    return sessionStorage.setItem(itemName, JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem(itemName);
}

export function createSubmitHandler(callback) {
   return function (event) {
       event.preventDefault();
       const form = event.currentTarget;
       const formData = new FormData(form);
       const data = Object.fromEntries(formData.entries());

       callback(data, form);
            
   }
}

