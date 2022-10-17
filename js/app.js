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
      <a class="nav-link" onclick="loadNews(${cat.category_id}, '${cat.category_name}')">${cat.category_name}</a>
      `;
    categoriesContainer.appendChild(li);
  });
};

const loadNews = async (id, name) => {
  toggleLoader(true);
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

const displayNews = (news, name) => {
  const sortedByView = news.sort((a, b) => b.total_view - a.total_view);
  const dataCount = document.getElementById("data-count");
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  if (news.length === 0) {
    Swal.fire({
      icon: "error",
      title: "No Data Found",
    });
    dataCount.classList.add("d-none");
    newsContainer.innerHTML = "";
    toggleLoader(false);
    return;
  } else {
    dataCount.classList.remove("d-none");
    dataCount.innerHTML = `
    <h4 class="text-center fw-bold">
          <span style='color: #5d5fef'>${name}</span> contain <span style='color: #5d5fef'>${news.length}</span> items
        </h4>
    `;
  }

  sortedByView.forEach((news) => {
    const div = document.createElement("div");
    div.classList.add("card-shadow", "mb-5");
    div.innerHTML = `
        <div
            class="row d-flex justify-content-between align-items-center p-3"
          >
            <div class="col-md-3 col-12 text-center text-md-start">
              <img
                src="${news.thumbnail_url}"
                alt=""
                class="img-fluid"
              />
            </div>
            <div class="col-md-9 col-12 my-3 my-md-0">
              <div>
                <h4 class="fw-semibold">${news.title}</h4>
                <p>${news.details.slice(0, 300)}...</p>
              </div>
              <div
                class="row d-flex justify-content-between align-items-center"
              >
                <div class="col-12 col-md-3 mb-2">
                  <img
                    src="${
                      news.author.img
                        ? news.author.img
                        : '<span class="text-danger fw-bold">Author Image Not Found</span>'
                    }"
                    alt=""
                    class="img-fluid rounded-circle"
                    style="width: 40px; height: 40px"
                  />
                  <span class="d-inline-block fw-bold text-secondary"
                    >${
                      news.author.name
                        ? news.author.name
                        : '<span class="text-danger fw-bold">Author Name Not Found</span>'
                    }</span
                  >
                  <span class="d-inline-block text-secondary">
                  
                 ${
                   news.author.published_date
                     ? news.author.published_date
                     : '<span class="text-danger fw-bold">Published Date Not Found</span>'
                 }</span
                  
                  </span>
                </div>
                <div class="col-md-3 col-6">
                  <i class="fa-regular fa-eye"></i>
                  ${
                    news.total_view
                      ? news.total_view
                      : '<span class="text-danger fw-bold">0 Viewer</span>'
                  }
                </div>
                <div class="col-md-3 d-none d-md-inline-block">
                  <i class="fa-regular fa-star-half-stroke"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                </div>
                <div class="col-md-3 col-6">
                  <button
                      type="button"
                      class="btn-2 border-0 fw-bold"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onclick="loadDetails('${news._id}')"
                    >
                      See details
                    </button>
                </div>
              </div>
            </div>
          </div>
    `;
    newsContainer.appendChild(div);
    toggleLoader(false);
  });
};

const loadDetails = async (id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`
    );
    const data = await res.json();
    displayDetails(data.data[0]);
  } catch (error) {
    console.log(error);
  }
};

const displayDetails = (details) => {
  const modalTitle = document.getElementById("exampleModalLabel");
  modalTitle.innerText = details.title;
  const modalBody = document.getElementById("m-body");
  modalBody.innerHTML = `
  <div class="card h-100">
      <img src="${details.image_url}" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">${details.details}</p>
      </div>
      <div class="row d-flex justify-content-between align-items-center">
                <div class="col-12 mb-2">
                  <img
                    src="${
                      details.author.img
                        ? details.author.img
                        : '<span class="text-danger fw-bold">Author Image Not Found</span>'
                    }"
                    alt=""
                    class="img-fluid rounded-circle"
                    style="width: 40px; height: 40px"
                  />
                  <span class="d-inline-block fw-bold text-secondary"
                    >${
                      details.author.name
                        ? details.author.name
                        : '<span class="text-danger fw-bold">Author Name Not Found</span>'
                    }</span
                  >
                  <span class="d-inline-block text-secondary">
                  
                 ${
                   details.author.published_date
                     ? details.author.published_date
                     : '<span class="text-danger fw-bold">Published Date Not Found</span>'
                 }</span
                  
                  </span>
                </div>
                <div class="col-6">
                  <i class="fa-regular fa-eye"></i>
                  ${
                    details.total_view
                      ? details.total_view
                      : '<span class="text-danger fw-bold">0 Viewer</span>'
                  }
                </div>
                <div class="col-6">
                  <i class="fa-regular fa-star-half-stroke"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                </div>
              </div>
    </div>
  `;
};

const toggleLoader = (isLoading) => {
  if (isLoading) {
    document.getElementById("loader-spinner").classList.remove("d-none");
  } else {
    document.getElementById("loader-spinner").classList.add("d-none");
  }
};
loadNews("1", "Breaking News");
displayCategories();
