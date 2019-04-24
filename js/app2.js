
/* ======= Model ======= */

var model = {
    adminOn: false,
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/cat_picture1.jpeg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/cat_picture2.jpeg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/cat_picture3.jpeg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/cat_picture4.jpeg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/cat_picture5.jpeg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },

    getName: function() {
        return model.currentCat.name;
    },

    getAdminStatus: function() {
        return model.adminOn;
    },

    toggleAdmin: function() {
      model.adminOn ? model.adminOn = false : model.adminOn = true;
    },

    saveValues: function(name) {
       model.currentCat.name = name;
       alert("saved " + name + " as " + model.currentCat.name);
       catView.render();
       debugger
    }
};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

var adminView = {

  init: function() {
    this.adminElement = document.getElementById('admin-area');

    this.adminSubElement = document.createElement('form');
    this.adminSubElement.id = 'admin-sub-area';
    this.adminSubElement.style.display = 'none';
    this.adminElement.append(this.adminSubElement);

    this.nameField = document.createElement('input');
    this.nameField.setAttribute('type', 'text');
    this.nameField.name = 'cat-name-field';
    this.nameField.id = 'cat-name-field';
    this.nameField.defaultValue = octopus.getName();
    this.adminSubElement.appendChild(this.nameField);

    this.adminButton = document.getElementById('admin-button');

    this.saveButton = document.createElement('button');
    this.saveButton.type = "submit";
    this.saveButton.textContent = 'Save';
    this.adminSubElement.appendChild(this.saveButton);

    this.cancelButton = document.createElement('input');
    this.cancelButton.name = "cancel";
    this.cancelButton.value = "cancel";
    this.cancelButton.type = "submit";
    this.cancelButton.textContent = 'Cancel';
    this.adminSubElement.appendChild(this.cancelButton);



    this.adminButton.addEventListener('click', function() {

        let adminSub = document.getElementById('admin-sub-area');
        if (octopus.getAdminStatus() == true) {
           adminSub.style.display = 'none';
        }
        else {
           adminSub.style.display = 'block';
        }
        octopus.toggleAdmin();
    });


    this.saveButton.addEventListener('click', function() {
      let adminSub = document.getElementById('admin-sub-area');
// save values
      let name = document.getElementById('cat-name-field').value;
      octopus.saveValues(name);
      adminSub.style.display = 'none';
      octopus.toggleAdmin();
      alert("save " + name);
    });

    this.cancelButton.addEventListener('click', function() {
        let adminSub = document.getElementById('admin-sub-area');

        adminSub.style.display = 'none';
        octopus.toggleAdmin();
        alert("cancel");
    });

  }

};

// make it go!
octopus.init();
