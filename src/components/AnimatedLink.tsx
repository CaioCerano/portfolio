import { useState } from "react"

const AnimatedLink = ({ text, href = '', }: { text: string, href?: string }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <a
            href={href}
            className="relative inline-block text-lg lowercase text-text/50 hover:text-text transition-all cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {text}
            <span
                className={`absolute bottom-0 h-[1px] bg-text transition-all duration-500 ease-in-out ${isHovered ? 'w-full left-0' : 'w-0 left-auto right-0'}`}
            />
        </a>
    )
}

export default AnimatedLink
