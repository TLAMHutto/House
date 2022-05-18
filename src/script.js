import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
//Fog
const fog = new THREE.Fog('#ceced3', 1, 25)
scene.fog = fog
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const bricksColorTexture = textureLoader.load('/textures/bricks/color2.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion2.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal2.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness2.jpg')
const bricksHeightTexture = textureLoader.load('/textures/bricks/height2.png')
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
const graveColorTexture = textureLoader.load('/textures/grave/grave_color.jpg')
const graveAmbientOcclusionTexture = textureLoader.load('/textures/grave/grave_ao.jpg')
const graveNormalTexture = textureLoader.load('/textures/grave/grave_normal.jpg')
const graveRoughnessTexture = textureLoader.load('/textures/grave/grave_roughness.jpg')
const graveHeightTexture = textureLoader.load('/textures/grave/grave_height.png')
const bushAoTexture = textureLoader.load('/textures/bush/bush_ao.jpg')
const bushColorTexture = textureLoader.load('/textures/bush/bush_color.jpg')
const bushNormalTexture = textureLoader.load('/textures/bush/bush_normal.jpg')
const bushRoughnessTexture = textureLoader.load('/textures/bush/bush_roughness.jpg')
const bushHeightTexture = textureLoader.load('/textures/bush/bush_height.png')
grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)
grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping


/**
 * House
 */
//Group
const house = new THREE.Group()
scene.add(house)
//Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        color: '#ffffff',
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        transparent: true,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
        color: '#785a39',
        // displacementMap: bricksHeightTexture,
        // displacementScale: 0.0001,
    })
)

walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 2.5 /2
house.add(walls)

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({color: '#ffffff'})
)
roof.position.y = 2.5 + 0.5
roof.rotateY(Math.PI * .25)
house.add(roof)
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        color: '#5f4a40',
        transparent: true,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,

     })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)
//Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        color: '#5f4a40',
    })
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.y = 1
door.position.z = 2 
house.add(door)
//Bush
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushColorTexture,
    aoMap: bushAoTexture,
    normalMap: bushNormalTexture,
    roughnessMap: bushRoughnessTexture,
    displacementMap: bushHeightTexture,
    displacementScale: 0.1,
    
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(1.3, 0.2, 2.2)
house.add(bush1, bush2, bush3, bush4)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.8)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-1, 0.1, 2.1)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1.8, 0.1, 2.6)
//graves
const graves = new THREE.Group()
scene.add(graves)
const gravesGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const gravesMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveAmbientOcclusionTexture,
    normalMap: graveNormalTexture,
    roughnessMap: graveRoughnessTexture,
    displacementMap: graveHeightTexture,
    displacementScale: 0.0001,
})
for(let i = 0; i < 25; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    //change random on y position
    const grave = new THREE.Mesh(gravesGeometry, gravesMaterial)
    grave.position.set(x, 0.3, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.castShadow = true
    graves.add(grave)

}

floor.receiveShadow = true
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#333335', 0)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)
//Door Light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
gui.add(doorLight, 'intensity').min(0).max(2).step(0.001)
house.add(doorLight)
//ghosts
const ghost1 = new THREE.PointLight('#ffffff', 1, 1)
scene.add(ghost1)
const ghost2 = new THREE.PointLight('#ffffff', 1, 3)
scene.add(ghost2)
const ghost3 = new THREE.PointLight('#ffffff', 2, 1)
scene.add(ghost3)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setClearColor('#000000')
moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
walls.castShadow = true
roof.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7
ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7
ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7
ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const ghost1Angle = elapsedTime * 0.2
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)
    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 4
    ghost2.position.z = Math.sin(ghost2Angle) * 4
    ghost2.position.y = Math.sin(elapsedTime * 3)
    const ghost3Angle = elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (4 + Math.sin(elapsedTime * 2))
    ghost3.position.z = Math.sin(ghost3Angle) * (43 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 3) + Math.sin(elapsedTime * 2) 
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
    

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()