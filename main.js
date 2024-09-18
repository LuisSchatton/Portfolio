import './style.css'
import * as THREE from 'three'
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
    PointerLockControls
} from 'three/examples/jsm/controls/PointerLockControls.js'
import {
    CSS2DRenderer,
    CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {
    HemisphereLight,
    Object3D
} from 'three';


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene

var camera, scene, renderer, controls

var labelRenderer = new CSS2DRenderer();
var labelDiv = document.createElement('div');
var label = new CSS2DObject(labelDiv);

var sandModel
var SchachModel
var computerModel
var ryofukuiModel
var robotModel
var bapeheadModel

var moveForward = false
var moveBackward = false
var moveLeft = false
var moveRight = false
var canJump = true

var onObject = true
var jumping = false
var posy

let prevTime = performance.now()
const velocity = new THREE.Vector3()
const direction = new THREE.Vector3()

var raycasterForward1 = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 10)
var raycasterForward2 = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 10)
var raycasterForward3 = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 10)
var raycasterForward4 = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 10)
var raycasterForward5 = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 10)

const raycasterDown = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 2)
const raycasterDownDown = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0, 200)
const raycasterFrontDown = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 1)
const raycasterPresentDown = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0, 200)





init()
animate()

function init() {


    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.y = 2;

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x426945);

    const loadingManager = new THREE.LoadingManager(() => {

        const loadingScreen = document.getElementById('loaded');
        loadingScreen.classList.add('disappear');

        // optional: remove loader from DOM via event listener
        //loadingScreen.addEventListener( 'transitionend', onTransitionEnd );

    });


    const loader = new GLTFLoader(loadingManager);



    //Geometry

    //Projekte

    loader.load(
        // resource URL
        'src/models/schach.glb',

        // called when the resource is loaded
        function (Schach) {

            Schach.scene.traverse(function (child) {

                if (child.isMesh) {

                    child.castShadow = true;
                    child.receiveShadow = true
                    child.geometry.computeVertexNormals();
                    child.name = 'Schach';
                }

            });


            SchachModel = Schach.scene
            Schach.scene.name = 'Schach' // OR
            SchachModel.userData.isContainer = true
            SchachModel.castShadow = true
            SchachModel.receiveShadow = true
            scene.add(Schach.scene);

        }


    );


    loader.load(
        // resource URL
        'src/models/computer.glb',

        // called when the resource is loaded
        function (computer) {

            computer.scene.traverse(function (child) {

                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true
                    child.geometry.computeVertexNormals();
                    child.name = 'computer';


                }

            });


            computerModel = computer.scene
            computer.scene.name = 'computer' // OR
            computerModel.userData.isContainer = true
            computerModel.castShadow = true
            computerModel.receiveShadow = true
            scene.add(computer.scene);

        }


    );

    loader.load(
        // resource URL
        'src/models/ryofukui.glb',

        // called when the resource is loaded
        function (ryofukui) {

            ryofukui.scene.traverse(function (child) {

                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true
                    child.geometry.computeVertexNormals();
                    child.name = ryofukui;


                }

            });


            ryofukuiModel = ryofukui.scene
            ryofukui.scene.name = 'ryofukui' // OR
            ryofukuiModel.userData.isContainer = true
            ryofukuiModel.castShadow = true
            ryofukuiModel.receiveShadow = true
            scene.add(ryofukui.scene);

        }




    );



    loader.load(
        // resource URL
        'src/models/robot.glb',

        // called when the resource is loaded
        function (robot) {

            robot.scene.traverse(function (child) {

                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true
                    child.geometry.computeVertexNormals();
                    child.name = robot;

                }

            });


            robotModel = robot.scene
            robot.scene.name = 'robot' // OR
            robotModel.userData.isContainer = true
            robotModel.castShadow = true
            robotModel.receiveShadow = true
            scene.add(robot.scene);

        }


    );



    loader.load(
        // resource URL
        'src/models/bapehead.glb',

        // called when the resource is loaded
        function (bapehead) {

            bapehead.scene.traverse(function (child) {

                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true
                    child.geometry.computeVertexNormals();
                    child.name = 'bapehead';


                }

            });


            bapeheadModel = bapehead.scene
            bapehead.scene.name = 'bapehead' // OR
            bapeheadModel.userData.isContainer = true
            bapeheadModel.castShadow = true
            bapeheadModel.receiveShadow = true

            scene.add(bapehead.scene);

        }


    );


    // Sand Plane


    loader.load(
        // resource URL
        'src/models/sand.glb',

        // called when the resource is loaded
        function (sand) {

            sand.scene.traverse(function (child) {

                if (child.isMesh) {

                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.geometry.computeVertexNormals();
                    //child.name.set = 'sand'

                }

            });



            sandModel = sand.scene
            sandModel.userData.isContainer = true

            scene.add(sand.scene);

            sand.scene.name = 'Sand'


        },

        function ( xhr ) {

            console.log( xhr  );

            const progress = document.getElementById('progress')

            progress.textContent = ( (Math.ceil ( xhr.loaded / xhr.total * 100 ) )  + '%' )

    
        },

    );



    //Skybox

    let materialArray = []
    let texture_xneg = new THREE.TextureLoader().load('src/textures/skybox/xneg.png')
    let texture_xpos = new THREE.TextureLoader().load('src/textures/skybox/xpos.png')
    let texture_zneg = new THREE.TextureLoader().load('src/textures/skybox/zneg.png')
    let texture_zpos = new THREE.TextureLoader().load('src/textures/skybox/zpos.png')
    let texture_yneg = new THREE.TextureLoader().load('src/textures/skybox/yneg.png')
    let texture_ypos = new THREE.TextureLoader().load('src/textures/skybox/ypos.png')

    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_xneg
    }))
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_xpos
    }))
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_ypos
    }))
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_yneg
    }))
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_zneg
    }))
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_zpos
    }))


    for (let i = 0; i < 6; i++) {
        materialArray[i].side = THREE.BackSide;
    }

    let skyboxGeo = new THREE.BoxGeometry(4000, 4000, 4000)
    let skybox = new THREE.Mesh(skyboxGeo, materialArray)
    scene.add(skybox)


    // Lights

    const axesHelper = new THREE.AxesHelper(5);
    //scene.add( axesHelper );

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(-100, 100, 50);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 5000;
    spotLight.shadow.camera.fov = 30;

    spotLight.penumbra = 1
    spotLight.decay = 1000
    spotLight.distance = 100000

    scene.add(spotLight);

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    //scene.add( spotLightHelper );

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);


    //Controls

    controls = new PointerLockControls(camera, document.body)

    const blocker = document.getElementById('blocker')
    const instructions = document.getElementById('instructions')

    instructions.addEventListener('click', function () {

        controls.lock()

    })

    controls.addEventListener('lock', function () {

        instructions.style.display = 'none'
        blocker.style.display = 'none'


    })

    controls.addEventListener('unlock', function () {

        instructions.style.display = ''
        blocker.style.display = ''

    })

    scene.add(controls.getObject())

    //Projekte

    const body = document.getElementById('body')
    const blockerproj = document.getElementById('blockerprojekte')

    const aiprj = document.getElementById('ai')
    const schachprj = document.getElementById('schach')
    const ryofukuiprj = document.getElementById('ryofukui')
    const bapeheadprj = document.getElementById('bapehead')

    const button = document.getElementById('buttonClose')
    var speed = 1

    let ProjektInfoRan = false

    window.onkeydown = function (event) {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    };

    function ProjekteInfo() {


        if (ProjektInfoRan == false) {

            body.style.overflow = 'scroll'
            blockerproj.style.zIndex = '+10'

            controls.unlock()

            ProjektInfoRan = true

        }

    }

    button.addEventListener('click', function () {

        controls.lock()

        ryofukuiprj.style.display = 'none'
        bapeheadprj.style.display = 'none'
        schachprj.style.display = 'none'
        aiprj.style.display = 'none'

        blockerproj.style.zIndex = '-1000'
        body.style.overflow = 'hidden'
        window.scrollTo(0, 0);

        setTimeout(function () {
            ProjektInfoRan = false

            ryofukuiprj.style.display = 'none'
            bapeheadprj.style.display = 'none'
            schachprj.style.display = 'none'
            aiprj.style.display = 'none'
        }, speed)

    })


    document.addEventListener('click', function (event) {


        raycasterForward1.ray.origin.copy(controls.getObject().position)
        camera.getWorldDirection(raycasterForward1.ray.direction);
        raycasterForward1.ray.origin.y -= 1

        const ItemDetection = raycasterForward1.intersectObjects(SchachModel.children, true);

        if (ItemDetection.length > 0 && controls.isLocked == true) {

            schachprj.style.display = ''

            ProjekteInfo()

        }


    });


    document.addEventListener('click', function (event) {


        raycasterForward2.ray.origin.copy(controls.getObject().position)
        camera.getWorldDirection(raycasterForward2.ray.direction);
        raycasterForward2.ray.origin.y -= 1

        const ItemDetection = raycasterForward2.intersectObjects(bapeheadModel.children, true);

        if (ItemDetection.length > 0 && controls.isLocked == true) {

            bapeheadprj.style.display = ''

            ProjekteInfo()

        }


    });

    document.addEventListener('click', function (event) {


        raycasterForward3.ray.origin.copy(controls.getObject().position)
        camera.getWorldDirection(raycasterForward3.ray.direction);
        raycasterForward3.ray.origin.y -= 1

        const ItemDetection = raycasterForward3.intersectObjects(robotModel.children, true);

        if (ItemDetection.length > 0 && controls.isLocked == true) {

            aiprj.style.display = ''

            ProjekteInfo()

        }


    });

    document.addEventListener('click', function (event) {


        raycasterForward4.ray.origin.copy(controls.getObject().position)
        camera.getWorldDirection(raycasterForward4.ray.direction);
        raycasterForward4.ray.origin.y -= 1

        const ItemDetection = raycasterForward4.intersectObjects(ryofukuiModel.children, true);

        if (ItemDetection.length > 0 && controls.isLocked == true) {

            ryofukuiprj.style.display = ''

            ProjekteInfo()

        }


    });

    document.addEventListener('click', function (event) {


        raycasterForward5.ray.origin.copy(controls.getObject().position)
        camera.getWorldDirection(raycasterForward5.ray.direction);
        raycasterForward5.ray.origin.y -= 1

        const ItemDetection = raycasterForward1.intersectObjects(computerModel.children, true);

        if (ItemDetection.length > 0) {

            if (controls.isLocked == true) {

                let params = `status=no,location=no,toolbar=no,menubar=no,
                              width=1000,height=700,left=-10,top=-10`;

                open('terminal.html', 'test', params);

            }


        }


    });


    // Setup labels
    labelRenderer.setSize(innerWidth, innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(labelRenderer.domElement);

    labelDiv.className = 'label';
    labelDiv.style.marginTop = '-1em';
    label.visible = false;
    scene.add(label);



    const onKeyDown = function (event) {

        switch (event.code) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;

            case 'Space':

                if (canJump) {

                    canJump = false
                    onObject = false
                    jumping = true
                    velocity.y += 35


                }

                break;

        }

    }

    const onKeyUp = function (event) {

        switch (event.code) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                velocity.x = 0
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                velocity.z = 0
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                velocity.x = 0
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                velocity.z = 0
                break;

        }

    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    //Renderer

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate)

    const time = performance.now();

    if (controls.isLocked === true) {

        //Labeler

        raycasterForward1.ray.origin.copy(controls.getObject().position)
        camera.getWorldDirection(raycasterForward1.ray.direction);
        raycasterForward1.ray.origin.y -= 1

        raycasterForward2.ray.origin.copy(controls.getObject().position)
        camera.getWorldDirection(raycasterForward2.ray.direction);
        raycasterForward2.ray.origin.y -= 1

        raycasterForward3.ray.origin.copy(controls.getObject().position)
        camera.getWorldDirection(raycasterForward3.ray.direction);
        raycasterForward3.ray.origin.y -= 1

        raycasterForward4.ray.origin.copy(controls.getObject().position)
        camera.getWorldDirection(raycasterForward4.ray.direction);
        raycasterForward4.ray.origin.y -= 1

        raycasterForward5.ray.origin.copy(controls.getObject().position)
        camera.getWorldDirection(raycasterForward5.ray.direction);
        raycasterForward5.ray.origin.y -= 1

        const [Labeler1] = raycasterForward1.intersectObjects(SchachModel.children, true);
        const [Labeler2] = raycasterForward2.intersectObjects(bapeheadModel.children, true);
        const [Labeler3] = raycasterForward3.intersectObjects(robotModel.children, true);
        const [Labeler4] = raycasterForward4.intersectObjects(computerModel.children, true);
        const [Labeler5] = raycasterForward5.intersectObjects(ryofukuiModel.children, true);


        if (Labeler1) {

            const Labeler = document.getElementById('Labeler');
            Labeler.classList.remove('disappearLabeler');

            const LabelerText = document.getElementById('LabelerText');
            LabelerText.textContent = '[Click to see Checkmate]';


        } else if (Labeler2) {

            const Labeler = document.getElementById('Labeler');
            Labeler.classList.remove('disappearLabeler');

            const LabelerText = document.getElementById('LabelerText');
            LabelerText.textContent = '[Click to see Bapehead]';

        } else if (Labeler3) {

            const Labeler = document.getElementById('Labeler');
            Labeler.classList.remove('disappearLabeler');

            const LabelerText = document.getElementById('LabelerText');
            LabelerText.textContent = '[Click to see AI]';

        } else if (Labeler4) {

            const Labeler = document.getElementById('Labeler');
            Labeler.classList.remove('disappearLabeler');

            const LabelerText = document.getElementById('LabelerText');
            LabelerText.textContent = '[Use Terminal]';

        } else if (Labeler5) {

            const Labeler = document.getElementById('Labeler');
            Labeler.classList.remove('disappearLabeler');

            const LabelerText = document.getElementById('LabelerText');
            LabelerText.textContent = '[Click to see Early Summer - Ryo Fukui]';

        } else {
            // Reset label
            const Labeler = document.getElementById('Labeler');
            Labeler.classList.add('disappearLabeler');

            const LabelerText = document.getElementById('LabelerText');
            LabelerText.textContent = '';
        }


        // Laufen und Fallen

        raycasterDown.ray.origin.copy(controls.getObject().position)
        raycasterDown.ray.origin.y -= -0.2

        raycasterFrontDown.ray.origin.copy(controls.getObject().position)
        raycasterFrontDown.ray.origin.y -= 1

        raycasterPresentDown.ray.origin.copy(controls.getObject().position)
        raycasterPresentDown.ray.origin.y = -100

        const intersections = raycasterDown.intersectObjects(sandModel.children, true);

        const intersectionsDownDown = raycasterDownDown.intersectObjects(sandModel.children, true);

        const intersectionsPresentDown = raycasterPresentDown.intersectObjects(sandModel.children, true);

        const Slope = intersectionsDownDown.length > 0

        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 12 * delta;
        velocity.z -= velocity.z * 12 * delta;

        posy = controls.getObject().position.y

        raycasterDownDown.ray.origin.copy(controls.getObject().position)
        raycasterDownDown.ray.origin.y = -100
        raycasterDownDown.ray.origin.x += 0.1 * Math.sign(velocity.x)
        raycasterDownDown.ray.origin.z += 0.1 * Math.sign(velocity.z)


        if (String(typeof (intersections[0])) == "object") {
            onObject = true
        } else {
            onObject = false
        }

        if (onObject === true) {

            jumping = false
            velocity.y = 0;
            canJump = true;

        }

        if (jumping == true) {

            velocity.y -= 9.8 * 10.0 * delta; // 100.0 = mass

        }

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 120.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 120.0 * delta;

        controls.getObject().position.y += (velocity.y * delta); // new behavior


        if ((jumping == false) && (String(typeof (intersectionsPresentDown[0])) == "object")) {

            for (var i = 0; i < 4; i++) {

                controls.getObject().position.y = intersectionsPresentDown[0].distance - 98

            }

        }

        if (posy < -5000) {

            velocity.y = 0;
            controls.getObject().position.y = 20
            controls.getObject().position.z = 1
            controls.getObject().position.x = 1

        }

        controls.moveRight(-velocity.x * delta);

        controls.moveForward(-velocity.z * delta);

    }

    prevTime = time;

    renderer.render(scene, camera)

    labelRenderer.render(scene, camera);

}