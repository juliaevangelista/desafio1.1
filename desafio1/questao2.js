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
  
  class Triangulo {
    constructor(vertice1, vertice2, vertice3) {
      this._vertice1 = vertice1;
      this._vertice2 = vertice2;
      this._vertice3 = vertice3;
  
      const a = vertice1.distancia(vertice2);
      const b = vertice2.distancia(vertice3);
      const c = vertice3.distancia(vertice1);
  
      if (a + b <= c || a + c <= b || b + c <= a) {
        throw new Error("Os vértices fornecidos não formam um triângulo.");
      }
    }
  
    get vertice1() {
      return this._vertice1;
    }
  
    get vertice2() {
      return this._vertice2;
    }
  
    get vertice3() {
      return this._vertice3;
    }
  
    equals(outroTriangulo) {
      const verticesA = [this.vertice1, this.vertice2, this.vertice3];
      const verticesB = [outroTriangulo.vertice1, outroTriangulo.vertice2, outroTriangulo.vertice3];
  
      return verticesA.every(verticeA => verticesB.some(verticeB => verticeA.equals(verticeB)));
    }
  
    get perimetro() {
      const a = this.vertice1.distancia(this.vertice2);
      const b = this.vertice2.distancia(this.vertice3);
      const c = this.vertice3.distancia(this.vertice1);
      return a + b + c;
    }
  
    tipo() {
      const a = this.vertice1.distancia(this.vertice2);
      const b = this.vertice2.distancia(this.vertice3);
      const c = this.vertice3.distancia(this.vertice1);
  
      if (a === b && b === c) return "Equilátero";
      if (a === b || b === c || a === c) return "Isósceles";
      return "Escaleno";
    }
  
    clone() {
      return new Triangulo(this.vertice1, this.vertice2, this.vertice3);
    }
  
    get area() {
      const a = this.vertice1.distancia(this.vertice2);
      const b = this.vertice2.distancia(this.vertice3);
      const c = this.vertice3.distancia(this.vertice1);
      const s = (a + b + c) / 2;
      return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
  }
  
  const prompt = require('prompt-sync')({ sigint: true });
  
  function lerVertice() {
    const x = parseFloat(prompt("Digite o valor de x: "));
    const y = parseFloat(prompt("Digite o valor de y: "));
    return new Vertice(x, y);
  }
  
  console.log("Crie o primeiro triângulo:");
  const t1Vertice1 = lerVertice();
  const t1Vertice2 = lerVertice();
  const t1Vertice3 = lerVertice();
  
  try {
    const triangulo1 = new Triangulo(t1Vertice1, t1Vertice2, t1Vertice3);
    console.log("Perímetro do Triângulo 1:", triangulo1.perimetro);
    console.log("Tipo do Triângulo 1:", triangulo1.tipo());
    console.log("Área do Triângulo 1:", triangulo1.area);
  
    console.log("Clonando o Triângulo 1...");
    const trianguloClone = triangulo1.clone();
    console.log("Triângulo 1 e seu clone são iguais?", triangulo1.equals(trianguloClone));
  
    console.log("Crie o segundo triângulo:");
    const t2Vertice1 = lerVertice();
    const t2Vertice2 = lerVertice();
    const t2Vertice3 = lerVertice();
    
    const triangulo2 = new Triangulo(t2Vertice1, t2Vertice2, t2Vertice3);
    console.log("Triângulo 1 e Triângulo 2 são iguais?", triangulo1.equals(triangulo2));
  
  } catch (error) {
    console.error(error.message);
  }
  