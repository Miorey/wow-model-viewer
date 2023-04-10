const {describe, it} = require(`@jest/globals`);


// global class for testing purposes
class ZamModelViewer {
    constructor() {
        this.renderer = {
            models: [{
                an: [{
                    j: `animation1`
                }, {
                    j: `animation2`
                }, {
                    j: `animation3`
                }]
            }],
            distance: 100
        };
    }

    getModel() {
        return this.renderer.models[0];
    }

    getDistance() {
        return this.renderer.distance;
    }

    setDistance(val) {
        this.renderer.distance = val;
    }
}


const {
    WowModelViewer
} = require(`../index.js`);


describe(`WowModelViewer`, () => {
    test(`getListAnimations should return a list of animation names`, () => {
        // Create an instance of WowModelViewer
        const viewer = new WowModelViewer();

        // Call the getListAnimations method
        const result = viewer.getListAnimations();

        // Assert that the result is an array with the expected animation names
        expect(result).toEqual([`animation1`, `animation2`]);
    });

    test(`setDistance should set the distance property of the renderer object`, () => {
        // Create an instance of WowModelViewer
        const viewer = new WowModelViewer();

        // Call the setDistance method
        viewer.setDistance(100);

        // Assert that the distance property of the renderer object was set to the expected value
        expect(viewer.renderer.distance).toEqual(100);
    });

    test(`setAnimation should set the animation of the first model`, () => {
        // Create an instance of WowModelViewer
        const viewer = new WowModelViewer();

        // Call the setAnimation method
        viewer.setAnimation(`animation1`);

        // Assert that the setAnimation method of the first model was called with the expected argument
        expect(viewer.renderer.models[0].setAnimation).toHaveBeenCalledWith(`animation1`);
    });

    test(`setAnimation should log a warning if the animation is not found`, () => {
        // Create an instance of WowModelViewer
        const viewer = new WowModelViewer();

        // Mock the console.warn method
        console.warn = jest.fn();

        // Call the setAnimation method with an invalid animation name
        viewer.setAnimation(`invalid`);

        // Assert that the console.warn method was called with the expected warning message
        expect(console.warn).toHaveBeenCalledWith(`${viewer.constructor.name}: Animation invalid not found`);
    });

    test(`setAnimPaused should set the animPaused property of the first model`, () => {
        // Create an instance of WowModelViewer
        const viewer = new WowModelViewer();

        // Call the setAnimPaused method
        viewer.setAnimPaused(true);

        // Assert that the setAnimPaused method of the first model was called with the expected argument
        expect(viewer.renderer.models[0].setAnimPaused).toHaveBeenCalledWith(true);
    });
});
