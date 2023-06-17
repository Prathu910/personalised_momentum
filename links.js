const newLink = document.querySelector(".new-link");
const linksDisplay = document.querySelector(".links-display");
const linksForm = document.querySelector(".links-form-display");
const goBack = document.querySelector(".go-back");
const closeLinksPopup = document.querySelector(".close-links");
const openPopup = document.querySelector(".open-popup");
const linksDiv = document.querySelector(".all-links");

// LINKS SECTION
newLink.addEventListener("click", () => {
  linksDisplay.style.display = "none";
  linksForm.style.display = "flex";
});

goBack.addEventListener("click", () => {
  linksForm.style.display = "none";
  linksDisplay.style.display = "flex";
});

closeLinksPopup.addEventListener("click", () => {
  linksDisplay.style.display = "none";
});

openPopup.addEventListener("click", () => {
  console.log("triggered");
  console.log(linksDisplay.style.display);
  if (linksDisplay.style.display === "none") {
    linksDisplay.style.display = "flex";
  } else {
    linksDisplay.style.display = "none";
  }
});

let availableLinks = JSON.parse(localStorage.getItem("links")) ?? [];
if (availableLinks.length > 0) {
  renderLinks(availableLinks);
  linksDisplay.style.display = "none";
}
function renderLinks(links) {
  let linkHtml = "";
  links.forEach((link) => {
    const { id, name, address } = link;
    linkHtml += `
      <div class="individual-link">
        <i class="fa-solid fa-link"></i>
        <a href="${address}">${name}</a>
        <i class="fa-regular fa-trash-can link-remove" data-linkID=${id}></i>
      </div>
      `;
  });
  linksDiv.innerHTML = linkHtml;
  // Go back to the links popup
  linksForm.style.display = "none";
  linksDisplay.style.display = "flex";

  document.querySelectorAll(".link-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const removeID = e.target.dataset.linkid;
      availableLinks = availableLinks.filter((link) => {
        return link.id !== removeID;
      });
      localStorage.setItem("links", JSON.stringify(availableLinks));
      renderLinks(availableLinks);
    });
  });
}

linksForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const linkName = document.querySelector("#links-name").value;
  const linkAddress = document.querySelector("#links-address").value;

  if (linkName && linkAddress) {
    const linkId = new Date().getTime().toString();
    availableLinks.push({ id: linkId, name: linkName, address: linkAddress });
    localStorage.setItem("links", JSON.stringify(availableLinks));
    document.querySelector("#links-name").value = "";
    document.querySelector("#links-address").value = "";
    renderLinks(availableLinks);
  }
});
