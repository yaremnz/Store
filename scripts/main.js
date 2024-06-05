function getDescription(desc){
    const div = document.createElement("div");
    div.classList.add("desc");
    div.innerText = desc;
    return div;


}
function getTitle(name){
    const div = document.createElement("div");
    div.classList.add("title");
    div.innerText = name;
    return div;
}

function getPrice(amount){
    const div = document.createElement("div");
    div.classList.add("amount");
    div.innerText = "$" + amount.toFixed(2);
    return div;
}

function getImages(images){
    const img = document.createElement("img");
    img.classList.add("image");
    const image = images[0];
    img.src = image.path;
    img.alt = image.name;
    return img;
}

function getBuyButton(product){
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = "Add to Cart";
    button.dataset.product = encodeURI(JSON.stringify(product));
    button.addEventListener("click", r => addItem(product));
    return button;
}

function getProduct(product){
    const div = document.createElement("div");
    div.classList.add("card");
    div.appendChild(getBuyButton(product));
    div.appendChild(getTitle(product.name));
    div.appendChild(getImages(product.images));
    div.appendChild(getPrice(product.price));
    div.appendChild(getDescription(product.desc));
    return div;
}
function getLine(item){
    const ext = item.qty *  item.product.price;
    return`
        <tr>
            <td class="qty"><input type="number" value="${item.qty}"</td>
            <td class="name">   ${item.product.name}</td>
            <td class="desc">   ${item.product.desc}</td>
            <td class="price">$ ${item.product.price.toFixed(2)}</td>
            <td class="ext">  $ ${ext.toFixed(2)}</td>
            <td class="actions"><span class="remove">remove</span></td>
        </tr>
    `;
}
function displayCart(){
    cart.innerHTML =`
    <table>
        <tr>
            <th>QTY</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>EXT PRICE</th>
            <th>Actions</th>
        </tr>
        ${cartItems.map(getLine).join("")}
    </table>`
}
let cartItems = [];
function addItem(product, qty = 1){
    cartItems.push({"qty": qty, "product": product});
    displayCart();
}

document.addEventListener("DOMContentLoaded", async e => {

    products.innerHTML = "";

    const response = await fetch("./data/products.json");//GET
    const data = await response.json();
    data.forEach(p => products.appendChild(getProduct(p)));
    

}); //end loaded