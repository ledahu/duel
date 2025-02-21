



class AireDeJeu{

    constructor(w,h){
        this.w=w;
        this.h=h;
        this.balles=[]
        console.log('New aire de jeu')
    }

    addBalle(balle){
        this.balles.push(balle)
    }

    updateBalles(){

        for(let i = 0; i < this.balles.length; i++){

            

            //move    
            this.balles[i].x=this.balles[i].x+this.balles[i].dx
            this.balles[i].y=this.balles[i].y+this.balles[i].dy

            //check collisions
            this.collisionBords(this.balles[i])
        }
        // TODO gestion rebonds
    }

    getBalles(){
        return JSON.stringify(this.balles)
    }

    collisionBords(balle){
        if(balle.x>this.w || balle.x < 0 ){
            balle.bounceX()
        }

        if(balle.y > this.h || balle.y < 0){
            balle.bounceY()
        }
    }



}

module.exports = AireDeJeu;