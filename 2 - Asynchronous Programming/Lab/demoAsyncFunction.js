async function getData() {
    return 5;
}

const result = getData();
result.then(data =>{
    console.log(data);
})