const fileInput = document.getElementById('fileInput');
const output = document.getElementById('output');
const alphabetBar = document.getElementById('alphabet-bar');

const colorMapping = {
  'A': '55,55,225', 'Á': '55,55,225',
  'B': '255,85,168',
  '6': '255,85,168',
  'C': '114,244,47',
  'D': '255,255,0',
  '2': '255,255,0',
  'E': '242,168,7', 'É': '242,168,7', 
  'F': '72,152,213',
  'G': '255,255,255',
  '8': '255,255,255',
  'H': '140,140,140',
  'I': '220,209,50', 'Í': '220,209,50',
  'J': '190,210,225',
  'K': '170,170,170',
  'L': '255,148,173',
  '1': '255,148,173',
  'M': '221,194,156',
  '3': '221,194,156',
  'N': '21,148,141',
  '4': '21,148,141',
  'Ñ': '21,148,141', // con un punto en medio
  'O': '240,120,0', 'Ó': '240,120,0',
  '0': '240,120,0',
  'P': '253,238,165',
  'Q': '255,0,0',
  '9': '255,0,0',
  'R': '28,130,15',
  'S': '183,31,143',
  '5': '183,31,143',
  'T': '172,128,77',
  '7': '172,128,77',
  'U': '0,170,80', 'Ú': '0,170,80',
  'V': '189,247,255',
  'W': '123,20,95',
  'X': '190,25,25',
  'Y': '209,240,163',
  'Z': '116,61,37',
  ' ': '0,0,0'  // Espacio
};

const getShape = (char) => {

  const specialChars = ['¿', '?', '!', '¡', ',', '.', ':', ';', '_', '-', '«', '»', '"'];
  if (specialChars.includes(char)) return 'special';

  if (char.match(/[A-Z]/)) return 'block';
  if (char.match(/[a-z]/)) return 'circle';
  if (char.match(/[0-9]/)) return 'triangle';
  if (char.match(/[ÑÁÉÍÓÚ]/)) return 'parallelogram';
  if (char.match(/[ñáéíóú]/)) return 'oval';
  return 'block';
};

// Primero, rellenar la barra con las letras del abecedario
const vocalesConTilde = new Set(['Á', 'É', 'Í', 'Ó', 'Ú']);

for (let character in colorMapping) {
    if (isNaN(parseInt(character)) && !vocalesConTilde.has(character)) { 
        // Solo para las letras del abecedario que no están en el conjunto de vocales con tilde
        const letterDiv = `<span style="font-weight: bold; font-family: Georgia, serif; font-size: 2em; color: rgb(${colorMapping[character]});">${character}</span>`;
        alphabetBar.innerHTML += letterDiv;
    }
}

// Luego, rellenar la barra con los números
for (let character in colorMapping) {
    if (!isNaN(parseInt(character))) { // Solo para los números
        const numberDiv = `<span style="font-weight: bold; font-family: Georgia, serif; font-size: 2em; color: rgb(${colorMapping[character]});">${character}</span>`;
        alphabetBar.innerHTML += numberDiv;
    }
}

fileInput.addEventListener('change', event => {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.addEventListener('load', event => {
    output.innerHTML = ''; // Limpiar el output
    const text = event.target.result;
    
    for (const char of text) {
      const upperChar = char.toUpperCase();
      const color = colorMapping[upperChar] || '0,0,0';
      const shape = getShape(char);
      
      // Tratar caracteres especiales
      if (shape === 'special') {
        const span = document.createElement('span');
        span.style.color = 'white';  // Configura el color del texto a blanco
        span.style.fontSize = '2em';  // Aumenta el tamaño de la fuente
        span.appendChild(document.createTextNode(char));
        output.appendChild(span);
        continue;  // Pasar a la siguiente iteración del bucle
      }

      const div = document.createElement('div');
      div.className = shape;

      if (shape === 'triangle') {
        div.style.borderBottomColor = `rgb(${color})`;
      } else {
        div.style.backgroundColor = `rgb(${color})`;
      }

      output.appendChild(div);
    }
  });
  
  reader.readAsText(file);
});
