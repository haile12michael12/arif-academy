import { Button } from '@/components/ui/button';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import hero from '../assets/hero.png';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedInState } from '@/store/auth';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { motion } from 'framer-motion';

const fadeIn = (direction = 'up', delay = 0) => ({
    initial: {
        opacity: 0,
        y: direction === 'up' ? 40 : -40,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: 'easeOut',
            delay,
        },
    },
});

const Hero = () => {
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(loggedInState);

    function handleExplore() {
        navigate(isLoggedIn ? "/dashboard" : "/login");
    }

    function handleCourse() {
        navigate("/courses");
    }

    return (
        <div className="relative overflow-hidden my-20 mb-28">
            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(124,58,237,0.25)_0,rgba(124,58,237,0)_70%)]"></div>
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-purple-400 opacity-40 blur-[120px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Text Section */}
                <motion.div
                    variants={fadeIn('up', 0.1)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <div className="flex my-5 gap-2 items-center border border-yellow-300 bg-yellow-50 rounded-full px-3 py-1 w-fit shadow-md hover:shadow-lg hover:-translate-y-1 transition group">
                        <AnimatedShinyText className="flex gap-2 items-center">
                            <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full border border-yellow-600 animate-pulse"></div>
                            <p className="text-sm text-yellow-600">Introducing Arif Academy</p>
                            <FaArrowRight color="#ca8a04" className="group-hover:translate-x-1 transition duration-300" />
                        </AnimatedShinyText>
                    </div>

                    <motion.div
                        variants={fadeIn('up', 0.3)}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="hidden lg:flex gap-5 py-5"
                    >
                        {["AI Industry Insights", "AI Mock Interview", "AI Resume Builder"].map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-center text-sm text-gray-700">
                                <FaArrowRight className="opacity-90 -mr-1" /> {item}
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        variants={fadeIn('up', 0.5)}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="pt-5"
                    >
                        <h1 className="pb-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl sm:leading-snug leading-normal">
                            Unlock Your Potential with{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 font-extrabold animate-pulse">
                                Arif Academy
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl mt-4 font-semibold text-gray-700">
                            Build your skills, create stunning portfolios, and prepare for your future.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeIn('up', 0.7)}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="pt-10 flex flex-col gap-5 sm:flex-row"
                    >
                        <Button onClick={handleExplore} className="px-8 py-6 text-lg shadow-md hover:scale-105 transition duration-300">
                            Get Started
                        </Button>
                        <Button
                            onClick={handleCourse}
                            variant="ghost"
                            className="px-8 py-6 text-lg border shadow-sm hover:bg-gray-100 hover:scale-105 transition duration-300"
                        >
                            Explore Courses
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Right Image Section */}
                <motion.div
                    className="hidden md:block -ml-16 header-img-section"
                    variants={fadeIn('up', 0.6)}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <motion.img
                        src={hero}
                        alt="Career Insight"
                        className="w-full h-auto rounded-xl drop-shadow-xl"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 120 }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
