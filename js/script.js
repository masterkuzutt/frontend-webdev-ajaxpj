var api_key ="";
var nyt_key = 'api-key=80563d6a8a6842538fd85bb0955741f7';
function loadData() {
    "use strict";
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val(),
        cityStr = $('#city').val(),
        address = streetStr + "," + cityStr,
        urlStr = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address;
    $body.append('<img class="bgimg" src=' + urlStr + '>');

    // load newyork times news articles
    var nyt_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?' + nyt_key +'&q=' + address;
    $.getJSON(nyt_url,function (data) {
      var articleOjects = data.response.docs;
      // console.log(articleOjects);
      var items = [];

      $.each(articleOjects, function  (key, val) {
        $nytElem.append("<li class='" + val.document_type + "'>" +
                        "<a href=" + val.web_url  + ">" +  val.snippet + "</a></li>" );
      });

    })
      .error(function  () {
        $nytHeaderElem.text('NY TIMES do not respond article');
      })
    ;

    //load wikipedia article
    var wikirequestTimeout = setTimeout(function  () {
      $wikiElem.text("failed to get wikipedia search");
    },8000);

    var wikipediaUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + address;
    $.ajax({
      method : "GET",
      url : wikipediaUrl,
      dataType : "jsonp"
    })
    .done(function  (data){
      for ( var i = 0 , len = data[1].length; i < len ; i++){
        $wikiElem.append('<li class="test">' +
                         '<a href=' + data[3][i] + ' target="_blank">' +  data[1][i] + '</a></li>' );
      };
      // console.log(data);
      clearTimeout(wikirequestTimeout);
    })
    ;



    return false;
};

$('#form-container').submit(loadData);
