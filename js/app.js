var model = {
  currentCat: null,
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

  getName: function() {
    return this.cats[this.currentCat].name;
  },

  getImgSrc: function() {
    return this.cats[this.currentCat].imgSrc;
  },

  getNumCats: function() {
    return this.cats.length;
  },

  getSpecificCatName: function(i) {
    return this.cats[i].name;
  },

  incrementClickCounter: function() {
    this.cats[this.currentCat].clickCount++;
  }
};


var octopus = {
  init: function() {
    // model.init();
    model.currentCat = 0;
    catView.init();
    buttonView.init();
  },

  incrementCounter: function() {
    model.incrementClickCounter();
    catView.render();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },
  getClickCount: function() {
    console.log("octopus getClickCount " + model.getClickCount());
    return model.getClickCount();
  },
  getName: function() {
    return model.getName();
  },
  getImgSrc: function() {
    return model.getImgSrc();
  },
  getNumCats: function() {
    return model.getNumCats();
  },
  getSpecificCatName: function(i) {
    return model.getSpecificCatName(i);
  },
  setCurrentCat: function(i) {
    model.currentCat = i;
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
      debugger
      for(let i=0;i<numCats;i++) {
         elem = document.createElement('button');
         elem.textContent = octopus.getSpecificCatName(i);

         elem.addEventListener('click', (function(catCopy) {
           return function() {
             octopus.setCurrentCat(catCopy);
             catView.render();
           }
         })(i));

         this.catListElement.appendChild(elem);
      }

  }
};


octopus.init();
