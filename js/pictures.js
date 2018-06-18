'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var similarPictureList = document.querySelector('.pictures');


var makeArrayObjects = function () {
  var picturesArrayObjects = [];
  for (var i = 1; i <= 25; i++) {
    var comment = [COMMENTS[Math.floor(Math.random() * COMMENTS.length)]];
    var rnd = Math.round(Math.random());
    if (rnd === 1) {
      comment.push(COMMENTS[Math.floor(Math.random() * COMMENTS.length)]);
    }
    var pictureObject = {
      url: 'photos/' + [i] + '.jpg',
      likes: Math.round(Math.random() * (200 - 15)) + 15,
      comments: comment,
      description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)]
    };
    picturesArrayObjects.push(pictureObject);
  }
  return picturesArrayObjects;
};

var picturesArray = makeArrayObjects();

var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < picturesArray.length; i++) {
  fragment.appendChild(renderPicture(picturesArray[i]));
}

similarPictureList.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img').src = picturesArray[0].url;
bigPicture.querySelector('.likes-count').textContent = picturesArray[0].likes;
bigPicture.querySelector('.comments-count').textContent = picturesArray[0].comments.length;

var commentsList = document.querySelector('.social__comments');

for (i = 0; i < picturesArray[0].length; i++) {
  var commentElement = document.createElement('li');
  commentElement.classList.add('social__comment', 'social__comment--text');
  var commentatorPhoto = document.createElement('img');
  commentatorPhoto.classList.add('social__picture');
  commentatorPhoto.src = 'img/avatar-' + Math.ceil(Math.random() * 6) + '.svg';
  commentatorPhoto.alt = 'Аватар комментатора фотографии';
  commentatorPhoto.width = 35;
  commentatorPhoto.height = 35;
  var commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = picturesArray[0].comments[i];
  commentsList.appendChild(commentElement);
  commentElement.appendChild(commentatorPhoto);
  commentElement.appendChild(commentText);
}

var bigDescription = document.querySelector('.social__caption');
bigDescription.textContent = picturesArray[0].description;
