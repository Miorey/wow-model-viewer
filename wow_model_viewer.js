if (!window.WH) {
    window.WH = {};
    // eslint-disable-next-line no-unused-vars
    window.WH.debug = function (...args) {
        // console.log(args);
    };
    window.WH.defaultAnimation = `Stand`;
}


// eslint-disable-next-line no-undef
class WowModelViewer extends ZamModelViewer {

    /**
     * Returns the list of animation names
     * @returns {Array.<string>}
     */
    getListAnimations() {
        return [...new Set(this.renderer.models[0].ap.map(e => e.j))];
    }

    /**
     * Change character distance
     * @param {number} val
     */
    setDistance(val) {
        this.renderer.distance = val;
    }

    /**
     * Change the animation
     * @param {string} val
     */
    setAnimation(val) {
        if (!this.getListAnimations().includes(val)) {
            console.warn(`${this.constructor.name}: Animation ${val} not found`);
        }
        this.renderer.models[0].setAnimation(val);
    }

    /**
     * Play / Pause the animation
     * @param {boolean} val
     */
    setAnimPaused(val) {
        this.renderer.models[0].setAnimPaused(val);
    }

    /**
     * Set azimuth value this value is the angle to the azimuth based on PI
     * @param {number} val
     */
    setAzimuth(val) {
        this.renderer.azimuth = val;
    }

    /**
     * Set zenith value this value is the angle to the azimuth based on PI
     * @param {number} val
     */
    setZenith(val) {
        this.renderer.zenith = val;
    }

    /**
     * Returns azimuth value this value is the angle to the azimuth based on PI
     * @return {number}
     */
    getAzimuth() {
        return this.renderer.azimuth;
    }

    /**
     * Returns zenith value this value is the angle to the azimuth based on PI
     * @return {number}
     */
    getZenith() {
        return this.renderer.zenith;
    }
}

export {
    WowModelViewer
};
