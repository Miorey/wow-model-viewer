/**
 *
 * @param {number} race
 * @param {number} gender
 * @returns {Promise<Object>}
 */
export function findRaceGenderOptions(race: number, gender: number): Promise<any>;
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
/**
 *
 * @param item{number}: Item id
 * @param slot{number}: Item slot number
 * @param displayId{number}: DisplayId of the item
 * @return {Promise<boolean|*>}
 */
export function getDisplaySlot(item: number, slot: number, displayId: number): Promise<boolean | any>;
/**
 * Returns a 2-dimensional list the inner list contains on first position the item slot, the second the item
 * display-id ex: [[1,1170],[3,4925]]
 * @param {*[{item: {entry: number, displayid: number}, transmog: {entry: number, displayid: number}, slot: number}]} equipments
 * @returns {Promise<number[]>}
 */
export function findItemsInEquipments(equipments: any): Promise<number[]>;
import { WowModelViewer } from './wow_model_viewer.js';
