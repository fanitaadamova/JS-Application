import { html, render } from '../node_modules/lit-html/lit-html.js'

document.querySelector('#searchBtn').addEventListener('click', onClick);

//-----------Get all data from server---------------------
async function getData() {
   try {
      const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
      if (!response.ok) {
         throw new Error()
      }
      return await response.json();
   } catch (error) {
      alert(error)
   }
}

const dataFromServer = Object.values(await getData())
//----------------Show All items------------------------------

const newStudentsTemplate = (data) => html`
       ${data.map(student => html`
             <tr id=${student._id}> 
                <td>${student.firstName} ${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
             </tr>
             `)}`

const main = document.getElementsByTagName('tbody')[0];
function update(dataFromServer) {
   const result = newStudentsTemplate(dataFromServer);
   render(result, main)
}
update(dataFromServer)
//----------------Search items------------------------------

function onClick() {
   const textInput = document.getElementById('searchField').value;

   if (textInput !== '') {
      //DA ПРЕМАХНА КЛАСОВЕТЕ ПРЕДИ ТЪРСЕНЕ

      document.querySelectorAll('tr').forEach(element => {
         element.removeAttribute('class')
      });
      for (const student of dataFromServer) {
         let textToLow = textInput.toLowerCase()
         let email = student['email'].toLowerCase();
         let firstName = student['firstName'].toLowerCase();
         let lastName = student['lastName'].toLowerCase();
         let course = student['course'].toLowerCase();

         if (email.includes(textToLow) || firstName.includes(textToLow) ||
            lastName.includes(textToLow) || course.includes(textToLow)) {
            document.getElementById(`${student._id}`).setAttribute('class', 'select')
         }
      }
      document.getElementById('searchField').value = '';
   }

}



