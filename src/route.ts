import { orderByRoute } from "grimoire-kolmafia";
import { Task } from "./engine/task";

export const routing: string[] = [
  // Break pvp stone ASAP
  "Misc/Break Stone",
  "Pull/All",

  // Start with the basic leveling tasks
  "Toot/Finish",

  // Get basic gear
  "Misc/Workshed",
  "Misc/Goose Exp",
  "Misc/Acquire Birch Battery",
  "Keys/Deck",

  // Level up
  "Misc/Cloud Talk",
  "Summon/War Frat 151st Infantryman", // Summon before leaving level 1
  "Misc/LOV Tunnel",
  "Misc/Daycare",
  "Misc/Bastille",

  // Eat as soon as possible
  "Diet/Eat",
  "Diet/Drink",
  "Diet/Numberology",

  // Get infinite loop
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
  "Summon/Baa'baa'bu'ran",

  // Attempt to Envy into the batcave
  "Palindome/Copperhead",
  "Bat/Use Sonar 1",
  "Manor/Library",

  // Setup additional -combats
  "Manor/Start Floor2",
  "Summon/Astronomer",
  "Summon/Camel's Toe",
  "Hidden City/Open City",
  "Hidden City/Open Bowling",
  "Hidden City/Open Office",
  "Hidden City/Open Hospital",
  "Hidden City/Open Apartment",
  "Manor/Bedroom",
  "Manor/Gallery Delay",
  "Manor/Bathroom Delay",
  "Palindome/Bat Snake",
  "Giant/Grow Beanstalk",
  "Bat/Use Sonar 3", // Reveal more delay
  "Palindome/Cold Snake",
  "McLargeHuge/Climb",

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
  "Crypt/Alcove",

  // Hidden City
  "Hidden City/Office Files", // Banish janitors under delay
  "Hidden City/Apartment",
  "Hidden City/Hospital",
  "Hidden City/Bowling",

  "McLargeHuge/Finish", // Get Eagle beast banish
  "Giant/Finish",
  "Palindome/Talisman",
  "Palindome/Palindome Dudes", // Use Eagle beast banish
  "Manor/Boss",
  "Crypt/Niche",
  "War/Junkyard End",

  "Tavern/Finish",

  // Setup for +meat/+item set
  "Digital/Vanya",
  "Digital/Megalo",
  "Hidden City/Office Boss", // Get Eagle dude banish
  "Macguffin/Upper Chamber",
  "Orc Chasm/Start Peaks",
  "War/Open Nuns",

  // Bulk +meat/+item tasks
  "Misc/Shadow Rift",
  "Misc/Shadow Lodestone",
  "War/Nuns",
  "Crypt/Nook",
  "Orc Chasm/ABoo Clues",
  "Digital/Hero",
  "Orc Chasm/Oil Jar",
  "Macguffin/Middle Chamber", // Avoid Eagle beast banish!
  "Orc Chasm/Twin Init", // Use Eagle dude banish
  "Digital/Key",

  "Keys/Star Key", // Allow for better use of orb
  "Macguffin/Finish",
  "Crypt/Finish",
  "War/Boss Hippie",
  "Orc Chasm/Finish",

  // Finish up with last delay
  "Bat/Finish",
  "Misc/Eldritch Tentacle",
  "Knob/King",

  // Finish last keys
  "Keys/All Heroes",

  "Tower/Naughty Sorceress",
];

export function prioritize(tasks: Task[]): Task[] {
  return orderByRoute(tasks, routing, false);
}
