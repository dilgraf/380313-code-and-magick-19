'use strict';

// массивы с данными
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

// шаблон, который будем копировать
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// элемент, в который вставляем похожих магов
var similarListElement = document.querySelector('.setup-similar-list');

var wizards = [];

// массив из 4-х объектов
for (var i = 0; i < 4; i++) {
  wizards.push({
    name: FIRST_NAMES[window.util.getRandom(0, FIRST_NAMES.length)] + ' ' + SURNAMES[window.util.getRandom(0, SURNAMES.length)],
    coatColor: window.wizardpart.COAT_COLORS[window.util.getRandom(0, window.wizardpart.COAT_COLORS.length)],
    eyesColor: window.wizardpart.EYE_COLORS[window.util.getRandom(0, window.wizardpart.EYE_COLORS.length)]
  });
}

// отрисовка шаблона
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

var createSimilarWizards = function (array) {
  for (var j = 0; j < array.length; j++) {
    fragment.appendChild(renderWizard(array[j]));
  }
};

createSimilarWizards(wizards);
similarListElement.appendChild(fragment);
