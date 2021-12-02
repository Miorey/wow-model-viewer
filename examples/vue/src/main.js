'use strict';


import Vue from 'vue';
import {generateModels, findItemsInEquipments} from '../../../index.js';

// Create the app
new Vue({
    el: `#app`,
    data: {
        title: `WoW model viewer`,
    },
    mounted() {
        this.gemModel(`#model_3d1`);
        this.genTransmog(`#model_3d2`);
    },
    methods: {
        /**
         *
         * @param {string}id
         */
        gemModel(id) {
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
            generateModels(1, id, character);
        },
        /**
         *
         * @param {string}id
         */
        genTransmog(id) {

            const character =  {
                "race":10,
                "gender":1,
                "skin":4,
                "face":0,
                "hairStyle":5,
                "hairColor":5,
                "facialStyle":5,
            };
            const equipments = [
                {
                    "item": {
                        "entry":3075,
                        "displayid":15322
                    },
                    "transmog":{},
                    "slot":0
                },{
                    "item":{
                        "entry": 12025,
                        "displayid":9852
                    },
                    "transmog":{},
                    "slot":1
                },{
                    "item":{
                        "entry":10027,
                        "displayid":18865
                    },
                    "transmog":{},
                    "slot":2
                },{
                    "item":{
                        "entry":10021,
                        "displayid":18949
                    },
                    "transmog":{},
                    "slot":4
                },{
                    "item":{
                        "entry":13856,
                        "displayid":25235
                    },
                    "transmog":{},
                    "slot":5
                },{
                    "item":{
                        "entry":13008,
                        "displayid":28646
                    },
                    "transmog":{},
                    "slot":6
                },{
                    "item":{
                        "entry":10026,
                        "displayid":21154
                    },
                    "transmog":{},
                    "slot":7
                },{
                    "item":{
                        "entry":6407,
                        "displayid":14618
                    },
                    "transmog":{},
                    "slot":8
                },{
                    "item":{
                        "entry":10019,
                        "displayid":18999
                    },
                    "transmog":{},
                    "slot":9
                },{
                    "item":{
                        "entry":11994,
                        "displayid":9832
                    },
                    "transmog":{},
                    "slot":10
                },{
                    "item":{
                        "entry":5009,
                        "displayid":9840
                    },
                    "transmog":{},
                    "slot":11
                },{
                    "item":{
                        "entry":1713,
                        "displayid":23949
                    },
                    "transmog":{},
                    "slot":12
                },{
                    "item":{
                        "entry":8248,
                        "displayid":17238
                    },
                    "transmog":{},
                    "slot":14
                },{
                    "item":{
                        "entry":2042,
                        "displayid":20379
                    },
                    "transmog":{
                        "entry":22632,
                        "displayid":193838
                    },
                    "slot":15
                },{
                    "item":{
                        "entry":13064,
                        "displayid":28787
                    },
                    "transmog":{},
                    "slot":17
                }];
            findItemsInEquipments(equipments)
                .then(e => {
                    character.items = e;
                    generateModels(1, id, character);
                });
        }
    }
});
