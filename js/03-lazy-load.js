/*
 * Ленивая загрузка изображений (концепция)
 * - нативная поддержка
 * - событие загрузки изображения
 */

// Для нативной загрузки в наш тег img необходимо добавить атрибут loading = 'lazy', благодаря этому атрибуту практичские все
// современные браузеры будут выполнять ленивую загрузку наших изображений.Т.е.загрузится только то изображение, которое
// первым попадает в поле зрение пользователя, то что лежит внизу на страницах сразу загружаться не будет, а только тогда
// когда пользователь начнет скролить страницу вниз.Для такой нативной загрузки важно чтобы у всех тегов имедж была задана
// по умолчанию высота и ширина изображения, чтобы браузер мог резервировать пространство для изображения и контент не скакал
// по странице.Только браузер сафари не поддерживает нативную загрузку и атрибут лейзи.Для того чтобы абсолютно
// все браузеры выполняли ленивую загрузку воспользуемся возможностями JS:

// loading = 'lazy' - юзается очень часто на проектах

// Отберем все картинки с атрибутом loading="lazy":
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

// Теперь на каждую картинку (img) повесим слушателя события (можно и через делегирование событий, но сделаем на каждую).
// Для этого через фор ич переберем наш массив и повесим на каждое изображение слушателя событий с использованием события 'load'
// И передадим в него функцию onImageLoaded:

lazyImages.forEach(image => {
  image.addEventListener('load', onImageLoaded);
});

// Напишем функцию:
function onImageLoaded(evt) {
  console.log('Картинка загрузилась');
// Расширим нашу функцию, добавим в неё запись которая добавит класс appear на тот img сразу после того как он загрузится  
  evt.target.classList.add('appear'); // где класс appear это стилизация из css файла. Исключительно для анимации изображений.
}

// Когда мы вешаем слушатель событий мы как правило используем два параметра, 1. это мы указываем событие, которое мы хотим
// слушать и 2. наш обработчик слушателя событий, но наш addEventListener позволяет добавлять и 3 - й параметр, в который
// мы можем добавить объект в котором указать настройки слушателя этого события: есть такая настройка которая называется
// { once: true } - что это значит ? Это значит что наш слушатель событий зарегистрирует на 'load' нашу функцию onImageLoaded
// только один раз, и после того как этот слушатель только один раз сработает он автоматически самоудалится. А точнее 
// автоматически снимется регистрация события (не сам код удалится :) ) Добавим параметр на слушатель событий:

lazyImages.forEach(image => {
  image.addEventListener('load', onImageLoaded, { once: true });
});


function onImageLoaded(evt) {
  console.log('Картинка загрузилась');
  evt.target.classList.add('appear');
}


// Проблема в том что вся эта красота не сработает к примеру на браузере Сафари, если мы хотим чтобы эта ленивая
// загрузка работала везде, нам необходимо использовать библиотеку. Об этом в следующем файле. 


// Как понять где используется библиотека а где просто ванила js ? Ели есть _.debounce(т.е.признаки библиотеки, к примеру
// в лодаш єто "_."), то єто єлемент библиотеки, все остальное это ванила дж и её встроенные методы

// Теория:
// Відкладене завантаження
// Веб - сторінки містять велику кількість зображень, які збільшують розмір сторінок і впливають на швидкість їх завантаження.
// Більшість зображень знаходяться за межами першого екрану(за кадром, below the fold), тому користувач побачить їх тільки
// після прокручування сторінки.Це означає, що ви, можливо, завантажуєте те, що користувач ніколи не побачить, але витратить
// на це час і, можливо, гроші.Завантаження некритичного контенту також розряджає акумулятор мобільних пристроїв та витрачає
// інші системні ресурси.

// Above and below the fold
// Терміни «above the fold» (в кадрі) і «below the fold» (за кадром) прийшли з часів до появи цифрових технологій.Якщо ви
// коли - небудь купували газету в кіоску, їх, як правило, складають навпіл, щоб перехожі могли бачити тільки верхню половину
// першої сторінки.Якщо їм не сподобається те, що вони побачать, вони пройдуть повз, і продажі впадуть.Ось чому так важливо
// розміщати найбільш цікавий контент у верхній частині сторінки.

// Відкладене завантаження(lazy - loading) - це прийом, який відкладає завантаження некритичних ресурсів під час завантаження
// сторінки.Замість цього, ці некритичні ресурси завантажуються лише у разі потреби.Це знижує початкову вагу ресурсів, які
// необхідно завантажити для відображення сторінки, використання системних ресурсів підвищує час її завантаження та наступного
// рендеру.Все це позитивно позначається на продуктивності.

// Ви, напевно, вже бачили в дії ледаче завантаження. Воно виглядає приблизно так:

