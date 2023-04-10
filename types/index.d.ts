/**
 *
 * @param {number} race
 * @param {number} gender
 * @returns {Promise<>}
 */
export function findRaceGenderOptions(race: number, gender: number): Promise<any>;
/**
 *
 * @param {number} aspect: Size of the character
 * @param {string} containerSelector: jQuery selector on the container
 * @param {{}|{id: number, type: number}} model: A json representation of a character
 * @returns {Promise<WowModelViewer>}
 */
export function generateModels(aspect: number, containerSelector: string, model: {} | {
    id: number;
    type: number;
}): Promise<WowModelViewer>;
/**
 *
 * @param {number} item: Item id
 * @param {number} slot: Item slot number
 * @param {number} displayId: DisplayId of hte item
 * @return {Promise<boolean|*>}
 */
export function getDisplaySlot(item: number, slot: number, displayId: number): Promise<boolean | any>;
/**
 * Returns a 2 dimensional list the inner list contains on first position the item slot, the second the item
 * display-id ex: [[1,1170],[3,4925]]
 * @param {*[{item: {entry: number, displayid: number}, transmog: {entry: number, displayid: number}, slot: number}]} equipments
 * @returns {Promise<number[]>}
 */
export function findItemsInEquipments(equipments: any): Promise<number[]>;
declare class WowModelViewer {
    getListAnimations(): any[];
    /**
     * Change character distance
     * @param {number} val
     */
    setDistance(val: number): void;
    /**
     * Change the animation
     * @param {string} val
     */
    setAnimation(val: string): void;
    /**
     * Play / Pause the animation
     * @param {boolean} val
     */
    setAnimPaused(val: boolean): void;
}
export {};
