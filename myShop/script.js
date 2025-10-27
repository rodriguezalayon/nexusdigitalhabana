document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const categoryMenu = document.getElementById("category-menu");
  const currentYear = document.getElementById("year");
  currentYear.textContent = new Date().getFullYear();

  let allProducts = [];
  let currentCategory = "All";

  // Load product data
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      const categories = ["All", ...new Set(data.map(p => p.category))];
      renderCategories(categories);
      renderProducts(data);
    });

  function renderCategories(categories) {
    categoryMenu.innerHTML = categories.map(cat => 
      `<li class="${cat === "All" ? "active" : ""}" data-category="${cat}">${cat}</li>`
    ).join("");

    document.querySelectorAll("#category-menu li").forEach(li => {
      li.addEventListener("click", () => {
        document.querySelectorAll("#category-menu li").forEach(li => li.classList.remove("active"));
        li.classList.add("active");
        currentCategory = li.dataset.category;
        filterProducts();
      });
    });
  }

  function filterProducts() {
    if (currentCategory === "All") {
      renderProducts(allProducts);
    } else {
      const filtered = allProducts.filter(p => p.category === currentCategory);
      renderProducts(filtered);
    }
  }

  function renderProducts(products) {
    productList.innerHTML = products.map(p => {
      const whatsappMsg = encodeURIComponent(`Hi! I'm interested in ${p.name}`);
      const whatsappLink = `https://wa.me/${p.whatsapp}?text=${whatsappMsg}`;
      return `
        <div class="product">
          <img src="${p.image}" alt="${p.name}" />
          <div class="product-content">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <div class="price">${p.price}</div>
            <a href="${whatsappLink}" target="_blank">Contact via WhatsApp</a>
          </div>
        </div>
      `;
    }).join("");
  }
});
