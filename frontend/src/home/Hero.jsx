import { Button } from '@/components/ui/button';
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowRight, FaGraduationCap, FaLaptopCode, FaBrain } from 'react-icons/fa';
import hero from '../assets/hero.png';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedInState } from '@/store/auth';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// Enhanced animation variants
const fadeIn = (direction = 'up', delay = 0) => ({
    initial: {
        opacity: 0,
        y: direction === 'up' ? 40 : -40,
        scale: direction === 'scale' ? 0.9 : 1,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1.0], // Improved cubic bezier curve
            delay,
        },
    },
});

// Text animation for staggered children
const textContainer = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.3,
        },
    },
};

const textChild = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
};

// 3D card effect
const cardVariants = {
    initial: { rotateY: 15, rotateX: -10, scale: 0.95, opacity: 0 },
    animate: {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100,
            duration: 0.8,
        },
    },
    hover: {
        scale: 1.05,
        rotateY: 5,
        rotateX: -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: {
            type: "spring",
            damping: 10,
            stiffness: 100,
        },
    },
};

// Floating animation for particles
const floatingAnimation = {
    initial: { y: 0 },
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
        },
    },
};

// Particle component for background effects
const Particle = ({ className, icon, delay }) => {
    return (
        <motion.div
            className={`absolute text-primary/20 ${className}`}
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            custom={delay}
            style={{ animationDelay: `${delay}s` }}
        >
            {icon}
        </motion.div>
    );
};

const Hero = () => {
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(loggedInState);
    const [typingComplete, setTypingComplete] = useState(false);
    const heroRef = useRef(null);
    
    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start end", "end start"]
    });
    
    // Transform values based on scroll
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
    
    // Spring physics for smoother animations
    const springY = useSpring(y, { stiffness: 100, damping: 30 });
    const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
    
    // 3D rotation effect for image
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate rotation based on mouse position
        rotateX.set(mouseY / 30);
        rotateY.set(-mouseX / 30);
    };
    
    const handleMouseLeave = () => {
        // Reset rotation when mouse leaves
        rotateX.set(0);
        rotateY.set(0);
    };
    
    // Simulate typing effect completion
    useEffect(() => {
        const timer = setTimeout(() => {
            setTypingComplete(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    function handleExplore() {
        navigate(isLoggedIn ? "/dashboard" : "/login");
    }

    function handleCourse() {
        navigate("/courses");
    }

    return (
        <motion.div 
            ref={heroRef}
            className="relative overflow-hidden my-20 mb-28 perspective-1000"
            style={{ opacity, scale: springScale, y: springY }}
        >
            {/* Floating Particles */}
            <Particle className="top-20 left-[10%] text-3xl" icon={<FaGraduationCap />} delay={0.5} />
            <Particle className="top-40 right-[15%] text-4xl" icon={<FaLaptopCode />} delay={1.2} />
            <Particle className="bottom-20 left-[20%] text-3xl" icon={<FaBrain />} delay={0.8} />
            <Particle className="bottom-40 right-[25%] text-2xl" icon={<FaGraduationCap />} delay={1.5} />
            
            {/* Background Gradients with enhanced effects */}
            <motion.div 
                className="absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(124,58,237,0.25)_0,rgba(124,58,237,0)_70%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            />
            <motion.div 
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
            >
                <motion.div 
                    className="absolute top-0 right-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-purple-400 opacity-40 blur-[120px]"
                    animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.4, 0.5, 0.4]
                    }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                    }}
                />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Text Section with enhanced animations */}
                <motion.div
                    variants={fadeIn('up', 0.1)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <motion.div 
                        className="flex my-5 gap-2 items-center border border-yellow-300 bg-yellow-50 rounded-full px-3 py-1 w-fit shadow-md hover:shadow-lg hover:-translate-y-1 transition group"
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                        <AnimatedShinyText className="flex gap-2 items-center">
                            <motion.div 
                                className="w-2.5 h-2.5 bg-yellow-400 rounded-full border border-yellow-600"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <p className="text-sm text-yellow-600">Introducing Arif Academy</p>
                            <FaArrowRight color="#ca8a04" className="group-hover:translate-x-1 transition duration-300" />
                        </AnimatedShinyText>
                    </motion.div>

                    <motion.div
                        variants={textContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="hidden lg:flex gap-5 py-5"
                    >
                        {["AI Industry Insights", "AI Mock Interview", "AI Resume Builder"].map((item, idx) => (
                            <motion.div 
                                key={idx} 
                                variants={textChild}
                                className="flex gap-2 items-center text-sm text-gray-700 hover:text-primary transition-colors duration-300"
                                whileHover={{ x: 5 }}
                            >
                                <FaArrowRight className="opacity-90 -mr-1" /> {item}
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        variants={fadeIn('up', 0.5)}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="pt-5"
                    >
                        <AnimatePresence>
                            <motion.h1 
                                className="pb-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl sm:leading-snug leading-normal"
                                variants={textContainer}
                                initial="initial"
                                animate="animate"
                            >
                                <motion.span variants={textChild}>Unlock Your Potential with{" "}</motion.span>
                                <motion.span 
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 font-extrabold"
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={{ 
                                        opacity: 1, 
                                        filter: "blur(0px)",
                                        transition: { delay: 1, duration: 0.8 }
                                    }}
                                    whileHover={{ 
                                        scale: 1.05,
                                        textShadow: "0 0 8px rgb(124,58,237,0.5)",
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    Arif Academy
                                </motion.span>
                            </motion.h1>
                        </AnimatePresence>
                        <motion.p 
                            className="text-base sm:text-lg lg:text-xl mt-4 font-semibold text-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: typingComplete ? 1 : 0, y: typingComplete ? 0 : 20 }}
                            transition={{ duration: 0.5, delay: 1.5 }}
                        >
                            Build your skills, create stunning portfolios, and prepare for your future.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={fadeIn('up', 0.7)}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="pt-10 flex flex-col gap-5 sm:flex-row"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button 
                                onClick={handleExplore} 
                                className="px-8 py-6 text-lg shadow-md transition duration-300 relative overflow-hidden group"
                            >
                                <motion.span 
                                    className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 group-hover:w-full"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                />
                                Get Started
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={handleCourse}
                                variant="ghost"
                                className="px-8 py-6 text-lg border shadow-sm hover:bg-gray-100 transition duration-300 relative overflow-hidden"
                            >
                                Explore Courses
                                <motion.span 
                                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                />
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Right Image Section with 3D effect */}
                <motion.div
                    className="hidden md:block -ml-16 header-img-section perspective-1000"
                    variants={cardVariants}
                    initial="initial"
                    whileInView="animate"
                    whileHover="hover"
                    viewport={{ once: true }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ 
                        rotateX: rotateX,
                        rotateY: rotateY,
                        transformStyle: "preserve-3d"
                    }}
                >
                    <motion.div
                        className="relative w-full h-full rounded-xl overflow-hidden"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <motion.img
                            src={hero}
                            alt="Career Insight"
                            className="w-full h-auto rounded-xl drop-shadow-xl"
                            style={{ transform: "translateZ(20px)" }}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: 'spring', stiffness: 120 }}
                        />
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-xl"
                            style={{ transform: "translateZ(10px)" }}
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Hero;
