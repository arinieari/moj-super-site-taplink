document.addEventListener('DOMContentLoaded', () => {

    // --- Код для FAQ аккордеона (если он используется) ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) { // Добавим проверку на случай отсутствия элемента
            question.addEventListener('click', () => {
                // Закрыть все другие открытые ответы
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Открыть/закрыть текущий
                item.classList.toggle('active');
            });
        }
    });

    // --- НОВЫЙ КОД ДЛЯ КАРУСЕЛИ ПРОДУКТОВ ---
    const carousel = document.querySelector('.product-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const paginationContainer = document.querySelector('.carousel-pagination');

    // Проверяем, существуют ли все необходимые элементы карусели
    if (carousel && slides.length > 0 && paginationContainer) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        // 1. Создаем точки пагинации
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) {
                dot.classList.add('active'); // Делаем первую точку активной
            }
            dot.setAttribute('data-index', i); // Сохраняем индекс для клика
            // Добавляем обработчик клика для каждой точки
            dot.addEventListener('click', () => {
                goToSlide(i); // Переходим к слайду по индексу точки
            });
            paginationContainer.appendChild(dot); // Добавляем точку в контейнер
        }

        const dots = paginationContainer.querySelectorAll('.dot'); // Получаем все созданные точки

        // 2. Функция для переключения на указанный слайд
        function goToSlide(index) {
            // Проверка на валидность индекса (хотя клики по точкам всегда валидны)
            if (index < 0 || index >= totalSlides) {
                // console.warn('Неверный индекс слайда:', index);
                return;
            }
            currentIndex = index; // Обновляем текущий индекс
            const offset = -currentIndex * 100; // Вычисляем смещение в процентах
            carousel.style.transform = `translateX(${offset}%)`; // Сдвигаем карусель

            // Обновляем активную точку пагинации
            dots.forEach(dot => dot.classList.remove('active')); // Убираем класс active у всех точек
            dots[currentIndex].classList.add('active'); // Добавляем класс active текущей точке
        }

        // 3. (Опционально) Можно добавить автопрокрутку
        // let autoPlayInterval = setInterval(() => {
        //     let nextIndex = (currentIndex + 1) % totalSlides; // Циклический переход к следующему слайду
        //     goToSlide(nextIndex);
        // }, 5000); // Интервал 5 секунд

        // // (Опционально) Пауза автопрокрутки при наведении мыши
        // const carouselWrapper = document.querySelector('.product-carousel-wrapper');
        // if (carouselWrapper) {
        //      carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        //      carouselWrapper.addEventListener('mouseleave', () => {
        //          autoPlayInterval = setInterval(() => {
        //              let nextIndex = (currentIndex + 1) % totalSlides;
        //              goToSlide(nextIndex);
        //          }, 5000);
        //      });
        // }

    } else {
        // Этот блок выполнится, если карусель не найдена на странице
        // console.log('Элементы карусели продуктов не найдены.');
        // Можно скрыть кнопку и пагинацию, если карусели нет
        const productSection = document.getElementById('produkty');
        if (productSection && !carousel) { // Если секция есть, а карусели нет
            if (paginationContainer) paginationContainer.style.display = 'none';
            const btn = productSection.querySelector('.product-catalog-btn');
            // if(btn) btn.style.display = 'none'; // Раскомментируйте, если хотите скрыть и кнопку
        }
    }
    // --- Добавления для кнопок навигации карусели ---

    // Находим новые кнопки
    const prevButton = document.querySelector('.carousel-prev-btn');
    const nextButton = document.querySelector('.carousel-next-btn');

    // Убедитесь, что этот код находится ПОСЛЕ того, как вы определили
    // carousel, slides, dots, currentSlide и функцию goToSlide

    if (carousel && prevButton && nextButton && slides && slides.length > 0) { // Проверка, что все элементы найдены

        // Функция для обновления состояния кнопок (отключение на краях)
        function updateButtons() {
            // Отключаем "назад", если это первый слайд
            prevButton.disabled = currentIndex === 0;
            // Отключаем "вперед", если это последний слайд
            nextButton.disabled = currentIndex === slides.length - 1;
        }
    
        // Обработчик для кнопки "назад"
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) { // Проверяем, что не первый слайд
                currentIndex--;
                goToSlide(currentIndex); // Переходим к предыдущему слайду
            }
        });
    
        // Обработчик для кнопки "вперед"
        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) { // Проверяем, что не последний слайд
                currentIndex++;
                goToSlide(currentIndex); // Переходим к следующему слайду
            }
        });
    
        // Добавляем вызов updateButtons() в конец функции goToSlide
        const originalGoToSlide = goToSlide;
        goToSlide = function(index) {
            originalGoToSlide(index);
            updateButtons(); // Обновляем состояние кнопок
        };
    
        // Инициализация состояния кнопок при загрузке
        updateButtons();
    }

    // --- Конец добавлений для кнопок навигации ---
    // --- КОНЕЦ КОДА КАРУСЕЛИ ---

}); // Конец DOMContentLoaded

// === JavaScript для FAQ Аккордеона ===
document.addEventListener('DOMContentLoaded', () => { // Убедимся, что HTML загружен
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const button = item.querySelector('button[aria-expanded]');
    const content = item.querySelector('.accordion-content');

    if (!button || !content) {
      console.warn('Accordion item missing button or content:', item);
      return; // Пропускаем элемент, если нет кнопки или контента
    }

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Закрываем ВСЕ другие элементы (опционально, можно убрать эту часть)
      /*
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherButton = otherItem.querySelector('button[aria-expanded]');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherButton && otherContent) {
            otherButton.setAttribute('aria-expanded', 'false');
            otherContent.style.maxHeight = null;
          }
        }
      });
      */

      // Переключаем текущий элемент
      button.setAttribute('aria-expanded', !isExpanded);
      if (!isExpanded) {
        // Открываем: устанавливаем max-height равным высоте контента
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        // Закрываем: сбрасываем max-height
        content.style.maxHeight = null;
      }
    });

    // Убедимся, что изначально все закрыто (если нет JS-ошибок)
    if (button.getAttribute('aria-expanded') === 'true') {
       content.style.maxHeight = content.scrollHeight + 'px';
    } else {
       content.style.maxHeight = null; // Убедимся, что закрыто
    }

  });
});