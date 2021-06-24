var circles;
var img;

function preload() {
  img = loadImage("terrace.jpeg");
}

function setup() {
  createCanvas(1080, 1080);
  // img.resize(1080,1080);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  circles = [];

  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);
  console.log(density)
}

function draw() {
  // console.log(frameRate())
  background(0);
  // image(img, 0, 0);
  // fill('white')
  // text('daily art story', 120, 620)
  var total = 10;
  var count = 0;
  var attempts = 0;

  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      noLoop();
      console.log("finished");
      break;
    }
  }

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;

            if (d - 1 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
}

function newCircle() {
  // var x = random(0, 1080);
  // var y = random(0, 1080);
  var x = random(0, img.width);
  var y = random(0, img.height);

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d - 2 < circle.r - 0.1) {
      valid = false;
      break;
    }
  }
  if (valid) {
    var index = (int(x) + int(y) * 1080) * 4;

    var r = img.pixels[index];
    var g = img.pixels[index+1];
    var b = img.pixels[index+2];
    var c = color(r,g,b);
    return new Circle(x, y, color(c));
  } else {
    return null;
  }
  // if (valid) {
  //   var index = (int(x) + int(y) * img.width) * 4;
  //   var r = img.pixels[index];
  //   var g = img.pixels[index+1];
  //   var b = img.pixels[index+2];
  //   var c = color(r,g,b);
  //   return new Circle(x, y, color(c));
  // } else {
  //   return null;
  // }
}