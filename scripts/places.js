//class Globe
function Globe() {}
Globe.firstVisit = true;
Globe.img = 'Globe';
Globe.go = function() {
	if (Globe.firstVisit) {
		game.output([
			"You have no idea how you arrived at this place or what you're trying to achieve.",
			"All you know is that you have arrived at a crossroads."
		]);
		
		Globe.firstVisit = false;
	}
	
	game.output([
		"The left path leads towards a river.",
		"The right path leads towards a castle.",
		"And the middle paths leads towards a forest."
	]);
	
	game.give_options([
		{text: "Towards the river",		handler: game.goFunction(River)},
		{text: "Towards the forest",	handler: game.goFunction(Forest)},
		{text: "Towards the castle",	handler: game.goFunction(Castle)}
	]);
};

function River() {}
River.firstVisit = true;
River.img = 'River';
River.go = function() {
	if (River.firstVisit) {
		game.output(["You have arrived at the river."]);
		
		River.firstVisit = false;
	}
	
	game.output([
		"To your left is the river itself, the sun glistening off the smooth running water.",
		"In front of you in the distance appears to be the sea shore.",
		"In which direction will you go?"
	]);
	
	game.give_options([
		{text: "Left to the river",			handler: game.goFunction(Riverside)},
		{text: "Forwards along the river",	handler: game.goFunction(Seashore)},
		{text: "Go back...",				handler: game.goFunction(Globe)}
	]);
}

function Riverside() {}
Riverside.img = 'Riverside';
Riverside.go = function() {
	game.output([
		"You approach the edge of the river and look down.",
		"Several fish swim slowly and tranquilly."
	]);
	
	game.give_options([
		{text: "Go back...", handler: game.goFunction(River)}
	]);
}
Riverside.use_item = function(item) {
	if (item.get_name() === "Sharp Stick") {
		game.output([
			"You plunged the Sharp Stick into the water",
			"It immediately impaled one of the slowly swimming fish."
		]);
		game.bag.remove_item(item);
		game.bag.add_item(new Item("Fish On A Stick"));
		
		Riverside.img = 'Riverside_after_fishing';
		game.change_background(Riverside.img);
	} else {
		game.output(["It didn't do anything."]);
	}
}

//class Seashore
function Seashore() {}
Seashore.firstVisit = true;
Seashore.img = 'Seashore';
Seashore.go = function() {
	if (Seashore.firstVisit) {
		game.output(["You continue walking downhill along the river until you reach the end."]);
		
		Seashore.firstVisit = false;
	}
	
	game.output([
		"In front of you is the ocean, the water sparkling with the reflection of the distant sun.",
		"The water seems to continue forever. There appears to be nothing at all else -- no other land -- all the way up to the horizon."
	]);
	
	game.give_options([
		{text: "Go back to the river...",			handler: game.goFunction(River)},
		{text: "Continue right along the beach",	handler: game.goFunction(TreeBase)}
	]);
}
Seashore.use_item = function(item) {
	if (item.get_name() == 'Giant Bowl') {
		Seashore.using_bowl(0);
	} else {
		game.output(["It didn't do anything"]);
	}
}
Seashore.using_bowl = function(stage) {
	console.log(stage);
	if (stage == 0) {
		game.output([
			"You set the Giant Bowl down at the water's edge and sit down inside it.",
			"Slightly nervous you push off from the edge.",
			"The bowl is deep enough for you to float on the calm ocean.",
			"You begin to paddle forwards. You continue for as long as you can until the land behind you is barely visible.",
			"There is nothing of value back there. The only hope is across this sea, where you might discover something about your own existence."
		]);
		
	} else if (stage == 1) {
		game.bag.remove_item(game.bag.get_item('Rope'));
		
		game.change_background('Ocean');
		
	} else if (stage <= 3) {
		game.output([""]);
	}
	
	if (stage == 4) {
		game.output([
			"After what seems like an eternity, your constant paddling pays off.",
			"",
			"*bump*",
			"The edge of your makeshift boat softly hits something.",
			"You look in front of you and realise...",
			"",
			"This is the horizon.",
			"You had bumped against the sky itself -- the blue dome encasing this world.",
			"There is nothing else here besides that castle, that forest, that river, this ocean, and this sky.",
			"",
			"Your hand touches the cold sky.",
			"It feels soft somehow, as if you could almost push through it."
		]);
		
		game.give_options([
			{text: "Push your hand through", handler: game.goFunction(Space)}
		]);
		
	} else {
		game.give_options([
			{text: "next", handler: Seashore.using_bowl_function(stage + 1)}
		]);
	}
}
Seashore.using_bowl_function = function(stage) {
	return function() {
		Seashore.using_bowl(stage);
	}
}

