const {describe, it} = require(`@jest/globals`)

import './mocks.js'

// Import the module to be tested
import {WowModelViewer} from '../wow_model_viewer'


describe(`WowModelViewer`, () => {
    /** @type{WowModelViewer} **/
    let viewer

    beforeEach(() => {
        viewer = new WowModelViewer()
    })

    describe(`Getters and Setters`, () => {
        it(`should get and set currentCharacterOptions`, () => {
            expect(viewer.currentCharacterOptions).toBe(0)
            viewer.currentCharacterOptions = 5
            expect(viewer.currentCharacterOptions).toBe(5)
        })

        it(`should get and set characterGender`, () => {
            expect(viewer.characterGender).toBeNull()
            viewer.characterGender = 1
            expect(viewer.characterGender).toBe(1)
        })

        it(`should get and set characterRace`, () => {
            expect(viewer.characterRace).toBeNull()
            viewer.characterRace = 2
            expect(viewer.characterRace).toBe(2)
        })
    })


    describe(`getListAnimations`, () => {
        it(`should return an array of animation names`, () => {
            console.log(viewer.getListAnimations())
            const animations = viewer.getListAnimations()
            expect(Array.isArray(animations)).toBe(true)
            expect(animations.length).toBeGreaterThan(0)
        })
    })

    describe(`setDistance`, () => {
        it(`should change the character distance`, () => {
            const initialDistance = viewer.getDistance()
            viewer.setDistance(50)
            expect(viewer.getDistance()).toBe(50)
            viewer.setDistance(initialDistance)
        })
    })

    describe(`setAnimPaused`, () => {
        it(`should play/pause the animation`, () => {
            const spy = jest.spyOn(viewer.renderer.actors[0], `setAnimPaused`)
            viewer.setAnimPaused(true)
            expect(spy).toHaveBeenCalledWith(true)
            viewer.setAnimPaused(false)
            expect(spy).toHaveBeenCalledWith(false)
            spy.mockRestore()
        })

        it(`should throw an error if an empty value is passed`, () => {
            expect(() => viewer.setAnimPaused(``)).toThrow(`Empty value not allowed`)
        })
    })

    describe(`setAzimuth`, () => {
        it(`should change the azimuth angle`, () => {
            const initialAzimuth = viewer.getAzimuth()
            viewer.setAzimuth(0.5)
            expect(viewer.getAzimuth()).toBe(0.5)
            viewer.setAzimuth(initialAzimuth)
        })
    })

    describe(`setZenith`, () => {
        it(`should change the zenith angle`, () => {
            const initialZenith = viewer.getZenith()
            viewer.setZenith(0.5)
            expect(viewer.getZenith()).toBe(0.5)
            viewer.setZenith(initialZenith)
        })
    })

    describe(`getAzimuth`, () => {
        it(`should return the azimuth angle`, () => {
            expect(viewer.getAzimuth()).toBe(0)
        })
    })

    describe(`getZenith`, () => {
        it(`should return the zenith angle`, () => {
            expect(viewer.getZenith()).toBe(0)
        })
    })

    describe(`updateItemViewer`, () => {
        it(`should clear the model viewer slot`, () => {
            const spy = jest.spyOn(viewer, `method`).mockImplementation()

            viewer.updateItemViewer(5, 100, 1)
            expect(spy).toHaveBeenCalledWith(`clearSlots`, `5`)

            spy.mockRestore()
        })

        it(`should set items if displayId is provided`, () => {
            const spy = jest.spyOn(viewer, `method`).mockImplementation()

            viewer.updateItemViewer(5, 100, 1)
            expect(spy).toHaveBeenCalledWith(`setItems`, [[{
                slot: 5,
                display: 100,
                visual: 1
            }]])

            spy.mockRestore()
        })

        it(`should not set items if displayId is not provided`, () => {
            const spy = jest.spyOn(viewer, `method`).mockImplementation()

            viewer.updateItemViewer(5, null, 1)
            expect(spy).not.toHaveBeenCalledWith(`setItems`, expect.anything())

            spy.mockRestore()
        })

        it(`should convert INVENTORY_TYPE_ROBE slot to INVENTORY_TYPE_CHEST`, () => {
            const spy = jest.spyOn(window.WH, `debug`).mockImplementation()

            viewer.updateItemViewer(window.WH.Wow.Item.INVENTORY_TYPE_ROBE, 100, 1)
            expect(spy).toHaveBeenCalledWith(`Clearing model viewer slot:`, window.WH.Wow.Item.INVENTORY_TYPE_CHEST.toString())

            spy.mockRestore()
        })
    })

    describe(`setNewAppearance`, () => {
        it(`should set new appearance based on given options and character attributes`, () => {
            // Given: A character object and fullOptions mock
            const character = {
                face: 1,
                facialStyle: 1,
                gender: 1,
                hairColor: 1,
                hairStyle: 1,
                items: [[1, 2], [2, 3]],
                race: 1,
                skin: 1
            }

            viewer.currentCharacterOptions = {
                Options: [
                ]
            }
            viewer.characterRace = character.race
            viewer.characterGender = character.gender

            const spy = jest.spyOn(viewer, `method`).mockImplementation()

            // When: We set a new appearance
            viewer.setNewAppearance(character)

            // Then: Expect method to have been called with a certain payload
            // Here, you might need to adjust the expected payload based on your actual mapping
            expect(spy).toHaveBeenCalledWith(`setAppearance`, {
                race: character.race,
                gender: character.gender,
                options: expect.any(Array) // or a more specific structure if needed
            })

            spy.mockRestore()
        })

        it(`should throw an error if currentCharacterOptions is not set`, () => {
            viewer.currentCharacterOptions = 0 // Unset the options

            expect(() => viewer.setNewAppearance({})).toThrow(`Character options are not set`)
        })
    })



})

