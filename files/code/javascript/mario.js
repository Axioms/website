function cypher() {
  var hPhrase = document.getElementById('input').value;
  var lPhrase = hPhrase.toLowerCase();
  var len = $('#input').val().length;

var cypher = lPhrase.replace(/a/gi,'|');
var cypher = cypher.replace(/b/gi,'+');
var cypher = cypher.replace(/c/gi,'=');
var cypher = cypher.replace(/d/gi,')');
var cypher = cypher.replace(/e/gi,'#');
var cypher = cypher.replace(/f/gi,'$');
var cypher = cypher.replace(/g/gi,'_');
var cypher = cypher.replace(/h/gi,'!');
var cypher = cypher.replace(/i/gi,'%');
var cypher = cypher.replace(/j/gi,'*');
var cypher = cypher.replace(/k/gi,'(');
var cypher = cypher.replace(/l/gi,'?');
var cypher = cypher.replace(/m/gi,'/');
var cypher = cypher.replace(/n/gi,'.');
var cypher = cypher.replace(/o/gi,'~');
var cypher = cypher.replace(/p/gi,'`');
var cypher = cypher.replace(/q/gi,'{');
var cypher = cypher.replace(/r/gi,'}');
var cypher = cypher.replace(/s/gi,'[');
var cypher = cypher.replace(/t/gi,']');
var cypher = cypher.replace(/u/gi,'@');
var cypher = cypher.replace(/v/gi,'<');
var cypher = cypher.replace(/w/gi,'>');
var cypher = cypher.replace(/x/gi,',');
var cypher = cypher.replace(/y/gi,';');
var cypher = cypher.replace(/z/gi,"'");
var cypher = cypher.replace(/ /gi,'-');

document.getElementById('log').textContent = cypher;
}
