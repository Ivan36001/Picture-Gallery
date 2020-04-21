(function($) {
    //создаем переменные
  var $li = $('.img-list').find('> li'),//для тэгов li
      $links = $li.find('> a'),//для ссылок
      $lightbox = $('.lightbox'),//для элемента с классом lightbox
      $next = $('.next'),//для элемента с классом next
      $prev = $('.prev'),//для элемента с классом prev
      $overlay = $('.overlay'),//для элемента с классом overlay
      liIndex,//служебная переменная
      targetImg;//служебная переменная
  
  //Предзагрузка изображений
  var imgSources = [//массив с ссыками на изображения
  'images/img-1-lg.jpg',
  'images/img-2-lg.jpg',
  'images/img-3-lg.jpg',
  'images/img-4-lg.jpg'
  ];

  var imgs = [];
  for (var i = 0; i < imgSources.length; i++) {//цикл по всем элементам массива
    imgs[i] = new Image();//создаем объект Image и заносим в массив imgs
    imgs[i].src = imgSources[i];//указываем src  с нужным значением
  }

  function replaceImg(src) {
    $lightbox.find('img').attr('src', src);//меняем атрибут src для изображения внутри lightbox
  }

  function getHref(index) {//возвращает атрибут href
    return $li.eq(index).find('>a').attr('href');//находим li по индексу, ссылку и атрибут href для ссылки
  }

  function closeLigtbox() {
    $lightbox.fadeOut();
  }

  $overlay.click(closeLigtbox);//закрытие Ligtbox кликом по overlay (черная область)

  $links.click(function(e) {
    e.preventDefault();//отменяем стандартное поведение браузера
    targetImg = $(this).attr('href');//назначаем переменной значение атрибута href для конкретной ссылки
    liIndex = $(this).parent().index();//сохраняем значение индекса элемента li для ссылки по которой был click
    replaceImg(targetImg);
    $lightbox.fadeIn();//плавное появление lightbox
  });
   
  //Навигация по изображениям
   $next.click( function() { //по клику на next 
    if ( (liIndex + 1) < $li.length ) { //если изображение не последнее
      targetImg = getHref(liIndex + 1);
      liIndex ++;//увеличиваем liIndex на 1
    } else {//иначе переходим на первое изображение
      targetImg = getHref(0);
      liIndex = 0;//меняем значение liIndex
    }
    replaceImg(targetImg);
  });

   $prev.click( function() {//функция запускается по клику на prev 
    if ( (liIndex) > 0 ) {//если мы не на первом изображении
      targetImg = getHref(liIndex - 1);//предыдущее изображение
      liIndex --;//обновляем значение переменной
    } else {//если на первом изображении 
      targetImg = getHref($li.length - 1);//показываем последнее изображение (длинна массива-1: индекс последнего элемента)
      liIndex = $li.length - 1;//обновляем значение переменной (равно индексу последнего элемента массива)
    }
    replaceImg(targetImg);
  });
  
})(jQuery);
