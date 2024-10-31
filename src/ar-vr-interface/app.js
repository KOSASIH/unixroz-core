// app.js
let scene, camera, renderer, controller1, controller2;

function init() {
    // Create the scene
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Add controllers
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Set up AR and VR buttons
    document.getElementById('enter-ar').addEventListener('click', enterAR);
    document.getElementById('enter-vr').addEventListener('click', enterVR);

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

async function enterAR() {
    if (navigator.xr) {
        const session = await navigator.xr.requestSession('immersive-ar');
        renderer.xr.enabled = true;
        renderer.xr.setSession(session);
    } else {
        alert('WebXR not supported');
    }
}

async function enterVR() {
    if (navigator.xr) {
        const session = await navigator.xr.requestSession('immersive-vr');
        renderer.xr.enabled = true;
        renderer.xr.setSession(session);
    } else {
        alert('WebXR not supported');
    }
}

// Initialize the application
init();
