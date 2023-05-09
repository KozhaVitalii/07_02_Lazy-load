const tech = [
  { label: 'HTML' },
  { label: 'CSS' },
  { label: 'JavaScript' },
  { label: 'Node.js' },
  { label: 'React' },
  { label: 'Vue' },
  { label: 'Next.js' },
  { label: 'Mobx' },
  { label: 'Redux' },
  { label: 'React Router' },
  { label: 'GraphQl' },
  { label: 'PostgreSQL' },
  { label: 'MongoDB' },
];

// Решим задачку фильтр с поиском:

// 1. у нас есть массив объектов const tech
// 2. у нас есть разметка с полем куда мы будем вводить значение (инпут) и ul куда будем выводить результат, т.е.генерить нашу
// разметку:
    // <label>
    //   Что ищем?
    //   <input type="text" id="filter" />
    // </label> 

    // <ul class="js-list"></ul>

   
/*
 * 1. Рендерим разметку элементов списка
 * 2. Слушаем изменение фильтра
 * 3. Фильтруем данные и рендерим новые элементы
 */


// Первое что делаем рендерим разметку 

// 1. ссылки на разметку
// const refs = {
//   list: document.querySelector('.js-list'),
//   input: document.querySelector('#filter'),
// };

// 3. Переменная для приема результата функции
// const listItemsMarkup = createListItemsMarkup(tech); // создадим переменную в которую будем возвращать результат
// нашей функции, т.е. огромную строку с кучей li



// 4. После чего повесим нашу строку в наш ul:
// НО используем не Element.insertAdjacentHTML() - который используем тогда когда в нашем объекте уже что то есть, 
// а простой innerHTML т.к.у нас пустой ul

// refs.list.innerHTML = listItemsMarkup;

// 2. Пишем функцию в которую будем передавать, то что нам необходио зарендерить:
// Меппним эти items после чего будем передавать большую строку с кучей li внутри:
// function createListItemsMarkup(items) {
//   return items.map(item => `<li>${item.label}</li>`).join('');
// }

// 5. Далее мы хотим слушать наш инпут и в зависимости от того что мы будем в него вводить, фильтровать наш li и выводить
// в результат только те значение li в тексте, которых есть значение введенное в наш инпут:
// Вешаем обработчик событий на наш инпут:
// refs.input.addEventListener('input', onFilterChange);

// 6. Пропишем функцию обработчик события под наш инпут:
// function onFilterChange(evt) {
  // console.log(evt.target.value);
  // const filter = evt.target.value;
// Если у нас есть значение этого инпута(фильтра), нам нужно оставить в интерфейсе только те элементы текст которого совпадает
// с этим фильтром.

// Теперь научимся разделять концепции.У нас есть то что называетс модель и представление.Модель это наши данные(т.е.
// наш исходный массив объектов const tech), а представление это то что у нас есть в интерфейсе. Нам никогда не следует
// надеется на то что есть в интерфейсе.Мы работаем от данных, т.е.на базе нашего исходного массива сделаем новый с
// набором отфильтрованных элементов. В лейбле которых находится фильтр т.е. совпадает с этим фильтром (инклудс значение
// инпута)

// const filter = evt.target.value.toLowerCase(); // на всякий случай приведем к ловеркейсу и наше значение в фильтре

// 7. Отфильтруем только те значения которые нам нужны:
// Далее сделаем так: возьмем наш исходный массив ничего из него не удаляя и для каждого его элемента скажем: если у элемента
// приведенного в ловеркейс или в нижний регистр (т.е. делаем поиск не чувствительный к регистру) и говорим, что если 
// этот лейбл(элемент) включает в себя подстроку который лежит в фильтре сейчас, то это элемент который нам нужен.

  // const filteredItems = tech.filter(t =>
  //   t.label.toLowerCase().includes(filter),
  // );

  // console.log(filteredItems);
// т.е. переберая массив через фильтр мы говорим, если у этого объекта (t) в t.label.toLocaleLowerCase() есть кусок текста
// который лежит в .includes(filter), т.е. в filter (в нашем инпуте), то верни нам этот объект "t". По сути берется значение
// из инпута(к примеру буква "r") и проверяется на то есть ли она в значении(лейбле) каждого объекта в нашем исходном массиве
// объектов const tech и если находит букву "r" в названии, т.е. в значении лейбла (в объекте), то возвращает нам этот объект
// целеком в новый массив.Буквально в нашем примере, в инпуте мы ввели букву "r", эту букву мы ищем в каждом объекте нашего
// исходного массива и если находим то возвращаем целый объект: "r" есть в объекте { label: 'JavaScript' }, значит в новый
// объект фильтр добавит этот объект и так с каждым объектом в нашем иходном массиве.

  // Напоминание!!! Наши перебирающие методы массива, которые мы уже изучали фильтры, меппы и т.д.они при использовании
  // создают новый массив, сохраняя без изменения исходный массив. 
  
