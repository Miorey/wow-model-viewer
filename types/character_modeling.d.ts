/**
 * This function return the design choices for a character this does not work for NPC / Creature / Items
 * @param {Object} model - The model object to generate options from.
 * @param {{}} fullOptions - The type of the model.
 * @returns {{models: {id: string, type: number}, charCustomization: {options: []}, items: (*|*[])}|{models: {id, type}}
 */
export function optionsFromModel(model: any, fullOptions: {}): {
    models: {
        id: string;
        type: number;
    };
    charCustomization: {
        options: [];
    };
    items: (any | any[]);
} | {
    models: {
        id;
        type;
    };
};
/**
 *
 * @param {number} race
 * @param {number} gender
 * @returns {Promise<Object>}
 */
export function findRaceGenderOptions(race: number, gender: number): Promise<any>;
/**
 * Returns a 2-dimensional list the inner list contains on first position the item slot, the second the item
 * display-id ex: [[1,1170],[3,4925]]
 * @param {*[{item: {entry: number, displayid: number}, transmog: {entry: number, displayid: number}, slot: number}]} equipments
 * @param env {('classic'|'live')}: select game enve
 * @returns {Promise<number[]>}
 */
export function findItemsInEquipments(equipments: any, env?: ('classic' | 'live')): Promise<number[]>;
/**
 *
 * @param item{number}: Item id
 * @param slot{number}: Item slot number
 * @param displayId{number}: DisplayId of the item
 * @param env {('classic'|'live')}: select game env
 * @return {Promise<boolean|*>}
 */
export function getDisplaySlot(item: number, slot: number, displayId: number, env?: ('classic' | 'live')): Promise<boolean | any>;
/**
 *
 * @param {Object} character - The character object.
 * @param {number} character.face - Description for face.
 * @param {number} character.facialStyle - Description for facialStyle.
 * @param {number} character.gender - Description for gender.
 * @param {number} character.hairColor - Description for hairColor.
 * @param {number} character.hairStyle - Description for hairStyle.
 * @param {Array<Array<number>>} character.items - Description for items. (Optional)
 * @param {number} character.race - Description for race.
 * @param {number} character.skin - Description for skin.
 * @param {Object} fullOptions - Zaming API character options payload.
 * @return {[]}
 */
export function getCharacterOptions(character: {
    face: number;
    facialStyle: number;
    gender: number;
    hairColor: number;
    hairStyle: number;
    items: Array<Array<number>>;
    race: number;
    skin: number;
}, fullOptions: any): [];
export function characterPart(): {
    Face: string;
    "Skin Color": string;
    "Hair Style": string;
    "Hair Color": string;
    "Facial Hair": string;
    Mustache: string;
    Beard: string;
    Sideburns: string;
    "Face Shape": string;
    Eyebrow: string;
    "Jaw Features": any;
    "Face Features": any;
    "Skin Type": any;
    Ears: string;
    "Fur Color": string;
    Snout: string;
    Blindfold: any;
    Tattoo: any;
    "Eye Color": any;
    "Tattoo Color": any;
    Armbands: any;
    "Jewelry Color": any;
    Bracelets: any;
    Necklace: any;
    Earring: any;
    "Primary Color": string;
    "Secondary Color Strength": string;
    "Secondary Color": string;
    "Horn Color": string;
    Horns: string;
    "Body Size": string;
};
export namespace modelingType {
    let ARMOR: number;
    let CHARACTER: number;
    let COLLECTION: number;
    let HELM: number;
    let HUMANOIDNPC: number;
    let ITEM: number;
    let ITEMVISUAL: number;
    let NPC: number;
    let OBJECT: number;
    let PATH: number;
    let SHOULDER: number;
}
