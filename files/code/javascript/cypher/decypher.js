function decypher() {
  var cypher = document.getElementById('input').value;
  var len = $('#input').val().length;

  var lPhrase = cypher.replace(/[|]/gi,'a');
  lPhrase = lPhrase.replace(/[+]/gi,'b');
  lPhrase = lPhrase.replace(/[=]/gi,'c');
  lPhrase = lPhrase.replace(/[)]/gi,'d');
  lPhrase = lPhrase.replace(/[#]/gi,'e');
  lPhrase = lPhrase.replace(/[$]/gi,'f');
  lPhrase = lPhrase.replace(/[_]/gi,'g');
  lPhrase = lPhrase.replace(/[!]/gi,'h');
  lPhrase = lPhrase.replace(/[%]/gi,'i');
  lPhrase = lPhrase.replace(/[*]/gi,'j');
  lPhrase = lPhrase.replace(/[(]/gi,'k');
  lPhrase = lPhrase.replace(/[?]/gi,'l');
  lPhrase = lPhrase.replace(/[/]/gi,'m');
  lPhrase = lPhrase.replace(/[.]/gi,'n');
  lPhrase = lPhrase.replace(/[~]/gi,'o');
  lPhrase = lPhrase.replace(/[`]/gi,'p');
  lPhrase = lPhrase.replace(/[{]/gi,'q');
  lPhrase = lPhrase.replace(/[}]/gi,'r');
  lPhrase = lPhrase.replace(/[[]/gi,'s');
  lPhrase = lPhrase.replace(/]/gi,'t');
  lPhrase = lPhrase.replace(/[@]/gi,'u');
  lPhrase = lPhrase.replace(/[<]/gi,'v');
  lPhrase = lPhrase.replace(/[>]/gi,'w');
  lPhrase = lPhrase.replace(/[,]/gi,'x');
  lPhrase = lPhrase.replace(/[;]/gi,'y');
  lPhrase = lPhrase.replace(/[']/gi,'z');
  lPhrase = lPhrase.replace(/[-]/gi,' ');

  document.getElementById('log').textContent = lPhrase;
}
