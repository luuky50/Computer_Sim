function Component(id, type, name, price){
  this.id = id;
  this.name = name;
  this.type = type;
  this.price = price;
}

function Computer(id, name, madeBy, components){
  this.id = id;
  this.name = name;
  this.madeBy = madeBy;
  this.components = components;
}

function User(id, name, description, computers){
  this.id = id;
  this.name = name;
  this.description = description;
  this.computers = computers;
}

export {Component, Computer, User}
