from time import sleep
from sys import exit

def start():
	global items, flags
	items = []
	flags = {"sharpStick":False, "ropeOnTree":False, "gotKey":False, "deadBear":False, "seenPath":False, "ropeIsDown":False, "gotRope":False, "doorOpen":False, "scalesDropped":False, "trunkOffBear":False}
	globe.go(True)
def useItem():
	global items
	print(
	"--------------------",
	"Do you wish to use an item?",
	"Y: Yes",
	"N: No",
	sep="\n")
	itemThing = ""
	while itemThing != 'y' and itemThing != 'n':
		itemThing = input(">> ")
		if len(itemThing) < 1:
			itemThing = False
		else:
			itemThing = itemThing.lower()[0]
	if itemThing == 'y':
		print("Item List:\n")
		num = 1
		for item in items:
			print(str(num)+":",item)
			num += 1
		
		print("\nChoose an item number.")
		numChoice = 0
		while numChoice > len(items) or numChoice == 0:
			numChoice = input("> ")
			try:
				numChoice = int(numChoice)
			except ValueError:
				numChoice = 0
				continue
		print("")#experimental to try to break up the walls of text from each other
		return items[numChoice-1]
	else:
		return False

def dead():
	print(
	"--------------------",
	"You are dead.",
	"Restart game?",
	"Y: Yes",
	"N: No",
	sep="\n")
	deadThing = ""
	while deadThing != 'y' and deadThing != 'n':
		deadThing = input(">> ")
		if len(deadThing) < 1:
			deadThing = False
		else:
			deadThing = deadThing.lower()[0]
	if deadThing == 'y':
		start()
	else:
		exit("The game has ended.")

class globe:
	def go(new):
		if new:
			print(
			"=================================================================",
			"You have no idea how you arrived at this place or what you're trying to achieve.",
			"All you know is that you have arrived at a crossroads.",
			sep="\n")
		print(
		"The left path leads towards a river.",
		"The right path leads towards a castle.",
		"And the middle paths leads towards a forest.",
		"--------------------",
		"In which direction will you go?",
		"1: Towards the river",
		"2: Towards the forest",
		"3: Towards the castle",
		sep="\n")

		ans = ""
		while ans != "1" and ans != "2" and ans != "3":
			ans = input("> ")
		if ans == "1":
			river.go(True)
		elif ans == "2":
			forest.go(True)
		else:
			castle.go(True)

