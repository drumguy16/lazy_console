var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

$(".controls").on('click','li', function(event) {
  event.preventDefault();
  $(this).siblings().removeClass("selected");
  $(this).addClass("selected");
  color = $(".selected").css("background-color");
});

function colorSelectToggle() {
    $("#revealColorSelect").slideToggle(400);
    $("#colorSelect").slideToggle(400);
}

$("#revealColorSelect").click(function(event) {
    event.preventDefault();
    colorSelectToggle();
    colorChange();
});

$("#addNewColor").click(function(event) {
    event.preventDefault();
    var $newColorElement = $('<li></li>');
    var newColor = $("#newColor").css("background-color");
    colorSelectToggle();
    $(".controls ul").append($newColorElement);
    $(".controls li").last().css("background-color", newColor);
    $newColorElement.click();
});

function colorChange() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  
  $("#newColor").css("background-color", "rgb(" + r + ", " + g + ", " + b +")");
}

$('input[type=range]').change(colorChange);

$canvas.mousedown(function(event) {
  mouseDown = true;
  lastEvent = event;
}).mousemove(function(event) {
  if(mouseDown) {
  context.beginPath();
  context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
  context.lineTo(event.offsetX, event.offsetY);
    context.strokeStyle = color;
  context.stroke();
  lastEvent = event;
  }
}).mouseup(function() {
  mouseDown = false;
}).mouseleave(function() {
  mouseDown = false;
});
