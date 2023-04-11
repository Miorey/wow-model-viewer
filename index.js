import {WowModelViewer} from './wow_model_viewer.js';

const CONTENT_PATH = `https://wow.zamimg.com/modelviewer/live/`;

const NOT_DISPLAYED_SLOTS = [
    2, // neck
    11, // finger1
    12, // finger1
    13, // trinket1
    14, // trinket2
];

const RACES = {
    1: `human`,
    2: `orc`,
    3: `dwarf`,
    4: `nightelf`,
    5: `scourge`,
    6: `tauren`,
    7: `gnome`,
    8: `troll`,
    10: `bloodelf`,
    11: `draenei`
};

const CHARACTER_PART = {
    Face: `face`,
    "Skin Color": `skin`,
    "Hair Style": `hairStyle`,
    "Hair Color": `hairColor`,
    "Facial Hair": `facialStyle`,
    Mustache: `facialStyle`,
    Beard: `facialStyle`,
    Sideburns: `facialStyle`,
    "Face Shape": `facialStyle`,
    Eyebrow: `facialStyle`,
    "Jaw Features": undefined,
    "Face Features": undefined,
    "Skin Type": undefined,
    Ears: undefined,
    Horns: undefined,
    Blindfold: undefined,
    Tattoo: undefined,
    "Eye Color": undefined,
    "Tattoo Color": undefined,
    Armbands: undefined,
    "Jewelry Color": undefined,
    Bracelets: undefined,
    Necklace: undefined,
    Earring: undefined
};

/**
 * Returns a 2-dimensional list the inner list contains on first position the item slot, the second the item
 * display-id ex: [[1,1170],[3,4925]]
 * @param {*[{item: {entry: number, displayid: number}, transmog: {entry: number, displayid: number}, slot: number}]} equipments
 * @returns {Promise<number[]>}
 */
async function findItemsInEquipments(equipments) {
    for (const equipment of equipments) {
        if (NOT_DISPLAYED_SLOTS.includes(equipment.slot)) {
            continue;
        }

        const displayedItem = (Object.keys(equipment.transmog).length !== 0) ? equipment.transmog : equipment.item;
        const displaySlot = await getDisplaySlot(
            displayedItem.entry,
            equipment.slot,
            displayedItem.displayid
        );
        equipment.displaySlot = displaySlot.displaySlot;
        equipment.displayId = displaySlot.displayId;
        Object.assign(displaySlot, equipment);
    }
    return equipments
        .filter(e => e.displaySlot)
        .map(e => [
            e.displaySlot,
            e.displayId
        ]
        );
}

/**
 *
 * @param {number} race
 * @param {number} gender
 * @returns {Promise<Object>}
 */
async function findRaceGenderOptions(race, gender) {
    const options = await fetch(`${CONTENT_PATH}meta/charactercustomization2/${race}_${gender}.json`)
        .then(
            (response) => response.json()
        );
    if (options.data) {
        return options.data;
    }

    return options;
}

/**
 *
 * @param {number} item: Item id
 * @param {number} slot: Item slot number
 * @param {number} displayId: DisplayId of the item
 * @return {Promise<boolean|*>}
 */
async function getDisplaySlot(item, slot, displayId) {
    if (typeof item !== `number`) {
        throw new Error(`item must be a number`);
    }

    if (typeof slot !== `number`) {
        throw new Error(`slot must be a number`);
    }

    if (typeof displayId !== `number`) {
        throw new Error(`displayId must be a number`);
    }

    try {
        await fetch(`${CONTENT_PATH}meta/armor/${slot}/${displayId}.json`).then(response => response.json());

        return {
            displaySlot: slot,
            displayId: displayId
        };
    } catch (e) {
        const resp = await fetch(`https://wotlk.murlocvillage.com/api/items/${item}/${displayId}`).then((response) => response.json());
        const res = resp.data ? resp.data : resp;
        if (res.newDisplayId !== displayId) {
            return {
                displaySlot: slot,
                displayId: res.newDisplayId
            };
        }
    }

    // old slots to new slots
    const retSlot = {
        5: 20, // chest
        16: 21, // main hand
        18: 22 // off hand
    }[slot];

    if (!retSlot) {
        console.warn(`Item: ${item} display: ${displayId} or slot: ${slot} not found for `);

        return {
            displaySlot: slot,
            displayId: displayId
        };
    }

    return {
        displaySlot: retSlot,
        displayId: displayId
    };
}


/**
 *
 * @param model: {{}|{{id, type}}}
 * @returns {Promise<{models: {id: string, type: number}, charCustomization: {options: []}, items: (*|*[])}|{models: {id, type}}>}
 */
async function optionsFromModel(model) {
    if (model.id && model.type) {
        // NPC or item
        const {id, type} = model;
        return {models: {id, type}};
    }

    const {race, gender} = model;

    // CHARACTER OPTIONS
    // This is how we describe a character properties
    const fullOptions = await findRaceGenderOptions(
        race,
        gender
    );

    // slot ids on model viewer
    const characterItems = (model.items) ? model.items.filter(e => !NOT_DISPLAYED_SLOTS.includes(e[0])) : [];
    const options = getOptions(model, fullOptions);

    const retGender = (gender === 1) ? `female` : `male`;
    const raceToModelId = RACES[race] + retGender;

    return {
        items: characterItems,
        charCustomization: {
            options: options
        },
        models: {
            id: raceToModelId,
            type: 16
        },
    };
}

/**
 *
 * @param {number} aspect: Size of the character
 * @param {string} containerSelector: jQuery selector on the container
 * @param {{}|{id: number, type: number}} model: A json representation of a character
 * @returns {Promise<WowModelViewer>}
 */
async function generateModels(aspect, containerSelector, model) {
    const modelOptions = await optionsFromModel(model);
    const models = {
        type: 2,
        contentPath: CONTENT_PATH,
        // eslint-disable-next-line no-undef
        container: jQuery(containerSelector),
        aspect: aspect,
        hd: true,
        ...modelOptions
    };
    window.models = models;

    // eslint-disable-next-line no-undef
    return new WowModelViewer(models);
}

function optionalChaining(choice) {
    //todo replace by `part.Choices[character[CHARACTER_PART[prop]]]?.Id` when it works on almost all frameworks
    return choice ? choice.Id : undefined;
}

/**
 *
 * @param character
 * @param {{}}fullOptions: Zaming API character options payload
 * @return {Promise<[]>}
 */
function getOptions(character, fullOptions) {
    const options = fullOptions.Options;
    const ret = [];
    for (const prop in CHARACTER_PART) {
        const part = options.find(e => e.Name === prop);

        if (!part) {
            continue;
        }

        const newOption = {
            optionId: part.Id,
            choiceId: (CHARACTER_PART[prop]) ? optionalChaining(part.Choices[character[CHARACTER_PART[prop]]]) : part.Choices[0].Id
        };
        ret.push(newOption);
    }

    return ret;
}

export {
    findRaceGenderOptions,
    generateModels,
    getDisplaySlot,
    findItemsInEquipments,
};
