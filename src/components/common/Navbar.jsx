"use client";

import { userContext } from "@/context/UserContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useMutation } from "react-query";

const Navbar = () => {
    // show menu in mobile view
    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    // get user data from user context
    const { user } = useContext(userContext);

    // check if user email exists; If user.email ? user is authenticated : user is not authenticated
    useEffect(() => {
        if (user.email.length > 1) setIsAuthenticated(true);
        else setIsAuthenticated(false);
    }, [user]);

    // send server request for logout
    const logoutMutation = useMutation({
        mutationFn: async () => {
            return await axios.get("/api/auth/logout");
        },
        onSuccess: () => {
            setShowProfileMenu((prev) => !prev);
            toast("Session ended");
            router.push("/");
        },
    });

    // handle logout button click
    const handleLogoutClick = (e) => {
        e.preventDefault();
        logoutMutation.mutate();
    };

    return (
        <header className="flex sticky bg-[#1f1f1f] top-0 left-0 right-0 border-b flex-none w-full items-center  shadow-sm z-1 ">
            <div className="container xl:max-w-7xl mx-auto px-4 lg:px-8">
                <div className="flex justify-between py-4">
                    {/* <!-- Left Section --> */}
                    <div className="flex items-center">
                        {/* <!-- Logo --> */}
                        <Link
                            href="/"
                            className="group inline-flex items-center space-x-2 font-bold text-lg tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
                        >
                            <svg
                                className="hi-mini hi-cube-transparent inline-block w-5 h-5 text-blue-600 transition group-hover:scale-110 dark:text-blue-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>Pocket Library</span>
                        </Link>
                        {/* <!-- END Logo --> */}
                    </div>
                    {/* <!-- END Left Section --> */}

                    {/* <!-- Right Section --> */}
                    <div className="flex items-center space-x-2 lg:space-x-5">
                        {/* <!-- Desktop Navigation --> */}
                        <nav className="hidden lg:flex items-center space-x-2">
                            <Link
                                href="/"
                                className="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-blue-600 border border-blue-100 bg-blue-50 dark:text-white dark:bg-gray-700 dark:border-transparent"
                            >
                                <svg
                                    className="hi-mini hi-home inline-block w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Home</span>
                            </Link>
                            <Link
                                href="/add-question"
                                className="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-blue-600 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600"
                            >
                                <svg
                                    className="hi-mini hi-briefcase inline-block w-5 h-5 opacity-25 group-hover:opacity-100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z"
                                        clipRule="evenodd"
                                    />
                                    <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" />
                                </svg>
                                <span>Add Question</span>
                            </Link>
                            <Link
                                href="/user"
                                className="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-blue-600 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600"
                            >
                                <svg
                                    className="hi-mini hi-chart-bar inline-block w-5 h-5 opacity-25 group-hover:opacity-100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1zM9.5 6A1.5 1.5 0 008 7.5v9A1.5 1.5 0 009.5 18h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6h-1zM3.5 10A1.5 1.5 0 002 11.5v5A1.5 1.5 0 003.5 18h1A1.5 1.5 0 006 16.5v-5A1.5 1.5 0 004.5 10h-1z" />
                                </svg>
                                <span>Leaderboard</span>
                            </Link>
                        </nav>
                        {/* <!-- END Desktop Navigation --> */}

                        {/* <!-- User Dropdown --> */}
                        <div className="relative inline-block">
                            {/* <!-- Dropdown Toggle Button --> */}
                            {isAuthenticated ? (
                                <button
                                    onClick={() =>
                                        setShowProfileMenu(!showProfileMenu)
                                    }
                                    type="button"
                                    id="tk-dropdown-layouts-user"
                                    className="inline-flex justify-center items-center space-x-1 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                                    aria-haspopup="true"
                                    aria-expanded="true"
                                >
                                    <span>{user.name}</span>
                                    {showProfileMenu ? (
                                        <FiChevronUp className="text-xl" />
                                    ) : (
                                        <FiChevronDown className="text-xl" />
                                    )}
                                </button>
                            ) : (
                                <Link
                                    href="/auth/login"
                                    // type="button"
                                    id="tk-dropdown-layouts-user"
                                    className="inline-flex justify-center items-center border font-semibold rounded-lg px-3 py-2 leading-5 border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                                    aria-haspopup="true"
                                    aria-expanded="true"
                                >
                                    <span>Login</span>
                                </Link>
                            )}
                            {/* <!-- END Dropdown Toggle Button --> */}

                            {/* <!-- Dropdown --> */}
                            {/* <!-- 
                                Visibility
                                    Closed        'hidden'
                                    Opened        '' (no class)

                                Show/Hide with transitions
                                    enter         'transition ease-out duration-100'
                                    enter-start   'opacity-0 scale-90'
                                    enter-end     'opacity-100 scale-100'
                                    leave         'transition ease-in duration-75'
                                    leave-start   'opacity-100 scale-100'
                                    leave-end     'opacity-0 scale-90'
                                --> */}
                            {showProfileMenu && (
                                <div
                                    role="menu"
                                    aria-labelledby="tk-dropdown-layouts-user"
                                    className="absolute right-0 origin-top-right z-10 mt-2 w-48 shadow-xl rounded-lg dark:shadow-gray-900"
                                >
                                    <div className="bg-white ring-1 ring-black ring-opacity-5 rounded-lg divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700 dark:ring-gray-700">
                                        <div className="p-2.5 space-y-1">
                                            <Link
                                                onClick={() =>
                                                    setShowProfileMenu(
                                                        !showProfileMenu
                                                    )
                                                }
                                                role="menuitem"
                                                href="/user"
                                                className="group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg text-gray-700 border border-transparent hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600"
                                            >
                                                <svg
                                                    className="flex-none hi-mini hi-user-circle inline-block w-5 h-5 opacity-25 group-hover:opacity-50"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="grow">
                                                    Account
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="p-2.5 space-y-1">
                                            <form>
                                                <button
                                                    onClick={handleLogoutClick}
                                                    type="submit"
                                                    role="menuitem"
                                                    className="w-full text-left group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg text-gray-700 border border-transparent hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600"
                                                >
                                                    <svg
                                                        className="flex-none hi-mini hi-lock-closed inline-block w-5 h-5 opacity-25 group-hover:opacity-50"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <span className="grow">
                                                        Sign out
                                                    </span>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* <!-- END Dropdown --> */}
                        </div>
                        {/* <!-- END User Dropdown --> */}

                        {/* <!-- Toggle Mobile Navigation --> */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                type="button"
                                className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                            >
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="hi-solid hi-menu inline-block w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        {/* <!-- END Toggle Mobile Navigation --> */}
                    </div>
                    {/* <!-- END Right Section --> */}
                </div>

                {/* <!-- Mobile Navigation --> */}
                {/* <!-- 
        Visibility
          Closed        'hidden'
          Opened        '' (no class)
      --> */}
                {showMenu && (
                    <div className="lg:hidden">
                        <nav
                            className="flex flex-col space-y-2 py-4 border-t dark:border-gray-700"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <Link
                                href="/"
                                className="group text-sm font-semibold flex items-center space-x-2 px-3 py-2 rounded-lg text-blue-600 border border-blue-50 bg-blue-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent"
                            >
                                <svg
                                    className="hi-mini hi-home inline-block w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Home</span>
                            </Link>
                            <Link
                                href="/add-question"
                                className="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-blue-600 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600"
                            >
                                <svg
                                    className="hi-mini hi-briefcase inline-block w-5 h-5 opacity-25 group-hover:opacity-100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z"
                                        clipRule="evenodd"
                                    />
                                    <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" />
                                </svg>
                                <span>Add Question</span>
                            </Link>
                            <Link
                                href="/user"
                                className="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-blue-600 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600"
                            >
                                <svg
                                    className="hi-mini hi-chart-bar inline-block w-5 h-5 opacity-25 group-hover:opacity-100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1zM9.5 6A1.5 1.5 0 008 7.5v9A1.5 1.5 0 009.5 18h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6h-1zM3.5 10A1.5 1.5 0 002 11.5v5A1.5 1.5 0 003.5 18h1A1.5 1.5 0 006 16.5v-5A1.5 1.5 0 004.5 10h-1z" />
                                </svg>
                                <span>Leaderboard</span>
                            </Link>
                        </nav>
                    </div>
                )}
                {/* <!-- END Mobile Navigation --> */}
            </div>
        </header>
    );
};

export default Navbar;
