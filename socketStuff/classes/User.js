// this is where ALL the data is stored about a given user

export class User {
  constructor(socketId, userData, userRoom) {
    this.socketId = socketId;
    this.userData = userData;
    this.userRoom = userRoom;
  }

  getUserId() {
    return this.userData.id;
  }
}
