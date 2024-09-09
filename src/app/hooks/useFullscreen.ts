import { useEffect, useState } from "react"

export default function useFullscreen () {

    const [isFullscrenActive, setIsFullscreenActive] = useState(false)

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreenActive(document.fullscreenElement !== null)
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
        }
    }, [])

    const handleFullscreen = () => {
        if (!isFullscrenActive) {
            document.documentElement.requestFullscreen()
        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen()
            }
        }
    } 

    return {
        isFullscrenActive,
        handleFullscreen
    }

}