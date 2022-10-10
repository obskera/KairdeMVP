function forceDown() {
    const url = document.querySelector('#postImage').src
    const filename = document.getElementById('h2Name').innerText
    fetch(url).then(function(t) {
      return t.blob().then((b) => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", filename);
        a.click();
      });
    });
  }