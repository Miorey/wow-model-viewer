# WoW Model viewer
This library allows eu to generate a character with his customization and stuff.
It is use [Wowhead](https://classic.wowhead.com/) libraries to generate the rendering.

## Requirements
This library requires jQuery 3.x and Wowhead ZamModelViewer to be loaded in your 
html pages. 
```html
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://wow.zamimg.com/modelviewer/live/viewer/viewer.min.js"></script>
```

## Usage
The library can be used either be used in vanilla javascript and framework contect

### Vanilla JS
To load the character my beautiful female gnome warlock
```html
<head>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"
            integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
            crossorigin="anonymous"></script>
    <script type="module" src="../../index.js"></script>
    <script src="https://wow.zamimg.com/modelviewer/live/viewer/viewer.min.js"></script>
</head>
<body>
    <div id="model_3d"></div>
</body>
<script type="module">
    import {generateModels} from '../../index.js';
    const character =  {
        "race":7,
        "gender":1,
        "skin":4,
        "face":0,
        "hairStyle":5,
        "hairColor":5,
        "facialStyle":5,
        "items": [[1,1170],[3,4925],[5,9575],[6,25235],[7,2311],[8,21154],[9,14618],[10,9534],[15,17238],[21,20379],[22,28787]]
    };
    generateModels(1, `#model_3d`, character);
</script>
```

### Framework

### Items and Transmogrification


### Examples

### Calls to our api
