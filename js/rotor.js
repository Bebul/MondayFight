function rotate(id, speed) {
  let eyes = document.getElementById(id);
  if (!eyes) return false;
  let ul = eyes.getElementsByTagName("ul")[0];
  if (!ul) return false;

  let step = -2, position = 0

  if (!ul.offsetWidth) return false;
  position = 0
  let lastLi = ul.getElementsByTagName('li')[ul.getElementsByTagName("li").length -1]
  let totalWidth = lastLi.offsetLeft + lastLi.offsetWidth
  console.log(`totalWidth = ${totalWidth}`)

  function repeated() {
    position += step;
    let roundPos = Math.round(position);

    if (roundPos > 0 && step > 0) {
      ul.insertBefore(ul.getElementsByTagName('li')[ul.getElementsByTagName("li").length - 1],
        ul.firstChild);
      position -= totalWidth;
    }
    if (roundPos < 0 && step < 0) {
      let curLi = ul.getElementsByTagName("li")[0]
      let width = ul.getElementsByTagName("li")[0].offsetWidth
      ul.appendChild(curLi);
      position += totalWidth - width;
    }
    ul.style.marginLeft = -Math.round(position) + "px";
    setTimeout(repeated, speed);
  }
  setTimeout(repeated, speed);
}
