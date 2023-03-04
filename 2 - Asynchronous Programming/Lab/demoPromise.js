function executor(resolve, reject) {
    console.log('promise starting');

    setTimeout(() => {
        reject(new Error('Simulated error'))
    }, 2000);

    /*
    setTimeout(() => {
        resolve('hello')
    }, 2000);
    */

    console.log('promise ended');
}

const promise = new Promise(executor);

promise.then(successCallback);
promise.catch(failureCallback);
promise.finally(()=>{
    console.log('operation complete');
})

function successCallback(data) {
    console.log('recived data:', data);
}

function failureCallback(error) {
    console.error('Encounted error:', error.message);
}