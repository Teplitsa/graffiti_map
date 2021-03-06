ymaps.ready(function () {
  var myMap;

  $('#toggle').bind({click: function () {
    var lat = parseFloat($('#lat').html().replace(",", "."));
    var lon = parseFloat($('#lon').html().replace(",", "."));
    console.log(lat, lon);

    if (!myMap) {

      $('#map').css({'width':'auto', 'height':'300px'});

      myMap = new ymaps.Map('map', {
            center: [lat, lon],
            zoom: 17
        },{suppressMapOpenBlock: true}),
        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32
        });

      var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
        preset: 'islands#redDotIcon'
      });

      myMap.geoObjects.add(myPlacemark);

    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set('preset', 'islands#redDotIcon');
    objectManager.clusters.options.set('preset', 'islands#redClusterIcons');
    myMap.geoObjects.add(objectManager);

    $.ajax({
        url: "/api/graffities"
    }).done(function(data) {
        // полученные данные приведем к требуемой структуре
        // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ObjectManager-docpage/#add
        // проблема в том, что при больших данных надо будет использовать pagination
        var add_data = {
          "type": "FeatureCollection",
          "features": []
        }
        for (i = 0; i < data.length; i++) {
          add_data["features"].push(
            {
              "type": "Feature",
              "id": i,
              "geometry": {
                "type": "Point",
                "coordinates": [data[i]["lat"], data[i]["lon"]]
                },
              "properties": {
                "balloonContentHeader": data[i]["name"],
                "balloonContent": '<center><a href="/graffiti/'+ data[i]["id"] +'"><img class="img-responsive" src="'+ data[i]["photo"] +'" width="250px" height="250px"></a></center>',
                "balloonContentFooter": '<center><a href="/graffiti/'+ data[i]["id"] +'">Посмотреть и обсудить</a></center>',
                "clusterCaption": "Граффити №" + data[i]["id"],
                "hintContent": data[i]["name"]
              }
            }
          );
        }
        objectManager.add(add_data);
    });
    $("#toggle").html('Скрыть карту');
  }
  else {
    myMap.destroy();// Деструктор карты
    myMap = null;
    $('#toggle').html('Показать карту снова');
    $('#map').removeAttr('style')
  }

}});


});
