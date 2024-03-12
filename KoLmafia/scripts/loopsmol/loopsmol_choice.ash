void main(int choice, string page)
{
	string[int] options = available_choice_options();
	int[string] priority;
	int top,pick;

  // Candy cane sword cane adventures
  if (choice == 923 && options contains 5)  // All Over the Map (The Black Forest)
    run_choice(5);
  else if (choice == 780 && options contains 4)  // Action Elevator
    run_choice(4);
  else if (choice == 785 && options contains 4)  // Air Apparent
    run_choice(4);
  else if (choice == 788 && options contains 2)  // Life is Like a Cherry of Bowls
    run_choice(2);
  else if (choice == 691 && options contains 4)  // Second Chest
    run_choice(4);
  //Everfull dart handling
  else switch (choice) {
		default:
			return;

	case 1525:
			priority = {
				"Throw a second dart quickly":60,
				"Deal 25-50% more damage":800,
				"You are less impressed by bullseyes":10,
				"25% Better bullseye targeting":20,
				"Extra stats from stats targets":40,
				"Butt awareness":30,
				"Add Hot Damage":1000,
				"Add Cold Damage":1000,
				"Add Sleaze Damage":1000,
				"Add Spooky Damage":1000,
				"Add Stench Damage":1000,
				"Expand your dart capacity by 1":50,
				"Bullseyes do not impress you much":9,
				"25% More Accurate bullseye targeting":19,
				"Deal 25-50% extra damage":10000,
				"Increase Dart Deleveling from deleveling targets":100,
				"Deal 25-50% greater damage":10000,
				"Extra stats from stats targets":39,
				"25% better chance to hit bullseyes":18,
				};
			top = 999999999;
			pick = 1;

			foreach i,x in available_choice_options() {
				if (priority[x] == 0) {
					print(`dart perk "{x}" not in priority list`,"red");
					continue;
				}
				if (priority[x] < top) {
					top = priority[x];
					pick = i;
				}
			}
			run_choice(pick);
			break;
	}
}