import { getFurnitureById, deleteFurnitureById } from '../api/data.js';

let ctx = null;

const detailsTemplate = (furniture, isOwner) => ctx.html`
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src="/images/${furniture.img.split('/').pop()}"/>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${furniture.make}</span></p>
            <p>Model: <span>${furniture.model}</span></p>
            <p>Year: <span>${furniture.year}</span></p>
            <p>Description: <span>${furniture.description}</span></p>
            <p>Price: <span>${furniture.price}</span></p>
            <p>Material: <span>${furniture.material}</span></p>
            ${isOwner 
                ? ctx.html`
                    <div>
                        <a href="/edit/${furniture._id}" class="btn btn-info">Edit</a>
                        <a href="#" class="btn btn-red" @click=${async (e) => {
                            e.preventDefault();
                            if (confirm('Are you sure you want to delete this product?')) {
                                await deleteFurnitureById(furniture._id);
                                ctx.page.redirect('/catalog');
                            }
                        }}>Delete</a>
                    </div>`
                :''}
        </div>
    </div>
</div>
`;

export async function showDetails(context) {
    ctx = context;
    const furnitureId = ctx.params.id;
    const furniture = await getFurnitureById(furnitureId);
    const isOwner = ctx.userData?._id === furniture._ownerId;

    ctx.render(detailsTemplate(furniture, isOwner));   
}