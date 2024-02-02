var w = new Worker("./webworker.js");
var startTime = Date.now();
w.onmessage = (e) => {
  // console.log(e.data);
  pieces = e.data.get("pieces");
  if (pieces) {
    s = `<pre> ${pieces.length} pieces<br>`;
    for (i = 0; i < pieces.length; i++) {
      s2 = pieces[i];
      while (s2.length < 5) {
        s2 = " " + s2;
      }
      s = s + s2 + " ";
      if (i % 16 == 15) {
        s = s + "\n";
      }
    }
    s += "</pre>";
    document.getElementById("results").innerHTML = s;
  }
  progress = e.data.get("progress");
  if (progress) {
    progress = `nodes=${progress} rate=${(
      ((1.0 * progress) / (Date.now() - startTime)) *
      1000
    ).toFixed(2)} nodes/s`;
    document.getElementById("progress").innerHTML = progress;
  }
  url = e.data.get("url");
  if (url) {
    document.getElementById(
      "url"
    ).innerHTML = `<a href="${url}" target="_blank">view</a>`;
  }
};
// load the python script and send it to the worker
fetch("./et2.py.txt")
  .then((response) => response.text())
  .then(function (data) {
    w.postMessage({ python: data });
  });
