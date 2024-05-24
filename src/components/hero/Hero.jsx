import { useState, useEffect } from 'react'
import './Hero.css';

import {
  HStack,
  VStack,
  Button
} from "@chakra-ui/react";

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Hero() {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [foundResults, setFoundResults] = useState(['']);
  const [searchText, setSearchText] = useState([]);

  const [streetAddress, setStreetAddress] = useState([]);
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [postal, setPostal] = useState([]);
  const [houseNumber, setHouseNumber] = useState([]);

  useEffect(() => {
    
  }, []);

  const searchHandle = (e) => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        street:streetAddress,
        city:city,
        state:state,
        postal:postal
      })
    };

    fetch(`https://mirn-backend.onrender.com/api/searchaddress`, requestOptions)
      .then(response => response.json())
      .then(json => setResults(json))
      .catch(error => console.error(error));
      //console.log(results);

      
      for (var i = 0; i < results.length; i++){
        // console.log(results[i].housenumber);
        if (results[i].housenumber == houseNumber){
          setFoundResults(results[i].mirn);
          break;
        }else{
          setFoundResults('not found!');
        }
      }
  }; 

  

  return (
    <div className="bg-white">

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-20 sm:py-15 lg:py-20">
          <div className="text-center">

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Data to enrich your online business
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              
            </div>
            <div className="sm:col-span-4">

              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Street
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    value={streetAddress}
                    onChange = {e => setStreetAddress(e.target.value)}
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="house-number" className="block text-sm font-medium leading-6 text-gray-900">
                  House Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="house-number"
                    id="house-number"
                    value={houseNumber}
                    onChange = {e => setHouseNumber(e.target.value)}
                    autoComplete="house-number"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange = {e => setCity(e.target.value)}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    value={state}
                    onChange = {e => setState(e.target.value)}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    value={postal}
                    onChange = {e => setPostal(e.target.value)}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="mt-2">
                <HStack spacing='24px'>
                  <Button onClick={searchHandle} colorScheme='blue'>Search</Button>
                </HStack>
              </div>

            </div>
            <div className="sm:col-span-4">
              <div id='results' className="mt-2">
                <p>MIRN : <span>
                {
                  foundResults
                }
                </span></p>
              </div>
              <div id='searchingmsg' className="mt-2">
                <p>Searching...........</p>
              </div>
              <div id='notfoundmsg' className="mt-2">
                <p>MIRN Data not found!</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
