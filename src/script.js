import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const textureLoader = new THREE.TextureLoader()

// declare gui here
const global = {}

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

scene.backgroundBlurriness = 0
scene.backgroundIntensity = 1

// Add gui here if need (code for gui at bottom of file)
    
    const cubeTextureLoader = new THREE.CubeTextureLoader()
    const environmentMap = cubeTextureLoader.load([
        '/environmentMaps/6/px.png',
        '/environmentMaps/6/nx.png',
        '/environmentMaps/6/py.png',
        '/environmentMaps/6/ny.png',
        '/environmentMaps/6/pz.png',
        '/environmentMaps/6/nz.png'
    ])


// add different ways of adding environment map here - eg blockades labs

scene.background = environmentMap



const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 5, 4)
scene.add(camera)


const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()

// const gui = new GUI()

// gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001)
// gui.add(scene, 'backgroundIntensity').min(0).max(10).step(0.001)


// global.envMapIntensity = 1
// gui
//     .add(global, 'envMapIntensity')
//     .min(0)
//     .max(10)
//     .step(0.001)




// const environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/talksport.jpg')
// environmentMap.mapping = THREE.EquirectangularReflectionMapping
// environmentMap.colorSpace = THREE.SRGBColorSpace