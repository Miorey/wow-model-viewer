const axios = require(`axios`)

/**
 *
 * @param {string} contentPath
 * @param {int} race
 * @param {int} gender
 * @return {[{}]}
 */
async function findRaceGenderOptions (contentPath, race, gender) {
    const options = await axios({
        url: `${contentPath}meta/charactercustomization2/${race}_${gender}.json`,
        method: `get`
    })
    return options.data
}

/**
 *
 * @param {int} item: Item id
 * @param {int} slot: Item slot number
 * @param {int} displayId: DisplayId of hte item
 * @return {Promise<boolean|*>}
 */
async function getDisplaySlot (item, slot, displayId) {
    try {
        await axios({
            url: `https://wow.zamimg.com/modelviewer/live/meta/armor/${slot}/${displayId}.json`,
            method: `get`
        })
        return {
            displaySlot: slot,
            displayId: displayId
        }
    } catch (e) {
        const resp = await axios({
            url: `https://wotlk.murlocvillage.com/api/items/${item}/${displayId}`,
            method: `get`
        })
        if (resp.data.newDisplayId !== displayId) {
            console.log(resp.data)
            return {
                displaySlot: slot,
                displayId: resp.data.newDisplayId
            }
        }
    }

    const retSlot = {
        5: 20
    }[slot]
    if (!retSlot) {
        console.error(`Item: ${item} display: ${displayId} or slot: ${slot} not found for `)

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
 *
 * @param {int} aspect
 * @param {string} containerSelector
 * @param {{}} character
 * @return {Promise<Lf>}
 */
async function generateModels (aspect, containerSelector, character) {
    const fullOptions = await findRaceGenderOptions(
        `https://wow.zamimg.com/modelviewer/live/`,
        character.race,
        character.gender
    )
    const options = await getOptions(character, fullOptions)
    const models = {
        type: 2,
        contentPath: `https://wow.zamimg.com/modelviewer/live/`,
        // eslint-disable-next-line no-undef
        container: jQuery(containerSelector),
        aspect: aspect,
        hd: true,
        models:
            {
                id: characterGenderRaceToModel(character.race, character.gender),
                type: 16
            },
        items: character.items,
        zoom: 2,
        charCustomization: {
            options: options
        }
    }

    // eslint-disable-next-line no-undef
    return new ZamModelViewer(models)
}

/**
 *
 * @param character
 * @param {{}}fullOptions: Zaming API character options payload
 * @return {Promise<[]>}
 */
async function getOptions (character, fullOptions) {
    const options = fullOptions.Options
    const characterPart = {
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
    }
    console.log(fullOptions)
    const ret = []
    for (const prop in characterPart) {
        const part = options.find(e => e.Name === prop)
        if (!part) { continue }
        console.log(prop)
        const newOption = {
            optionId: part.Id,
            choiceId: (characterPart[prop]) ? part.Choices[character[characterPart[prop]]].Id : part.Choices[0].Id
        }
        ret.push(newOption)
    }

    return ret
}

/**
 *
 * @param {number} race
 * @param {number} gender
 * @return {string}
 */
function characterGenderRaceToModel (race, gender) {
    const retGender = (gender === 1) ? `female` : `male`
    return raceNumberToName(race) + retGender
}

/**
 * Returns the race name from race number
 * @param race
 * @return {*}
 */
function raceNumberToName (race) {
    return {
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
    }[race]
}

const displayedSlots = [
    0, 2, 3, 4, 5, 6, 7, 8, 9, 14, 18
]

export {
    findRaceGenderOptions,
    generateModels,
    raceNumberToName,
    getDisplaySlot,
    displayedSlots
}
