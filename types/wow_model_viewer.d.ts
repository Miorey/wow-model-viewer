export class WowModelViewer {
    /**
     * Returns the list of animation names
     * @returns {Array.<string>}
     */
    getListAnimations(): Array<string>;
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
    /**
     * Set azimuth value this value is the angle to the azimuth based on PI
     * @param {number} val
     */
    setAzimuth(val: number): void;
    /**
     * Set zenith value this value is the angle to the azimuth based on PI
     * @param {number} val
     */
    setZenith(val: number): void;
    /**
     * Returns azimuth value this value is the angle to the azimuth based on PI
     * @return {number}
     */
    getAzimuth(): number;
    /**
     * Returns zenith value this value is the angle to the azimuth based on PI
     * @return {number}
     */
    getZenith(): number;
}
