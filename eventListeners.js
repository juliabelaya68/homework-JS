import { commentsData } from './commentsData.js';
import { renderComments } from './renderComments.js';

let currentReplyIndex = null;

export function initEventListeners() {
    const nameInput = document.getElementById('name-input');
    const commentInput = document.getElementById('comment-input');
    const addButton = document.getElementById('add-button');

    // Обработчик для лайков
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('like-button')) {
            handleLikeClick(event);
        }
    });

    // Обработчик для клика по комментарию
    document.addEventListener('click', (event) => {
        const commentElement = event.target.closest('.comment');
        if (commentElement && !event.target.classList.contains('like-button')) {
            handleCommentClick(commentElement);
        }
    });

    // Обработчик для добавления комментария
    addButton.addEventListener('click', () => {
        nameInput.classList.remove("error");
        commentInput.classList.remove("error");

        if (nameInput.value.trim() === "") {
            nameInput.classList.add("error");
            return;
        }

        if (commentInput.value.trim() === "") {
            commentInput.classList.add("error");
            return;
        }

        const now = new Date();
        const date = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear().toString().slice(-2)}`;
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        if (currentReplyIndex !== null) {
            commentsData[currentReplyIndex].replies.push({
                name: nameInput.value,
                text: commentInput.value,
                date: `${date} ${time}`,
                likes: 0,
                isLiked: false
            });
        } else {
            commentsData.push({
                name: nameInput.value,
                text: commentInput.value,
                date: `${date} ${time}`,
                likes: 0,
                isLiked: false,
                replies: []
            });
        }
        nameInput.value = "";
        commentInput.value = "";
        currentReplyIndex = null;

        renderComments(commentsData);
    });
}

function handleLikeClick(event) {
    const index = event.target.dataset.index;
    const replyIndex = event.target.dataset.replyIndex;

    if (replyIndex !== undefined) {
        const reply = commentsData[index].replies[replyIndex];
        if (reply.isLiked) {
            reply.likes -= 1;
        } else {
            reply.likes += 1;
        }
        reply.isLiked = !reply.isLiked;
    } else {
        const comment = commentsData[index];
        if (comment.isLiked) {
            comment.likes -= 1;
        } else {
            comment.likes += 1;
        }
        comment.isLiked = !comment.isLiked;
    }

    renderComments(commentsData);
}

function handleCommentClick(commentElement) {
    const index = commentElement.dataset.index;
    const comment = commentsData[index];

    const commentInput = document.getElementById('comment-input');
    commentInput.value = `${comment.name}: ${comment.text}\n > `;
    document.getElementById('name-input').value = '';
    commentInput.focus();

    currentReplyIndex = index;
}