![Mirror Demo](https://miorey.github.io/wow-model-viewer/images/mirror.gif)

# WoW Model viewer

This library allows eu to generate a 3d model character with his customization and items. It is
use [Wowhead](https://classic.wowhead.com/) libraries to generate the rendering. This lib works with WotLK and Retail wow versions.

## 🛠 Requirements
To utilize this library effectively, you need a copy of specific files sourced from Wowhead. While there are various methods
to obtain these files, this document demonstrates the use of a replica server.

> ⚠️ Warning: The gaming data belongs to Wowhead. It's recommended to use them for personal purposes or small-scale projects, and definitely not for large commercial endeavors.

### CORS policies
Bypass using a replica server. This lib calls the replica, which fetches files from the gaming repository.
For this purpose, you can use  [bypass-cors-policies](https://github.com/Miorey/bypass-cors-policies), which is specifically designed for such use cases.
You can use it with docker or node.js.

#### 🐳 Using Docker
To run the replica server with docker use following `docker-compose.yml`
```yml
version: '3'

services:
  bypass-cors-policies:
    image: miorey/bypass-cors-policies:v1
    environment:
      - SERVER_NAME=https://wow.zamimg.com
    volumes:
      - ./storage:/usr/src/app/storage
    ports:
      - "2999:3000"
```

Run `docker-compose up`

#### Node.js
Alternatively, use Node.js for more details, refer to the: [doc](https://github.com/Miorey/bypass-cors-policies#local-setup).

### Additional library

This library depends on jQuery 3.x and the Wowhead ZamModelViewer. Ensure they're loaded in your HTML pages:
Regarding the `viewer.min.js` you can download it from zaming or from your localhost through the cors bypass server:

```html

<script src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

```
AND
```html
<script src="http://localhost:3000/modelviewer/live/viewer/viewer.min.js"></script>
```
OR
```html
<script src="https://wow.zamimg.com/modelviewer/live/viewer/viewer.min.js"></script>
```

### Setup

#### WotLK or Retail ?
The library works well with both retail and WotLK.
For WotLK, some adjustments need to be made.
By default, the library is set up to work with WotLK by using this URL to retrieve the display ID for old items.
```js
 window.WOTLK_TO_RETAIL_DISPLAY_ID_API=`https://wotlk.murlocvillage.com/api/items`
```

When you want to use the lib for wow retail you just need to set this var to `undefined`:
```js
 window.WOTLK_TO_RETAIL_DISPLAY_ID_API=undefined
```

#### Data Path

Lastly, you must set up the `CONTENT_PATH` environment variable.
This indicates the location of the data required to render the canvas.
If you're using the provided `docker-compose` example, then:

```js
    window.CONTENT_PATH = `http://localhost:3000/modelviewer/live/`
```


## Usage

The library can be used either be used in vanilla javascript and framework context

You have some usage examples [here](https://github.com/Miorey/wow-model-viewer/tree/examples/example)

### Framework

With a js framework add the requirements files in your main html file in my Vue.js example this refers to
`public/index.html`

Install the library with:

```bash
npm i wow-model-viewer
```

Import the lib

```js
import {generateModels} from 'wow-model-viewer';
```

In your html add the container of the model.

```html

<div id="model_3d"></div>
```

Call the lib

```JS
const character = {
    "race": 7,
    "gender": 1,
    "skin": 4,
    "face": 0,
    "hairStyle": 5,
    "hairColor": 5,
    "facialStyle": 5,
    "items": [[1, 1170], [3, 4925], [5, 9575], [6, 25235], [7, 2311], [8, 21154], [9, 14618], [10, 9534], [15, 17238], [21, 20379], [22, 28787]]
};
generateModels(1, `#model_3d`, character);
```

To have more explanation about the `character` json please refer to
[Advanced usage with items and transmogrification](./README.md)

### Start locally

You can simulate a web-server in your machine using `http-server`.

It's easy to install using npm:

```
npm install --global http-server
```

afterwards, you can run a webserver inside the project using:
```
http-server ./
```

### Vanilla JS

To load the character my beautiful female gnome warlock

```html

<head>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"
            integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
            crossorigin="anonymous"></script>
    <script src="http://localhost:3000/modelviewer/live/viewer/viewer.min.js"></script>
    <script type="module" src="./index.js"></script>
</head>
<body>
<div id="model_3d"></div>
</body>
<script type="module">
    import {generateModels} from './index.js';

    const character = {
        "race": 7,
        "gender": 1,
        "skin": 4,
        "face": 0,
        "hairStyle": 5,
        "hairColor": 5,
        "facialStyle": 5,
        "items": [[1, 1170], [3, 4925], [5, 9575], [6, 25235], [7, 2311], [8, 21154], [9, 14618], [10, 9534], [15, 17238], [21, 20379], [22, 28787]]
    };
    generateModels(1, `#model_3d`, character);
</script>
```

`./index.js` is the js file on the root level of this repository.

To have more explanation about the `character` json please refer to
[Advanced usage with items and transmogrification](./README.md)

### Advanced usage with items and transmogrification

The description of the character is

```json
{
  "race":7,
  "gender":1,
  "skin":4,
  "face":0,
  "hairStyle":5,
  "hairColor":5,
  "facialStyle":5,
  "items": [[1,1170],[3,4925],[5,9575],[6,25235],[7,2311],[8,21154],[9,14618],[10,9534],[15,17238],[21,20379],[22,28787]]
}
```

The `race` number refer to the following values

Race     | Number
:------: | :----:
human    | 1
orc      | 2
dwarf    | 3
nightelf | 4
scourge  | 5
tauren   | 6
gnome    | 7
troll    | 8
goblin | 9
bloodelf | 10
draenei  | 11
worgen  | 22
pandaren  | 24
nightborne  | 27
highmountaintauren  | 28
voidelf  | 29
lightforgeddraenei  | 30
zandalaritroll  | 31
kultiran  | 32
darkirondwarf  | 34
vulpera  | 35
magharorc  | 36
mechagnome  | 37
dracthyr  | 45

The `gender` is `0` for female `1` for male.

The items is a 2 dimensional array the inner array contains the following values
`[ slot, display-id ]` the slot is the body part where the stuff is displayed.\
**Don't mismatch `display-id` and `item`** \
Ex for the following
item: [Atiesh, Greatstaff of the Guardian](https://www.wowhead.com/item=22632/atiesh-greatstaff-of-the-guardian)
the `display-id` is `193838` to find it inspect. \
![View in 3D](https://miorey.github.io/wow-model-viewer/images//view_3d_wowhead.webp) \
For some items a new `display-id` is set for those items a new slot is made. This library manage those `display-id` so
basically you don't care.

Slot     |      Body       | Is displayed
:------: |:---------------:|:------------:
1        |      Head       |   Yes
2        |      Neck       |   No
3        |    Shoulders    |   Yes
4        |      Body       |   Yes
5        |      Chest      |   Yes
6        |      Waist      |   Yes
7        |      Legs       |   Yes
8        |      Feet       |   Yes
9        |     Wrists      |   Yes
10       |      Hands      |   Yes
11       |    Finger 1     |   No
12       |    Finger 2     |   No
13       |    Trinket 1    |   No
14       |    Trinket 2    |   No
15       |      Back       |   Yes
16       |    Main Hand    |   Yes
17       |    Off Hand     |   Yes
18       |     Ranged      |   Yes
19       |     Tabard      |   Yes
20       |   Chest (Robe)  |   Yes
21       | Main Hand (new) |   Yes
22       | Off Hand (new)  |   Yes

If you need that the library manage the search of the `display-id` based on our API and take in account player
transmogrification you can call it like following

```js

import {findItemsInEquipments, generateModels} from './index.js'

const character = {
    "race": 7,
    "gender": 1,
    "skin": 4,
    "face": 0,
    "hairStyle": 5,
    "hairColor": 5,
    "facialStyle": 5,
}
const equipments = [
    {
        "item": {
            "entry": 3075,
            "displayid": 15322
        },
        "transmog": {},
        "slot": 0
    }, {
        "item": {
            "entry": 2042,
            "displayid": 20379
        },
        "transmog": {
            "entry": 22632,
            "displayid": 193838
        },
        "slot": 15
    }];
findItemsInEquipments(equipments)
    .then(async e => {
        character.items = e;
        const model = await generateModels(1, `#model_3d`, character);
    });
```

In this case the `display-id` of the `transmog` will always replace the
`display-id` of the item.

### Manipulate view

Change character distance

```js
model.setDistance(2)
```

Fullscreen

```js
model.setFullscreen(false)
```

Change Animation
```js
model.setAnimation("Run")
```

Pause animation
```js
model.setAnimPaused(true)
```

Returns the list of all available animations
```js
model.getListAnimations()
```

Set animation angle to the zenith
```js
model.setZenith(Math.PI)
```

Set animation angle to the azimuth
```js
model.setAzimuth(Math.PI)
```

Remove any reference to the model object preventing **memory leak**
```js
model.destroy()
```

Change character items without reload the full view. (This works only for characters not for NPCs / creature)
```js
// paramters(slot, displayId, enchant)
model.updateItemViewer(1, 178278, 0)
```

Change character appearance without reloading:
```js
model.setNewAppearance({
    "skin": 4,
    "face": 0,
    "hairStyle": 5,
    "hairColor": 5,
    "facialStyle": 5,
})
```


### NPC and Items display

To display the npc and items you can call `generateModels` with:
- aspect (int)
- element selector (string)
- type and display id (object)

To get the npc display ids you can go [here](https://wow.tools/dbc/?dbc=creature&build=9.2.5.42850#page=1&search=Arthas)

Prince of Lordaeron:
```js
const model = await generateModels(1, `#model_3d`, {type: modelingType.NPC, id: 24949});
```

To display Atiesh, Greatstaff of the Guardian
```js
const model = await generateModels(1, `#model_3d`, {type: modelingType.ITEM, id: 193841});
```

#### Table of types

Description     | Type | `modelingType`    |
:--------------:|:----:|:-----------------:|
Item            | 1    | `.ITEM`           |
Helm            | 2    | `.HELM`           |
Shoulder        | 4    | `.SHOULDER`       |
NPC             | 8    | `.NPC`            |
Character       | 16   | `.CHARACTER`      |
Humanoidnpc     | 32   | `.HUMANOIDNPC`    |
Object          | 64   | `.OBJECT`         |
Armor           | 128  | `.ARMOR`          |
Path            | 256  | `.PATH`           |
Itemvisual      | 512  | `.ITEMVISUAL`     |
Collection      | 1024 | `.COLLECTION`     |

### Classic character display.
To display the character of WoW classic you need to change your scripts:
```html
<script src="http://localhost:3000/modelviewer/classic/viewer/viewer.min.js"></script>
```
and change following vars to:
```js
    window.CONTENT_PATH = `http://localhost:3000/modelviewer/classic/`
    window.WOTLK_TO_RETAIL_DISPLAY_ID_API = undefined
```
when you call `generateModels` you need to add a new param at the end `"classic"`

```js
generateModels(1.5, `#model_3d1`, character, "classic");
```
⚠️For some items you can't display them with a customize character look, in this case you need to use
a new option `"noCharCustomization": true`.

Ex:
```js
const character2 = {
    "race": 1,
    "gender": 0,
    "items": [[21, 679611]],
    "noCharCustomization": true
}
window.model2 = await generateModels(1.5, `#model_3d2`, character2, "classic");
```

# Updates
As this library is based on a minified version of the Wowhead model viewer, regular upgrades of this library may require you to clear your cached data.
If you are using a Docker  `bypass-cors-policies` container, you can follow these steps to clean up the cache:

```sh
docker exec -it [container_id_or_name] /bin/sh

# Inside your container
cd storage/
rm -rf *
```
If you are not using this Docker container, please adapt the cleanup process according to your environment.

if you are useing Vulpera(race=35) ,`face` `furColor` `ears` `snout` options is reqiured.

if you use dracthyr(race=45) `primaryColor` `secondaryColorStrength` `secondaryColor` `bodySize` `horns` `hornColor` options is reqiured.


# Contribute

Each contribution to this lib have to take in account js doc and typescript
To generate the TypecSript declaration please execute the following:

```bash
npm run prepublish
```
