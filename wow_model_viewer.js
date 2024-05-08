import {getCharacterOptions} from "./character_modeling.js"


// eslint-disable-next-line no-undef
class WowModelViewer extends ZamModelViewer {
    /**
     * Returns the list of animation names
     * @returns {Array.<string>}
     */
    getListAnimations() {
        console.log(`getListAnimations`)
        return [...new Set(this.renderer.models[0].am.map(e => e.l))]
    }

    /**
     * Change character distance
     * @param {number} val
     */
    setDistance(val) {
        this.renderer.distance = val
    }

    /**
     * Change the animation
     * @param {string} val
     */
    setAnimation(val) {
        if (!this.getListAnimations().includes(val)) {
            console.warn(`${this.constructor.name}: Animation ${val} not found`)
        }
        this.renderer.models[0].setAnimation(val)
    }

    /**
     * Play / Pause the animation
     * @param {boolean} val
     */
    setAnimPaused(val) {
        this.renderer.models[0].setAnimPaused(val)
    }

    /**
     * Set azimuth value this value is the angle to the azimuth based on PI
     * @param {number} val
     */
    setAzimuth(val) {
        this.renderer.azimuth = val
    }

    /**
     * Set zenith value this value is the angle to the azimuth based on PI
     * @param {number} val
     */
    setZenith(val) {
        this.renderer.zenith = val
    }

    /**
     * Returns azimuth value this value is the angle to the azimuth based on PI
     * @return {number}
     */
    getAzimuth() {
        return this.renderer.azimuth
    }

    /**
     * Returns zenith value this value is the angle to the azimuth based on PI
     * @return {number}
     */
    getZenith() {
        return this.renderer.zenith
    }

    /**
     * This methode is based on `updateViewer` from Paperdoll.js (https://wow.zamimg.com/js/Paperdoll.js?3ee7ec5121)
     *
     * @param slot {number}: Item slot number
     * @param displayId {number}: Item display id
     * @param enchant {number}: Enchant (experimental not tested)
     */
    updateItemViewer(slot, displayId, enchant) {
        const s = window.WH.Wow.Item
        if (slot === s.INVENTORY_TYPE_SHOULDERS) {
            // this.method(`setShouldersOverride`, [this.getShouldersOverrideData()]);
        }
        const a = (slot === s.INVENTORY_TYPE_ROBE) ? s.INVENTORY_TYPE_CHEST : slot

        window.WH.debug(`Clearing model viewer slot:`, a.toString())
        this.method(`clearSlots`, slot.toString())
        if (displayId) {
            window.WH.debug(`Attaching to model viewer slot:`, slot.toString(), `Display ID:`, displayId, `Enchant Visual:`, enchant)
            this.method(`setItems`, [[{
                slot: slot,
                display: displayId,
                visual: enchant || 0
            }]])
        }
    }

    setNewAppearance(options) {
        if(!this.currentCharacterOptions) {
            throw Error(`Character options are not set`)
        }
        const characterOptions = getCharacterOptions(options, this.currentCharacterOptions)
        const race = this.characterRace
        const gender = this.characterGender
        this.method(`setAppearance`, {race: race, gender: gender, options: characterOptions})
    }
}

// Instance variables
WowModelViewer.prototype._currentCharacterOptions = 0
WowModelViewer.prototype._characterGender = null
WowModelViewer.prototype._characterRace = null

// Getter and Setter for currentCharacterOptions
Object.defineProperty(WowModelViewer.prototype, `currentCharacterOptions`, {
    get: function() {
        return this._currentCharacterOptions
    },
    set: function(value) {
        this._currentCharacterOptions = value
    }
})

// Getter and Setter for characterGender
Object.defineProperty(WowModelViewer.prototype, `characterGender`, {
    get: function() {
        return this._characterGender
    },
    set: function(value) {
        this._characterGender = value
    }
})

// Getter and Setter for characterRace
Object.defineProperty(WowModelViewer.prototype, `characterRace`, {
    get: function() {
        return this._characterRace
    },
    set: function(value) {
        this._characterRace = value
    }
})


export {
    WowModelViewer,
}
