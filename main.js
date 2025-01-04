import { renderComments } from './renderComments.js';
import { commentsData } from './commentsData.js';
import { initEventListeners } from './eventListeners.js';

// Инициализация рендера комментариев
renderComments(commentsData);

// Инициализация обработчиков событий
initEventListeners();