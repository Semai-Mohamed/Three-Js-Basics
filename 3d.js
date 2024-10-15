import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'  
import naruto from './img/naruto-shippuuden-anime-uzumaki-naruto-uchiha-sasuke-wallpaper-preview.jpg'
import img3 from './img/kimetsu-no-yaiba-anime-4k-yn.jpg'

// Create the WebGLRenderer
const animation = new Three.WebGLRenderer()
animation.shadowMap.enabled = true // Enable shadows
animation.setSize(window.innerWidth, window.innerHeight) // Set canvas size to window size
document.body.appendChild(animation.domElement)  // Add the renderer to the DOM

// Create a scene
const scene = new Three.Scene()

// Set up the camera
const camera = new Three.PerspectiveCamera(
    75,  // Field of view
    window.innerWidth / window.innerHeight,  // Aspect ratio
    0.1,  // Near clipping plane
    1000  // Far clipping plane
)

// Set up orbit controls for the camera
const orbit = new OrbitControls(camera, animation.domElement)

// Add axes helper for orientation reference
const axesHalper = new Three.AxesHelper(5)
scene.add(axesHalper)

// Set camera position and update the controls
camera.position.set(0, 2, 6)
orbit.update()

// Create a rotating box
const boxGeometry = new Three.BoxGeometry()
const boxMaterial = new Three.MeshBasicMaterial({ color: 'blue' })
const box = new Three.Mesh(boxGeometry, boxMaterial)
scene.add(box)

// Create a ground plane
const planeGeometry = new Three.PlaneGeometry(20, 20)
const planeMaterial = new Three.MeshStandardMaterial({ color: 'white', side: Three.DoubleSide })
const plane = new Three.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = 1 / 2 * Math.PI  // Rotate the plane
plane.receiveShadow = true  // Enable shadows
scene.add(plane)

// Add a grid helper for visual reference
const gridHelper = new Three.GridHelper(20, 10)
scene.add(gridHelper);

// Create a sphere
const sphereGeometry = new Three.SphereGeometry(2, 50, 50)
const sphereMaterial = new Three.MeshStandardMaterial({ color: '#0075FF', wireframe: false })
const sphere = new Three.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(-5, 10, 0)
sphere.castShadow = true  // Enable shadows for the sphere
scene.add(sphere)

// Add ambient and directional lights
const light = new Three.AmbientLight(0x333333)
scene.add(light)

const directionLight = new Three.DirectionalLight(0xFFFFFF, 1)
scene.add(directionLight)
directionLight.position.set(-30, 50, 0)
directionLight.castShadow = true;
directionLight.shadow.camera.bottom = -10;  // Adjust the shadow camera
const lightHelper = new Three.DirectionalLightHelper(directionLight)
scene.add(lightHelper);
const shadowHelper = new Three.CameraHelper(directionLight.shadow.camera)
scene.add(shadowHelper);

// Set scene fog and background color
scene.fog = new Three.FogExp2(0xFFFFFF, 0.01)
animation.setClearColor('#333')

// Load textures for background and cube
const textLoader = new Three.TextureLoader()
const cubeTextureLoader = new Three.CubeTextureLoader()
scene.background = cubeTextureLoader.load([naruto, img3, naruto, img3, naruto, img3])

// Create a box with textures
const box3Geometry = new Three.BoxGeometry(4, 4, 4)
const groundMaterials = [
    new Three.MeshBasicMaterial({ map: textLoader.load(naruto) }),
    new Three.MeshBasicMaterial({ map: textLoader.load(naruto) }),
    new Three.MeshBasicMaterial({ map: textLoader.load(img3) }),
    new Three.MeshBasicMaterial({ map: textLoader.load(img3) }),
    new Three.MeshBasicMaterial({ map: textLoader.load(img3) }),
    new Three.MeshBasicMaterial({ map: textLoader.load(img3) })
];
const box3Material = groundMaterials
const box3 = new Three.Mesh(box3Geometry, box3Material)
box3.position.set(-10, 20, 0)
scene.add(box3)

// Set up the dat.GUI for user control
const gui = new dat.GUI()
const options = {
   speed: 0.01,
   sphereColor: 'red',
   wireframe: false
};

gui.add(options, 'speed', 0, 0.1)  // Add speed control
gui.add(options, 'sphereColor').onChange((e) => {  // Add color control
    sphere.material.color.set(e)
});
gui.add(options, 'wireframe').onChange((e) => {  // Add wireframe toggle
    sphere.material.wireframe = e
});

// Animation loop
let step = 0;
function animate() {
    box.rotation.x += 0.01
    box.rotation.y += 0.01
    animation.render(scene, camera);
    
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));  // Bounce the sphere up and down
    animation.render(scene, camera)
}

// Resize the canvas when the window is resized
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    animation.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation loop
animation.setAnimationLoop(animate)
animation.render(scene, camera)
