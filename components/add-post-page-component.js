import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
      <div class="page-container">
        <div class="header-container"></div>
        <div class="upload-image-container"></div>
        <input type="text" id="text-input" class="input" placeholder="Введите текст" />
        <button class="button" id="add-button">Добавить</button>
      </div>
    `;

    appEl.innerHTML = appHtml;

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: document.getElementById("text-input").value,
        imageUrl,
      });
    });
  };

 render();
}
