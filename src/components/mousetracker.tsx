import React, { useState, useEffect } from 'react'
import { DotOutline } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import _ from 'lodash'

const MouseTracker = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [hoverText, setHoverText] = useState('')
    const [lines, setLines] = useState<Array<{ x: number, y: number }>>([])
    const [isClicking, setIsClicking] = useState(false)

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [])

    useEffect(() => {
        let lastClientX = 0
        let lastClientY = 0

        const updateMousePosition = _.throttle((x: number, y: number) => {
            setMousePosition({ x, y })
            setLines(lines => [...lines, { x, y }])
            setTimeout(() => setLines(lines => lines.slice(1)), 800)
        }, 5)

        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY, pageX, pageY } = event

            lastClientX = clientX
            lastClientY = clientY

            updateMousePosition(pageX, pageY)
        }

        const handleScroll = () => {
            updateMousePosition(lastClientX + window.scrollX, lastClientY + window.scrollY)
        }

        const handleHover = (hoverState: boolean, text: string = '', element?: any) => () => {
            setIsHovering(hoverState)

            let newText = text

            if (element && element.classList.contains('scroll-icon')) {
                newText = 'Scroll'
            } else if (element && element.classList.contains('view-icon')) {
                newText = 'View'
            }
            setHoverText(newText)
        }

        const addHoverListeners = (elements: NodeListOf<Element>, text: string) => {
            elements.forEach(element => {
                element.addEventListener('mouseover', handleHover(true, text, element))
                element.addEventListener('mouseout', handleHover(false))
            })
        }

        const links = document.querySelectorAll('a')
        addHoverListeners(links, '')

        const icons = document.querySelectorAll('svg')
        addHoverListeners(icons, '')

        const images = document.querySelectorAll('img')
        addHoverListeners(images, 'view')

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('scroll', handleScroll)

        return () => {
            [...links, ...icons, ...images].forEach(element => {
                element.removeEventListener('mouseover', handleHover(true))
                element.removeEventListener('mouseout', handleHover(false))
            })

            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            {isHovering && (
                <motion.div
                    className={`absolute flex items-center justify-center w-20 h-20 bg-text rounded-full mix-blend-difference pointer-events-none z-20`}
                    style={{
                        left: mousePosition.x - 40,
                        top: mousePosition.y - 40,
                    }}
                    initial={{ scale: 0.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <p className="text-center text-background text-2xl lowercase">{hoverText}</p>
                </motion.div>

            )}
            {!isHovering &&
                (
                    <motion.div
                        className="absolute mix-blend-difference pointer-events-none z-0"
                        style={{ left: mousePosition.x - 20, top: mousePosition.y - 20 }}
                        animate={{ scale: isClicking ? 1.5 : 1 }}
                        transition={{ duration: 0.1 }}
                    >
                        <DotOutline
                            weight="light"
                            size={40}
                        />
                    </motion.div>
                )
            }
            <svg className='absolute top-0 left-0 mix-blend-difference pointer-events-none z-0' width='100%' height='100%'>
                <polyline
                    points={lines.map(line => `${line.x},${line.y}`).join(' ')}
                    className="fill-none stroke-text stroke-1"
                />
            </svg>
        </>
    )
}

export default MouseTracker
