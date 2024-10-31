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
  
    equals(outroVertice) {
      return this.x === outroVertice.x && this.y === outroVertice.y;
    }
  }
  
  class Poligono {
    constructor(vertices) {
      if (vertices.length < 3) {
        throw new Error("Um polígono deve ter pelo menos 3 vértices.");
      }
      this._vertices = vertices;
    }
  
    addVertice(novoVertice) {
      if (this._vertices.some(vertice => vertice.equals(novoVertice))) {
        return false;
      }
      this._vertices.push(novoVertice);
      return true;
    }
  
    get perimetro() {
      let perimetro = 0;
      for (let i = 0; i < this._vertices.length; i++) {
        const verticeAtual = this._vertices[i];
        const proximoVertice = this._vertices[(i + 1) % this._vertices.length];
        perimetro += verticeAtual.distancia(proximoVertice);
      }
      return perimetro;
    }
  
    get qtdVertices() {
      return this._vertices.length;
    }
  }
  
  const prompt = require('prompt-sync')({ sigint: true });
  
  function lerVertice() {
    const x = parseFloat(prompt("Digite o valor de x: "));
    const y = parseFloat(prompt("Digite o valor de y: "));
    return new Vertice(x, y);
  }
  
  const vertices = [];
  const numVertices = parseInt(prompt("Digite o número de vértices para o polígono (mínimo 3): "));
  
  if (numVertices < 3) {
    console.error("Um polígono deve ter pelo menos 3 vértices.");
  } else {
    for (let i = 0; i < numVertices; i++) {
      console.log(`Vértice ${i + 1}:`);
      vertices.push(lerVertice());
    }
  
    const poligono = new Poligono(vertices);
    console.log("Perímetro do Polígono:", poligono.perimetro);
    console.log("Quantidade de Vértices:", poligono.qtdVertices);
  
    const novoVertice = lerVertice();
    const adicionado = poligono.addVertice(novoVertice);
    console.log(adicionado ? "Novo vértice adicionado." : "Vértice já existe no polígono.");
  
    console.log("Perímetro atualizado do Polígono:", poligono.perimetro);
    console.log("Quantidade de Vértices atualizada:", poligono.qtdVertices);
  }
  