import { findRaceGenderOptions } from "./character_modeling.js";
/**
 *
 * @param aspect {number}: Size of the character
 * @param containerSelector {string}: jQuery selector on the container
 * @param model {{}|{id: number, type: number}}: A json representation of a character
 * @returns {Promise<WowModelViewer>}
 */
export function generateModels(aspect: number, containerSelector: string, model: {} | {
    id: number;
    type: number;
}): Promise<WowModelViewer>;
import { getDisplaySlot } from "./character_modeling.js";
import { findItemsInEquipments } from "./character_modeling.js";
import { WowModelViewer } from './wow_model_viewer.js';
export { findRaceGenderOptions, getDisplaySlot, findItemsInEquipments };
