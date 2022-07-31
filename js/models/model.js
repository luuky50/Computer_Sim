function Component(id, type, name, price){
  this.id = id;
  this.name = name;
  this.type = type;
  this.price = price;
}

function Computer(id, name, components){
  this.id = id;
  this.name = name;
  this.components = components;
}

function User(id, name, computers){
  this.id = id;
  this.name = name;
  this.computers = computers;
}

export {Component, Computer, User}
