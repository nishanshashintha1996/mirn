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
  const [searchText, setSearchText] = useState([]);

  useEffect(() => {
      //console.log(data);
  }, []);

  const searchHandle = (e) => {
    fetch(`https://mirn-backend.onrender.com/api/view/${searchText}`)
      .then(response => response.json())
      .then(json => setResults(json))
      .catch(error => console.error(error));
      console.log(results);
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
              <div className="mt-2">
                <HStack spacing='24px'>
                  <input
                    id="search"
                    name="text"
                    value={searchText}
                    onChange = {e => setSearchText(e.target.value)}
                    type="text"
                    placeholder='Search by MIRN'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <Button onClick={searchHandle} colorScheme='blue'>Search</Button>
                </HStack>
              </div>
            </div>
            <div className="sm:col-span-4">
              <div id='results' className="mt-2">
                <p>MIRN : <span>{results.mirn}</span></p>
                <p>MIRNCHECKSUM : <span>{results.mirnchecksum}</span></p>
                <p>FLATORUNITTYPE : <span>{results.flatorunittype}</span></p>
                <p>FLATORUNITNUMBER : <span>{results.flatorunitnumber}</span></p>
                <p>FLOORORLEVELTYPE : <span>{results.floororleveltype}</span></p>
                <p>FLOORORLEVELNUMBER : <span>{results.floororlevelnumber}</span></p>
                <p>BUILDINGORPROPERTYNAME1 : <span>{results.buildingorpropertyname1}</span></p>
                <p>BUILDINGORPROPERTYNAME2 : <span>{results.buildingorpropertyname2}</span></p>
                <p>LOCATIONDESCRIPTOR : <span>{results.locationdescriptor}</span></p>
                <p>HOUSENUMBER : <span>{results.housenumber}</span></p>
                <p>HOUSENUMBERSUFFIX : <span>{results.housenumbersuffix}</span></p>
                <p>LOTNUMBER : <span>{results.lotnumber}</span></p>
                <p>STREETNAME : {results.streetname}</p>
                <p>STREETTYPE : {results.streettype}</p>
                <p>STREETSUFFIX : {results.streetsuffix}</p>
                <p>SITEADDRESSCITY : {results.siteaddresscity}</p>
                <p>SITEADDRESSSTATE : {results.siteaddressstate}</p>
                <p>SITEADDRESSPOSTCODE : {results.siteaddresspostcode}</p>
                <p>SITEADDRESSDPID : {results.siteaddressdpid}</p>
                <p>GASMETERNUMBER : {results.gasmeternumber}</p>
                <p>SOURCEFILEID : {results.sourcefileid}</p>
                <p>CLAIMED : {results.claimed}</p>
                <p>NSRD : {results.nsrd}</p>
                <p>METERTYPE : {results.metertype}</p>
                <p>MIRNSTATUS : {results.mirnstatus}</p>
                <p>NETWORKID : {results.networkid}</p>
                <p>SN : {results.sn}</p>
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
