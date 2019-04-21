var model = {
  currentCat: null,
  adminOnline: true,
  cats: [
    {
      clickCount: 0,
      name: 'Penelope',
      imgSrc: 'img/cat_picture1.jpeg'
    },

    {
      clickCount: 0,
      name: 'Phoebe',
      imgSrc: 'img/cat_picture2.jpeg'
    },

    {
      clickCount: 0,
      name: 'Pusheen',
      imgSrc: 'img/cat_picture3.jpeg'
    },

    {
      clickCount: 0,
      name: 'Pea Milk',
      imgSrc: 'img/cat_picture4.jpeg'
    },

    {
      clickCount: 0,
      name: 'Pillow',
      imgSrc: 'img/cat_picture5.jpeg'
    }
  ],

  getClickCount: function() {
    return this.cats[this.currentCat].clickCount;
  },

  getName: function() {              // returns name of the current cat
    return this.cats[this.currentCat].name;
  },

  setName: function(name) {
    this.cats[this.currentCat].name = name;
  },

  getImgSrc: function() {
    return this.cats[this.currentCat].imgSrc;
  },

  getNumCats: function() {
    return this.cats.length;
  },

  getSpecificCatName: function(i) {   // return cat name based on index i
    return this.cats[i].name;
  },

  incrementClickCounter: function() {
    if (this.adminOnline == false) {   // don't make changes if Admin is on
      this.cats[this.currentCat].clickCount++;
    }
  },

  getImgSrc: function() {
    return this.cats[this.currentCat].imgSrc;
  }
};


var octopus = {
  init: function() {
    // model.init();
    model.currentCat = 0;
    catView.init();
    buttonView.init();
    adminView.init();
  },

  incrementCounter: function() {
    model.incrementClickCounter();
    catView.render();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },
  getClickCount: function() {
    return model.getClickCount();
  },
  getName: function() {             // returns name of current cat
    return model.getName();
  },
  getImgSrc: function() {
    return model.getImgSrc();
  },
  getNumCats: function() {
    return model.getNumCats();
  },
  getSpecificCatName: function(i) {  // returns name of cat specified by index i
    return model.getSpecificCatName(i);
  },
  setCurrentCat: function(i) {
    model.currentCat = i;
  },

  setName: function(name) {
    model.setName(name);
  },

  getUrl: function() {
    return model.getImgSrc();
  },

  adminOn: function() {
    return model.adminOnline;
  },

  setAdminOffline: function() {
    model.adminOnline = false;
  },

  setAdminOnline: function() {
    model.adminOnline = true;
  }

};


var catView = {
  init: function() {
    this.catElement = document.getElementById("cat");
    this.catNameElement = document.getElementById("cat-name");
    this.catImageElement = document.getElementById("cat-img");
    this.countElement = document.getElementById("cat-count");

    this.catImageElement.addEventListener('click', function() {
      octopus.incrementCounter();
    });
    this.render();

  },

  render: function() {
    let currentCat = octopus.getCurrentCat();
    this.countElement.textContent = "Click Count " + octopus.getClickCount();
    console.log("got clickcount of " + currentCat);
    this.catNameElement.textContent = octopus.getName();
    // this.catImageElem.src = currentCat.imgSrc;
    console.log("img src retrieved " + octopus.getImgSrc());
    this.catImageElement.src = octopus.getImgSrc();
  }

};

var buttonView = {
  init: function() {
    // create a button for each cat
    this.catListElement = document.getElementById('cat-list');

    this.render();
  },

  render: function() {
      var elem, numCats;
      numCats = octopus.getNumCats();
      for(let i=0;i<numCats;i++) {
         elem = document.createElement('button');
         elem.textContent = octopus.getSpecificCatName(i);

         elem.addEventListener('click', (function(catCopy) {
           return function() {
             octopus.setCurrentCat(catCopy);
             catView.render();
             // if admin is on, update the admin fields
             if (octopus.adminOn()) {
               console.log("admin is on, so update the fields with current cat info");
               adminView.render();
             }
           }
         })(i));

         this.catListElement.appendChild(elem);
      }

  }
};

var adminView = {
  init: function() {
    this.adminButton = document.getElementById('admin-button');
    this.adminButton.addEventListener('click', (function(thisCopy) {
      return function() {
        if (octopus.adminOn() == true) {
          console.log("hide it");
          // thisCopy.adminSubElement.style.display = 'none';
          thisCopy.hide();
          octopus.setAdminOffline();
        }
        else {
          console.log("show it");
          // thisCopy.adminSubElement.style.display = 'block';
          thisCopy.updateClickValue();  // in case anyone has clicked while admin offline
          thisCopy.show();
          octopus.setAdminOnline();
        }
      }
    })(this));

    this.adminElement = document.getElementById('admin-area');

    this.adminSubElement = document.createElement('div');
    this.adminSubElement.id = 'sub-admin';

    this.nameLabel = document.createElement('label');
    this.nameLabel.htmlFor = 'cat-name';
    this.nameLabel.textContent = 'Cat Name:';
    this.adminSubElement.appendChild(this.nameLabel);
    this.nameField = document.createElement('input');
    this.nameField.setAttribute('type', 'text');
    this.nameField.name = ('cat-name');
    this.nameField.defaultValue = octopus.getName();
    this.adminSubElement.appendChild(this.nameField);

    this.urlField = document.createElement('input');
    this.urlField.setAttribute('type', 'text');
    this.urlField.defaultValue = octopus.getUrl();
    this.adminSubElement.appendChild(this.urlField);

    this.numClicksField = document.createElement('input');
    this.numClicksField.setAttribute('type', 'text');
    this.numClicksField.defaultValue = octopus.getClickCount();
    this.adminSubElement.appendChild(this.numClicksField);

    this.saveButton = document.createElement('button');
    this.saveButton.textContent = 'Save';
    this.cancelButton = document.createElement('button');
    this.cancelButton.textContent = 'Cancel';
    this.cancelButton.addEventListener('click', (function(thisCopy) {
      return function() {
        console.log("hiding");
        thisCopy.hide();
      }
    })(this));

    this.adminSubElement.appendChild(this.saveButton);
    this.adminSubElement.appendChild(this.cancelButton);

    this.adminElement.appendChild(this.adminSubElement);

  },

  updateClickValue: function() {
    this.numClicksField.defaultValue = octopus.getClickCount();
  },

  render: function() {
    this.nameField.defaultValue = octopus.getName();
    this.urlField.defaultValue = octopus.getUrl();
    this.numClicksField.defaultValue = octopus.getClickCount();
  },

  hide: function() {
    // hide the admin functions
    this.adminSubElement.style.display = 'none';
  },


  show: function() {
    // show the admin functions
    this.adminSubElement.style.display = 'block';
  },

  save: function() {
    // take the values from the form and update the model, via the octopus


  }


};

octopus.init();
