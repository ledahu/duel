class Baballe {
    
    constructor( x, y, rayon, couleur ='#CCCCCC') {
      this.id =crypto.randomUUID();
      this.x = x;
      this.y = y;
      this.rayon = rayon;
      this.couleur = couleur;
      this.dx = Math.random() * 2 - 1;
      this.dy = Math.random() * 2 - 1;
    }
  
    bounceX(){
      this.dx=-this.dx
    }

    bounceY(){
      this.dy=-this.dy
    }

    setDxDy(dx,dy){
      this.dx=dx
      this.dy=dy
    }



  }
  

  module.exports = Baballe;