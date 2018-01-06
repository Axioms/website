function cypher() {
    "use strict";
  var hPhrase = document.getElementById('input').value;
  var lPhrase = hPhrase.toLowerCase();
  var len = $('#input').val().length;

var cypher = lPhrase.replace(/a/gi,'|');
cypher = cypher.replace(/b/gi,'+');
cypher = cypher.replace(/c/gi,'=');
cypher = cypher.replace(/d/gi,')');
cypher = cypher.replace(/e/gi,'#');
cypher = cypher.replace(/f/gi,'$');
cypher = cypher.replace(/g/gi,'_');
cypher = cypher.replace(/h/gi,'!');
cypher = cypher.replace(/i/gi,'%');
cypher = cypher.replace(/j/gi,'*');
cypher = cypher.replace(/k/gi,'(');
cypher = cypher.replace(/l/gi,'?');
cypher = cypher.replace(/m/gi,'/');
cypher = cypher.replace(/n/gi,'.');
cypher = cypher.replace(/o/gi,'~');
cypher = cypher.replace(/p/gi,'`');
cypher = cypher.replace(/q/gi,'{');
cypher = cypher.replace(/r/gi,'}');
cypher = cypher.replace(/s/gi,'[');
cypher = cypher.replace(/t/gi,']');
cypher = cypher.replace(/u/gi,'@');
cypher = cypher.replace(/v/gi,'<');
cypher = cypher.replace(/w/gi,'>');
cypher = cypher.replace(/x/gi,',');
cypher = cypher.replace(/y/gi,';');
cypher = cypher.replace(/z/gi,"'");
cypher = cypher.replace(/ /gi,'-');

document.getElementById('log').textContent = cypher;
}
