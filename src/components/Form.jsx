import { useState, useEffect } from 'react'; 
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Select,
    Button,
    Spinner 
} from '@chakra-ui/react';

  export default function Form() {

    const numbers = [1, 2, 3, 4, 5];

    const [stateTerritory, setStateTerritory] = useState('');
    const [stateTerritoryAvailability, setStateTerritoryAvailability] = useState(false);
    const handleStateTerritory = (e) => {
        setStateTerritory(e.target.value);
        if(e.target.value !== ''){
            setStateTerritoryAvailability(true);
        }
    }
    const isStateTerritorySet = stateTerritory === '';

    const [postal, setPostal] = useState('');
    const handlePostal = (e) => setPostal(e.target.value);
    const isPostalSet = postal === '';

    const [city, setCity] = useState('');
    const handleCity = (e) => setCity(e.target.value);
    const isCitySet = city === '';

    const [steetName, setStreetName] = useState('');
    const handleStreetName = (e) => setStreetName(e.target.value);
    const isStreetName = steetName === '';

    const [houseNumber, setHouseNumber] = useState('');
    const handleHouseNumber = (e) => {
        setHouseNumber(e.target.value);
        searchHandle(e);
    }
    const isHouseNumberSet = houseNumber === '';

    const [results, setResults] = useState([]);
    const uniqueCities = Array.from(new Map(results.map(item => [item.siteaddresscity, item])).values());
    const uniqueStreets = Array.from(new Map(results.map(item => [item.streetname, item])).values());


    const searchHandle = async (e) => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            houseNumber:e.target.value,
            state:stateTerritory,
            postal:postal
          })
        };
        await fetch(`http://localhost:8070/api/lv1`, requestOptions)
            .then(response => response.json())
            .then(json => setResults(json))
            .catch(error => console.error(error));
        console.log(results)
        console.log('end')
    }; 

    return (
        <Box w='100%' p={10} color='white'>
            <form>
                <FormControl isDisabled={stateTerritoryAvailability} isInvalid={isStateTerritorySet} padding={3}>
                    <FormLabel>State / Territory</FormLabel>
                    <Select value={stateTerritory} onChange={handleStateTerritory} placeholder='Select State / Territory'>
                        <option value='NSW'>New South Wales</option>
                        <option value='VIC'>Victoria</option>
                        <option value='QLD'>Queensland</option>
                        <option value='WA'>Western Australia</option>
                        <option value='SA'>South Australia</option>
                        <option value='TAS'>Tasmania</option>
                        <option value='ACT'>Australian Capital Territory</option>
                        <option value='NT'>Northern Territory</option>
                        <option value='ACT'>Jervis Bay Territory</option>
                    </Select>
                    { !isStateTerritorySet ? (
                        <></>
                    ) : (
                        <FormErrorMessage>Please Select Your State / Territory To Continue.</FormErrorMessage>
                    ) }
                </FormControl>

                { !isStateTerritorySet ? (
                    <FormControl isInvalid={isPostalSet} padding={3}>
                        <FormLabel>Postal Code</FormLabel>
                        <Input value={postal} onChange={handlePostal} type='number' placeholder='Postal Code' />
                        {!isPostalSet ? (
                            <></>
                        ):(
                            <FormErrorMessage>Please Enter Postal Code To Continue.</FormErrorMessage>
                        )}
                    </FormControl>
                ) : (
                    <></>
                ) }

                { !isPostalSet ? (
                    <FormControl isInvalid={isHouseNumberSet} padding={3}>
                        <FormLabel>House Number</FormLabel>
                        <Input value={houseNumber} onChange={handleHouseNumber} type='number' placeholder='House Number' />
                        {!isHouseNumberSet ? (
                            <></>
                        ):(
                            <FormErrorMessage>Please Enter House Number To Continue.</FormErrorMessage>
                        )}
                    </FormControl>
                ):(
                    <></>
                ) }

                { results ? (
                    <FormControl isInvalid={isCitySet} padding={3}>
                        <FormLabel>City</FormLabel>
                        <Select value={city} onChange={handleCity} placeholder='Select City'>
                            {
                                uniqueCities.map((item,i) => <option key={item.siteaddresscity} value={item.siteaddresscity}>{item.siteaddresscity}</option>)
                            }
                        </Select>
                        {!isCitySet ? (
                            <></>
                        ):(
                            <FormErrorMessage>Please Select City To Continue.</FormErrorMessage>
                        )}
                    </FormControl>
                ) : (
                    <FormControl padding={3}>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </FormControl>
                ) }

                { !isCitySet ? (
                    <FormControl isInvalid={isStreetName} padding={3}>
                        <FormLabel>Street Name</FormLabel>
                        <Select value={steetName} onChange={handleStreetName} placeholder='Select Street Name'>
                            {
                                uniqueStreets.map((item,i) => <option key={i} value={item.mirn}>{item.streetname}</option>)
                            }
                        </Select>
                        {!isStreetName ? (
                            <></>
                        ):(
                            <FormErrorMessage>Please Select Street Name To Get Your MIRN Id.</FormErrorMessage>
                        )}
                    </FormControl>
                ) : (
                    <></>
                ) }

                <h1>{steetName}</h1>

            </form>
        </Box>
    )
  }