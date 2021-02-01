////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mondayFight onClick
function showMondayFightMenu() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos != currentScrollPos) {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") x.style.display = "none";
  }
  prevScrollpos = currentScrollPos;
}