// Что дальше?:  
  
// 8. Теперь передадим в нашу разметку только уже отфильтрованный массив:
// const listItemsMarkup = createListItemsMarkup(filteredItems);

  // И на выходе мы получим необходимый нам результат:
  // console.log(listItemsMarkup);
  
// 9. Далее разметку отфильтрованного массива мы вешаем в наш лист (т.е. в наш ul):
// refs.list.innerHTML = listItemsMarkup;

// Все это время мы работаем только с моделью данных:
// 1. Первым делом из интерфейса мы получаем фильтр const filter = evt.target.value.toLowerCase(); // т.е. значение нашего инпута
// 2. Потом из модели мы отфильтровали только те объекты, которые подходят под наш фильтр (т.е. содержат данные которые ввел пользователь = значение инпута)
// это вот эта часть: const filteredItems = tech.filter(t => t.label.toLowerCase().includes(filter),); // т.е. сделали новый массив который содержит объекты
// в которых значение содержит значение инпута (фильтра)
// 3. После чего уже создали разметку для отфильтрованного массива: const listItemsMarkup = createListItemsMarkup(filteredItems);
// 4. и вставили её в наш ul: refs.list.innerHTML = listItemsMarkup;
  
//  Теперь немного оптимизируем:
// const refs = {
//   list: document.querySelector('.js-list'),
//   input: document.querySelector('#filter'),
// };

// refs.input.addEventListener('input', onFilterChange);

// Здесь мы первый раз рендерим для того чтобы взять массив оригинальный и повесить в интерфейс (т.е. вывести пользователю на страницу):
// const listItemsMarkup = createListItemsMarkup(tech);
// populateList(listItemsMarkup);

// function createListItemsMarkup(items) {
//   return items.map(item => `<li>${item.label}</li>`).join('');
// }

// А далее уже каждый раз когда у нас меняется событие, (т.е.срабатывет refs.input.addEventListener('input', onFilterChange);), т.е.огда пользователь
// продолжает вводить данные в инпут, у нас менется фильтр, мы берем из этого фильтра значение const filter = evt.target.value.toLowerCase();
// далее берем весь массив данных(объектов)   const filteredItems = tech.filter(t => t.label.toLowerCase().includes(filter),); и у него отфильтровываем
// только те элементы t.label.toLowerCase(), которые содержат текущеее значение свойства лейбл.includes(filter) и далее делаем то же самое:
// создаем разметку новых уже отфильтрованных элементов const listItemsMarkup = createListItemsMarkup(filteredItems); и полностью заменяем значение
// списка, т.е.рендерим второй раз, но уже с отфильтрованными данными populateList(listItemsMarkup);, если наш инпут будет пустой, то в интерфейс
// вернется разметка всего массива объектов, которую мы зарендели первый раз. То что мы описали здесь изложено в нашем коде: 

// function onFilterChange(evt) {
//   const filter = evt.target.value.toLowerCase();

//   const filteredItems = tech.filter(t =>
//     t.label.toLowerCase().includes(filter),
//   );

//   const listItemsMarkup = createListItemsMarkup(filteredItems);
//   populateList(listItemsMarkup);
// }

// function populateList(markup) {
//   refs.list.innerHTML = markup;
// }

// Проблема остается только в том, что пока ещё наши функции срабатывают на каждое нажатие клавиш, то есть очевидно нам не хватает приёма: _.trottle 
// или _.debounce  
  
// Перепишем начисто наш код но уже с использованием _.debounce (т.к. он в большинстве своем используется при запросе на сервер при фильтре данных):
// Есть ещё библиотека fuse.js которая использует пушистый поиск, её суть такова, что она может находить не точное а наиболее подходящее совпадение.

const refs = {
  list: document.querySelector('.js-list'),
  input: document.querySelector('#filter'),
};

refs.input.addEventListener('input', _.debounce(onFilterChange, 300));

const listItemsMarkup = createListItemsMarkup(tech);
populateList(listItemsMarkup);

function createListItemsMarkup(items) {
  return items.map(item => `<li>${item.label}</li>`).join('');
}

function onFilterChange(evt) {
  console.log('INPUT');
  const filter = evt.target.value.toLowerCase();

  const filteredItems = tech.filter(t =>
    t.label.toLowerCase().includes(filter),
  );

  const listItemsMarkup = createListItemsMarkup(filteredItems);
  populateList(listItemsMarkup);
}

function populateList(markup) {
  refs.list.innerHTML = markup;
}
