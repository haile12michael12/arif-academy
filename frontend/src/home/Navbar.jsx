import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircleOutline, IoIosPricetags } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ui/themeprovider';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { FaSearch, FaUserCircle, FaBell, FaQuestionCircle, FaGraduationCap, FaHome, FaTrophy } from 'react-icons/fa';
import { BiWater } from "react-icons/bi";
import logo from "../assets/logo.png"
import { loggedInState, tokenState } from '@/store/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { theme, toggleTheme } = useTheme();
    const isLoggedIn = useRecoilValue(loggedInState);
    const setTokenState = useSetRecoilState(tokenState);
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'New course available: Advanced React', read: false },
        { id: 2, text: 'Your resume has been viewed 5 times', read: false },
        { id: 3, text: 'New job matches your profile', read: true }
    ]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setTokenState("");
        toast.success("Logged out successfully");
        navigate("/login")
    };
    
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Implement search functionality
            toast.info(`Searching for: ${searchQuery}`);
            setShowSearch(false);
        }
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'q') {
                toggleTheme();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [toggleTheme]);

    return (
        <TooltipProvider>
            <div className='sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b border-primary shadow-sm'>
                <div className='max-w-7xl mx-auto flex items-center justify-between text-sm py-3 px-4'>
                    {/* Logo */}
                    <div className='flex items-center'>
                        <img src={logo} className='w-auto h-10 cursor-pointer mr-2' alt='Arif Academy' onClick={() => navigate("/")} />
                        <span className='hidden sm:block font-bold text-lg text-primary'>Arif Academy</span>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center justify-center'>
                        <ul className='flex items-center gap-1 font-medium list-none'>
                            <NavLink to="/" className={({isActive}) => isActive ? 'text-primary' : ''}>
                                <li className='py-2 px-3 rounded-md hover:bg-primary/10 transition duration-200'>Home</li>
                            </NavLink>
                            <NavLink to="/courses" className={({isActive}) => isActive ? 'text-primary' : ''}>
                                <li className='py-2 px-3 rounded-md hover:bg-primary/10 transition duration-200'>Courses</li>
                            </NavLink>
                            <NavLink to="/riverflow" className={({isActive}) => isActive ? 'text-primary' : ''}>
                                <li className='py-2 px-3 rounded-md hover:bg-primary/10 transition duration-200'>Riverflow</li>
                            </NavLink>
                            <NavLink to="/pricing" className={({isActive}) => isActive ? 'text-primary' : ''}>
                                <li className='py-2 px-3 rounded-md hover:bg-primary/10 transition duration-200'>Pricing</li>
                            </NavLink>
                            <NavLink to="/leaderboard" className={({isActive}) => isActive ? 'text-primary' : ''}>
                                <li className='py-2 px-3 rounded-md hover:bg-primary/10 transition duration-200'>Leaderboard</li>
                            </NavLink>
                        </ul>
                    </div>
                    
                    {/* Right side actions */}
                    <div className='flex items-center gap-2'>
                        {/* Search */}
                        <Popover open={showSearch} onOpenChange={setShowSearch}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <PopoverTrigger asChild>
                                        <Button size="sm" variant="ghost" className="rounded-full w-9 h-9 p-0">
                                            <FaSearch className="h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Search</p>
                                </TooltipContent>
                            </Tooltip>
                            <PopoverContent className="w-80 p-0" align="end">
                                <form onSubmit={handleSearch} className="flex">
                                    <Input 
                                        placeholder="Search courses, resources..."
                                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Button type="submit" size="sm" className="rounded-l-none">
                                        <FaSearch className="h-4 w-4" />
                                    </Button>
                                </form>
                            </PopoverContent>
                        </Popover>
                        
                        {/* Theme Toggle */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="sm" variant="ghost" className="rounded-full w-9 h-9 p-0" onClick={toggleTheme}>
                                    {theme === "dark" ? 
                                        <BsFillMoonStarsFill className="h-4 w-4" /> : 
                                        <BsFillSunFill className="h-4 w-4" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Toggle theme</p>
                            </TooltipContent>
                        </Tooltip>
                        
                        {/* Help */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="sm" variant="ghost" className="rounded-full w-9 h-9 p-0" onClick={() => navigate('/help')}>
                                    <FaQuestionCircle className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Help & Resources</p>
                            </TooltipContent>
                        </Tooltip>
                        
                        {isLoggedIn && (
                            <>
                                {/* Notifications */}
                                <Popover>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <PopoverTrigger asChild>
                                                <Button size="sm" variant="ghost" className="rounded-full w-9 h-9 p-0 relative">
                                                    <FaBell className="h-4 w-4" />
                                                    {unreadCount > 0 && (
                                                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                                                            {unreadCount}
                                                        </Badge>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                            <p>Notifications</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <PopoverContent className="w-80 p-0" align="end">
                                        <div className="p-2 border-b">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-semibold">Notifications</h4>
                                                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
                                                    Mark all as read
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="max-h-80 overflow-auto">
                                            {notifications.length > 0 ? (
                                                notifications.map(notification => (
                                                    <div key={notification.id} className={`p-3 border-b hover:bg-muted/50 ${!notification.read ? 'bg-muted/20' : ''}`}>
                                                        <p className="text-sm">{notification.text}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-4 text-center text-muted-foreground">
                                                    No notifications
                                                </div>
                                            )}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                
                                {/* User Profile */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button size="sm" variant="ghost" className="rounded-full w-9 h-9 p-0 md:hidden">
                                            <FaUserCircle className="h-5 w-5" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-56 p-0" align="end">
                                        <div className="p-3 border-b">
                                            <div className="flex items-center gap-2">
                                                <FaUserCircle className="h-8 w-8" />
                                                <div>
                                                    <p className="font-medium text-sm">User Name</p>
                                                    <p className="text-xs text-muted-foreground">user@example.com</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-1">
                                            <Link to="/dashboard" className="block w-full text-left p-2 text-sm hover:bg-muted rounded-md">
                                                Dashboard
                                            </Link>
                                            <Link to="/profile" className="block w-full text-left p-2 text-sm hover:bg-muted rounded-md">
                                                Profile
                                            </Link>
                                            <Link to="/settings" className="block w-full text-left p-2 text-sm hover:bg-muted rounded-md">
                                                Settings
                                            </Link>
                                            <button onClick={handleLogout} className="w-full text-left p-2 text-sm text-red-500 hover:bg-muted rounded-md">
                                                Logout
                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </>
                        )}
                        
                        {/* Dashboard/Login Button (Desktop) */}
                        {isLoggedIn ? (
                            <Link to="/dashboard" className="hidden md:block">
                                <Button size="sm" className='bg-primary hover:bg-primary/90 text-white px-4 rounded-md'>
                                    <FaGraduationCap className="mr-2 h-4 w-4" /> Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link to="/login" className="hidden md:block">
                                <Button size="sm" className='bg-primary hover:bg-primary/90 text-white px-4 rounded-md'>
                                    Login / Signup
                                </Button>
                            </Link>
                        )}
                        
                        {/* Mobile Menu Button */}
                        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setShowMenu(true)}>
                            <GiHamburgerMenu size={20} />
                        </Button>
                    </div>
                </div>
            </div>

                {/* Mobile Menu Overlay */}
                <div className={`${showMenu ? 'fixed w-full' : 'hidden'} md:hidden right-0 top-0 bottom-0 z-50 transition-all duration-300 ease-in-out`}>
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMenu(false)}></div>
                    
                    {/* Menu Panel */}
                    <div className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-background shadow-xl p-4 overflow-y-auto">
                        <div className='flex items-center justify-between mb-6'>
                            <Link to='/' onClick={() => setShowMenu(false)}>
                                <div className="flex items-center">
                                    <img src={logo} className='w-auto h-9 mr-2' alt='Arif Academy' />
                                    <span className='font-bold text-primary'>Arif Academy</span>
                                </div>
                            </Link>
                            <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0" onClick={() => setShowMenu(false)}>
                                <IoIosCloseCircleOutline size={24} />
                            </Button>
                        </div>
                        
                        {/* User Profile Section (if logged in) */}
                        {isLoggedIn && (
                            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <FaUserCircle className="h-10 w-10 text-primary" />
                                    <div>
                                        <p className="font-medium">User Name</p>
                                        <p className="text-xs text-muted-foreground">user@example.com</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Link to="/profile" onClick={() => setShowMenu(false)}>
                                        <Button variant="outline" size="sm" className="w-full">Profile</Button>
                                    </Link>
                                    <Link to="/settings" onClick={() => setShowMenu(false)}>
                                        <Button variant="outline" size="sm" className="w-full">Settings</Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                        
                        {/* Navigation Links */}
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground px-2 py-1">MAIN NAVIGATION</p>
                            <NavLink to="/" onClick={() => setShowMenu(false)} className={({isActive}) => 
                                `flex items-center gap-2 px-3 py-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`
                            }>
                                <FaHome className="h-4 w-4" />
                                <span>Home</span>
                            </NavLink>
                            <NavLink to="/courses" onClick={() => setShowMenu(false)} className={({isActive}) => 
                                `flex items-center gap-2 px-3 py-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`
                            }>
                                <FaGraduationCap className="h-4 w-4" />
                                <span>Courses</span>
                            </NavLink>
                            <NavLink to="/riverflow" onClick={() => setShowMenu(false)} className={({isActive}) => 
                                `flex items-center gap-2 px-3 py-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`
                            }>
                                <BiWater className="h-4 w-4" />
                                <span>Riverflow</span>
                            </NavLink>
                            <NavLink to="/pricing" onClick={() => setShowMenu(false)} className={({isActive}) => 
                                `flex items-center gap-2 px-3 py-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`
                            }>
                                <IoIosPricetags className="h-4 w-4" />
                                <span>Pricing</span>
                            </NavLink>
                            <NavLink to="/leaderboard" onClick={() => setShowMenu(false)} className={({isActive}) => 
                                `flex items-center gap-2 px-3 py-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`
                            }>
                                <FaTrophy className="h-4 w-4" />
                                <span>Leaderboard</span>
                            </NavLink>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="mt-6 space-y-3">
                            {isLoggedIn ? (
                                <>
                                    <Link to="/dashboard" onClick={() => setShowMenu(false)} className="block w-full">
                                        <Button className='w-full bg-primary hover:bg-primary/90'>
                                            <FaGraduationCap className="mr-2 h-4 w-4" /> Dashboard
                                        </Button>
                                    </Link>
                                    <Button variant="outline" className='w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600' onClick={() => { handleLogout(); setShowMenu(false); }}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <Link to="/login" onClick={() => setShowMenu(false)} className="block w-full">
                                    <Button className='w-full bg-primary hover:bg-primary/90'>
                                        Login / Signup
                                    </Button>
                                </Link>
                            )}
                        </div>
                        
                        {/* Theme Toggle */}
                        <div className="mt-6 p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Dark Mode</span>
                                <Button variant="ghost" size="sm" className="rounded-full" onClick={toggleTheme}>
                                    {theme === "dark" ? <BsFillMoonStarsFill className="h-5 w-5 text-primary" /> : <BsFillSunFill className="h-5 w-5 text-primary" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            
        </TooltipProvider>
    )
}

export default Navbar