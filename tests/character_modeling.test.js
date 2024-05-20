import {
    optionsFromModel,
    findRaceGenderOptions,
    getCharacterOptions,
    characterPart
} from '../character_modeling.js'

// Mock necessary dependencies
global.fetch = jest.fn()


describe(`Retail and WotLK compatibility`, () => {

    it(`default for WotLK`, () => {
        expect(characterPart().Ears).toEqual(undefined)
        window.WOTLK_TO_RETAIL_DISPLAY_ID_API = undefined
        expect(characterPart().Ears).toEqual(`ears`)
    })
})

describe(`Character Modeling functions`, () => {
    beforeEach(() => {
        fetch.mockClear()
    })

    test(`getCharacterOptions should return correct options`, () => {

        const mockCharacter = {
            face: 1,
            facialStyle: 2,
            gender: 1,
            hairColor: 3,
            hairStyle: 4,
            items: [],
            race: 1,
            skin: 1
        }

        const mockOptions = {
            Options: [
                { Name: `Face`, Choices: [{ Id: 1 }, { Id: 2 }], Id: 1 },
                // Add more options as per your requirement
            ]
        }

        const result = getCharacterOptions(mockCharacter, mockOptions)
        expect(result).toEqual([{ optionId: 1, choiceId: 2 }])
    })

    test(`optionsFromModel should return correct structure`, () => {
        const mockModel = {
            race: 1,
            gender: 1,
            items: []
        }

        const mockFullOptions = {
            Options: []
        }

        const result = optionsFromModel(mockModel, mockFullOptions)
        expect(result).toEqual({
            items: [],
            charCustomization: { options: [] },
            models: { id: 2, type: 16 }
        })
    })

    test(`findRaceGenderOptions fetches correct options`, async () => {
        const mockRace = 1
        const mockGender = 1

        // Mock the fetch call
        fetch.mockResolvedValueOnce({ json: () => ({ data: { someOption: 1 } }) })

        const result = await findRaceGenderOptions(mockRace, mockGender)
        expect(result).toEqual({ someOption: 1 })
    })

})
