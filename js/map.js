'use strict';

(function () {

  var pins = document.querySelector('.map__pins');
  var mapPinMain = pins.querySelector('.map__pin--main');
  var filtersContainer = document.querySelector('.map').querySelector('.map__filters-container');
  var map = document.querySelector('.map');


  // Активация интерфейса по нажанию, на главную метку карты.

  var activateInterface = function () {
    map.classList.remove('map--faded');
    pins.appendChild(window.pin(window.adverts)); // Отрисовывает отметки на карте
    window.form.removeDisabled();
    onPinClick(); // Вызывает функцию (обработчик событий)
  };

  mapPinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();

    if (window.utils.isEnterEvent(evt)) {
      activateInterface();
    }
  });


  // Отрисовка объявлений при нажатии на метки

  var closeCardPopup = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };


  var doCardPopup = function (pinId) {
    var card = document.querySelector('.map__card');
    if (card) {
      closeCardPopup();
    }
    var newCard = window.card(window.adverts[pinId]);
    map.insertBefore(newCard, filtersContainer);
  };

  // Вешает обработчики событий на метки
  var onPinClick = function () {
    var pinsList = pins.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsList.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        var button = evt.currentTarget;
        var pinId = button.getAttribute('data-id');
        doCardPopup(pinId);

        var closeButton = document.querySelector('.popup__close');
        closeButton.addEventListener('click', function () {
          closeCardPopup();
        });

        document.addEventListener('keydown', function (keydownEvt) {
          if (window.utils.isEscapeEvt(keydownEvt)) {
            closeCardPopup();
          }
        });
      });
    });
  };

  window.activateInterface = activateInterface;

})();
