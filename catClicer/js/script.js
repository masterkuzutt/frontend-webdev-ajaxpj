var httpFigureImg = '<figure><img class="%class%" src="%src%" alt="%alt%"></img><figcaption>%text%</figcaption></figure>';

var imgSrc = {
  "taro" : 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426',
  "jiro" : 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'
};

var Cat = function  (imgSrc,name) {
  this.imgSrc = imgSrc;
  this.name = name;
};

Cat.prototype.appendImg = function (elm,className,alt){
  className = className || "";
  alt  = alt || "";
  elm.append(httpFigureImg.replace('%src%',this.imgSrc)
                       .replace('%class%',className)
                       .replace('%alt%',alt)
                       .replace('%text%',this.name)
  );
};



function init () {
  for ( var name in imgSrc){
    var cat = new Cat(imgSrc[name],name);
    cat.appendImg($('.cat-img-div'),'cat-img',"cat!");
  }

  var clickcount = 0;

  $('.cat-img').click(( function  (clickcountCopy){
    return function  () {
      clickcountCopy++;
      console.log(clickcountCopy);
    }
  })(clickcount));
}

window.onload = init;
