import {Link} from "react-router-dom";

export default function NoMatch() {
    return <div
        className="
                    flex
                    items-center
                    justify-center
                    w-screen
                    h-screen
                    bg-gradient-to-r
                    from-orange-600
                    to-orange-400
                  ">
        <div className="px-40 py-20 bg-white rounded-md shadow-xl">
            <div className="flex flex-col items-center">
                <h1 className="font-bold text-indigo-600 text-9xl">404</h1>

                <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                    <span className="text-red-500">Oops!</span> Page not found
                </h6>

                <p className="mb-8 text-center text-gray-500 md:text-lg">
                    The page you’re looking for doesn’t exist.
                </p>

                <Link to="/"
                      className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Go home</Link>

            </div>
        </div>
    </div>
}