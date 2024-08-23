import {WowModelViewer} from './wow_model_viewer.js'
import {
    findRaceGenderOptions,
    optionsFromModel,
    getDisplaySlot,
    findItemsInEquipments,
    modelingType
} from "./character_modeling.js"

import "./setup.js"

/**
 *
 * @param aspect {number}: Size of the character
 * @param containerSelector {string}: jQuery selector on the container
 * @param model {{}|{id: number, type: number}}: A json representation of a character
 * @param env {('classic'|'live')}: select game enve
 * @returns {Promise<WowModelViewer>}
 */
async function generateModels(aspect, containerSelector, model, env=`live`, options) {
    let zamingModelOptions
    let zamingFullOptions
    if (model.id && model.type) {
        const {id, type} = model
        zamingModelOptions = {models: {id, type}}
    } else {
        const {race, gender} = model

        // CHARACTER OPTIONS
        // This is how we describe a character properties
        zamingFullOptions = await findRaceGenderOptions(
            race,
            gender
        )
        zamingModelOptions = optionsFromModel(model, zamingFullOptions)
    }
    if(env === `classic`) {
        zamingModelOptions = {
            dataEnv: `classic`,
            env: `classic`,
            gameDataEnv: `classic`,
            hd: false,
            ...zamingModelOptions
        }
    } else {
        zamingModelOptions = {
            hd: true,
            ...zamingModelOptions
        }
    }
    const models = {
        type: 2,
        contentPath: window.CONTENT_PATH,
        // eslint-disable-next-line no-undef
        container: jQuery(containerSelector),
        aspect: aspect,
        ...zamingModelOptions
    }
    console.log(`Creating viewer with options`, models)

    // eslint-disable-next-line no-undef
    const wowModelViewer =  await new WowModelViewer(containerSelector, options, models)

    if(zamingFullOptions) {
        wowModelViewer.currentCharacterOptions = zamingFullOptions
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
    modelingType
}