//class Space
function Space() {}
Space.img = 'Space';
Space.go = function() {
	game.output([
		"Your hand slides through.",
		"And now with your other hand you begin to tear away at the sky.",
		"Soon the world outside becomes visible.",
		"And you can see it.",
		"",
		"Out there is a million worlds, each floating like a bubble through a vast black space.",
		"They move silently, all with different colours and sizes.",
		"Some bright, others cloudy, but each one unique and magical.",
		"",
		"You step outside of the boat and place one foot out into the darkness.",
		"",
		"It stays put.",
		"",
		"Finally you have escaped from this prison of a world and are now free to travel forever, wherever.",
		"And perhaps along the way, you'll find someone else to go with you.",
		"",
		"The End",
		"",
		"or perhaps",
		"",
		"The True Beginning..."
	]);
	
	game.win();
}
	
//class TreeBase
function TreeBase() {}
TreeBase.img = 'TreeBase';
TreeBase.go = function(talk) {
	if (typeof talk === 'undefined' || talk) {
		if (game.flags.deadBear) {
			game.output([
				"You look down at the base of the cliff to see the bear, its head having been crushed by a falling tree trunk.",
				"It lies there motionless."
			]);
		} else {
			game.output([
				"You continue to your right.",
				"The beach doesn't continue for that long before you reach the base of a cliff.",
				"You look up and see the edge of the forest you saw earlier.",
				"On the edge of the cliff, an oddly shaped tree is growing. Its thick trunk is twisted over the edge of the cliff in a convenient horizontal fashion.",
				"However it is far too high up to be grabbed on to."
			]);
		}
	}
	
	if (game.flags.ropeOnTree) {
		if (game.flags.deadBear) {
			game.give_options([
				{text: "Continue left along the beach", handler: game.goFunction(Seashore)}
			]);
			
		} else {
			game.output(["Would you like to climb the rope?"]);
		
			game.give_options([
				{text: 'Climb the rope',	handler: TreeBase.climb_rope},
				{text: 'Go back...',		handler: game.goFunction(Seashore)}
			]);
		}
		
	} else {
		game.give_options([
			{text: "Go back...", handler: game.goFunction(Seashore)}
		]);
	}
}
TreeBase.use_item = function(item) {
	var itemName = item.get_name();
	
	/*if (game.flags.deadBear && itemName == 'Giant Crown') {
		if (!game.flags.trunkOffBear) {
			game.output(["You pull as forcefully as you can to slide the trunk of the tree off the head of the bear."]);
			game.set_flag('trunkOffBear');
			
			game.output([
				"You place the Giant Crown over the head of the bear, although it is much too big for it.",
				"The crown begins to glow and the bear begins to stir.",
				"You hear it growl quietly and you can see its eyes rolling around.",
				"",
				"You stand back as it starts to lift itself up, panting, the crown hanging around its neck.",
				"Its head is perfectly in tact.",
				"",
				"You turn around in order to run away...",
				"but it's too late."
			]);
			
			game.kill_player();
		}
	} else */if (!game.flags.ropeOnTree && itemName == 'Rope') {
		ForestEnd.img = 'ForestEnd_rope';
		TreeBase.img = 'TreeBase_rope';
		game.change_background(TreeBase.img);
		
		game.set_flag('ropeOnTree');
		
		game.output([
			"You threw the over the horizontal tree trunk. The hook spun round repeatedly and you pulled down to see if it was secure.",
			"The rope became taught and held on tightly."
		]);
		
		game.bag.remove_item(game.bag.get_item('Rope'));
		
		game.go(TreeBase, false);
	
	} else {
		game.output(["It didn't do anything."]);
	}
}
TreeBase.climb_rope = function() {
	game.output([
		"You place both hands firmly around the Rope and begin to pull yourself up.",
		"Your feet leave the ground, and you look ready to move your hands higher.",
		"",
		"*creak*",
		"",
		"You continue looking upwards as the trunk of the tree above bends towards you.",
		"*snap*",
		"",
		"Immediately the trunk comes crashing down, knocking you hard in the face along the way.",
		"It pushes you down towards the ground and crushes your skull at the bottom."
	]);
	
	game.kill_player();
}

