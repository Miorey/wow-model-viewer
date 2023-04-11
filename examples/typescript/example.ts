import {generateModels} from 'wow-model-viewer'

class MyDemo {
    // Define a constructor to initialize the page
    constructor(private modelId: string) {
    }

    // Define a method to generate the HTML for the page
    generateHtml(): string {
        return `
        <h1>
            WoW model viewer
        </h1>
        <div class="model_3d" id="${this.modelId}"></div>
    `;
    }

    generateCharacter() {
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
        return generateModels(1, `#${this.modelId}`, model);
    }
}

const myDemo = new MyDemo("model_3d");

// Write the generated HTML to the document body
document.getElementsByTagName('body')[0].innerHTML = myDemo.generateHtml();
myDemo.generateCharacter();
