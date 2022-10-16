const loadCategories = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/news/categories"
    );
    const data = await res.json();
    return data.data.news_category;
  } catch (error) {
    console.log(error);
  }
};

const displayCategories = async () => {
  const allCategories = await loadCategories();
  allCategories.forEach((cat) => {
    const categoriesContainer = document.getElementById("categories-container");

    const li = document.createElement("li");
    li.innerHTML = `
      <a class="nav-link fw-bold text-dark" onclick="loadNews(${cat.category_id}, '${cat.category_name}')">${cat.category_name}</a>
      `;
    categoriesContainer.appendChild(li);
  });
};

const loadNews = async (id, name) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/0${id}`
    );
    const data = await res.json();
    displayNews(data.data, name);
  } catch (error) {
    console.log(error);
  }
};

const displayNews = (data, name) => {
  const dataCount = document.getElementById("data-count");
  const newsContainer = document.getElementById("news-container");
  if (data.length === 0) {
    Swal.fire({
      icon: "error",
      title: "No Data Found",
    });
    dataCount.innerHTML = `
    <h3 class="text-center"> <h3 class="text-center">There is no data available now</h3></h3>
    `;
    newsContainer.innerHTML = "";

    return;
  } else {
    dataCount.innerHTML = `
    <h3 class="text-center">
          <span class="text-info">${name}</span> contain <span class="text-info">${data.length}</span> items
        </h3>
    `;
  }

  newsContainer.innerHTML = "";
  data.forEach((news) => {
    const div = document.createElement("div");
    div.classList.add("card-shadow");
    div.innerHTML = `
      <div class="card-shadow">
          <div class="mb-3 p-3">
            <div
              class="row g-0 d-flex justify-content-center align-items-center"
            >
              <div class="col-md-3 col-12 text-center text-md-start">
                <img
                  src="${news.thumbnail_url}"
                  class="img-fluid"
                  alt="..."
                />
              </div>
              <div class="col-md-9 col-12 my-2">
                <div class="card-body">
                  <h5 class="card-title">${news.title}</h5>
                  <p class="card-text">${news.details.slice(0, 300)}...</p>
                </div>
                <div
                  class="row d-flex justify-content-between align-items-center mt-2"
                >
                  <div class="col-md-4 col-6">
                    <div
                      class="row d-flex justify-content-center align-items-center"
                    >
                      <div class="col-md-3 col-5">
                        <img
                          src="${news.author.img}"
                          alt=""
                          class="img-fluid rounded-circle"
                        />
                      </div>
                      <div class="col-md-9 col-7">
                        <p class="fw-bold text-secondary">${
                          news.author.name
                        }</p>
                        <p>${news.author.published_date}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2 col-6">
                    <i class="fa-regular fa-eye"></i>
                    <span class="text-secondary fw-bold">${
                      news.rating.number
                    }M</span>
                  </div>
                  <div class="col-md-3 col-6">
                    <i class="fa-solid fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                  </div>
                  <div class="col-md-3 col-6">
                    <button
                      type="button"
                      class="btn btn-outline-info"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      See details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    newsContainer.appendChild(div);
  });
};

displayCategories();
