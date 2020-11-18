"use strict";

import "../../sass/index.scss";
import { Scene, Engine, ArcRotateCamera, FreeCamera, Vector3, MeshBuilder, HemisphericLight, Sound, StandardMaterial, Color3, Texture, Vector4, Mesh } from "babylonjs";

class App {
    engine: Engine;

    constructor() {
        const $canvas = document.querySelector<HTMLCanvasElement>("#renderCanvas");

        this.engine = new Engine($canvas, true); /* Generate the BABYLON 3D engine */

        const scene = new Scene(this.engine); /* Create basic scene */

        const camera = new FreeCamera("camera1", new Vector3(0, 0, -20), scene);

        // const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 20, new Vector3(0, 0, 0), scene); /* Create camera in scene */

        camera.attachControl($canvas, true); /* Attach the camera to the canvas */

        camera.keysUp.push(87); //W
        camera.keysDown.push(83); //D
        camera.keysLeft.push(65); //A
        camera.keysRight.push(68); //S

        const box = Mesh.CreateBox("box", 4, scene);

        //new HemisphericLight("light", new Vector3(0, 1, 0), scene); /* Create a basic light in scene */

        //base
        // const outline = [new Vector3(-0.3, 0, -0.1), new Vector3(0.2, 0, -0.1)];
        //curved front
        // for (let i = 0; i < 20; i++) {
        //     outline.push(new Vector3(0.2 * Math.cos((i * Math.PI) / 40), 0, 0.2 * Math.sin((i * Math.PI) / 40) - 0.1));
        // }
        //top
        // outline.push(new Vector3(0, 0, 0.1));
        //outline.push(new Vector3(-0.3, 0, 0.1));

        // console.log(outline);

        //const car = MeshBuilder.ExtrudePolygon("car", { shape: [], depth: 0.2 }, scene);

        // const wheelRB = MeshBuilder.CreateCylinder("wheelRB", {diameter: 0.125, height: 0.05})
        // wheelRB.parent = car;
        // wheelRB.position.z = -0.1;
        // wheelRB.position.x = -0.2;
        // wheelRB.position.y = 0.035;
        // wheelRF = wheelRB.clone("wheelRF");
        // wheelRF.position.x = 0.1;
        // wheelLB = wheelRB.clone("wheelLB");
        // wheelLB.position.y = -0.2 - 0.035;
        // wheelLF = wheelRF.clone("wheelLF");
        // wheelLF.position.y = -0.2 - 0.035;

        /* Register a render loop to repeatedly render the scene */
        this.engine.runRenderLoop(function () {
            scene.render();
        });
        /* Watch for browser/canvas resize events */
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }

    createVillage = (scene: Scene) => {
        const faceUV = [new Vector4(0.5, 0.0, 0.75, 1.0), new Vector4(0.0, 0.0, 0.25, 1.0), new Vector4(0.25, 0, 0.5, 1.0), new Vector4(0.75, 0, 1.0, 1.0)];

        const box = MeshBuilder.CreateBox("box", { width: 2, height: 2, depth: 2, faceUV: faceUV, wrap: true }, scene); /* Create box mesh in scene */

        box.rotation.y = Math.PI / 2;

        box.position = new Vector3(3, 1, -3);

        const boxMat = new StandardMaterial("boxMat", scene);

        boxMat.diffuseTexture = new Texture("/assets/img/cubehouse.png", scene);

        box.material = boxMat;

        /**
         * diameter: 상단 및 하단 캡의 지름
         * tessellation: 실린더면의 수
         */
        const roof = MeshBuilder.CreateCylinder("roof", { diameter: 2, height: 3, tessellation: 3 }, scene);

        roof.scaling = new Vector3(0.75, 0.8, 1.5);

        roof.rotation = new Vector3(0, 0, Math.PI / 2);

        roof.position = new Vector3(3, 2.3, -3);

        const roofMat = new StandardMaterial("roofMat", scene);

        roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);

        roof.material = roofMat;

        const house = Mesh.MergeMeshes([box, roof], true, false, undefined, false, true);

        if (house) {
            for (let i = 0; i < 9; i++) {
                const cloneHouse = house.createInstance(`house${i + 1}`);

                if (cloneHouse) {
                    cloneHouse.position.x = house.position.x + 3 * -Math.floor(i / 3);
                    cloneHouse.position.z = house.position.z + 3 * (i % 3);
                }
            }
        }

        const ground = MeshBuilder.CreateGround("ground", { width: 12, height: 12 });

        const groundMat = new StandardMaterial("groundMat", scene);

        groundMat.diffuseColor = new Color3(0, 1, 0);

        ground.material = groundMat;
    };
}

new App();
