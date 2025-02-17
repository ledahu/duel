// This is where all the data that EVERYONE needs to know about everyone else

class UserData{
    constructor(userName,settings){
        this.id = this.generateUniqueId()
        this.name = userName;
        this.locX = settings.X; // horizontal axis
        this.locY = settings.Y; // vertical axis
        this.color = this.getRandomColor();
        this.score = 0;
    }

    getRandomColor(){
        const r = Math.floor((Math.random() * 200) )
        const g = Math.floor((Math.random() * 200) )
        const b = Math.floor((Math.random() * 200) )
        //rbg(112,243,59)
        return `rgb(${r},${g},${b})`
    }

    generateUniqueId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(char) {
            const rand = Math.random() * 16 | 0;
            const value = char === 'x' ? rand : (rand & 0x3 | 0x8);
            return value.toString(16);
        });
    }

}

module.exports = UserData;
