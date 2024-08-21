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
 * @param disableZoom {boolean}: true = disable zoom on mouse wheel (false by default)
 * @param disableFullScreen {boolean}: true = disable zoom on double click (false by default)
 * @returns {Promise<WowModelViewer>}
 */
async function generateModels(aspect, containerSelector, model, env=`live`, disableZoom = false, disableFullScreen = false) {
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
    if(env === `classic`) {
        modelOptions = {
            dataEnv: `classic`,
            env: `classic`,
            gameDataEnv: `classic`,
            hd: false,
            ...modelOptions
        }
    } else {
        modelOptions = {
            hd: true,
            ...modelOptions
        }
    }
    const models = {
        type: 2,
        contentPath: window.CONTENT_PATH,
        // eslint-disable-next-line no-undef
        container: jQuery(containerSelector),
        aspect: aspect,
        ...modelOptions
    }
    console.log(`Creating viewer with options`, models)

    // eslint-disable-next-line no-undef
    const wowModelViewer =  await new WowModelViewer(models)

    // override wowhead events listeners
    if ( disableFullScreen === true ){
        jQuery(containerSelector + ' canvas').off('dblclick'); // disable full screen
    }
    if ( disableZoom === true ){
        jQuery(containerSelector + ' canvas').off('DOMMouseScroll mousewheel'); // disable zoom
    }

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
    modelingType
}
