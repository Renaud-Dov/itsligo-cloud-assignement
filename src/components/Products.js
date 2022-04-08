import {Link} from "react-router-dom";
import {PlusIcon, StarIcon} from '@heroicons/react/solid'
import {Rating} from "./Rating";
import {useEffect, useState} from "react";
import {ReadAll} from "../database";
import axios from "axios";

function LoadingCard() {
    const stars = []
    for (let i = 0; i < 3; i++) stars.push(<StarIcon key={i} className="w-5 h-5 text-slate-400"/>)
    for (let i = 3; i < 5; i++) stars.push(<StarIcon key={i} className="w-5 h-5 text-slate-200"/>)
    return (<div className="bg-slate-50  rounded-lg shadow-md">
            <div className="animate-pulse">
                <div className="p-8 rounded-t-lg bg-slate-400 h-52 w-full"/>
                <div className="px-5 py-5 space-y-3 p-3">
                    {/*title*/}
                    <div className="h-3 w-20 bg-slate-400 rounded"/>
                    {/*rating*/}
                    <div className="flex items-center">
                        {stars}
                    </div>
                    <div className="flex justify-between items-center">
                        {/*price*/}
                        <div className="h-3 w-20 bg-slate-400 rounded"/>
                        {/*add to cart*/}
                        <div className="rounded-lg bg-slate-400 h-10 w-40 px-5 py-2.5"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function addToBasket(id_product) {
}

function Card(element) {
    return <div className="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/product/${element.id}`}>
            <img className="p-8 rounded-t-lg" src={'https://flowbite.com/docs/images/products/product-1.png'}
                 alt={"DickJohnson"}/>
        </Link>
        <div className="px-5 pb-5">
            <Link to={`/product/${element.id}`}>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{element.instrument_name}</h5>
            </Link>
            <Rating className="flex items-center mt-2.5 mb-5" value={4}/>

            <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${10000}</span>
                <button onClick={() => {
                    addToBasket(element.id)
                }}
                        className="text-white flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                              focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add to basket
                    <PlusIcon className="ml-2 block h-5 w-5"/>
                </button>


            </div>
        </div>
    </div>
}

export default function Products() {
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get('https://api.cloud.itsligo.bugbear.fr/api/v1/items')
            .then(res => {
                setLoading(false);
                setElements(res.data)

            })
            .catch(err => {
                setLoading(false);
                setError(true);
                console.log(err)
            })
    }, []);
    return <>
        <div className="">
            {loading ?
                <div className="fixed mt-4 grid grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-4 justify-center">
                    {[...Array(30)].map((_, i) => <LoadingCard key={i}/>)}
                </div> : error ?
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="text-red-700">
                            Error
                        </div>
                    </div> :
                    <div className="flex mt-4 flex-wrap gap-4 justify-center">
                        {elements.map(element => <Card key={element.id} {...element}/>)}
                    </div>}
        </div>

    </>
}