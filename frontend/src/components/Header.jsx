import {Link} from "react-router";

const Header = () => {
    return (
        <div className="bg-slate-100 shadow-md border-b border-slate-200">
            <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                <Link to="/">
                    <p className="text-3xl font-bold text-blue-600 transition duration-200">
                        EZSurveys
                    </p>
                </Link>

                <Link to="/create">
                    <button className="px-5 py-2 bg-blue-500 text-white font-medium rounded-xl shadow hover:bg-blue-600 transition duration-200">
                        Create +
                    </button>
                </Link>
            </div>
        </div>
    );

}

export default Header;