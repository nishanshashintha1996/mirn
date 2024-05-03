import { useState, useEffect } from 'react'
import './Hero.css';
import Papa from 'papaparse';
import Data from './../../db/mirn-exact.csv';

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
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, {
        header:true,
        skipEmptyLines:true
      }).data;
      setData(parsedData);
    };
    fetchData();
  }, []);

  const searchHandle = (e) => {
    document.getElementById('searchingmsg').style = 'display:block !important';
    document.getElementById('results').style = 'display:none !important';
    if(searchText != ''){
      data.map((row, index) => {
        setTimeout(500);
        console.log(row.MIRN);
        if(row.MIRN == searchText){
          document.getElementById('searchingmsg').style = 'display:none !important';
          document.getElementById('results').style = 'display:block !important';
          setResults(row);
        }
      })
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
                <p>MIRN : {results.MIRN}</p>
                <p>MIRNCHECKSUM : {results.MIRNCHECKSUM}</p>
                <p>FLATORUNITTYPE : {results.FLATORUNITTYPE}</p>
                <p>FLATORUNITNUMBER : {results.FLATORUNITNUMBER}</p>
                <p>FLOORORLEVELTYPE : {results.FLOORORLEVELTYPE}</p>
                <p>FLOORORLEVELNUMBER : {results.FLOORORLEVELNUMBER}</p>
                <p>BUILDINGORPROPERTYNAME1 : {results.BUILDINGORPROPERTYNAME1}</p>
                <p>BUILDINGORPROPERTYNAME2 : {results.BUILDINGORPROPERTYNAME2}</p>
                <p>LOCATIONDESCRIPTOR : {results.LOCATIONDESCRIPTOR}</p>
                <p>HOUSENUMBER : {results.HOUSENUMBER}</p>
                <p>HOUSENUMBERSUFFIX : {results.HOUSENUMBERSUFFIX}</p>
                <p>LOTNUMBER : {results.LOTNUMBER}</p>
                <p>STREETNAME : {results.STREETNAME}</p>
                <p>STREETTYPE : {results.STREETTYPE}</p>
                <p>STREETSUFFIX : {results.STREETSUFFIX}</p>
                <p>SITEADDRESSCITY : {results.SITEADDRESSCITY}</p>
                <p>SITEADDRESSSTATE : {results.SITEADDRESSSTATE}</p>
                <p>SITEADDRESSPOSTCODE : {results.SITEADDRESSPOSTCODE}</p>
                <p>SITEADDRESSDPID : {results.SITEADDRESSDPID}</p>
                <p>GASMETERNUMBER : {results.GASMETERNUMBER}</p>
                <p>SOURCEFILEID : {results.SOURCEFILEID}</p>
                <p>CLAIMED : {results.CLAIMED}</p>
                <p>NSRD : {results.NSRD}</p>
                <p>METERTYPE : {results.METERTYPE}</p>
                <p>MIRNSTATUS : {results.MIRNSTATUS}</p>
                <p>NETWORKID : {results.NETWORKID}</p>
                <p>SN : {results.SN}</p>
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
