import {
  canEquip,
  Effect,
  equip,
  equippedAmount,
  equippedItem,
  getInventory,
  getWorkshed,
  Item,
  itemAmount,
  mpCost,
  myClass,
  myHp,
  myMaxhp,
  myMaxmp,
  myMeat,
  myMp,
  myPrimestat,
  numericModifier,
  print,
  restoreHp,
  restoreMp,
  retrieveItem,
  Slot,
  toSkill,
  toSlot,
  use,
  visitUrl,
} from "kolmafia";
import {
  $class,
  $effect,
  $effects,
  $item,
  $skill,
  $slot,
  $stat,
  AsdonMartin,
  ensureEffect,
  freeCrafts,
  get,
  getActiveSongs,
  getSongLimit,
  have,
  isSong,
  uneffect,
} from "libram";
import { asdonFillTo, asdonFualable } from "./resources";
import { underStandard } from "../lib";

function getRelevantEffects(): { [modifier: string]: Effect[] } {
  const result = {
    "-combat": $effects`Smooth Movements, The Sonata of Sneakiness`,
    "+combat": $effects`Carlweather's Cantata of Confrontation, Musk of the Moose`,
    "":
      myMeat() > 0 ? $effects`Empathy, Leash of Linguini, Astral Shell, Elemental Saucesphere` : [],
    "fam weight": $effects`Chorale of Companionship`,
    init: $effects`Walberg's Dim Bulb, Springy Fusilli, Cletus's Canticle of Celerity, Suspicious Gaze, Song of Slowness`,
    ML: $effects`Ur-Kel's Aria of Annoyance, Pride of the Puffin, Drescher's Annoying Noise`,
    item: $effects`Fat Leon's Phat Loot Lyric, Singer's Faithful Ocelot`,
    meat: $effects`Polka of Plenty, Disco Leer`,
    muscle: $effects`Go Get 'Em\, Tiger!, Big, Stevedave's Shanty of Superiority`,
    mysticality: $effects`Glittering Eyelashes, Big, Stevedave's Shanty of Superiority`,
    moxie: $effects`Butt-Rock Hair, Big, Stevedave's Shanty of Superiority`,
    " combat": [] as Effect[],
  };
  const all_attributes = [] as Effect[];

  if (
    have($item`Clan VIP Lounge key`) &&
    !underStandard() &&
    (!get("_olympicSwimmingPool") || have($effect`Silent Running`))
  )
    result["-combat"].push($effect`Silent Running`);

  if (have($skill`Emotionally Chipped`) && get("_feelLonelyUsed") < 3)
    result["-combat"].push($effect`Feeling Lonely`);

  if (have($item`designer sweatpants`) && get("sweat") >= 15) {
    result["init"].push($effect`Slippery and Speedy`);
  }
  if (myClass() !== $class`Pastamancer`) {
    result["init"].push($effect`Whispering Strands`);
  }

  // If we have an effect to override the 1 attribute cap,
  // +%stat effects may be worthwhile
  if (
    have($effect`Hare-Brained`) ||
    have($effect`Feeling Insignificant`) ||
    have($effect`Drenched in Lava`) ||
    have($effect`Snowballed`)
  ) {
    // Add sauce potions
    const saucePotionsAvailable = Math.min(
      itemAmount($item`scrumptious reagent`),
      freeCrafts("food")
    );
    if (myPrimestat() === $stat`Muscle` && have($item`lime`) && saucePotionsAvailable >= 1) {
      result["mysticality"].push($effect`Stabilizing Oiliness`);
      result["moxie"].push($effect`Stabilizing Oiliness`);
    }
    if (saucePotionsAvailable >= 2) {
      result["muscle"].push($effect`Phorcefullness`);
      result["mysticality"].push($effect`Mystically Oiled`);
      result["moxie"].push($effect`Superhuman Sarcasm`);
    }
    if (saucePotionsAvailable >= 3) {
      all_attributes.push($effect`Tomato Power`);
    }

    // Other +attribute effects
    if (!get("_ballpit")) all_attributes.push($effect`Having a Ball!`);
    if (!get("_lyleFavored")) all_attributes.push($effect`Favored by Lyle`);
    if (!get("telescopeLookedHigh")) all_attributes.push($effect`Starry-Eyed`);
    if (get("spacegateAlways") && get("spacegateVaccine2") && !get("_spacegateVaccine"))
      all_attributes.push($effect`Broad-Spectrum Vaccine`);
    if (have($item`protonic accelerator pack`) && !get("_streamsCrossed"))
      all_attributes.push($effect`Total Protonic Reversal`);
  }

  result[" combat"] = result["+combat"];
  result["muscle"].push(...all_attributes);
  result["mysticality"].push(...all_attributes);
  result["moxie"].push(...all_attributes);
  return result;
}

function shrug(effects: Effect[]) {
  for (const effect of effects) {
    if (have(effect) && have($item`soft green echo eyedrop antidote`)) uneffect(effect);
  }
}

export function moodCompatible(modifier: string | undefined): boolean {
  // Since shrugging is limited, ensure we do not attempt a +combat task
  // while under -combat effects, and vice-versa.
  if (modifier === undefined) return true;
  if (modifier.includes("+combat") || modifier.includes(" combat")) {
    return !have($effect`Smooth Movements`) && !have($effect`The Sonata of Sneakiness`);
  }
  if (modifier.includes("-combat")) {
    return (
      !have($effect`Musk of the Moose`) &&
      !have($effect`Carlweather's Cantata of Confrontation`) &&
      !have($effect`Romantically Roused`) &&
      !have($effect`Fresh Breath`)
    );
  }
  return true;
}

