import React from 'react'

const Footer = () => {
    return (
        < footer className="py-10 bg-gradient-to-t from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-t border-slate-200/60 dark:border-slate-700/50" >
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left side */}
                <div className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left">
                    © {new Date().getFullYear()} Buyeni • Made with <span className="text-red-500">❤️</span> by Buyeni
                </div>

                {/* Right side */}
                <nav className="flex items-center gap-6">
                    <a
                        href="/"
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        Work
                    </a>
                    <a
                        href="#pricing"
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        Pricing
                    </a>
                    <a
                        href="#contact"
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        Contact
                    </a>
                </nav>
            </div>
        </ footer>
    )
}


export default Footer