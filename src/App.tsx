import { ArrowDown, } from "@phosphor-icons/react"
import Navbar from "./components/navbar"
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from "./components/scene"
import LavaLamp from "./components/lamp"
import ResightApk from './assets/images/resight_apk.png'
import TestMesh from "./components/testmesh"
import PortfolioImage from './assets/images/portoflio.png'

import MouseTracker from "./components/mousetracker"

const App = () => {

	return (
		<main className='bg-zinc-950 text-text selection:bg-purple-800 selection:text-zinc-900 font-nunito relative overflow-hidden cursor-none'>
			<Navbar />

			<MouseTracker />


			{/* <div className="min-h-screen bg-red-800 mx-auto max-w-screen-xl items-center ">
				<TestMesh />
			</div> */}
			<div className="min-h-screen mx-auto max-w-screen-xl items-center">
				<div className="flex flex-col min-h-screen justify-between pt-32">
					<p className="text-text text-8xl uppercase w-full leading-tight">
						Caio
						<br />
						Cerano
					</p>
					<div className="flex w-full justify-between items-end">
						<ArrowDown weight="light" className="text-text text-9xl pb-8 scroll-icon" />
						<p className="text-text text-8xl uppercase w-full leading-tight text-right">
							Designer &
							<br />
							Developer
							{/* Front end &
							<br />
							App Developer */}
						</p>
					</div>
				</div>
				<div className="w-full my-16">
					<p className="text-text text-8xl uppercase">
						Works
					</p>

					<div className="flex flex-col bg-zinc-900 w-96 rounded-lg overflow-hidden z-20 items-start">
						<div className="h-80  w-full relative bg-contain">
							<img src={PortfolioImage} alt="Futuro Absoluto" className="w-full h-full object-cover" />
						</div>
						<p className="text-xl text-center text-text py-4 px-4">
							My portfolio
						</p>
						<p className="text-xl text-center text-text py-4 px-4">
							My portfolio
						</p>
					</div>


				</div>
			</div>
		</main>
	)
}

export default App
