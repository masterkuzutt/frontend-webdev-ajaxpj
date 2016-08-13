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

    var nyt_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?' + nyt_key +'&q=' + address;
    $.getJSON(nyt_url,function (data) {
      console.log(data);
    });

    return false;
};

$('#form-container').submit(loadData);
