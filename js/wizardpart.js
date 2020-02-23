'use strict';

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setupPlayer = document.querySelector('.setup-player');
var setupWizard = setupPlayer.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardCoatInput = setupPlayer.querySelector('input[name="coat-color"]');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesInput = setupPlayer.querySelector('input[name="eyes-color"]');
var fireballColor = setupPlayer.querySelector('.setup-fireball-wrap');
var fireballColorInput = fireballColor.querySelector('input[name="fireball-color"]');

window.wizardpart = {
  COAT_COLORS: COAT_COLORS,
  EYE_COLORS: EYE_COLORS
};

var changeColor = function (colors, wizardPart, input) {
  var colorChoice = colors[window.util.getRandom(0, colors.length)];
  wizardPart.style.fill = colorChoice;
  input.value = colorChoice;
};

var changeBgColor = function (colors, wizardPart, input) {
  var bgColorChoice = colors[window.util.getRandom(0, colors.length)];
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
