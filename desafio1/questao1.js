class Vertice {
    constructor(x, y) {
      this._x = x;
      this._y = y;
    }
  
    get x() {
      return this._x;
    }
  
    get y() {
      return this._y;
    }
  
    distancia(outroVertice) {
      const dx = this.x - outroVertice.x;
      const dy = this.y - outroVertice.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  
    move(novoX, novoY) {
      this._x = novoX;
      this._y = novoY;
    }
  
    equals(outroVertice) {
      return this.x === outroVertice.x && this.y === outroVertice.y;
    }
  }
  
  const prompt = require('prompt-sync')({ sigint: true });
  
  function lerVertice() {
    const x = parseFloat(prompt("Digite o valor de x: "));
    const y = parseFloat(prompt("Digite o valor de y: "));
    return new Vertice(x, y);
  }
  
  const vertice1 = lerVertice();
  const vertice2 = lerVertice();
  const vertice3 = lerVertice();
  
  console.log(`Distância entre o vértice 1 e o vértice 2: ${vertice1.distancia(vertice2)}`);
  console.log(`Distância entre o vértice 1 e o vértice 3: ${vertice1.distancia(vertice3)}`);
  
  const novoX = parseFloat(prompt("Digite o novo valor de x para o vértice 1: "));
  const novoY = parseFloat(prompt("Digite o novo valor de y para o vértice 1: "));
  vertice1.move(novoX, novoY);
  console.log(`Nova posição do vértice 1: (${vertice1.x}, ${vertice1.y})`);
  
  console.log(`Vértice 1 e Vértice 2 são iguais? ${vertice1.equals(vertice2)}`);
  console.log(`Vértice 1 e Vértice 3 são iguais? ${vertice1.equals(vertice3)}`);
  