//class Forest
function Forest() {}
Forest.img = 'Forest';
Forest.firstVisit = true;
Forest.go = function() {
	if (Forest.firstVisit) {
		game.output([
			"You have arrived at the forest."
		]);
		Forest.firstVisit = false;
	}
	
	if (!game.flags.gotKey) {
		game.output([
			"In the distance you spot a bear.",
			"There appears to be something on the ground by its feet.",
			"It glints slightly from the sunlight in the distance.",
			"The path ahead seems to continue right through to the other side of the forest.",
			"But there's no way past while the bear is there..."
		]);
	} else {
		game.output([
			"The bear is gone."
		]);
	}
	
	game.output([
		"The forest is so dense that you can't see what is down any of the other paths."
	]);
	
	game.give_options([
		{text: "Towards the left",	handler: game.goFunction(Clearing)},
		{text: "Towards the right",	handler: game.goFunction(ForestEdge)},
		{text: "Go back...",		handler: game.goFunction(Globe)}
	]);
}
Forest.use_item = function(item) {
	if (!game.flags.gotKey && item.get_name() === 'Fish On A Stick') {
		game.output([
			"You put the end of the stick into the ground and hide behind a tree.",
			"The bear begins to smell the fresh fish and walks towards it slowly.",
			"",
			"It begins chewing on the fish.",
			"In that moment while it's distracted, you run past it fast as you can.",
			"",
			"You slow down momentarily to pick up the shiny object."
		]);
		
		game.bag.remove_item(item);
		
		Forest.img = 'Forest_fish';
		game.change_background(Forest.img);
		
		game.bag.add_item(new Item('Odd Key'));
		
		game.set_flag('gotKey');
		
		game.output([
			"You look back round at the bear as you start to speed up again.",
			"The bear, already having finished it's first meal, is making it's way towards you quickly on all fours."
		]);
		
		game.give_options([
			{text: "Run!", handler: game.goFunction(ForestEnd)}
		]);
		
	} else {
		game.output(["It didn't do anything"]);
	}
};

//class Clearing
function Clearing() {}
Clearing.img = 'Clearing';
Clearing.go = function() {
	game.output([
		"You walk on for a little while until you reach a clearing."
	]);
	
	if (!game.flags.sharpStick) {
		game.output([
			"Lying near the centre of the clearing is a long stick about half your height.",
			"It has the same thickness as a spear with a thin sharp pointed end."
		]);
		
		game.give_options([
			{text: "Take the stick",	handler: Clearing.take_stick},
			{text: "Go back...",		handler: game.goFunction(Forest)}
		]);
	} else {
		game.give_options([
			{text: "Go back...", handler: game.goFunction(Forest)}
		]);
	}	
}
Clearing.take_stick = function() {
	game.set_flag('sharpStick');

	game.bag.add_item(new Item('Sharp Stick'));
	
	Clearing.img = 'Clearing_no_stick';
	
	game.change_background(Clearing.img);
	
	game.give_options([
		{text: "Go back...", handler: game.goFunction(Forest)}
	]);
}

