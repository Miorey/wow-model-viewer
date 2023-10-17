import {generateModels} from 'wow-model-viewer'

declare global {
    interface Window { CONTENT_PATH: any; }
}


window.CONTENT_PATH = `http://localhost:2999/modelviewer/live/`;

class MyDemo {
    // Define a constructor to initialize the page
    constructor(private modelId1: string, private modelId2: string) {
        console.log(window.CONTENT_PATH)
    }

    // Define a method to generate the HTML for the page
    generateHtml(): string {
        return `
        <h1>
            WoW model viewer
        </h1>
        <div class="model_3d" id="${this.modelId1}"></div>
        <div class="model_3d" id="${this.modelId2}"></div>
    `;
    }

    async generateCharacter() {
        console.log(`generateCharacter`, window.CONTENT_PATH)
        const model = {
            "race": 7,
            "gender": 1,
            "skin": 4,
            "face": 0,
            "hairStyle": 5,
            "hairColor": 5,
            "facialStyle": 5,
            "items": [[1, 1170], [3, 4925], [5, 9575], [6, 25235], [7, 2311], [8, 21154], [9, 14618], [10, 9534], [15, 17238], [21, 20379], [22, 28787]]
        };
        generateModels(1, `#${this.modelId1}`, model);
        const model2 = await generateModels(1, `#${this.modelId2}`, {type: 8, id: 24949});

        let angle = 0

        setInterval(() => {
            if (angle === 20000) {
                angle = 10000
            }
            angle += 10
            model2.setAzimuth(2 * Math.PI * (angle / 10000))
        }, 1)
    }
}

const myDemo = new MyDemo("model_3d1", "model_3d2");

// Write the generated HTML to the document body

document.getElementsByTagName('body')[0].innerHTML = myDemo.generateHtml();
myDemo.generateCharacter();
