import { getMyFurnitures } from '../api/data.js';
import { cardTemplate } from './catalog.js';

let ctx = null;

const myFurnitureTemplate = (myFurnitures) => ctx.html`
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
        ${myFurnitures.map(f => cardTemplate(f))}
    </div>
</div>`;

export async function showMyFurnitures(context) {
    ctx = context;
    const myFurnitures = await getMyFurnitures(ctx.userData._id);
    ctx.render(myFurnitureTemplate(myFurnitures));
}