class river:
	def go(new):
		if new:
			print("You have arrived at the river.")
		print(
		"To your left is the river itself, the sun glistening off the smooth running water.",
		"In front of you in the distance appears to be the sea shore.",
		"In which direction will you go?",
		"--------------------",
		"1: Left to the river",
		"2: Forwards along the river",
		"3: Go back...",
		sep="\n")
		ans = ""
		while ans != "1" and ans != "2" and ans != "3":
			ans = input("> ")
		if ans == "1":
			return river.left(True)
		elif ans == "2":
			return river.forward(True)
		else:
			return globe.go(False)
		
	def left(new):
		global items
		print(
		"You approach the edge of the river and look down.",
		"Several fish swim slowly and tranquilly.",
		sep="\n")
		if len(items) != 0:
			itemChoice = ""
			while itemChoice != False:
				itemChoice = useItem()
				if itemChoice == "Sharp Stick":#turn stick into fish on stick
					print(
					"You plunged the Sharp Stick into the water",
					"It immediately impaled one of the slowly swimming fish.",
					"\n#New Item Obtained: 'Fish on a Stick'#\n",
					sep="\n")
					items.remove("Sharp Stick")
					items.append("Fish on a Stick")
					itemChoice = False
				elif itemChoice != False:
					print("It didn't do anything.\n")
		input("Continue...")
		print(
		"You decided to go back.",
    	"=====================================================",
		sep="\n")
		return river.go(False)

	def forward(new):
		if new:
			print("You continue walking downhill along the river until you reach the end.")
		
		print(
		"In front of you is the ocean, the water sparkling with the reflection of the distant sun.",
		"The water seems to continue forever. There appears to be nothing at all else -- no other land -- all the way up to the horizon.",
		sep="\n")
		if len(items) != 0:
			itemChoice = ""
			while itemChoice != False:
				itemChoice = useItem()
				if itemChoice == 'Giant Bowl':
					print(
					"You set the Giant Bowl down at the water's edge and sit down inside it.",
					"Slightly nervous you push off from the edge.",
					"The bowl is deep enough for you to float on the calm ocean.",
					"You begin to paddle forwards. You continue for as long as you can until the land behind you is barely visible.",
					"There is nothing of value back there. The only hope is across this sea, where you might discover something about your own existence.",
					sep="\n")
					
					sleep(8)
					print("After what seems like an eternity, your constant paddling pays off.")
					sleep(1)
					print(
					"*bump*",
					"The edge of your makeshift boat softly hits something.",
					"You look in front of you and realise...",
					sep="\n")
					sleep(3)
					print("This is the horizon.")
					sleep(2)
					print(
					"You had bumped against the sky itself -- the blue dome encasing this world.",
					"There is nothing else here besides that castle, that forest, that river, this ocean, and this sky.",
					sep="\n")
					sleep(3)
					print(
					"The only thing left that you can possibly do is...",
					"--------------------",
					"1: reach forward.",
					sep="\n")
					ans = ""
					while ans != "1":
						ans = input("> ")
					sleep(0.5)
					print(
					"Your hand touches the cold sky.",
					"It feels soft somehow, as if you could almost push through it.",
					"--------------------",
					"1: Push your hand through",
					sep="\n")
					ans = ""
					while ans != "1":
						ans = input("> ")
					print(
					"Your hand slides through.",
					"And now with your other hand you begin to tear away at the sky.",
					"Soon the world outside becomes visible.",
					"And you can see it.",
					sep="\n")
					sleep(4)
					print(
					"Out there is a million worlds, each floating like a bubble through a vast black space.",
					"They move silently, all with different colours and sizes.",
					"Some bright, others cloudy, but each one unique and magical.",
					sep="\n")
					sleep(4)
					print("You step outside of the boat and place one foot out into the darkness.")
					sleep(1)
					print("It stays put.")
					sleep(1)
					print(
					"Finally you have escaped from this prison of a world and are now free to travel forever, wherever.",
					"And perhaps along the way, you'll find someone else to go with you.",
					sep="\n")
					sleep(3)
					print("\nThe End")
					sleep(1.5)
					print("or perhaps:")
					print("The True Beginning...")
					while True:
						input("")
				elif itemChoice != False:
					print("It didn't do anything.\n")
				
		print(
		"--------------------",
		"Where would you like to go?",
		"1: Continue to the right along the beach.",
		"2: Go back...",
		sep="\n")
		ans = ""
		while ans != "1" and ans != "2":
			ans = input("> ")
		if ans == "1":
			return river.right(True)
		else:
			return river.go(False)
	
	def right(new):
		global flags, items
		if flags["deadBear"]:
			print(
			"You look down at the base of the cliff to see the bear, its head having been crushed by a falling tree trunk.",
			"It lies there motionless.",
			sep="\n")
			if len(items) != 0:
				itemChoice = ""
				while itemChoice != False:
					itemChoice = useItem()
					if itemChoice == "Giant Crown":
						if not flags["trunkOffBear"]:
							print("You pull as forcefully as you can to slide the trunk of the tree off the head of the bear.")
							flags["trunkOffBear"] = True
						print(
						"You place the Giant Crown over the head of the bear, although it is much too big for it.",
						"The crown begins to glow and the bear begins to stir.",
						"You hear it growl quietly and you can see its eyes rolling around.",
						sep="\n")
						sleep(2)
						print(
						"You stand back as it starts to lift itself up, panting, the crown hanging around its neck.",
						"Seeing that the bear's head is no longer crushed, you turn around and start to run back up towards the beach.",
						sep="\n")
						sleep(1)
						print(
						"Suddenly you hear a heavy crash from behind you.",
						"You turn around and look back towards the bear.",
						"Once again it lies on the ground.",
						"You get closer.",
						"The crown is no longer glowing and the bear's head has once again gone back to being broken.",
						sep="\n")
					elif itemChoice != False:
						print("It didn't do anything.")
			
			print("There's nothing else around here, so you went back to the river.")
			input("Continue...\n")
			print("=================================================================")
			return river.go(False)
		else:
			print(
			"You continue to your right.",
			"The beach doesn't continue for that long before you reach the base of a cliff.",
			"You look up and see the edge of the forest you saw earlier.",
			"On the edge of the cliff, an oddly shaped tree is growing. Its thick trunk is twisted over the edge of the cliff in a convenient horizontal fashion.",
			"However it is far too high up to be grabbed on to.",
			sep="\n")
			if not flags["ropeOnTree"]:
				if len(items) != 0:
					itemChoice = ""
					while itemChoice != False:
						itemChoice = useItem()
						if itemChoice == "Harpoon Rope":
							flags["ropeOnTree"] = True
							print(
							"You threw the over the horizontal tree trunk. The hook spun round repeatedly and you pulled down to see if it was secure.",
							"The rope became taught and held on tightly.",
							sep="\n")
							items.remove("Harpoon Rope")
							itemChoice = False
						elif itemChoice != False:
							print("It didn't do anything.\n")
			if flags["ropeOnTree"]:
				print(
				"--------------------",
				"Would you like to climb the rope?",
				"Y: Yes",
				"N: No",
				sep="\n")
				ans = ""

				while ans != 'y' and ans != 'n':
					ans = input(">> ")
					if len(ans) < 1:
						ans = False
					else:
						ans = ans.lower()[0]
				if ans == "y":
					print(
					"You place both hands firmly around the Harpoon Rope and begin to pull yourself up.",
					"Your feet leave the ground, and you look ready to move your hands higher.",
					sep="\n")
					sleep(3)
					print("*creak*")
					sleep(2)
					print(
					"You continue looking upwards as the trunk of the tree above bends towards you.")
					sleep(2)
					print("*snap*")
					sleep(0.5)
					print(
					"Immediately the trunk comes crashing down, knocking you hard in the face along the way.",
					"It pushes you down towards the ground and crushes your skull at the bottom.")
					sleep(2)
					dead()

		print("There's nothing else to do here, so you turned around and went back.")
		input("Continue...\n")
		print("=================================================================")
		return river.go(False)

