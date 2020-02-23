'use strict';

(function () {
  var SETUP_POSITION_TOP = '80px';
  var SETUP_POSITION_LEFT = '50%';

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');

  window.userNameInput = userNameInput;

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY && userNameInput !== document.activeElement) {
      closePopup();
    }
  };

  var resetSetupCoords = function () {
    setup.style.top = SETUP_POSITION_TOP;
    setup.style.left = SETUP_POSITION_LEFT;
  };

  var openPopup = function () {
    // при повторном открытии диалога, положение диалога должно сбрасываться на изначальное
    resetSetupCoords();

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
    if (evt.keyCode === window.util.ENTER_KEY) {
      setup.classList.remove('hidden');
    }
  });

  // при клике на крестик закрывается попап
  setupClose.addEventListener('click', closePopup);

  // если фокус на крестике, нажатие на Enter закрывает попап
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEY) {
      setup.classList.add('hidden');
    }
  });

  setup.querySelector('.setup-similar').classList.remove('hidden');

  // диалог должен начинать двигаться за курсором мыши при нажатии (mousedown) на блок .upload
  var dialogHandler = setup.querySelector('.upload');

  // обрабатываем событие начала перетаскивания
  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // координаты начальной позиции
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false; // при нажатии значение флага - false, ничего не произошло

    // диалог должен переставать двигаться за курсором мыши при отпускании (mouseup) кнопки мыши и оставаться на новом месте
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      // дельта перемещения
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // новые координаты
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offSetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      // удаляем обработчики передвижения и отпускания курсора
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // при перемещении (dragged = true) запрещаем показывание окна выбора
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
