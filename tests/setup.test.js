const {describe, it} = require(`@jest/globals`)

// Import the module to be tested
import {WH} from '../setup'

describe(`WH`, () => {
    it(`check consts`, async () => {
        expect(window.WOTLK_TO_RETAIL_DISPLAY_ID_API).toEqual(`https://wotlk.murlocvillage.com/api/items`)
        expect(window.CONTENT_PATH).toEqual(`http://localhost:3001/modelviewer/live/`)
    })

    it(`check function WH.debug`, async () => {
        WH.debug(`Hello`, `world`)
    })

    it(`check method WH.WebP.getImageExtension`, async () => {
        expect(expect(WH.WebP.getImageExtension()).toEqual(`.webp`))
    })
})
