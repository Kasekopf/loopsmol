void main(int choice, string page)
{
	string[int] options = available_choice_options();

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
}
