<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Card, Icon, Button } from '../../../index'
import * as THREE from 'three'

const props = defineProps<{
    title?: string
    color?: string
}>()

const containerRef = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, cube: THREE.Mesh

onMounted(() => {
    if (!containerRef.value) return

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, containerRef.value.clientWidth / 150, 0.1, 1000)

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(containerRef.value.clientWidth, 150)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.value.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({
        color: props.color || '#6366f1',
        shininess: 100,
        specular: 0xffffff
    })
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(1, 1, 2)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    camera.position.z = 2

    const animate = () => {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
        if (!containerRef.value) return
        camera.aspect = containerRef.value.clientWidth / 150
        camera.updateProjectionMatrix()
        renderer.setSize(containerRef.value.clientWidth, 150)
    }
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    renderer?.dispose()
})
</script>

<template>
    <Card class="w-full max-w-[300px] overflow-hidden group" padding="none">
        <div ref="containerRef" class="h-[150px] w-full bg-slate-950/5 cursor-move"></div>
        <div class="p-4">
            <h3 class="font-bold text-slate-900 dark:text-white">{{ title || 'Expérience 3D' }}</h3>
            <p class="text-xs text-slate-500 mt-1">Intégration native Three.js pour des démonstrations de produits
                interactives.</p>
            <div class="mt-4 flex gap-2">
                <Button size="xs" block>Interagir</Button>
            </div>
        </div>
    </Card>
</template>
