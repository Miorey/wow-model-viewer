const {describe, it} = require(`@jest/globals`);

import './mocks.js';

// Import the module to be tested
import {WowModelViewer} from '../wow_model_viewer';

describe(`WowModelViewer`, () => {
    /** @type{WowModelViewer} **/
    let viewer;

    beforeEach(() => {
        viewer = new WowModelViewer();
    });

    describe(`getListAnimations`, () => {
        it(`should return an array of animation names`, () => {
            const animations = viewer.getListAnimations();
            expect(Array.isArray(animations)).toBe(true);
            expect(animations.length).toBeGreaterThan(0);
        });
    });

    describe(`setDistance`, () => {
        it(`should change the character distance`, () => {
            const initialDistance = viewer.getDistance();
            viewer.setDistance(50);
            expect(viewer.getDistance()).toBe(50);
            viewer.setDistance(initialDistance);
        });
    });

    describe(`setAnimation`, () => {
        it(`should change the animation`, () => {
            viewer.setAnimation(`animation2`);
        });

        it(`should log a warning message if the animation is not found`, () => {
            const spy = jest.spyOn(console, `warn`).mockImplementation();
            viewer.setAnimation(`non-existing-animation`);
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockRestore();
        });
    });

    describe(`setAnimPaused`, () => {
        it(`should play/pause the animation`, () => {
            const spy = jest.spyOn(viewer.renderer.models[0], `setAnimPaused`);
            viewer.setAnimPaused(true);
            expect(spy).toHaveBeenCalledWith(true);
            viewer.setAnimPaused(false);
            expect(spy).toHaveBeenCalledWith(false);
            spy.mockRestore();
        });

        it(`should throw an error if an empty value is passed`, () => {
            expect(() => viewer.setAnimPaused(``)).toThrow(`Empty value not allowed`);
        });
    });

    describe(`setAzimuth`, () => {
        it(`should change the azimuth angle`, () => {
            const initialAzimuth = viewer.getAzimuth();
            viewer.setAzimuth(0.5);
            expect(viewer.getAzimuth()).toBe(0.5);
            viewer.setAzimuth(initialAzimuth);
        });
    });

    describe(`setZenith`, () => {
        it(`should change the zenith angle`, () => {
            const initialZenith = viewer.getZenith();
            viewer.setZenith(0.5);
            expect(viewer.getZenith()).toBe(0.5);
            viewer.setZenith(initialZenith);
        });
    });

    describe(`getAzimuth`, () => {
        it(`should return the azimuth angle`, () => {
            expect(viewer.getAzimuth()).toBe(0);
        });
    });

    describe(`getZenith`, () => {
        it(`should return the zenith angle`, () => {
            expect(viewer.getZenith()).toBe(0);
        });
    });
});

