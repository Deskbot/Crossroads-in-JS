$(document).ready(init);

function init() {
	gameElem = $('#game');
	outputElem = $('#output');
	optionsPanelElem = $('#options-panel');
	itemsPanelElem = $('#items-panel');
	
	restartButtonElem = $('#restart');
	restartButtonElem.click(restart);	

	game = new Controller();
	game.clear_output();
	game.go(Globe);

	$('#output-wrapper').draggable().resizable();
}

function restart() {
	window.location.reload();
}

//classes

//class Controller
function Controller() {
	this.flags = {
		sharpStick:false,
		ropeOnTree:false,
		gotKey:false,
		deadBear:false,
		ropeIsDown:false,
		gotRope:false,
		doorOpen:false,
		scalesDropped:false,
		trunkOffBear:false
	};
	
	this.bag = new Bag();
}

//static
Controller.YN = 0;

//instance
Controller.prototype.go = function(place, revisit) {
	this.currentLocation = place;
	
	if (typeof revisit === 'undefined' || revisit) {
		this.output(["<hr>"]);
	}
	
	this.change_background(place.img);
	
	place.go.call(place, revisit);
};
Controller.prototype.goFunction = function(place, revisit) {
	return function() {
		this.go(place, revisit);
	}.bind(this);
};
Controller.prototype.change_background = function(name) {
	gameElem.css('background-image','url("media/backgrounds/' + name + '.png")');
};
Controller.prototype.remove_background = function() {
	gameElem.css('background-image','none');
};
Controller.prototype.output = function(messages) {
	for (var i=0; i < messages.length; i++) {
		if (messages[i] === '<hr>') {
			outputElem.append(messages[i]);
		} else {
			outputElem.append('<p>' + messages[i] + '</p>');
		}
	}
	
	//scroll to bottom of outputElem
	outputElem.scrollTop(outputElem.prop('scrollHeight'));
};
Controller.prototype.set_flag = function(name) {
	if (typeof this.flags[name] !== 'undefined') {
		this.flags[name] = true;
		return true;
	} else {
		return false;
	}
};
Controller.prototype.give_options = function(options) {
	optionsPanelElem.html('');
	for (var i=0; i < options.length; i++) {
		this.new_option(options[i].text, options[i].handler);
	}
};
Controller.prototype.new_option = function(text, handler) {
	optionsPanelElem.append('<button>' + text + '</button>');
	var numOfButtons = optionsPanelElem.children('button').length;
	$(optionsPanelElem.children('button')[numOfButtons-1]).click(handler);
};
Controller.prototype.clear_output = function() {
	outputElem.empty();
	//outputElem.children(':not(.ui-resizable-handle)').remove();
};
Controller.prototype.use_item = function(item) {
	if (typeof this.currentLocation.use_item === 'function') {
		this.currentLocation.use_item(item);
	} else {
		game.output(["It didn't do anything"]);
	}
};
Controller.prototype.kill_player = function() {
	this.output(['You are dead.']);
	
	itemsPanelElem.addClass('hidden');
	
	this.decompose();
	
	game.give_options([{text: "Try Again", handler: restart}]);
};
Controller.prototype.decompose = function() {
	var deadFilter = $('#dead-filter');
	this.filterAlpha = 0;
	
	this.interval = setInterval(function(){
		this.decompose_slightly(deadFilter)
	}.bind(this), 50);
};
Controller.prototype.decompose_slightly = function(filter) {
	if (this.filterAlpha == 1) {
		clearInterval(this.interval);
	} else {
		var bgcStr = 'rgba(0,0,0,' + this.filterAlpha + ')';
		filter.css('background-color', bgcStr);
	}
	
	this.filterAlpha += 0.01
};
Controller.prototype.win = function() {
	optionsPanelElem.addClass('hidden');
	itemsPanelElem.addClass('hidden');
};

//class Bag
function Bag() {}
Bag.prototype.itemList = [];

Bag.prototype.add_item = function(item) {
	this.itemList.push(item);
	
	game.output(["~ New Item Obtained: " + item.get_name() + " ~"]);
	
	this.update_item_panel();
};
Bag.prototype.remove_item = function(item) {
	var itemPos = this.itemList.indexOf(item);
	this.itemList.removeByKey(itemPos);
	
	this.update_item_panel();
};
Bag.prototype.get_item = function(name) {
	for (var i=0; i < this.itemList.length; i++) {
		if (this.itemList[i].name == name) {
			return this.itemList[i];
		}
	}
	
	return null;
};
Bag.prototype.update_item_panel = function() {
	itemsPanelElem.empty();
	
	for (var i=0; i < this.itemList.length; i++) {
		itemsPanelElem.append('<button>' + this.itemList[i].get_name() + '</button>');
		
		//child is the element just added i.e. at the end of the child elems of itemsPanelElem
		var numOfButtons = itemsPanelElem.find('button').length;
		var buttonElem = $(itemsPanelElem.find('button')[numOfButtons-1]);
		
		//add attributes and style
		buttonElem.css('background-image', 'url("' + this.itemList[i].get_URL() + '")');
		
		//add event handler with this = the item itself
		buttonElem.click(this.itemList[i].do_click.bind(this.itemList[i]));
	}
}
Bag.prototype.display_items = function() {
	itemsPanelElem.removeClass('.hidden');
};

//class Item
function Item(name) {
	this.name = name;
	this.imageURL = Item.construct_URL(this.name);
}

//static
Item.construct_URL = function(name) {
	return 'media/items/' + name + '.png';
};

//instance
Item.prototype.do_click = function() {	//needs this to be bound
	game.use_item(this);
};
Item.prototype.get_URL= function() {
	return this.imageURL;
};
Item.prototype.get_html = function() {
	return this.elem.html();
};
Item.prototype.get_name = function() {
	return this.name;
};

/*

this.places = {
	globe: new Globe(),
	
	river: new River(),
	riverside: new Riverside(),
	seashore: new Seashore(),
	treeBase: new TreeBase(),
	
	forest: new Forest(),
	clearing: new clearing(),
	forestCentre: new ForestCentre(),
	forestEdge: new ForestEdge(),
	
	castle: new Castle(),
	lockedDoor: new LockedDoor(),
	scalesRoom: new ScalesRoom(),
	statueRoom: new StatueRoom(),
	turret: new Turret()		
};

*/

/*

Bag.prototype.update_item_panel = function() {
	itemsPanelElem.html('');
	
	for (var i=0; i < this.itemList.length; i++) {
		itemsPanelElem.append('<button><img><span>' + this.itemList[i].get_name() + '</span></button>');
		
		//child is the element just added i.e. at the end of the child elems of itemsPanelElem
		var numOfButtons = itemsPanelElem.find('img').length;
		var buttonElem = $(itemsPanelElem.find('button')[numOfButtons-1]);
		var imgElem = $(buttonElem.children('img'));
		
		//add attributes
		imgElem.attr('src', this.itemList[i].get_URL());
		imgElem.attr('alt', this.itemList[i].get_name());
		
		//add event handler with this = the item itself
		imgElem.click(this.itemList[i].do_click.bind(this.itemList[i]));
	}
}

*/