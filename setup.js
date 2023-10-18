if(!window.CONTENT_PATH){
    window.CONTENT_PATH =`http://localhost:3001/modelviewer/live/`
}
if(!window.WOTLK_TO_RETAIL_DISPLAY_ID_API){
    window.WOTLK_TO_RETAIL_DISPLAY_ID_API=`https://wotlk.murlocvillage.com/`
}


if (!window.WH) {
    window.WH = {}
    window.WH.debug = function (...args) { console.log(args) }
    window.WH.defaultAnimation = `Stand`
    window.WH.Wow = {
        Item: {
            INVENTORY_TYPE_HEAD: 1,
            INVENTORY_TYPE_NECK: 2,
            INVENTORY_TYPE_SHOULDERS: 3,
            INVENTORY_TYPE_SHIRT: 4,
            INVENTORY_TYPE_CHEST: 5,
            INVENTORY_TYPE_WAIST: 6,
            INVENTORY_TYPE_LEGS: 7,
            INVENTORY_TYPE_FEET: 8,
            INVENTORY_TYPE_WRISTS: 9,
            INVENTORY_TYPE_HANDS: 10,
            INVENTORY_TYPE_FINGER: 11,
            INVENTORY_TYPE_TRINKET: 12,
            INVENTORY_TYPE_ONE_HAND: 13,
            INVENTORY_TYPE_SHIELD: 14,
            INVENTORY_TYPE_RANGED: 15,
            INVENTORY_TYPE_BACK: 16,
            INVENTORY_TYPE_TWO_HAND: 17,
            INVENTORY_TYPE_BAG: 18,
            INVENTORY_TYPE_TABARD: 19,
            INVENTORY_TYPE_ROBE: 20,
            INVENTORY_TYPE_MAIN_HAND: 21,
            INVENTORY_TYPE_OFF_HAND: 22,
            INVENTORY_TYPE_HELD_IN_OFF_HAND: 23,
            INVENTORY_TYPE_PROJECTILE: 24,
            INVENTORY_TYPE_THROWN: 25,
            INVENTORY_TYPE_RANGED_RIGHT: 26,
            INVENTORY_TYPE_QUIVER: 27,
            INVENTORY_TYPE_RELIC: 28,
            INVENTORY_TYPE_PROFESSION_TOOL: 29,
            INVENTORY_TYPE_PROFESSION_ACCESSORY: 30
        }

    }
    // eslint-disable-next-line no-undef
}
const WH = window.WH

export {
    WH,
}
