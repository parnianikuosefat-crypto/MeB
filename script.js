
let cartCount = 0;
let currentLanguage = "fa";

const languageBtn = document.getElementById("languageBtn");

const translations = {
  en: {
    home: "Home",
    products: "Products",
    about: "About Us",
    heroTitle: "Discover Your Signature Scent",
    heroText: "A fragrance for every moment, a memory forever.",
    shopBtn: "Explore Collection",
    collectionTitle: "Our Exclusive Collection",
    search: "Search perfumes...",
    filters: ["All", "Women", "Men", "Unisex"],
    aboutTitle: "Beauty in Every Drop",
    aboutText: "At Lumière, we believe every fragrance tells a unique story. A special choice for unforgettable moments.",
    add: "Add to Cart",
    empty: "No products found.",
    category: ["WOMEN", "MEN", "UNISEX"]
  },
  fa: {
    home: "خانه",
    products: "محصولات",
    about: "درباره ما",
    heroTitle: "دنیای رایحه‌های خاص",
    heroText: "عطری برای هر لحظه، رایحه‌ای برای ماندگاری در خاطره‌ها",
    shopBtn: "مشاهده محصولات",
    collectionTitle: "مجموعه عطرهای ما",
    search: "جستجوی عطر...",
    filters: ["همه", "زنانه", "مردانه", "یونیسکس"],
    aboutTitle: "زیبایی در هر قطره",
    aboutText: "در Lumière ما باور داریم هر رایحه داستانی منحصر به فرد دارد. انتخابی خاص برای لحظه‌های فراموش‌نشدنی.",
    add: "افزودن به سبد خرید",
    empty: "محصولی پیدا نشد.",
    category: ["زنانه", "مردانه", "یونیسکس"]
  }
};

languageBtn.addEventListener("click", () => {
  currentLanguage = currentLanguage === "fa" ? "en" : "fa";
  const t = translations[currentLanguage];

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir =
    currentLanguage === "fa" ? "rtl" : "ltr";

  document.getElementById("home").textContent = t.home;
  document.getElementById("products").textContent = t.products;
  document.getElementById("about").textContent = t.about;

  document.getElementById("heroTitle").textContent = t.heroTitle;
  document.getElementById("heroText").textContent = t.heroText;
  document.getElementById("shopBtn").textContent = t.shopBtn;

  document.getElementById("collectionTitle").textContent =
    t.collectionTitle;

  document.getElementById("searchInput").placeholder = t.search;

  document.getElementById("aboutTitle").textContent =
    t.aboutTitle;

  document.getElementById("aboutText").textContent =
    t.aboutText;

  document.getElementById("emptyMessage").textContent = t.empty;

  languageBtn.textContent =
    currentLanguage === "fa" ? "EN" : "FA";

  const filterButtons = document.querySelectorAll(".filter");

  filterButtons.forEach((button, index) => {
    button.textContent = t.filters[index];
  });

  document.querySelectorAll(".add-cart").forEach(button => {
    button.textContent = t.add;
  });

  filterProducts();
});

// Add to cart
document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", () => {
    cartCount++;
    document.getElementById("cartCount").textContent = cartCount;

    button.textContent =
      currentLanguage === "fa" ? "اضافه شد ✓" : "Added ✓";

    setTimeout(() => {
      button.textContent = translations[currentLanguage].add;
    }, 1200);
  });
});

// Product filtering
let selectedCategory = "all";

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")
      ?.classList.remove("active");

    button.classList.add("active");

    selectedCategory = button.dataset.category;

    filterProducts();
  });
});

// Search
document.getElementById("searchInput")
  .addEventListener("input", filterProducts);

function filterProducts() {
  const searchValue = document.getElementById("searchInput")
    .value.toLowerCase().trim();

  const cards = document.querySelectorAll(".product-card");

  let visibleCount = 0;

  cards.forEach(card => {
    const category = card.dataset.category;

    const text = card.textContent.toLowerCase();

    const matchesCategory =
      selectedCategory === "all" ||
      category === selectedCategory;

    const matchesSearch = text.includes(searchValue);

    const visible = matchesCategory && matchesSearch;

    card.hidden = !visible;

    if (visible) visibleCount++;
  });

  document.getElementById("emptyMessage").hidden =
    visibleCount !== 0;
}
