import { html, render } from '../node_modules/lit-html/lit-html.js'
import { towns } from './towns.js'


const searchTemplate = (data) => html `
    <ul>
       ${data.map(town => html`
        <li id=${town}>${town}</li>`
         )}           
    </ul>`


const body = document.getElementById('towns');
update();

function update() {
   const result = searchTemplate(towns);
   render(result, body);

}

document.querySelector('button').addEventListener('click', search)

function search() {
  console.log('test');
   const input = document.getElementById('searchText').value;

   let counter = 0;
   towns.forEach(town => {
      if (town.includes(input)) {
         counter++;
         document.getElementById(`${town}`).setAttribute('class', 'active')
      }
   });

   document.getElementById('result').textContent = `${counter} matches found`

}

