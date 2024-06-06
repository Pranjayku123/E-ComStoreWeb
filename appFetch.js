$(document).ready(function () {
  $.ajax({
    url: "https://fakestoreapi.com/products",
    type: "GET",
    dataType: "json",
    success: function (data) {
      displayProductData(data);
      document
        .getElementById("search-id")
        .addEventListener("keydown", function () {
          filterProducts(data);
        });
       
       
    },
    error: function (error) {
      console.error("Error fetching data:", error);
    },
  });
});

function displayProductData(products) {
  $.each(products, function (index, product) {
    let productListContainer = $("#dataGet");
    let val = Math.floor(10 + Math.random() * 50);
    let productHtmlCode = `
      <div class="productShowCard card">
        <h6 class="card-header titleCustomClass">${product.id}. ${product.title}</h6>
        <img src="${product.image}" alt="${product.title}" style="width: 150px; height:160px; margin-bottom:20px">
        <p>Price<span style="color:red"> <strike>$${val}</strike></span> &nbsp &nbsp   Offer Price: $${product.price}</p>
        <div class="card-footer chooseBtn" data-product-id="${product.id}">Choose Products</div>
      </div>
    `;
    productListContainer.append(productHtmlCode);
  });

  let buttonclass = document.querySelectorAll(".chooseBtn");
  buttonclass.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      let productId = event.currentTarget.getAttribute("data-product-id");
      $(".productShowCard").hide();
      $(`.productShowCard[data-product-id='${productId}']`).show();
    });
  });
}

const filterProducts = (data) => {
  let userVal = document.getElementById("search-id").value;
  let response = data;
  let filterArray = response.filter((val) => {
    return val.title.toLowerCase().includes(userVal.trim().toLowerCase());
  });
  $("#dataGet").empty();
  displayProductData(filterArray);
};
