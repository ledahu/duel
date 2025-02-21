



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

        const filtered=this.filterArray(this.balles)
        return JSON.stringify(filtered)
    }

    collisionBords(balle){
        if(balle.x>this.w || balle.x < 0 ){
            balle.bounceX()
        }

        if(balle.y > this.h || balle.y < 0){
            balle.bounceY()
        }
    }

    filterArray(objects) {
        return objects.map(({ id, x, y,rayon,couleur }) => ({ id, x, y,rayon,couleur }));
    }


}

module.exports = AireDeJeu;