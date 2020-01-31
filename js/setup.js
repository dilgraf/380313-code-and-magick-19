'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// массивы с данными
var FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandom = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// массив из 4-х объектов
var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards.push({
    name: getRandom(FIRST_NAME) + ' ' + getRandom(SURNAME),
    coatColor: getRandom(COAT),
    eyesColor: getRandom(EYES)
  });
}

// шаблон, который будем копировать
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// отрисовка шаблона
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// элемент, в который вставляем похожих магов
var similarListElement = document.querySelector('.setup-similar-list');

var fragment = document.createDocumentFragment();

for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
