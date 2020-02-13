'use strict';

// массивы с данными
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEY = 27;
var ENTER_KEY = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

var setupPlayer = document.querySelector('.setup-player');
var setupWizard = setupPlayer.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardCoatInput = setupPlayer.querySelector('input[name="coat-color"]');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesInput = setupPlayer.querySelector('input[name="eyes-color"]');
var fireballColor = setupPlayer.querySelector('.setup-fireball-wrap');
var fireballColorInput = fireballColor.querySelector('input[name="fireball-color"]');

// шаблон, который будем копировать
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// элемент, в который вставляем похожих магов
var similarListElement = document.querySelector('.setup-similar-list');

var wizards = [];

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY && userNameInput !== document.activeElement) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  // при нажатии на Esc закрываем попап
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  // удаляем обработчик закрытия по нажатию на Esc после закрытия попапа
  document.removeEventListener('keydown', onPopupEscPress);
};

// при клике на иконку с фото открывается попап
setupOpen.addEventListener('click', openPopup);

// если фокус на иконке с фото, нажатие на Enter открывает попап
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    setup.classList.remove('hidden');
  }
});

// при клике на крестик закрывается попап
setupClose.addEventListener('click', closePopup);

// если фокус на крестике, нажатие на Enter закрывает попап
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    setup.classList.add('hidden');
  }
});

// валидация имени
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var changeColor = function (colors, wizardPart, input) {
  var colorChoice = colors[getRandomNumber(0, colors.length)];
  wizardPart.style.fill = colorChoice;
  input.value = colorChoice;
};

var changeBgColor = function (colors, wizardPart, input) {
  var bgColorChoice = colors[getRandomNumber(0, colors.length)];
  wizardPart.style.backgroundColor = bgColorChoice;
  input.value = bgColorChoice;
};

wizardCoat.addEventListener('click', function () {
  changeColor(COAT_COLORS, wizardCoat, wizardCoatInput);
});

wizardEyes.addEventListener('click', function () {
  changeColor(EYE_COLORS, wizardEyes, wizardEyesInput);
});

fireballColor.addEventListener('click', function () {
  changeBgColor(FIREBALL_COLORS, fireballColor, fireballColorInput);
});


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// массив из 4-х объектов
for (var i = 0; i < 4; i++) {
  wizards.push({
    name: FIRST_NAMES[getRandomNumber(0, FIRST_NAMES.length)] + ' ' + SURNAMES[getRandomNumber(0, SURNAMES.length)],
    coatColor: COAT_COLORS[getRandomNumber(0, COAT_COLORS.length)],
    eyesColor: EYE_COLORS[getRandomNumber(0, EYE_COLORS.length)]
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

setup.querySelector('.setup-similar').classList.remove('hidden');