//class ForestEnd
function ForestEnd() {}
ForestEnd.img = 'ForestEnd';
ForestEnd.go = function() {
	if (game.flags.ropeOnTree) {
		game.output([
			"You continue running and see the strange looking tree from before, with the Rope hanging down."
		]);
		
		game.give_options([{text: "Jump", handler: ForestEnd.jump_successfully}]);
		
	} else {
		game.output([
			"You continue running and see a strange looking tree at the end of the path.",
			"It's oddly growing sideways, but it's far too high for you to grab on to.",
			"",
			"You reach the end of the cliff and stop to look down.",
			"It's a long way. If you jump, you'll certainly hurt yourself, but if you don't the bear will probably kill you."
		]);
		
		game.give_options([
			{text: "Jump off the cliff",	handler: ForestEnd.get_killed_by_bear},
			{text: "Go back past the bear",	handler: ForestEnd.get_killed_by_bear}
		]);
	}
}
ForestEnd.jump_successfully = function() {
	game.output([
		"You take this opportunity to jump, grabbing the rope in the air, hoping with all your might that the tree will hold and you will survive.",
		"",
		"You swing through the air, your legs holding on tightly, but suddenly the branch begins to give way.",
		"Before you know it you're moving helplessly through the air.",
		"",
		"You hit the ground...",
		"",
		"But you survive.",
		"",
		"You landed on a soft sandy surface, however you're still in some pain.",
		"Suddenly you remember the bear and turn around.",
		"",
		"You see it lying on the ground at the base of the cliff.",
		"Its head has been crushed by the trunk of the oddly shaped tree.",
		"It lies there motionless."
	]);
	
	game.set_flag('deadBear');
	
	game.go(TreeBase, false);
};
ForestEnd.get_killed_by_bear = function() {
	game.output([
		"In that moment of hesitation, the bear struck, its teeth crushing hard into your shoulder.",
		"It swings you onto the floor.",
		"Your head hits forcefully against the ground.",
		"Quickly everything went black, as the snarling of the bear grew louder."
	]);
	
	game.kill_player();
};

//class ForestEdge
function ForestEdge(talk) {}
ForestEdge.img = 'ForestEdge';
ForestEdge.go = function() {
	if (typeof talk === 'undefined' || talk) {
		game.output([
			"You walk along a path to your right until you reach the edge of the forest.",
			"A long castle wall runs along the edge of the entire forest.",
			"The bricks are crumbling in places and there are vines and ivy climbing up the side."
		]);
	}
	
	if (!game.flags.ropeIsDown) {
		game.output([
			"You see a rope dangling from one of the turrets. The end of it is mysteriously tied around the trunk of a tree."
		]);
		
		game.give_options([
			{text: "Climb the rope",		handler: ForestEdge.climb_rope},
			{text: "Pull the rope down",	handler: ForestEdge.pull_rope},
			{text: "Go back...",			handler: game.goFunction(Forest)}
		]);
		
	} else if (!game.flags.gotRope) {
		game.output([
			"You find a long rope lying on the ground with a several hooks protruding from one end.",
			"The other end is tied to a tree."
		]);
		
		game.give_options([
			{text: "Take the rope",	handler: ForestEdge.take_rope},
			{text: "Go back...",	handler: game.goFunction(Forest)}
		]);
		
	} else {
		game.give_options([
			{text: "Go back...", handler: game.goFunction(Forest)}
		]);
	}
};
ForestEdge.climb_rope = function() {
	game.output([
		"You placed both hands around the rope and begin to pull yourself up.",
		"You hold on with your legs and keep raising your hands higher before your arms have the chance to ache too much.",
		"",
		"However all the pulling and swinging you do on the rope begins to loosen it from the top",
		"Suddenly the rope gives way and becomes detached from the tower.",
		"",
		"You fall through the air to the ground."
	]);
	
	game.kill_player();
};
ForestEdge.pull_rope = function() {
	game.output([
		"You tugged at the rope to try to get it to move, however the rope is held on tightly enough that you can't pull it down."
	]);
};
ForestEdge.take_rope = function() {
	game.bag.add_item(new Item('Rope'));
	ForestEdge.img = 'ForestEdge_rope_taken';
	game.change_background(ForestEdge.img);
	game.set_flag('gotRope');
	game.go(ForestEdge, false);
};

//class Castle
function Castle() {}
Castle.img = 'Castle';
Castle.firstVisit = true;
Castle.go = function() {
	if (Castle.firstVisit) {
		Castle.firstVisit = false;
		
		game.output([
			"You enter though the large wooden doors of the castle.",
			"The walls around you are decorated with old tapestries and paintings.",
			"Inside the smoothly cut stone floor is coated with a thin layer of dust."
		]);
	}
	
	game.output([
		"It seems nobody has been here for years.",
		"Whoever lived here must have been very rich and powerful.",
		"Directly in front of you is a stone archway leading to the main part of the castle.",
		"To the left is a single wooden door.",
		"And to your right is a spiral staircase."
	]);
	
	game.give_options([
		{text: "Door to the left",			handler: game.goFunction(LockedDoor)},
		{text: "Archway in front",			handler: game.goFunction(StatueRoom)},
		{text: "Staircase to the right",	handler: game.goFunction(Turret)},
		{text: "Go back...",				handler: game.goFunction(Globe)}
	]);
};

