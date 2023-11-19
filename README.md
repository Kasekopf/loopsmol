# Overview

This is a Shrunken Adventurer softcore script, using the [grimoire](https://github.com/Kasekopf/grimoire) framework. It is a fork of [loopgyou](https://github.com/Kasekopf/loop-casual/tree/gyou).

### Strategy

The script is designed to be run as part of a loop. In particular, it expects that something like [garbo](https://github.com/Loathing-Associates-Scripting-Society/garbage-collector) will use the rest of the turns. This means that profitable daily resources (e.g. copiers) are avoided, but other resources (free runaways, kills, some wanderers) are used to save turns where possible.

### Installation

To install the script, use the following command in the KoLMafia CLI.

```
git checkout https://github.com/Kasekopf/loopsmol release
```

### Usage

1. ~~In aftercore, run `loopsmol sim` to verify that the script is installed, and to confirm that you meet the requirements (see below for more details).~~ sim is not yet configured for this script.
2. **Make a Pizza of Legend**.
3. Ascend into a Shrunken Adventurer Softcore run. Seal Clubber is the most tested class. Astral mask or astral belt are both useful, but neither is required. Prefer candles for your eurdora. Workshed will be set to `model train set` by default at the start of the run, but this can be changed with the `workshed` argument.
4. Run `loopsmol` and watch it go! If you are more hesitant, you can run `loopsmol actions 10` to only do 10 things and stop.

Options can be changed in a few different ways:

- In the Mafia relay browser, select `loopsmol` from the dropdown in the top right. Be sure to `Save Changes` after modifying a setting.
- By setting a mafia setting, e.g. `set loopsmol_pulls=18`.
- By providing an argument at runtime, e.g. `loopsmol pulls=18`. Note that any arguments provided at runtime override relay and mafia settings.

Run `loopsmol help` for the full set of script commands and options:

```
> loopsmol help

This is a script to complete Shrunken Adventurer Softcore runs. Run "loopsmol sim" without quotes to check if this script will work for you.

You must ascend manually into a Shrunken Adventurer Softcore run before running the script. Seal Clubber under a Vole sign is recommended for now. Astral mask or astral belt are both useful, but neither is required.

The arguments accepted by the script are listed below. Note that you can combine multiple options; for example "loopsmol pulls=18 tune=blender" will save 2 pulls and switch moon sign to Blender during the run. Most options also have an associated setting to set an option permanently; for example "set loopsmol_pulls=18" will cause the script to always save 2 pulls (unless overriden by using the pulls option at runtime).

Commands:
  sim - Check if you have the requirements to run this script.
  version - Show script version and exit.
  help - Show this message and exit.

Major Options:
  pulls NUMBER - Number of pulls to use. Lower this if you would like to save some pulls to use for in-ronin farming. (Note that this argument is not needed if you pull all your farming items before running the script). [default: 20] [setting: loopsmol_pulls]
  workshed ITEM - Workshed item to place in an empty workshed at the start of the run. [default: model train set] [setting: loopsmol_workshed]
    workshed none - Do nothing
    workshed model train set - Swap to model train set
    workshed cold medicine cabinet - Swap to cold medicine cabinet
    workshed Asdon Martin keyfob - Swap to asdon martin keyfob
  swapworkshed ITEM - Workshed item to place in a workshed to replace the cold medicine cabinet. [default: none] [setting: loopsmol_swapworkshed]
    swapworkshed none - Do nothing
    swapworkshed model train set - Swap to model train set
    swapworkshed cold medicine cabinet - Swap to cold medicine cabinet
    swapworkshed Asdon Martin keyfob - Swap to asdon martin keyfob

Minor Options:
  fax BOOLEAN - Use a fax to summon a monster. Set to false if the faxbots are offline. [default: true] [setting: loopsmol_fax]
  lgr - Pull a lucky gold ring. If pulled, it will be equipped during many combats. [default: false] [setting: loopsmol_lgr]
  jellies - Use your Space Jellyfish to get stench jellies during the war (this may reduce your goose familiar exp). [default: false] [setting: loopsmol_jellies]
  pvp - Break your hippy stone at the start of the run. [default: false] [setting: loopsmol_pvp]
  wand - Always get the zap wand. [default: false] [setting: loopsmol_wand]
  forcelocket - Always equip the combat lover's locket, in order to get monsters inside quickly. [default: false] [setting: loopsmol_forcelocket]
  savelocket NUMBER - Number of uses of the combat lover's locket to save. [default: 0] [setting: loopsmol_savelocket]
  luck NUMBER - Multiply the threshold for stopping execution when "you may just be unlucky". Increasing this can be dangerous and cause the script to waste more adventures; use at your own risk. [default: 1] [setting: loopsmol_luck]
  saveparka NUMBER - Number of spikolodon spikes to save (max 5). [default: 0] [setting: loopsmol_saveparka]
  voterbooth - Attempt to use the voter booth if we have access. [default: true] [setting: loopsmol_voterbooth]
  skipfork - Skip salad forking; note that this may cause failure due to lack of remaining adventures [default: false] [setting: loopsmol_skipfork]
  skipmug - Skip frosty mug; note that this may cause failure due to lack of remaining adventures [default: false] [setting: loopsmol_skipmug]
  skipmilk - Skip milk of magnesium [default: true] [setting: loopsmol_skipmilk]

Debug Options:
  actions NUMBER - Maximum number of actions to perform, if given. Can be used to execute just a few steps at a time. [setting: loopsmol_actions]
  verbose - Print out a list of possible tasks at each step. [default: false] [setting: loopsmol_verbose]
  verboseequip - Print out equipment usage before each task to the CLI. [setting: loopsmol_verboseequip]
  ignoretasks TEXT - A comma-separated list of task names that should not be done. Can be used as a workaround for script bugs where a task is crashing. [setting: loopsmol_ignoretasks]
  completedtasks TEXT - A comma-separated list of task names the should be treated as completed. Can be used as a workaround for script bugs. [setting: loopsmol_completedtasks]
  list - Show the status of all tasks and exit.
  settings - Show the parsed value for all arguments and exit.
  ignorekeys - Ignore the check that all keys can be obtained. Typically for hardcore, if you plan to get your own keys [default: false] [setting: loopsmol_ignorekeys]
  halt NUMBER - Halt when you have this number of adventures remaining or fewer [default: 0] [setting: loopsmol_halt]
```

### Manual Installation

If you would like to make your own modifications to the script, the recommended way is to compile and install the script manually.

1. Compile the script, following instructions in the [kol-ts-starter](https://github.com/docrostov/kol-ts-starter).
2. Copy loopsmol.js from KoLmafia/scripts/loopsmol to your Mafia scripts directory.
