global.fetch = require(`node-fetch`)
const {describe, it} = require(`@jest/globals`)

import './mocks.js'
// Import the module to be tested
import {findItemsInEquipments, findRaceGenderOptions, getDisplaySlot} from '../index'

global.fetch = jest.fn()
describe(`getDisplaySlot`, () => {


    beforeEach(() => {
        window.WOTLK_TO_RETAIL_DISPLAY_ID_API=`http://itemtest.com/`
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(),
            })
        )
    })

    afterEach(() => {
        global.fetch.mockClear()
        delete global.fetch
    })

    it(`should return display slot and display id`, async () => {
        // eslint-disable-next-line no-debugger
        const item = 1234
        const slot = 16
        const displayId = 5678

        // Mock fetch response
        const mockJsonPromise = Promise.resolve({})
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        })

        jest.spyOn(global, `fetch`).mockImplementation(() => mockFetchPromise)

        const result = await getDisplaySlot(item, slot, displayId)

        expect(result).toEqual({displaySlot: slot, displayId: displayId})
        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost:3001/modelviewer/live/meta/armor/${slot}/${displayId}.json`
        )
    })

    it(`should return display slot and new display id`, async () => {
        const item = 4321
        const slot = 5
        const displayId = 5666

        // Mock fetch response
        const mockSuccessResponse = {data: {newDisplayId: 9012}}

        const goodUrl = `http://itemtest.com//${item}/${displayId}`

        jest.spyOn(global, `fetch`).mockImplementation((url) => {
            if (url === goodUrl) {
                return Promise.resolve({
                    json: () => Promise.resolve(mockSuccessResponse),
                })
            } else {
                throw Error(`No good url ${url} !== ${goodUrl}`)
            }
        })

        const result = await getDisplaySlot(item, slot, displayId)

        expect(result).toEqual({displaySlot: 5, displayId: 9012})

        expect(global.fetch).toHaveBeenCalledWith(goodUrl)
    })

    it(`should return display slot and display id if no new display id found`, async () => {
        const item = 1234
        const slot = 10
        const displayId = 5678

        // Mock fetch response
        const mockJsonPromise = Promise.resolve({})
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        })
        jest.spyOn(global, `fetch`).mockImplementation(() => mockFetchPromise)

        const result = await getDisplaySlot(item, slot, displayId)

        expect(result).toEqual({displaySlot: slot, displayId: displayId})
        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost:3001/modelviewer/live/meta/armor/${slot}/${displayId}.json`
        )
    })

    it(`should return display slot and display id if slot not found`, async () => {
        const item = 1234
        const slot = 15
        const displayId = 5678

        // Mock fetch response
        const mockJsonPromise = Promise.resolve({})
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        })
        jest.spyOn(global, `fetch`).mockImplementation(() => mockFetchPromise)

        const result = await getDisplaySlot(item, slot, displayId)

        expect(result).toEqual({displaySlot: slot, displayId: displayId})
        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost:3001/modelviewer/live/meta/armor/${slot}/${displayId}.json`
        )
    })

    it(`should throw an error if fetch returns empty value`, async () => {
        const item = 1234
        const slot = 5
        const displayId = ``

        // Mock fetch response
        const mockJsonPromise = Promise.resolve({})
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        })
        jest.spyOn(global, `fetch`).mockImplementation(() => mockFetchPromise)

        await expect(getDisplaySlot(item, slot, displayId)).rejects.toThrow(`displayId must be a number`)
        expect(global.fetch).not.toHaveBeenCalledWith(
            `http://localhost:3001/modelviewer/live/meta/armor/${item}/${displayId}`
        )
    })
})


describe(`findRaceGenderOptions`, () => {
    const mockResponse = [
        {id: 1, name: `Race 1`},
        {id: 2, name: `Race 2`},
        {id: 3, name: `Race 3`},
    ]

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockResponse),
            })
        )
    })

    afterEach(() => {
        global.fetch.mockClear()
        delete global.fetch
    })

    it(`should fetch race and gender options and return them`, async () => {
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse)
        })

        const result = await findRaceGenderOptions(2, 1)

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`http://localhost:3001/modelviewer/live/meta/charactercustomization2/2_1.json`)
        expect(result).toEqual(mockResponse)
    })
})


describe(`findItemsInEquipments`, () => {


    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(),
            })
        )
    })

    afterEach(() => {
        global.fetch.mockClear()
        delete global.fetch
    })

    it(`should return an empty array if given an empty array`, async () => {
        const result = await findItemsInEquipments([])
        expect(result).toEqual([])
    })

    it(`should return an array of equipment display IDs and display slots`, async () => {
        const equipments = [
            {item: {entry: 123, displayid: 456}, transmog: {entry: 789, displayid: 321}, slot: 1},
            {item: {entry: 234, displayid: 567}, transmog: {}, slot: 2},
            {item: {entry: 345, displayid: 678}, transmog: {}, slot: 3},
            {item: {entry: 456, displayid: 789}, transmog: {entry: 123, displayid: 456}, slot: 4}
        ]
        const result = await findItemsInEquipments(equipments)
        expect(result).toEqual([
            [1, 321],
            [3, 678],
            [4, 456]
        ])
    })

    it(`should throw an error if item is not a number`, async () => {
        const equipments = [{item: `invalid`, transmog: {}, slot: 1}]
        await expect(findItemsInEquipments(equipments)).rejects.toThrowError(`item must be a number`)
    })

    it(`should throw an error if slot is not a number`, async () => {
        const equipments = [{item: {entry: 123, displayid: 456}, transmog: {}, slot: `invalid`}]
        await expect(findItemsInEquipments(equipments)).rejects.toThrowError(`slot must be a number`)
    })
})