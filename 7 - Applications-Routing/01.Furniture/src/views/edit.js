import { editFurnitureById, getFurnitureById } from '../api/data.js';
import { validateInput } from '../util.js';

let ctx = null;

const editTemplate = (furniture, editFn) => ctx.html`
<div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${editFn}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control" id="new-make" type="text" name="make" .value=${furniture.make}>
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control" id="new-model" type="text" name="model" .value=${furniture.model}>
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control" id="new-year" type="number" name="year" .value=${furniture.year}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description"
                        .value=${furniture.description}>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price" .value=${furniture.price}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img" .value=${furniture.img}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material"
                        .value=${furniture.material}>
                </div>
                <input type="submit" class="btn btn-info" value="Edit" />
            </div>
        </div>
    </form>
</div>
`;

export async function showEdit(context) {
    ctx = context;
    const furnitureId = ctx.params.id;
    const furniture = await getFurnitureById(furnitureId);

    ctx.render(editTemplate(furniture, editFn));

    async function editFn(event) {
        event.preventDefault();
        const form = event.target;
        const formData = Object.fromEntries(new FormData(form));

        const inputsElements = {
            make: form.querySelector('#new-make'),
            model: form.querySelector('#new-model'),
            year: form.querySelector('#new-year'),
            description: form.querySelector('#new-description'),
            price: form.querySelector('#new-price'),
            img: form.querySelector('#new-image'),
        };

        let hasError = false;
        for (const input in formData) {
            if (input === 'material') {
                continue;
            }
            if (validateInput(input, formData[input])) {
                inputsElements[input].classList.remove('is-valid');
                inputsElements[input].classList.add('is-invalid');
                hasError = true;
            } else {
                inputsElements[input].classList.remove('is-invalid');
                inputsElements[input].classList.add('is-valid');
            }
            
            formData[input] = formData[input].trim();
        }

        if (hasError) {
            return;
        }
        
        const furniture = await editFurnitureById(furnitureId, formData);
        ctx.page.redirect(`/catalog/${furnitureId}`);
    }
}