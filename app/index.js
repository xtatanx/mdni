import './theme/theme.styl';

const { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };

console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
console.log(z); // { a: 3, b: 4 }

function component() {
  const element = document.createElement('div');
  element.innerHTML = 'Hello Webpack!';
  return element;
}

document.body.appendChild(component());
