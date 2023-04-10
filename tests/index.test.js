const {describe, it} = require(`@jest/globals`);

import './mocks.js';
// Import the module to be tested
import {getDisplaySlot} from '../index';

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({})
}));

describe(`getDisplaySlot`, () => {
    it(`should return display slot and display id`, async () => {
        // eslint-disable-next-line no-debugger
        const item = 1234;
        const slot = 16;
        const displayId = 5678;

        // Mock fetch response
        const mockJsonPromise = Promise.resolve({});
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });

        jest.spyOn(global, `fetch`).mockImplementation(() => mockFetchPromise);

        const result = await getDisplaySlot(item, slot, displayId);

        expect(result).toEqual({displaySlot: slot, displayId: displayId});
        expect(global.fetch).toHaveBeenCalledWith(
            `https://wow.zamimg.com/modelviewer/live/meta/armor/${slot}/${displayId}.json`
        );
    });

    it(`should return display slot and new display id`, async () => {
        const item = 4321;
        const slot = 5;
        const displayId = 5666;

        // Mock fetch response
        const mockSuccessResponse = {data: {newDisplayId: 9012}};

        const goodUrl = `https://wotlk.murlocvillage.com/api/items/${item}/${displayId}`;

        jest.spyOn(global, `fetch`).mockImplementation((url) => {
            if (url === goodUrl) {
                return Promise.resolve({
                    json: () => Promise.resolve(mockSuccessResponse),
                });
            } else {
                throw Error(`No url`);
            }
        });

        const result = await getDisplaySlot(item, slot, displayId);

        expect(result).toEqual({displaySlot: 5, displayId: 9012});

        expect(global.fetch).toHaveBeenCalledWith(goodUrl);
    });

    it(`should return display slot and display id if no new display id found`, async () => {
        const item = 1234;
        const slot = 10;
        const displayId = 5678;

        // Mock fetch response
        const mockJsonPromise = Promise.resolve({});
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, `fetch`).mockImplementation(() => mockFetchPromise);

        const result = await getDisplaySlot(item, slot, displayId);

        expect(result).toEqual({displaySlot: slot, displayId: displayId});
        expect(global.fetch).toHaveBeenCalledWith(
            `https://wow.zamimg.com/modelviewer/live/meta/armor/${slot}/${displayId}.json`
        );
    });

    it(`should return display slot and display id if slot not found`, async () => {
        const item = 1234;
        const slot = 15;
        const displayId = 5678;

        // Mock fetch response
        const mockJsonPromise = Promise.resolve({});
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, `fetch`).mockImplementation(() => mockFetchPromise);

        const result = await getDisplaySlot(item, slot, displayId);

        expect(result).toEqual({displaySlot: slot, displayId: displayId});
        expect(global.fetch).toHaveBeenCalledWith(
            `https://wow.zamimg.com/modelviewer/live/meta/armor/${slot}/${displayId}.json`
        );
    });

    it(`should throw an error if fetch returns empty value`, async () => {
        const item = 1234;
        const slot = 5;
        const displayId = ``;

        // Mock fetch response
        const mockJsonPromise = Promise.resolve({});
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, `fetch`).mockImplementation(() => mockFetchPromise);

        await expect(getDisplaySlot(item, slot, displayId)).rejects.toThrow(`displayId must be a number`);
        expect(global.fetch).not.toHaveBeenCalledWith(
            `https://wow.zamimg.com/modelviewer/live/meta/armor/${item}/${displayId}`
        );
    });
});