import {WowModelViewer} from './wow_model_viewer.js'
import {
    findRaceGenderOptions,
    optionsFromModel,
    getDisplaySlot,
    findItemsInEquipments
} from "./character_modeling.js"

import "./setup.js"

/**
 *
 * @param aspect {number}: Size of the character
 * @param containerSelector {string}: jQuery selector on the container
 * @param model {{}|{id: number, type: number}}: A json representation of a character
 * @returns {Promise<WowModelViewer>}
 */
async function generateModels(aspect, containerSelector, model) {
    let modelOptions
    let fullOptions
    if (model.id && model.type) {
        const {id, type} = model
        modelOptions = {models: {id, type}}
    } else {
        const {race, gender} = model

        // CHARACTER OPTIONS
        // This is how we describe a character properties
        fullOptions = await findRaceGenderOptions(
            race,
            gender
        )
        modelOptions = optionsFromModel(model, fullOptions)
    }
    const models = {
        type: 2,
        contentPath: window.CONTENT_PATH,
        // eslint-disable-next-line no-undef
        container: jQuery(containerSelector),
        aspect: aspect,
        hd: true,
        ...modelOptions
    }
    window.models = models

    // eslint-disable-next-line no-undef
    const wowModelViewer =  await new WowModelViewer(models)
    if(fullOptions) {
        wowModelViewer.currentCharacterOptions = fullOptions
        wowModelViewer.characterGender = model.gender
        wowModelViewer.characterRace = model.race

    }
    return wowModelViewer
}

export {
    findRaceGenderOptions,
    generateModels,
    getDisplaySlot,
    findItemsInEquipments,
}
