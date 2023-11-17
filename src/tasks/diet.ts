import {
  cliExecute,
  drink,
  eat,
  myAdventures,
  myFullness,
  myInebriety,
  restoreMp,
  reverseNumberology,
  use,
  useSkill,
} from "kolmafia";
import { $effect, $effects, $item, $items, $skill, get, have } from "libram";
import { Priorities } from "../engine/priority";
import { Quest } from "../engine/task";
import { atLevel } from "../lib";
import { args } from "../args";

export const DietQuest: Quest = {
  name: "Diet",
  tasks: [
    {
      name: "Eat",
      ready: () =>
        atLevel(5) &&
        (have($item`Ol' Scratch's salad fork`) || args.minor.skipfork) &&
        !get("pizzaOfLegendEaten") &&
        have($item`Pizza of Legend`) &&
        have($effect`Ready to Eat`),
      completed: () => myFullness() > 0,
      do: () => {
        restoreMp(20);
        useSkill($skill`Cannelloni Cocoon`);
        if (have($item`milk of magnesium`) && !get("_milkOfMagnesiumUsed"))
          use($item`milk of magnesium`);
        if (!args.minor.skipfork) eat(1, $item`Ol' Scratch's salad fork`);
        eat(1, $item`Pizza of Legend`);
      },
      outfit: {
        equip: $items`nurse's hat, sea salt scrubs, familiar scrapbook`,
        modifier: "100 hot res, HP",
      },
      limit: { tries: 1 },
    },
    {
      name: "Drink",
      ready: () => atLevel(11) && (have($item`Frosty's frosty mug`) || args.minor.skipmug),
      completed: () =>
        myInebriety() === 1 || (!have($item`astral pilsner`) && !have($item`astral six-pack`)),
      do: () => {
        if (have($item`astral six-pack`)) use($item`astral six-pack`);
        restoreMp(20);
        useSkill($skill`Cannelloni Cocoon`);
        if (!args.minor.skipmug) drink(1, $item`Frosty's frosty mug`);
        drink(1, $item`astral pilsner`);
      },
      outfit: {
        equip: $items`nurse's hat, sea salt scrubs`,
        modifier: "100 cold res, HP",
      },
      effects: $effects`Ode to Booze`,
      limit: { tries: 1 },
    },
    {
      name: "Numberology",
      priority: () => Priorities.Free,
      after: ["Summon/War Frat 151st Infantryman"],
      completed: () =>
        get("_universeCalculated") >= get("skillLevel144") || get("_universeCalculated") >= 3,
      ready: () => myAdventures() > 0 && Object.keys(reverseNumberology()).includes("69"),
      do: (): void => {
        restoreMp(1);
        cliExecute("numberology 69");
      },
      limit: { tries: 5 },
      freeaction: true,
    },
  ],
};
