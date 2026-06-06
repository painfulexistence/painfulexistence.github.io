import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function AnimatedSection({ children, className = '', animationType = 'fadeIn', ref }) {
    const internalRef = useRef(null)
    const sectionRef = ref || internalRef

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        let animation
        switch (animationType) {
            case 'fadeIn':
                animation = gsap.fromTo(section,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power2.out'
                    }
                )
                break
            case 'slideInLeft':
                animation = gsap.fromTo(section,
                    { opacity: 0, x: -100 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: 'power2.out'
                    }
                )
                break
            case 'slideInRight':
                animation = gsap.fromTo(section,
                    { opacity: 0, x: 100 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: 'power2.out'
                    }
                )
                break
            case 'scaleIn':
                animation = gsap.fromTo(section,
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: 'back.out(1.7)'
                    }
                )
                break
            default:
                animation = gsap.fromTo(section,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.8 }
                )
        }

        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            animation: animation,
            toggleActions: 'play none none reverse'
        })

        return () => {
            animation.kill()
        }
    }, [animationType])

    return (
        <div ref={sectionRef} className={className}>
            {children}
        </div>
    )
}

export function usePageTransition() {
    const pageRef = useRef(null)

    const animatePageIn = () => {
        if (!pageRef.current) return

        gsap.fromTo(pageRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
            }
        )
    }

    const animatePageOut = () => {
        if (!pageRef.current) return

        return gsap.to(pageRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power2.in'
        })
    }

    return { pageRef, animatePageIn, animatePageOut }
}