class forest:
	def go(new):
		if new:
			print(
			"You have arrived at the forest.",
			"You are at yet another crossroads.",
			sep="\n")
		print(
		"The forest is so dense that you can't see what is down any of the paths.",
		"In which direction will you go?",
		sep="\n")
		print(
		"--------------------",
		"1: Towards the left",
		"2: Straight on",
		"3: Towards the right",
		"4: Go back...",
		sep="\n")
		ans = ""
		while ans != "1" and ans != "2" and ans != "3" and ans != "4":
			ans = input("> ")
		if ans == "1":
			return forest.left(True)
		elif ans == "2":
			return forest.forward(True)
		elif ans == "3":
			return forest.right(True)
		else:
			return globe.go(False)

	def left(new):
		global flags
		print("You walk on for a little while until you reach a clearing.")
		if not flags['sharpStick']:
			print("Lying near the centre of the clearing is a long stick about half your height.",
			"It has the same thickness as a spear with a thin sharp pointed end.",
			"You decided to take the stick with you.",
			sep="\n")
			sleep(1)
			print("\n#New Item Obtained: 'Sharp Stick'#\n")
			items.append("Sharp Stick")
			flags["sharpStick"] = True
		
		print(
		"There is no sign of anybody else living here in the forest -- no footprints, bones, or shelters.",
		"The trees are so closely packed together that there's nowhere further for you to go.",
		sep="\n")
		print("You decided to go back.")
		input("Continue...\n")
		print("=================================================================")
		forest.go(False)

	def forward(new):
		global flags, items
		
		if not flags["gotKey"]:
			if new:
				print("You begin to walk forwards but then suddenly in the distance you spot a bear.")
			else:
				print("You begin to walk forwards but then suddenly you remember the bear up ahead.")
			print(
			"There appears to be something on the ground by its feet.",
			"It's glints slightly from the sunlight in the distance.",
			sep="\n")
		
			print(
			"The path seems to continue right through the forest to the other side.",
			"But there's no way past while the bear is there?",
			sep="\n")
			
			if len(items) != 0:
				itemChoice = ""
				while itemChoice != False:
					itemChoice = useItem()
					if itemChoice == "Fish on a Stick":
						items.remove("Fish on a Stick")
						print(
						"You put the end of the stick into the ground and hide behind a tree.",
						"The bear begins to smell the fresh fish and walks towards it slowly.",
						sep="\n")
						sleep(3)
						print(
						"It begins chewing on the fish.",
						"In that moment while it's distracted, you run past it fast as you can.",
						sep="\n")
						sleep(1)
						print(
						"You slow down momentarily to pick up the shiny object.",
						"\n#New Item Obtained: 'Odd Key'#\n",
						sep="\n")
						items.append("Odd Key")
						flags["gotKey"] = True
						sleep(2)
						print(
						"You look back round at the bear as you start to speed up again.",
						"The bear, already having finished it's first meal, is making it's way towards you quickly on all fours.",
						sep="\n")
						sleep(3)
						if flags["ropeOnTree"]:
							print(
							"You continue running and see the strange looking tree from before, with the Harpoon Rope hanging down.",
							"You take this opportunity and jump, grabbing the rope in the air, hoping with all your might that the tree will hold and you will survive.",
							sep="\n")
							sleep(4)
							print(
							"You sail through the air, your legs holding on tightly.",
							"You swing through the air but suddenly the branch begins to give way.",
							"Before you know it you're moving helplessly through the air.",
							sep="\n")
							sleep(2)
							print("You hit the ground...")
							sleep(2)
							print("But you survive.")
							sleep(1)
							print(
							"You landed on a soft sandy surface, however you're still in some pain.",
							"Suddenly you remember the bear and turn around.")
							sleep(1.5)
							print(
							"You see it lying on the ground at the base of the cliff.",
							"Its head has been crushed by the trunk of the oddly shaped tree.",
							"It lies there motionless.",
							sep="\n")
							flags["deadBear"] = True
							itemChoice = False
							return river.right(False)
						else:
							print(
							"You continue running and see a strange looking tree at the end of the path.",
							"It's oddly growing sideways, but it's far too high for you to grab on to.",
							sep="\n")
							sleep(2)
							print(
							"You reach the end of the cliff and stop to look down.",
							"It's a long way. If you jump, you'll certainly hurt yourself, but if you don't the bear will probably kill you.",
							"--------------------",
							"What will you do?",
							"1: Jump off the cliff",
							"2: Go back past the bear",
							sep="\n")
							
							ans = ""
							while ans != "1" and ans != "2":
								ans = input("> ")
							
							print(
							"In that moment of hesitation, the bear struck, its teeth crushing hard into your shoulder.",
							"It swings you onto the floor.",
							"Your head hits forcefully against the ground.",
							"Quickly everything went black, as the snarling of the bear grew louder.",
							sep="\n")
							sleep(1.5)
							dead()
							"""if ans == 1:
								print(
								"You take your chances and jump off the edge of the cliff.",
								"You tumble through the air accelerating towards the ground...",
								sep="\n")
								sleep(2)
								print(
								"Your head hits forcefully against the ground.",
								"It feels heavy and begins to throb.",
								sep="\n")
								sleep(1)
								print(
								"",
								sep="\n")
							else:
								#stop and die"""
					elif itemChoice == "Sharp Stick":
						print(
						"You ran up towards the bear pointing the Sharp Stick towards it.",
						"It took notice of you just as you stabbed the stick into the side of it's furry belly.",
						sep="\n")
						sleep(2)
						print(
						"The bear looked down angrily, unaffected by the blow.",
						"It swipes powerfully with one claw.",
						"Suddenly its head strikes forwards, jaws open wide.",
						sep="\n")
						sleep(2)
						print("Its sharp teeth close around your neck and suddenly you find yourself unable to move, before finally blacking out all together.")
						dead()
					elif itemChoice != False:
						print(
						"You ran up towards the bear, but before you could do anything it lashed out in anger."
						"It swipes powerfully with one claw.",
						"Suddenly its head strikes forwards, jaws open wide.",
						sep="\n")
						sleep(2)
						print("Its sharp teeth close around your neck and suddenly you find yourself unable to move, before finally blacking out all together.")
						dead()
		else:
			print("The bear is gone and there's nothing else here.")
		print("You decided to go back.")
		input("Continue...\n")
		print("=================================================================")
		forest.go(False)

	def right(new):
		global flags
		print(
		"You walk along a path to your right until you reach the edge of the forest.",
		"A long castle wall runs along the edge of the entire forest.",
		"The bricks are crumbling in places and there are vines and ivy climbing up the side.",
		sep="\n")
		if not flags["ropeIsDown"]:
			print("You see a rope dangling from one of the turrets. The end of it is mysteriously tied around the trunk of a tree.")
			ans = ""
			while ans != "1" and ans != "3":
				print(
				"--------------------",
				"What would you like to do?",
				"1: Climb the rope",
				"2: Pull the rope down",
				"3: Leave it as it is.",
				sep="\n")
				while ans != "1" and ans != "2" and ans != "3":
					ans = input("> ")
				if ans == "1":
					print(
					"You placed both hands around the rope and begin to pull yourself up.",
					"You hold on with your legs and keep raising your hands higher before your arms have the chance to ache too much.",
					sep="\n")
					sleep(3)
					print(
					"However all the pulling and swinging you do on the rope begins to loosen it from the top",
					"Suddenly the rope gives way and becomes detached from the tower.",
					sep="\n")
					sleep(2)
					print("You fall through the air to the ground.")
					dead()
				elif ans == "2":
					print("You tugged at the rope to try to get it to move, however the rope is held on tightly enough that you can't pull it down.")
					ans = ""#ready for next loop for re-choosing
				else:
					print("You left the rope where it is.")
		elif not flags["gotRope"]:
			print(
			"You find a long rope lying on the ground with a several hooks protruding from one end.",
			"The other end is tied to a tree.",
			"You undid the knot, and decided to take the rope with you.",
			"\n#New Item Obtained: The Harpoon Rope#\n",
			sep="\n")
			items.append("Harpoon Rope")
			flags["gotRope"] = True
		
		print("There's nothing else to do here, so you decided to go back.")
		input("Continue...\n")
		print("=================================================================")
		forest.go(False)

