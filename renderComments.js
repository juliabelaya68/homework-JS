import { escapeHtml } from './escapeHtml.js';

export function renderComments(commentsData) {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    commentsData.forEach((comment, index) => {
        const likeClass = comment.isLiked ? '-active-like' : '';
        const commentHTML = `
            <li class="comment" data-index="${index}">
                <div class="comment-header">
                    <div>${escapeHtml(comment.name)}</div>
                    <div>${comment.date}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">
                        ${escapeHtml(comment.text)}
                    </div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${comment.likes}</span>
                        <button class="like-button ${likeClass}" data-index="${index}"></button>
                    </div>
                </div>
            </li>
        `;
        commentsList.insertAdjacentHTML('beforeend', commentHTML);

        comment.replies.forEach((reply, replyIndex) => {
            const replyHTML = `
                <li class="comment reply" data-index="${index}" data-reply-index="${replyIndex}">
                    <div class="comment-header">
                        <div>${escapeHtml(reply.name)}</div>
                        <div>${reply.date}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">
                            ${escapeHtml(reply.text)}
                        </div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${reply.likes}</span>
                            <button class="like-button ${reply.isLiked ? '-active-like' : ''}" data-index="${index}" data-reply-index="${replyIndex}"></button>
                        </div>
                    </div>
                </li>
            `;
            commentsList.lastElementChild.insertAdjacentHTML('beforeend', replyHTML);
        });
    });
}