// Ви потрапляєте на сторінку і починаєте прокручувати її, читаючи вміст.
// У якийсь момент ви прокручуєте сторінку до зображення-заглушки.
// Зображення-заглушка раптово змінюється на справжнє зображення.
// Атрибут loading
// Раніше розробникам доводилося покладатися тільки на можливості JavaScript.Сучасні браузери вміють робити це без JavaScript,
//   але, на жаль, не всі.HTML - атрибут loading тегу < img > підтримується нативно у всіх сучасних браузерах, крім Safari, і
//   дозволяє браузеру відкласти завантаження зображень за кадром доти, доки користувач не прокрутить до них сторінку.

// <img src="my-image.jpg" loading="lazy" alt="Image description" />

// Підтримує три значення:

// lazy - браузер виконає відкладене завантаження зображення.
// eager - зображення буде завантажене за першої нагоди, тобто без відкладеного завантаження.
// auto - браузер сам визначає - виконувати відкладене завантаження чи ні. Значення за замовчуванням.
// Ми не можемо дізнатися або змінити поведінку і механізм визначення часу відкладеного завантаження зображення браузером.
// Головне, що браузер завантажить такі зображення незадовго до того, як вони потраплять в область перегляду.

// Відкрийте вкладку Network в інструментах розробника і виберіть фільтр Img, щоб відображалось лише завантаження зображень.
// Після цього прокручуйте приклад і спостерігайте як будуть довантажуватися закадрові зображення котів.Браузери, що
// підтримують атрибут loading, будуть завантажувати зображення відкладено, а браузери без підтримки - завантажать усі
// зображення відразу.


// Бібліотека lazysizes
// Щоб забезпечити кросбраузерність, тобто сумісність зі старішими браузерами, або такими, які ще не підтримують це нативно,
// можна використовувати ряд існуючих JavaScript бібліотек.Одні з найпопулярніших - це lazysizes, vanilla - lazyload і lozad.js.
// Вибір бібліотеки зводиться до набору можливостей і особистих вподобань.Ми розберемо бібліотеку lazysizes.

// ЦІКАВО
// Нативна підтримка краща і продуктивніша, ніж використання бібліотек, але вони гарантовано працюють у всіх браузерах і
// можуть надавати розширені можливості відкладеного завантаження, які ще відсутні у стандарті.

// Перше, що необхідно зробити - це підключити бібліотеку до проекту, використовуючи сервіс cdnjs.com.Тег з посиланням на
// скрипт додається в кінець < body >, так само як ми це робили для бібліотеки Lodash.

// index.html
// <body>
//   <!-- HTML-markup -->

//   <!-- Lazysizes library script file -->
//   <script
//     src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"
//     integrity="sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ=="
//     crossorigin="anonymous"
//     referrerpolicy="no-referrer"
//   ></script>
//   <!-- Your script file -->
//   <script defer src="path/to/script.js"></script>
// </body>


// ЦІКАВО
// Бібліотека lazysizes самоініціалізується при завантаженні на сторінку.Тобто для базового використання в JavaScript нічого
// робити непотрібно.Повний список її можливостей наведений в документації.

// Усім зображенням, які необхідно завантажувати відкладено, задаємо клас lazyload і замінюємо атрибут src на data - src.Це
// необхідно бібліотеці lazysizes для правильної роботи.

// index.html
// <img class="lazyload" data-src="path/to/my-image.jpg" alt="Generic alt" />

//   Доки зображення завантажується можна показувати заповнювач низької якості.Ця техніка називається LQIP(Low Quality Image
//   Placeholder).Існує багато варіантів реалізації LQIP, але для початку достатньо буде показувати один стандартний заповнювач,
//   замість усіх зображень.Для цього додаємо атрибут src, значенням якого буде посилання на це зображення - заповнювач.

// index.html
// <img
//   class="lazyload"
//   src="path/to/lqip-placeholder.jpg"
//   data-src="path/to/my-image.jpg"
//   alt="Generic alt"
// />

// Коли зображення було завантажене, бібліотека lazysizes додає елементу клас lazyloaded.Це можна використовувати для
// застосування CSS - ефектів в момент завантаження зображення.

// styles.css
// .blur-up {
//   filter: blur(5px);
//   transition: filter 400ms;
// }

// .blur-up.lazyloaded {
//   filter: blur(0);
// }

// Після оголошення стилів, додаємо клас blur-up тегам <img>.

// index.html
// <img
//   class="lazyload blur-up"
//   src="path/to/lqip-placeholder.jpg"
//   data-src="path/to/my-image.jpg"
//   alt="Generic alt"
// />

// Застосуємо всі ці кроки на прикладі, додавши кросбраузерну підтримку відкладеного завантаження зображень до нашого сайту
// про котів.Тепер навіть Safari виконує відкладене завантаження зображень.