//class LockedDoor
function LockedDoor() {}
LockedDoor.img = 'LockedDoor';
LockedDoor.firstVisit = true;
LockedDoor.go = function() {
	game.output([
		"You go down a short corridor to your left.",
		"At the end of the corridor is a mysterious wooden door."
	]);
	
	if (!game.flags.doorOpen) {
		if (LockedDoor.firstVisit) {
			LockedDoor.firstVisit = false;
			game.output(["You try to open the door, but it is locked."]);
		} else {
			game.output(["The door is locked"]);
		}
		
		game.give_options([
			{text: "Go back...",	handler: game.goFunction(Castle)}
		]);
	} else {
		game.go(ScalesRoom);
	}
};
LockedDoor.use_item = function(item) {
	if (!game.flags.doorOpen && item.get_name() === 'Odd Key') {
		game.set_flag('doorOpen');
		game.bag.remove_item(game.bag.get_item('Odd Key'));
		
		game.output([
			"You placed the Odd Key into the lock.",
			"*click*",
			"It turned perfectly.",
			"And you walked through."
		]);
		
		game.go(ScalesRoom);
	} else {
		game.output(["It didn't do anything"]);
	}
};

//class ScalesRoom
function ScalesRoom() {}
ScalesRoom.img = 'ScalesRoom';
ScalesRoom.go = function(talk) {
	if (typeof talk === 'undefined' || talk) {
		game.output([
			"You opened the door.",
			"You walk through into a very large room, with a large pit in the centre of the floor.",
			"In the centre is a pillar with a giant set of golden scales."
		]);
	}
	
	if (!game.flags.scalesDropped) {
		game.output([
			"The pans are close enough to the edge that you can just about reach the things inside them.",
			"Inside the left pan is a Giant Bowl.",
			"Inside the other pan is a Giant Crown.",
			"You can only reach one of them, and when you take it the other will fall down and be lost forever.",
			"Which one will you take?"
		]);
		
		game.give_options([
			{text: "Giant Bowl",			handler: ScalesRoom.take_bowl},
			{text: "Giant Crown",			handler: ScalesRoom.take_crown},
			{text: "Go back instead...",	handler: game.goFunction(Castle)}
		]);
	} else {
		game.output(["The pans are empty."]);
		
		game.give_options([
			{text: "Go back...", handler: game.goFunction(Castle)}
		]);
	}
};
ScalesRoom.take_bowl = function() {
	game.bag.add_item(new Item('Giant Bowl'));
	game.set_flag('scalesDropped');
	game.output([
		"The moment you took the bowl from the scales, on the other side of the room the crown immediately fell.",
		"You watched it fall and you waited, but there was no sound of it hitting the ground."
	]);
	
	ScalesRoom.img = 'ScalesRoom_bowl_taken';
	
	game.go(ScalesRoom, false);
};
ScalesRoom.take_crown = function() {
	game.bag.add_item(new Item('Giant Crown'));
	game.set_flag('scalesDropped');
	game.output([
		"The moment you took the bowl from the scales, on the other side of the room the crown immediately fell.",
		"You watched it fall and you waited, but there was no sound of it hitting the ground."
	]);
	
	ScalesRoom.img = 'ScalesRoom_crown_taken';
	
	game.go(ScalesRoom, false);
};

