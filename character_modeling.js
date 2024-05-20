
import "./setup.js"

const NOT_DISPLAYED_SLOTS = [
    2, // neck
    11, // finger1
    12, // finger1
    13, // trinket1
    14, // trinket2
]

const modelingType = {
    ARMOR: 128,
    CHARACTER: 16,
    COLLECTION: 1024,
    HELM: 2,
    HUMANOIDNPC: 32,
    ITEM: 1,
    ITEMVISUAL: 512,
    NPC: 8,
    OBJECT: 64,
    PATH: 256,
    SHOULDER: 4
}

const characterPart = () => {
    const ret = {
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
        Ears: (window.WOTLK_TO_RETAIL_DISPLAY_ID_API) ? undefined : `ears`,
        "Fur Color": (window.WOTLK_TO_RETAIL_DISPLAY_ID_API) ? undefined : `furColor`,
        Snout: `snout`,
        Blindfold: undefined,
        Tattoo: undefined,
        "Eye Color": undefined,
        "Tattoo Color": undefined,
        Armbands: undefined,
        "Jewelry Color": undefined,
        Bracelets: undefined,
        Necklace: undefined,
        Earring: undefined,
        "Primary Color": (window.WOTLK_TO_RETAIL_DISPLAY_ID_API) ? undefined : `primaryColor`,
        "Secondary Color Strength": (window.WOTLK_TO_RETAIL_DISPLAY_ID_API) ? undefined : `secondaryColorStrength`,
        "Secondary Color": (window.WOTLK_TO_RETAIL_DISPLAY_ID_API) ? undefined : `secondaryColor`,
        "Horn Color": (window.WOTLK_TO_RETAIL_DISPLAY_ID_API) ? undefined : `hornColor`,
        Horns: (window.WOTLK_TO_RETAIL_DISPLAY_ID_API) ? undefined : `horns`,
        "Body Size": (window.WOTLK_TO_RETAIL_DISPLAY_ID_API) ? undefined : `bodySize`
    }
    console.log(ret)
    return ret
}



function optionalChaining(choice) {
    //todo replace by `part.Choices[character[CHARACTER_PART[prop]]]?.Id` when it works on almost all frameworks
    return choice ? choice.Id : undefined
}



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
function getCharacterOptions(character, fullOptions) {
    const options = fullOptions.Options
    const missingChoice = []
    const ret = []
    for (const prop in characterPart()) {
        const part = options.find(e => e.Name === prop)

        if (!part) {
            continue
        }

        const newOption = {
            optionId: part.Id,
            choiceId: (characterPart()[prop]) ? optionalChaining(part.Choices[character[characterPart()[prop]]]) : part.Choices[0].Id
        }
        if(newOption.choiceId === undefined) {
            missingChoice.push(characterPart()[prop])
        }
        ret.push(newOption)
    }
    if(missingChoice) {
        console.warn(`In character: `, character, `the following options are missing`, missingChoice)
    }

    return ret
}

/**
 * This function return the design choices for a character this does not work for NPC / Creature / Items
 * @param {Object} model - The model object to generate options from.
 * @param {{}} fullOptions - The type of the model.
 * @returns {{models: {id: string, type: number}, charCustomization: {options: []}, items: (*|*[])}|{models: {id, type}}
 */
function optionsFromModel(model, fullOptions) {
    const {race, gender} = model


    // slot ids on model viewer
    const characterItems = (model.items) ? model.items.filter(e => !NOT_DISPLAYED_SLOTS.includes(e[0])) : []
    const options = getCharacterOptions(model, fullOptions)
    let charCustomization = {
        options: options
    }
    const ret = {
        items: characterItems,
        models: {
            id: race*2-1+gender,
            type: modelingType.CHARACTER
        },
    }
    if(!model.noCharCustomization) {
        ret.charCustomization = charCustomization
    }
    return ret
}



/**
 *
 * @param item{number}: Item id
 * @param slot{number}: Item slot number
 * @param displayId{number}: DisplayId of the item
 * @param env {('classic'|'live')}: select game env
 * @return {Promise<boolean|*>}
 */
async function getDisplaySlot(item, slot, displayId, env=`live`) {
    if (typeof item !== `number`) {
        throw new Error(`item must be a number`)
    }

    if (typeof slot !== `number`) {
        throw new Error(`slot must be a number`)
    }

    if (typeof displayId !== `number`) {
        throw new Error(`displayId must be a number`)
    }

    try {
        const jsonPath = (env === `classic` && [21, 22].includes(slot)) ?
            `${window.CONTENT_PATH}meta/item/${displayId}.json` :
            `${window.CONTENT_PATH}meta/armor/${slot}/${displayId}.json`
        await fetch(jsonPath)
            .then(response => response.json())

        return {
            displaySlot: slot,
            displayId: displayId
        }
    } catch (e) {
        if(!window.WOTLK_TO_RETAIL_DISPLAY_ID_API){
            throw Error(`Item not found and window.WOTLK_TO_RETAIL_DISPLAY_ID_API not set`)
        }
        const resp = await fetch(`${window.WOTLK_TO_RETAIL_DISPLAY_ID_API}/${item}/${displayId}`)
            .then((response) => response.json())
        const res = resp.data || resp
        if (res.newDisplayId !== displayId) {
            return {
                displaySlot: slot,
                displayId: res.newDisplayId
            }
        }
    }

    // old slots to new slots
    const retSlot = {
        5: 20, // chest
        16: 21, // main hand
        18: 22 // off hand
    }[slot]

    if (!retSlot) {
        console.warn(`Item: ${item} display: ${displayId} or slot: ${slot} not found for `)

        return {
            displaySlot: slot,
            displayId: displayId
        }
    }

    return {
        displaySlot: retSlot,
        displayId: displayId
    }
}



/**
 * Returns a 2-dimensional list the inner list contains on first position the item slot, the second the item
 * display-id ex: [[1,1170],[3,4925]]
 * @param {*[{item: {entry: number, displayid: number}, transmog: {entry: number, displayid: number}, slot: number}]} equipments
 * @param env {('classic'|'live')}: select game enve
 * @returns {Promise<number[]>}
 */
async function findItemsInEquipments(equipments, env=`live`) {
    for (const equipment of equipments) {
        if (NOT_DISPLAYED_SLOTS.includes(equipment.slot)) {
            continue
        }

        const displayedItem = (Object.keys(equipment.transmog).length !== 0) ? equipment.transmog : equipment.item
        const displaySlot = await getDisplaySlot(
            displayedItem.entry,
            equipment.slot,
            displayedItem.displayid,
            env
        )
        equipment.displaySlot = displaySlot.displaySlot
        equipment.displayId = displaySlot.displayId
        Object.assign(displaySlot, equipment)
    }
    return equipments
        .filter(e => e.displaySlot)
        .map(e => [
            e.displaySlot,
            e.displayId
        ]
        )
}


/**
 *
 * @param {number} race
 * @param {number} gender
 * @returns {Promise<Object>}
 */
async function findRaceGenderOptions(race, gender) {
    const raceGender = race * 2 - 1 + gender
    const options = await fetch(`${window.CONTENT_PATH}meta/charactercustomization/${raceGender}.json`)
        .then(
            (response) => response.json()
        )
    if (options.data) {
        return options.data
    }

    return options
}

export {
    optionsFromModel,
    findRaceGenderOptions,
    findItemsInEquipments,
    getDisplaySlot,
    getCharacterOptions,
    characterPart,
    modelingType
}
