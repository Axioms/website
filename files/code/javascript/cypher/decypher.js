function decypher() {
  var cypher = document.getElementById('input').value;
  var len = $('#input').val().length;

  var lPhrase = cypher.replace(/[|]/gi,'a');
  var lPhrase = lPhrase.replace(/[+]/gi,'b');
  var lPhrase = lPhrase.replace(/[=]/gi,'c');
  var lPhrase = lPhrase.replace(/[)]/gi,'d');
  var lPhrase = lPhrase.replace(/[#]/gi,'e');
  var lPhrase = lPhrase.replace(/[$]/gi,'f');
  var lPhrase = lPhrase.replace(/[_]/gi,'g');
  var lPhrase = lPhrase.replace(/[!]/gi,'h');
  var lPhrase = lPhrase.replace(/[%]/gi,'i');
  var lPhrase = lPhrase.replace(/[*]/gi,'j');
  var lPhrase = lPhrase.replace(/[(]/gi,'k');
  var lPhrase = lPhrase.replace(/[?]/gi,'l');
  var lPhrase = lPhrase.replace(/[/]/gi,'m');
  var lPhrase = lPhrase.replace(/[.]/gi,'n');
  var lPhrase = lPhrase.replace(/[~]/gi,'o');
  var lPhrase = lPhrase.replace(/[`]/gi,'p');
  var lPhrase = lPhrase.replace(/[{]/gi,'q');
  var lPhrase = lPhrase.replace(/[}]/gi,'r');
  var lPhrase = lPhrase.replace(/[[]/gi,'s');
  var lPhrase = lPhrase.replace(/]/gi,'t');
  var lPhrase = lPhrase.replace(/[@]/gi,'u');
  var lPhrase = lPhrase.replace(/[<]/gi,'v');
  var lPhrase = lPhrase.replace(/[>]/gi,'w');
  var lPhrase = lPhrase.replace(/[,]/gi,'x');
  var lPhrase = lPhrase.replace(/[;]/gi,'y');
  var lPhrase = lPhrase.replace(/[']/gi,'z');
  var lPhrase = lPhrase.replace(/[-]/gi,' ');

  document.getElementById('log').textContent = lPhrase;
}
