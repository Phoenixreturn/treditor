const mongoose = require('mongoose');

class Shape {
  id = new mongoose.Types.ObjectId().toHexString();
  name = 'shape' + this.id;
  x = this.getRandomInt(100);
  y = this.getRandomInt(100);
  rotation = 0;
  scaleX = 1;
  scaleY = 1;
  fill = 'red';
  draggable = true;

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

export default Shape;
