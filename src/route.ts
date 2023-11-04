import { orderByRoute } from "grimoire-kolmafia";
import { Task } from "./engine/task";

export const routing: string[] = [
  // Break pvp stone ASAP
  "Misc/Break Stone",

  // Start with the basic leveling tasks
  "Toot/Finish",
  // Get basic gear
  "Misc/Goose Exp",
  "Misc/Acquire Firework Hat",
  "Misc/Acquire Birch Battery",
  "Keys/Deck",
  "Pull/All",

  // Eat as soon as possible
  "Diet/Eat",
  "Diet/Drink",
  "Diet/Numberology",

  // Get infinite loop
  "Summon/War Frat 151st Infantryman",
  "Summon/Mountain Man",

  // Start quests when able
  "Knob/Start",
  "McLargeHuge/Trapper Request",

  // Unlock island to start YRing
  "Misc/Unlock Island Submarine",
  "Misc/Unlock Island",

  // Grind tasks until level 11
  "Manor/Kitchen",
  "Mosquito/Burn Delay",
  "Macguffin/Compass", // Unlock desert for ultrahydrated use

  // First -combat group
  "War/Enrage", // Open the War ASAP for Yellow rays
  "War/Flyers Start", // Start the war and get flyers
  "War/Flyers End", // End the flyers quest ASAP in case of tracking errors
  "Hidden City/Forest Coin", // First to get meat
  "Hidden City/Forest Map",
  "Hidden City/Forest Fertilizer",
  "Hidden City/Forest Sapling", // Last to sell bar skins
  "Manor/Billiards",
  "Friar/Finish",
  "Hidden City/Open Temple",

  // Attempt to Envy into the batcave
  "Palindome/Copperhead",
  "Bat/Use Sonar 1",
  "Manor/Library",

  // Setup additional -combats
  "Manor/Start Floor2",
  "Summon/Astronomer",
  "Summon/Camel's Toe",
  "Hidden City/Open City",
  "Manor/Bedroom",
  "Manor/Gallery Delay",
  "Manor/Bathroom Delay",
  "Palindome/Bat Snake",
  "Bat/Use Sonar 3", // Reveal more delay
  "Palindome/Cold Snake",
  "Giant/Grow Beanstalk",

  // Open Hidden City
  "Hidden City/Open Office",
  "Hidden City/Open Hospital",
  "Hidden City/Open Apartment",
  "Hidden City/Open Bowling",

  // Get and use clovers
  "Misc/Hermit Clover",
  "McLargeHuge/Trapper Return",
  "Palindome/Protesters",

  // Second -combat group
  "Hidden City/Banish Janitors",
  "Manor/Finish Floor2",
  "Mosquito/Finish",
  "Crypt/Cranny",
  "Giant/Basement Finish",
  "Giant/Unlock HITS",

  // The following 3 tasks should always stay in this order
  "Macguffin/Oasis", // Get ultrahydrated as soon as needed
  "Macguffin/Oasis Drum", // Get drum as soon as pages are gathered
  "Macguffin/Desert", // charge camel for protestors

  // Finish remaining quests
  "McLargeHuge/Finish",
  "Manor/Boss",
  "War/Junkyard End",
  "Crypt/Niche",
  "Crypt/Alcove",
  "Giant/Finish",
  "Tavern/Finish",

  // Setup for +meat/+item set
  "Macguffin/Upper Chamber",
  "War/Open Nuns",
  "Orc Chasm/Start Peaks",
  "Digital/Vanya",
  "Digital/Megalo",

  // Bulk +meat/+item tasks
  "War/Nuns",
  "Crypt/Nook",
  "Orc Chasm/ABoo Clues",
  "Digital/Hero",
  "Orc Chasm/Oil Jar",
  "Macguffin/Lower Chamber",
  "Orc Chasm/Finish",

  "Keys/Star Key", // Allow for better use of orb
  "War/Boss Hippie",

  "Macguffin/Finish",
  "Crypt/Finish",
  "Bat/Finish", // Finish up with last delay
  "Knob/King",

  // Finish last keys
  "Keys/All Heroes",
  "Digital/Key",

  "Tower/Naughty Sorceress",
];

export function prioritize(tasks: Task[]): Task[] {
  return orderByRoute(tasks, routing, false);
}
