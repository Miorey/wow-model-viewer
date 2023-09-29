class ZamModelViewer {
    constructor() {
        this.renderer = {
            models: [{
                ap: [{
                    j: `animation1`
                }, {
                    j: `animation2`
                }, {
                    j: `animation3`
                }],
                setAnimation: function (val) {
                    if (!this.ap.find(e => e.j === val)) {
                        // nothing
                    }
                },
                setAnimPaused: function (val) {
                    if (val === ``) {
                        throw new Error(`Empty value not allowed`)
                    }
                }
            }],
            distance: 100,
            azimuth: 0,
            zenith: 0
        }
    }

    getModel() {
        return this.renderer.models[0]
    }

    getDistance() {
        return this.renderer.distance
    }

    setDistance(val) {
        this.renderer.distance = val
    }

    setAnimation(val) {
        this.getModel().setAnimation(val)
    }

    setAnimPaused(val) {
        this.getModel().setAnimPaused(val)
    }

    method(methodName, args) {
        if (methodName === `setAppearance`) {
            this.appearance = args
        }
    }


}


global.ZamModelViewer = ZamModelViewer
