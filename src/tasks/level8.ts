import { Item, itemAmount, numericModifier, use, visitUrl } from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $items,
  $location,
  $monster,
  $monsters,
  $skill,
  Counter,
  ensureEffect,
  get,
  have,
  Macro,
} from "libram";
import { Quest } from "../engine/task";
import { OutfitSpec, step } from "grimoire-kolmafia";
import { Priorities } from "../engine/priority";
import { CombatStrategy } from "../engine/combat";
import { atLevel } from "../lib";
import { councilSafe } from "./level12";
import { fillHp } from "../engine/moods";
import { summonStrategy } from "./summons";
import { coldPlanner } from "../engine/outfit";
import { trainSetAvailable } from "./misc";
import { tryPlayApriling } from "../engine/resources";

export const McLargeHugeQuest: Quest = {
  name: "McLargeHuge",
  tasks: [
    {
      name: "Start",
      after: [],
      ready: () => atLevel(8),
      completed: () => step("questL08Trapper") !== -1,
      do: () => visitUrl("council.php"),
      limit: { tries: 1 },
      priority: () => (councilSafe() ? Priorities.Free : Priorities.BadMood),
      freeaction: true,
    },
    {
      name: "Trapper Request",
      after: ["Start"],
      completed: () => step("questL08Trapper") >= 1,
      do: () => visitUrl("place.php?whichplace=mclargehuge&action=trappercabin"),
      limit: { tries: 1 },
      priority: () => Priorities.Free,
      freeaction: true,
    },
    {
      name: "Clover Ore",
      after: ["Trapper Request", "Pull/Ore", "Misc/Hermit Clover"],
      ready: () =>
        have($item`11-leaf clover`) &&
        summonStrategy.getSourceFor($monster`mountain man`) === undefined &&
        oresNeeded() > 0,
      prepare: () => {
        if (!have($effect`Lucky!`)) use($item`11-leaf clover`);
      },
      completed: () =>
        step("questL08Trapper") >= 2 ||
        (get("trapperOre") !== "" && itemAmount(Item.get(get("trapperOre"))) >= 3) ||
        (itemAmount($item`asbestos ore`) >= 3 &&
          itemAmount($item`chrome ore`) >= 3 &&
          itemAmount($item`linoleum ore`) >= 3),
      do: $location`Itznotyerzitz Mine`,
      limit: { tries: 2 },
    },
    {
      name: "Goatlet",
      after: ["Trapper Request"],
      ready: () =>
        Counter.get("Spooky VHS Tape Monster") === 0 ||
        get("spookyVHSTapeMonster") !== $monster`dairy goat`,
      completed: () => itemAmount($item`goat cheese`) >= 3 || step("questL08Trapper") >= 2,
      do: $location`The Goatlet`,
      outfit: {
        modifier: "item",
        avoid: $items`broken champagne bottle`,
        familiar: $familiar`Grey Goose`,
      },
      combat: new CombatStrategy()
        .macro(() => {
          if (itemAmount($item`goat cheese`) === 0)
            return Macro.trySkill($skill`Emit Matter Duplicating Drones`).tryItem(
              $item`Spooky VHS Tape`
            );
          return new Macro();
        }, $monster`dairy goat`)
        .killItem($monster`dairy goat`)
        .banish($monsters`drunk goat, sabre-toothed goat`),
      limit: { soft: 15 },
    },
    {
      name: "Trapper Return",
      after: ["Goatlet", "Pull/Ore", "Summon/Mountain Man", "Clover Ore"],
      ready: () => get("trapperOre") !== "" && itemAmount(Item.get(get("trapperOre"))) >= 3, // Checked here since there is no task for Trainset ores
      completed: () => step("questL08Trapper") >= 2,
      do: () => visitUrl("place.php?whichplace=mclargehuge&action=trappercabin"),
      limit: { tries: 1 },
      freeaction: true,
    },
    {
      name: "Ninja",
      after: ["Trapper Return", "Palindome/Cold Snake"],
      completed: () =>
        (have($item`ninja rope`) && have($item`ninja carabiner`) && have($item`ninja crampons`)) ||
        step("questL08Trapper") >= 3,
      prepare: () => {
        fillHp();
        tryPlayApriling("+combat");
      },
      ready: () => !get("noncombatForcerActive"),
      do: $location`Lair of the Ninja Snowmen`,
      outfit: () => {
        const spec: OutfitSpec = {
          modifier: "50 combat, init",
          skipDefaults: true,
          familiar: $familiar`Jumpsuited Hound Dog`,
          avoid: $items`miniature crystal ball`,
        };
        if (have($familiar`Trick-or-Treating Tot`) && !have($item`li'l ninja costume`))
          spec.familiar = $familiar`Trick-or-Treating Tot`;
        if (
          have($item`latte lovers member's mug`) &&
          get("latteModifier").includes("Combat Rate: 10")
        ) {
          // Ensure kramco does not override +combat
          spec.offhand = $item`latte lovers member's mug`;
        }
        return spec;
      },
      limit: { soft: 20 },
      combat: new CombatStrategy().killHard([
        $monster`Frozen Solid Snake`,
        $monster`ninja snowman assassin`,
      ]),
      orbtargets: () => undefined, // no assassins in orbs
    },
    {
      name: "Climb",
      after: ["Trapper Return", "Ninja"],
      completed: () => step("questL08Trapper") >= 3,
      ready: () => coldPlanner.maximumPossible(true) >= 5,
      prepare: () => {
        if (numericModifier("cold resistance") < 5) ensureEffect($effect`Red Door Syndrome`);
        if (numericModifier("cold resistance") < 5)
          throw `Unable to ensure cold res for The Icy Peak`;
      },
      do: (): void => {
        visitUrl("place.php?whichplace=mclargehuge&action=cloudypeak");
      },
      outfit: () => coldPlanner.outfitFor(5),
      limit: { tries: 1 },
    },
    {
      name: "Peak",
      after: ["Climb"],
      completed: () => step("questL08Trapper") >= 5,
      ready: () => coldPlanner.maximumPossible(true) >= 5,
      prepare: () => {
        if (numericModifier("cold resistance") < 5) ensureEffect($effect`Red Door Syndrome`);
        if (numericModifier("cold resistance") < 5)
          throw `Unable to ensure cold res for The Icy Peak`;
      },
      do: $location`Mist-Shrouded Peak`,
      outfit: () => coldPlanner.outfitFor(5, { familiar: $familiar`Patriotic Eagle` }),
      combat: new CombatStrategy().killHard().macro(() => {
        if (!get("banishedPhyla").includes("beast"))
          return Macro.trySkill($skill`%fn, Release the Patriotic Screech!`);
        return new Macro();
      }),
      boss: true,
      limit: { tries: 4 },
    },
    {
      name: "Finish",
      after: ["Peak"],
      completed: () => step("questL08Trapper") === 999,
      do: () => visitUrl("place.php?whichplace=mclargehuge&action=trappercabin"),
      limit: { tries: 1 },
      freeaction: true,
    },
  ],
};

// Get the number of ores needed from non-trainset places
export function oresNeeded(): number {
  if (step("questL08Trapper") >= 2) return 0;
  if (trainSetAvailable()) return 0;
  let ore_needed = 3;
  ore_needed -= Math.min(
    itemAmount($item`asbestos ore`),
    itemAmount($item`chrome ore`),
    itemAmount($item`linoleum ore`)
  );
  if (have($item`Deck of Every Card`) && get("_deckCardsDrawn") === 0) ore_needed--;
  const pulled = new Set<Item>(
    get("_roninStoragePulls")
      .split(",")
      .map((id) => parseInt(id))
      .filter((id) => id > 0)
      .map((id) => Item.get(id))
  );
  if (
    !pulled.has($item`asbestos ore`) &&
    !pulled.has($item`chrome ore`) &&
    !pulled.has($item`linoleum ore`)
  )
    ore_needed--;

  if (get("spookyVHSTapeMonster") === $monster`mountain man`) ore_needed -= 2;
  return Math.max(ore_needed, 0);
}
