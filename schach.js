import './style.css'
import * as THREE from 'three'
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'


// Canvas
const myCanvasElement = document.querySelector('canvas.threejs')

// Scene

var camera, scene, renderer, controls

var loadingManager

var SchachModel

let prevTime = performance.now()

var rotationHelm






init()
animate()

function init() {


    camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight / 2), 0.1, 5000);
    camera.position.y = 0
    camera.position.x = 0
    camera.position.z = 0.7

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000);


    const loader = new GLTFLoader(loadingManager);



    //Geometry

    //Projekte

    loader.load(
        // resource URL
        'src/models/schach/helm2.glb',

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

           

            rotationHelm = SchachModel.rotation.y

        
        },

        function ( xhr ) {

    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }   
      

    );





    // Lights

    /* const light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 10 );
    const helper = new THREE.HemisphereLightHelper( light, 10 );
    scene.add( helper )
    scene.add( light ) */

    const axesHelper = new THREE.AxesHelper(5);
    //scene.add( axesHelper );

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 0, 5);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 5000;
    spotLight.shadow.camera.fov = 30;

    spotLight.penumbra = 1
    spotLight.decay = 100
    spotLight.distance = 100000

    scene.add( spotLight );

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    //scene.add( spotLightHelper );

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);


    //Renderer

    renderer = new THREE.WebGLRenderer({ canvas: myCanvasElement });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight / 2);
    document.getElementById('test').appendChild(renderer.domElement);

    controls = new OrbitControls( camera, renderer.domElement );


    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = ( window.innerWidth ) / ( window.innerHeight / 2 );
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight / 2);

    controls.update();


}

function animate() {

    requestAnimationFrame(animate)

    const time = performance.now();

    prevTime = time;

    if ( SchachModel) SchachModel.rotation.y += 0.002

    controls.update();

    renderer.render(scene, camera)

}