class castle:
	def go(new):
		if new:
			print(
			"You enter though the large wooden doors of the castle.",
			"The walls around you are decorated with old tapestries and paintings.",
			"Inside the smoothly cut stone floor is coated with a thin layer of dust.",
			sep="\n")
		print(
		"It seems nobody has been here for years.",
		"Whoever lived here must have been very rich and powerful.",
		"Directly in front of you is a stone archway leading to the main part of the castle.",
		"To the left is a single wooden door.",
		"And to you right is a spiral staircase.",
		"--------------------",
		"In which direction will you go?",
		"1: Door to the left",
		"2: Archway in front",
		"3: Staircase to the right",
		"4: Go back...",
		sep="\n")
		ans = ""
		while ans != "1" and ans != "2" and ans != "3" and ans != "4":
			ans = input("> ")
		if ans == "1":
			return castle.left(True)
		elif ans == "2":
			return castle.forward(True)
		elif ans == "3":
			return castle.right(True)
		else:
			return globe.go(False)
	
	def left(new):
		global flags
		print(
		"You go down a short corridor to your left.",
		"At the end of the corridor is a mysterious wooden door.",
		sep="\n")

		if not flags["doorOpen"]:
			if new:
				print("You try to open the door, but it is locked.")
			else:
				print("The door is locked")
			if len(items) != 0:
				itemChoice = ""
				while itemChoice != False:
					itemChoice = useItem()
					if itemChoice == "Odd Key":
						flags["doorOpen"] = True
						print(
						"You placed the Odd Key into the lock.",
						"*click*",
						"It turned perfectly.",
						sep="\n")
						itemChoice = False
					elif itemChoice != False:
						print("It didn't do anything.\n")
		if flags["doorOpen"]:
			print(
			"You opened the door.",
			"You walk through into a very large room, with a large pit in the centre of the floor.",
			"In the centre is a pillar with a giant set of golden scales.",
			sep="\n")

			if not flags["scalesDropped"]:
				flags["scalesDropped"] = True
				print(
				"The pans are close enough to the edge that you can just about reach the things inside them.",
				"Inside the left pan is a Giant Bowl.",
				"Inside the other pan is a Giant Crown.",
				"You can only reach one of them, and when you take it the other will fall down and be lost forever.",
				"Which one will you take?",
				"1: Giant Bowl",
				"2: Giant Crown",
				"3: Go back instead",
				sep="\n")
				ans = ""
				while ans != "1" and ans != "2" and ans != "3":
					ans = input("> ")
				if ans == "1":
					items.append('Giant Bowl')
					print("\n#New Item Obtained: Giant Bowl#\n",
					"The moment you took the bowl from the scales, on the other side of the room the crown immediately fell.",
					"You watched it fall and you waited, but there was no sound of it hitting the ground.",
					sep="\n")
				elif ans == "2":
					items.append('Giant Crown')
					print("\n#New Item Obtained: Giant Crown#\n"
					"The moment you took the crown from the scales, on the other side of the room the bowl immediately fell.",
					"You watched it fall and you waited, but there was no sound of it hitting the ground.",
					sep="\n")
			else:
				print("The pans are empty.")
							
		print("You decided to go back.")
		input("Continue...\n")
		print("=================================================================")
		castle.go(False)
	
	def forward(new):
		print(
		"You walk through the stone archway into the main part of the ground floor.",
		"Rubble lies around you on the ground.",
		"In front of you, you see a grand staircase in front of you, however the staircase has become detatched from the floor above, leaving a pointless block of stone at the very bottom, leading absolutely nowhere.",
		sep="\n")
		ans = ""
		while ans != "1" and ans != "3":
			print(
			"--------------------",
			"What would you like to do?",
			"1: Look up at the ceiling",
			"2: Continue around the back of the stairs.",
			"3: Go back...",
			sep="\n")
			while ans != "1" and ans != "2" and ans != "3":
				ans = input("> ")
			if ans == "1":
				print(
				"You look up to the ceiling.",
				"All of the upper flooring is missing, allowing you to see all the way up to the roof of the castle.",
				"The rooms above are impossible to reach.",
				sep="\n")
				ans = ""#ready for next loop
			elif ans == "2":
				print(
				"You walk round the back of the staircase and continue forward.",
				"You arrive in a large open room.",
				"It is entirely empty except for a Giant Statue of a man.",
				"It is surrounded by a large beam of light coming from the ceiling.",
				sep="\n")
				sleep(2)
				print(
				"Although the statue is kneeling, it still reigns over ten meters tall.",
				"He is depicted as being bald and wearing a robe down to his feet.",
				"He stands with one hand by his side and the other outstretched forwards towards the ground with his palm facing upwards.",
				"This arm appears to have small steps all the way up to his shoulder.",
				sep="\n")
				sleep(2)
				if len(items) != 0:
					itemChoice = ""
					while itemChoice != False:
						itemChoice = useItem()
						if itemChoice == "Giant Bowl":
							print(
							"You placed the Giant Bowl into the hand of the Giant Statue.",
							"Immediately the inside of the bowl began to glow.",
							"You felt your body begin to shake uncontrollably.",
							"You looked up and see the head of the statue begin to turn towards you.",
							"Your vision starts to blur, but you can see a blue light being drawn from your chest towards the bowl.",
							"Suddenly your vision went black.",
							sep="\n")
							sleep(4)
							dead()
						elif itemChoice != False:
							print("It didn't do anything.\n")
				
				print(
				"--------------------",
				"Do you want to walk up the statue?",
				"Y: Yes",
				"N: No",
				sep="\n")
				
				ans = ""
				while ans != 'y' and ans != 'n':
					ans = input(">> ")
					if len(ans) < 1:
						ans = False
					else:
						ans = ans.lower()[0]
				if ans == "y":
					print(
					"You step on the hand and begin to climb the steps up to the top of the statue.",
					"You reach the top of the steps and you are standing on the shoulder of the man.",
					sep="\n")
					if len(items) != 0:
						itemChoice = ""
						while itemChoice != False:
							itemChoice = useItem()
							if itemChoice == "Giant Crown":
								print(
								"You placed the Giant Crown on top of the head of the Giant Statue.",
								"The crown began to glow.",
								sep="\n")
								sleep(2)
								print(
								"Suddenly the stone beneath you begins to shake",
								"You run back down the steps as the Giant Statue begins to stand up.",
								"\"You...\", a deep voice called out.",
								"\"This artefact will only sustain me temporarily. I need something more.\"",
								sep="\n")
								sleep(3)
								print("...")
								sleep(1)
								print(
								"\"Your sacrifice to break my imprisonment will be much appreciated.\"",
								sep="\n")
								sleep(2)
								print(
								"Your vision starts to blur.",
								"You look down and see a blue light being drawn from your chest towards the Giant Man.",
								"Suddenly your vision went black.",
								sep="\n")
								dead()
							elif itemChoice != False:
								print("It didn't do anything.\n")
					print("There's nothing else to do here, so you decided to go back.")
					input("Continue...\n")
					print("=================================================================")
					castle.go(False)

		print("You decided to go back.")
		input("Continue...\n")
		print("=================================================================")
		castle.go(False)
	
	def right(new):
		global flags
		print(
		"You began walking up the spiral stairs to the right.",
		"It continued on for what seemed like an eternity every brick in the wall identical, every stone step the same.",
		"Eventually you reached the top.",
		sep="\n")
		if flags["seenPath"]:
			sleep(3.5)
			print(
			"You find yourself at the top of a turret.",
			"You look down.",
			"You can see the forest and the river from before and you can see the sea far off in the distance.",
			"You turn around to look back at the path from which you originally came.",
			sep="\n")
			sleep(3)
			print(
			"But there's something odd.",
			"The path starts out of nowhere. There is nothing before it, only the three paths it splits into.",
			"Behind the beginning of this path is a gigantic stone wall.",
			"It trumps the height of even this castle.",
			"It even seems as if the top of the wall itself touches the blue sky above.",
			sep="\n")
		else:
			flags["seenPath"] = True
		if not flags["ropeIsDown"]:
			print(
			"Attached to the top of the turret is a rope.",
			"The metal claws of a harpoon grasp tightly around the stone.",
			sep="\n")
			ans = ""
			while ans != "1" and ans != "3":
				print(
				"--------------------",
				"What would you like to do?",
				"1: Throw the rope over the side.",
				"2: Pull the rope up",
				"3: Go back...",
				sep="\n")
				while ans != "1" and ans != "2" and ans != "3":
					ans = input("> ")
				
				if ans == "1":
					print(
					"You unhooked the rope from the edge of the stone turret.",
					"You watched it fall down to the bottom of the castle, somewhere in the forest.",
					sep="\n")
					flags["ropeIsDown"] = True
				elif ans == "2":
					print("You tugged at the rope, but it appears to be attached to something at the bottom.")
					ans = ""
		else:
			print("There's nothing else to do here.")

		input("Continue...\n")
		print("You went back down the stairs to the entrance you came from.")
		print("=================================================================")
		castle.go(False)
		
start()