//class StatueRoom
function StatueRoom() {}
StatueRoom.img = 'StatueRoom';
StatueRoom.standing = 'bottom';
StatueRoom.go = function(talk) {
	if (typeof talk === 'undefined' || talk) {
		game.output([// !!! fix this for picture
			"You walk through the stone archway into the main part of the ground floor.",
			"Rubble lies around you on the ground.",
			"You arrive in a large open room.",
			"It is entirely empty except for a Giant Statue of a man.",
			"It is surrounded by a large beam of light coming from the ceiling.",
			"",
			"The statue towers over ten meters in height.",
			"He is depicted as being bald and wearing a robe down to his feet.",
			"He stands with one hand by his side and the other outstretched forwards towards the ground with his palm facing upwards.",
			"This arm appears to have small steps all the way up to his shoulder.",
		]);
	} /*else {
		game.output([
			"",
		]);
	}*/
	
	if (StatueRoom.standing === 'bottom') {
		game.give_options([
			{text: "Walk up the statue", handler: StatueRoom.walk_up},
			{text: "Go back...", handler: game.goFunction(Castle)}
		]);
	} else {
		game.give_options([
			{text: "Walk down the statue", handler: StatueRoom.walk_down}
		]);
	}
};
StatueRoom.use_item = function(item) {
	var itemName = item.get_name();
	
	if (StatueRoom.standing === 'bottom' && itemName === 'Giant Bowl') {
		game.output([
			"You placed the Giant Bowl into the hand of the Giant Statue.",
			"Immediately the inside of the bowl began to glow.",
			"You felt your body begin to shake uncontrollably.",
			"You looked up and see the head of the statue begin to turn towards you.",
			"Your vision starts to blur, but you can see a blue light being drawn from your chest towards the bowl.",
			"Suddenly your vision went black."
		]);
		
		game.kill_player();
		
	} else if (StatueRoom.standing === 'top' && itemName === 'Giant Crown') {
		game.output([
			"You placed the Giant Crown on top of the head of the Giant Statue.",
			"The crown began to glow.",
			"",
			"Suddenly the stone beneath you begins to shake",
			"You run back down the steps as the Giant Statue begins to stand up.",
			"\"You...\", a deep voice called out.",
			"\"This artefact will only sustain me temporarily. I need something more.\"",
			"",
			"",
			"",
			"",
			"",
			"\"Your sacrifice to break my imprisonment will be much appreciated.\"",
			"",
			"Your vision starts to blur.",
			"You look down and see a blue light being drawn from your chest towards the Giant Man.",
			"Suddenly your vision went black."
		]);
			
		game.kill_player();
		
	} else {
		game.output(["It didn't do anything"]);
	}
};
StatueRoom.walk_up = function() {
	game.output([
		"You step on the hand and begin to climb the steps up to the top of the statue.",
		"You reach the top of the steps and you are standing on the shoulder of the man."
	]);
	StatueRoom.standing = 'top';
	
	game.go(StatueRoom, false);
};
StatueRoom.walk_down = function() {
	game.output([
		"You step on the shoulder and begin to climb the steps down to the bottom of the statue.",
		"You reach the bottom of the steps and you are standing at the base of the statue."
	]);
	StatueRoom.standing = 'bottom';
	
	game.go(StatueRoom, false);
};

//class Turret
function Turret() {}
Turret.img = 'Turret';
Turret.firstVisit = true;
Turret.go = function() {
	game.output([
		"You began walking up the spiral stairs to the right.",
		"It continued on for what seemed like an eternity every brick in the wall identical, every stone step the same.",
		"Eventually you reached the top.",
		"You find yourself at the top of a turret."
	]);
	
	if (Turret.firstVisit) {
		Turret.firstVisit = false;
		
		game.output([
			"You look down.",
			"You can see the forest and the river from before and you can see the sea far off in the distance.",
			"You turn around to look back at the path from which you originally came.",
			"",
			"But there's something odd.",
			"The path starts out of nowhere. There is nothing before it, only the three paths it splits into.",
			"Behind the beginning of this path is a gigantic stone wall.",
			"It trumps the height of even this castle.",
			"It even seems as if the top of the wall itself touches the blue sky above."
		]);
	}
	
	if (!game.flags.ropeIsDown) {
		game.output([
			"Attached to the top of the turret is a rope.",
			"It is wound tightly around the stone."
		]);
		
		game.give_options([
			{text: "Throw the rope over the side",	handler: Turret.throw_rope_over},
			{text: "Pull the rope up",				handler: Turret.pull_rope_up},
			{text: "Go back...",					handler: game.goFunction(Castle)}
		]);
	} else {
		game.give_options([
			{text: "Go back...", handler: game.goFunction(Castle)}
		]);
	}
};
Turret.throw_rope_over = function() {
	game.output([
		"You unhooked the rope from the edge of the stone turret.",
		"You watched it fall down to the bottom of the castle, somewhere in the forest."
	]);
	ForestEdge.img = 'ForestEdge_rope_down';
	game.set_flag('ropeIsDown');
	
	Turret.img = 'Turret_no_rope';
	game.change_background(Turret.img);
	
	game.give_options([
		{text: "Go back...", handler: game.goFunction(Castle)}
	]);
};
Turret.pull_rope_up = function() {
	game.output(["You tugged at the rope, but it appears to be attached to something at the bottom."]);
};