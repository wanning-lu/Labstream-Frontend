// Aiming to put multiple STL models on one page in a joint model

import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, TrackballControls } from '@react-three/drei';

function generatePlanarGrid( n ) {
    const indexArray = Array.from({ length: 2 * n + 1 }, (_, i) => i - n);
    console.log(indexArray)
    return (
        <>
            {indexArray.map(x =>
                indexArray.map(z => (
                    <mesh key={`${x}-${z}`} position={[2*x, 0, 2*z]}>
                        <sphereGeometry args={[0.5, 32, 32]} />
                        <meshStandardMaterial color="orange" />
                    </mesh>
                ))
            )}
        </>
    );
}

const PlanarGrid = () => {
    return (
        <Canvas
            style={{ height: '70vh', width: '90vw', border: '3px solid white' }}
            // Camera position (IMPORTANT)
            camera={{ position: [30, 30, 30], fov: 50 }}
        >
            <Suspense fallback={null}>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={3} />
                <spotLight position={[1, 1, 5]} angle={0.3} penumbra={1} decay={0} intensity={3} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={3} />
                {generatePlanarGrid(10)}
            </Suspense>
            <OrbitControls
                enablePan={false}           // Disable panning
                enableZoom={false}          // Disable zooming
                enableRotate={true}         // Enable rotation
                maxPolarAngle={Math.PI / 3}   // Lock vertical rotation at pi/3
                minPolarAngle={Math.PI / 3}   // Lock vertical rotation at pi/3
                enableDamping={true}
                dampingFactor={0.05}
                minAzimuthAngle={-Infinity} // Allow full horizontal rotation
                maxAzimuthAngle={Infinity}  // Allow full horizontal rotation
            />
        </Canvas>
    );
};
export default PlanarGrid;