import { getAllFurnitures } from '../api/data.js';

let ctx = null;

const catalogTemplate = (allFurniture) => ctx.html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
            ${allFurniture.map(f => cardTemplate(f))}
        </div>
`;

export const cardTemplate = (furniture) => ctx.html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${furniture.img}/>
            <p>${furniture.description}</p>
            <footer>
                <p>Price: <span>${furniture.price} $</span></p>
            </footer>
            <div>
                <a href="/catalog/${furniture._id}" class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>
`;

export async function showCatalog(context) {
    ctx = context;
    const allFurniture = await getAllFurnitures();

    ctx.render(catalogTemplate(allFurniture));
}