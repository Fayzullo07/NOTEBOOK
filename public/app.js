const $card = document.querySelector("#card");

function renderCart(card) {
  const dynamicHTML = card.notebooks
    .map((c) => {
      return `
                    <div class="card rounded-3 mb-4 shadow">
                        <div class="card-body p-4">
                            <div class="row d-flex justify-content-between align-items-center">

                            <div class="col-md-2 col-lg-2 col-xl-2">
                                <img src="${c.img}" class="img-fluid rounded-3" alt="${c.title}">
                            </div>

                            <div class="col-md-3 col-lg-3 col-xl-3">
                                <h1 class=" fw-normal mb-2">${c.title}</h1>
                            </div>

                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex justify-content-center">
                                <button class="btn btn-link px-2">
                                    <i class="fas fa-minus js_minus" data-id="${c.id}"></i>
                                </button>

                                <div>${c.count}</div>

                                <button class="btn btn-link px-2">
                                    <i class="fas fa-plus js_plus" data-id="${c.id}"></i>
                                </button>
                            </div>

                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h4 class="mb-0">$${c.price}</h4>
                            </div>

                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                <p class="text-danger"><i class="fas fa-trash fa-lg js_remove" data-id="${c.id}"></i></p>
                            </div>

                            </div>
                        </div>
                    </div>
              `;
    })
    .join("");
  $card.querySelector("#card_one").innerHTML = dynamicHTML;
  $card.querySelector("#price").innerHTML = card.price;
}

if ($card) {
  $card.addEventListener("click", (e) => {
    if (e.target.classList.contains("js_minus")) {
      const id = e.target.dataset.id;

      fetch("/card/minus/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.notebooks.length) {
            renderCart(card);
          } else {
            $card.innerHTML = `<h1>Not</h1>`;
          }
        });
    }

    if (e.target.classList.contains("js_plus")) {
      const id = e.target.dataset.id;

      fetch("/card/plus/" + id, {
        method: "post",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.notebooks.length) {
            renderCart(card);
          } else {
            $card.innerHTML = "<h1>Not</h1>";
          }
        });
    }

    if (e.target.classList.contains("js_remove")) {
      const id = e.target.dataset.id;

      fetch("/card/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.notebooks.length) {
            renderCart(card);
          } else {
            $card.innerHTML = "<h1>Not</h1>";
          }
        });
    }
  });
}
