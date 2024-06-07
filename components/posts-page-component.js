import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, renderApp, setPosts } from "../index.js";
import { addLike, deleteLike, getPosts } from "../api.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
    /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

const postsHtml = posts
 .map((post, index) => {
  //const date = format(new Date(comment.date), "dd.MM.yyyy hh:mm");
  return `<li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button">
                        <img src="./assets/images/${post.isLiked ? "like-active" : "like-not-active"}.svg">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>2</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      19 минут назад
                    </p>
                  </li>`;
 })
 .join("");

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${postsHtml}  
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((likeButton, index) => {
    likeButton.addEventListener('click', () => {
      const post = posts[index]
      if (!post.isLiked) {
        addLike({postId: post.id, token: getToken()}).then(() => {
          return getPosts({token:getToken()})
        }).then((postsData) => {
          setPosts(postsData);
          renderApp()
        });
      } else {
        deleteLike({postId: post.id, token: getToken()}).then(() => {
          return getPosts({token:getToken()})
        }).then((postsData) => {
          setPosts(postsData);
          renderApp()
        });
      }
    })
  }) 

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