function haveEquipmentToCast(effect: Effect): boolean {
  // Check that we have the class equipment to get this skill
  const skill = toSkill(effect);
  if (skill === $skill`none`) return true;
  if (skill.class === $class`Turtle Tamer`) return have($item`turtle totem`);
  if (skill.class === $class`Sauceror`) return have($item`saucepan`);
  if (skill.class === $class`Accordion Thief`) return have($item`stolen accordion`);
  return true;
}

export function applyEffects(modifier: string): void {
  const relevantEffects = getRelevantEffects();

  const useful_effects = [];
  for (const key in relevantEffects) {
    print(`${key} ?? ${modifier}`);
    if (modifier.includes(key)) {
      print("  MATCH");
      useful_effects.push(...relevantEffects[key].filter((e) => haveEquipmentToCast(e)));
    }
  }

  for (const eff of useful_effects) {
    print(`${eff.name}`);
  }

  // Remove wrong combat effects
  if (modifier.includes("+combat") || modifier.includes(" combat"))
    shrug(relevantEffects["-combat"]);
  if (modifier.includes("-combat")) shrug(relevantEffects["+combat"]);

  // Make room for songs
  const songs = useful_effects.filter(isSong);
  if (songs.length > getSongLimit()) throw "Too many AT songs.";
  if (songs.length > 0) {
    const extra_songs = getActiveSongs().filter((e) => !songs.includes(e));
    while (songs.length + extra_songs.length > getSongLimit()) {
      const to_remove = extra_songs.pop();
      if (to_remove === undefined) break;
      else uneffect(to_remove);
    }
  }

  // Apply all relevant effects
  const hotswapped: [Slot, Item][] = []; //
  for (const effect of useful_effects) {
    if (have(effect)) continue;
    const skill = toSkill(effect);
    if (skill !== $skill`none` && !have(skill)) continue; // skip

    // If we don't have the MP for this effect, hotswap some equipment
    const mpcost = mpCost(skill);
    if (mpcost > myMaxmp()) {
      hotswapped.push(...swapEquipmentForMp(mpcost));
    }
    if (myMp() < mpcost) customRestoreMp(mpcost);
    ensureEffect(effect);
  }

  // If we hotswapped equipment, restore our old equipment (in-reverse, to work well if we moved equipment around)
  hotswapped.reverse();
  for (const [slot, item] of hotswapped) equip(item, slot);

  // Use asdon martin
  if (getWorkshed() === $item`Asdon Martin keyfob` && asdonFualable(37)) {
    // if (modifier.includes("-combat")) AsdonMartin.drive(AsdonMartin.Driving.Stealthily);
    // else if (modifier.includes("+combat")) AsdonMartin.drive(AsdonMartin.Driving.Obnoxiously);
    // else if (modifier.includes("init")) AsdonMartin.drive(AsdonMartin.Driving.Quickly);
    if (modifier.includes("meat") || modifier.includes("item")) {
      if (!have($effect`Driving Observantly`)) asdonFillTo(50); // done manually to use all-purpose flower
      AsdonMartin.drive(AsdonMartin.Driving.Observantly);
    }
  }
}

export function swapEquipmentForMp(mpgoal: number): [Slot, Item][] {
  const hotswapped: [Slot, Item][] = [];
  const inventory_options = Object.entries(getInventory())
    .map((v) => Item.get(v[0]))
    .filter((item) => numericModifier(item, "Maximum MP") > 0 && canEquip(item));
  for (const slot of Slot.all()) {
    if (mpgoal <= myMaxmp()) break;
    if (slot === $slot`weapon` || slot === $slot`off-hand`) continue; // skip weapon handedness (for now)
    const item = equippedItem(slot);
    if (item === $item`none`) continue;

    // Find an item in the same slot that gives more max MP
    const canonical_slot =
      slot === $slot`acc3` ? $slot`acc1` : slot === $slot`acc2` ? $slot`acc1` : slot;
    const slot_options = inventory_options
      .filter(
        (it) =>
          equippedAmount(it) === 0 &&
          toSlot(it) === canonical_slot &&
          numericModifier(it, "Maximum HP") >= numericModifier(item, "Maximum HP") &&
          numericModifier(it, "Maximum MP") > numericModifier(item, "Maximum MP")
      )
      .sort((a, b) => numericModifier(b, "Maximum MP") - numericModifier(a, "Maximum MP"));

    // If there is such an item, equip it
    if (slot_options.length === 0) continue;
    hotswapped.push([slot, item]);
    equip(slot, slot_options[0]);
  }
  return hotswapped;
}

export function customRestoreMp(target: number) {
  if (myMp() >= target) return;
  if (get("sweat", 0) >= 80) {
    // Use visit URL to avoid needing to equip the pants
    visitUrl("runskillz.php?action=Skillz&whichskill=7420&targetplayer=0&pwd&quantity=1");
  }
  restoreMp(target);
}

export function fillHp() {
  if (myHp() < myMaxhp()) {
    if (!restoreHp(myMaxhp())) {
      // Backup healing plan in a pinch
      if (have($item`scroll of drastic healing`)) {
        use($item`scroll of drastic healing`);
      } else if (
        get("_hotTubSoaks") < 5 &&
        ($effects`Once-Cursed, Twice-Cursed, Thrice-Cursed`.find((e) => have(e)) === undefined ||
          get("hiddenApartmentProgress") >= 7)
      ) {
        visitUrl("clan_viplounge.php?action=hottub");
      }
      let tries = 0;
      while (myHp() < myMaxhp() && myMeat() >= 1000 && tries < 30) {
        tries++;
        retrieveItem($item`Doc Galaktik's Homeopathic Elixir`);
        use($item`Doc Galaktik's Homeopathic Elixir`);
      }
    }
  }
}
