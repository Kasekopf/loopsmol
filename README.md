# Overview

This is a Shrunken Adventurer softcore script, using the [grimoire](https://github.com/Kasekopf/grimoire) framework. It is a fork of [loopgyou](https://github.com/Kasekopf/loop-casual/tree/gyou).

### Strategy

The script is designed to be run as part of a loop. In particular, it expects that something like [garbo](https://github.com/Loathing-Associates-Scripting-Society/garbage-collector) will use the rest of the turns. This means that profitable daily resources (e.g. copiers) are avoided, but other resources (free runaways, kills, some wanderers) are used to save turns where possible.

### Manual Installation

If you would like to make your own modifications to the script, the recommended way is to compile and install the script manually.

1. Compile the script, following instructions in the [kol-ts-starter](https://github.com/docrostov/kol-ts-starter).
2. Copy loopsmol.js from KoLmafia/scripts/loopsmol to your Mafia scripts directory.
