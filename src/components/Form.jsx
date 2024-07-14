import { useState, useEffect } from 'react'; 
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Box,
    Select,
    Button,
    Spinner,
    Switch,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Link,
    IconButton, 
    useColorMode
} from '@chakra-ui/react';
import DataTable from './DataTable';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FaSun, FaMoon } from 'react-icons/fa';
import NavBar from './NavBar';

import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

export default function Form() {

    const { colorMode, toggleColorMode } = useColorMode();

    const [results, setResults] = useState([]);
    const [uniqueCities, setUniqueCities] = useState([]);
    const [uniqueStreets, setUniqueStreets] = useState([]);
    const [uniqueStreetForMirn, setUniqueStreetsForMirn] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();


    // HaveHouseNumber
    const [notHaveHouseNumber, setNotHaveHouseNumber] = useState(false);
    const handleHaveHouseNumber = (e) => {
        setNotHaveHouseNumber(e.target.checked);
        setResults([]);
        setHouseNumber('');
        setLotNumber('');
        setMirn('');
        setStreetName('');
        setCity('');
    }

    // StateTerritory
    const [stateTerritory, setStateTerritory] = useState('');
    const [stateTerritoryAvailability, setStateTerritoryAvailability] = useState(false);
    const handleStateTerritory = (e) => {
        setStateTerritory(e.target.value);
        if(e.target.value !== ''){
            setStateTerritoryAvailability(true);
        }
    }
    const isStateTerritorySet = stateTerritory === '';
    
    // DataAvailability
    const [dataAvailability, setDataAvailability] = useState(false);

    // Postal
    const [postal, setPostal] = useState('');
    const handlePostal = (e) => {
        setPostal(e.target.value);
        setResults([]);
        setHouseNumber('');
        setLotNumber('');
        setMirn('');
        setStreetName('');
        setCity('');
    }
    const isPostalSet = postal === '';

    // City
    const [city, setCity] = useState('');
    const handleCity = (e) => setCity(e.target.value);
    const isCitySet = city === '';
    const handleCitySet = (value) => {
        setCity(value);
        const streetvals = results.filter(item =>
            item.siteaddresscity.toLowerCase().includes(value.toLowerCase())
        );
        setUniqueStreets(streetvals);
    }

    // StreetName
    const [streetName, setStreetName] = useState('');
    const handleStreetSet = (value) => {
        setMirn(value.mirn);
        setMirnSet(value);
        onOpen();
    }
    const handleStreetName = (e) => {
        setStreetName(e.target.value);
    }
    const isStreetName = streetName === '';

    // Mirn
    const [mirn, setMirn] = useState('');
    const [mirnSet, setMirnSet] = useState([]);

    // HouseNumber
    const [houseNumber, setHouseNumber] = useState('');
    const handleHouseNumber = (e) => {
        setResults([]);
        setCity('');
        setMirn('');
        setHouseNumber(e.target.value);
    }
    const isHouseNumberSet = houseNumber === '';

    // LotNumber
    const [lotNumber, setLotNumber] = useState('');
    const handleLotNumber = (e) => {
        setResults([]);
        setCity('');
        setMirn('');
        setLotNumber(e.target.value);
    }
    const isLotNumberSet = lotNumber === '';

    //use effects
    useEffect(() => {
        const acity = results
            .map(item => item.siteaddresscity.toLowerCase())
            .filter(cityName => cityName.includes(city.toLowerCase()));
        const uniqueCitySet = new Set(acity);
        setUniqueCities([...uniqueCitySet]);
    }, [city]);

    useEffect(() => {
        const acity = uniqueStreets.filter(item =>
            item.streetname.toLowerCase().includes(streetName.toLowerCase()));
        const uniqueStreetSet = new Set(acity);
        setUniqueStreetsForMirn([...uniqueStreetSet]);
    }, [streetName]);

    useEffect(() => {
        setDataAvailability(true);
    }, [houseNumber]);

    

    useEffect(() => {
        // console.log(results)
    }, [results]);

    const checkDataAvailability = () => {
        searchHandle();
        setDataAvailability(false);
    }

    // JSON Request
    const searchHandle = async () => {

        let type = '';
        let value = '';

        if(notHaveHouseNumber){
            type = 'lot';
            value = lotNumber;
        }else{
            type = 'house';
            value = houseNumber;
        }

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stype:type,
            svalue:value,
            state:stateTerritory,
            postal:postal
          })
        };

        // https://mirn-backend.onrender.com/api/lv1
        // http://localhost:8070/api/lv1
        await fetch(`https://mirn-backend.onrender.com/api/lv1`, requestOptions)
            .then(response => response.json())
            .then(json => setResults(json))
            .catch(error => console.error(error));

    }; 


    return (
        <>
            <NavBar/>
            <Box w='100%' p={10}>

                    <FormControl isInvalid={isStateTerritorySet} padding={3}>
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

                    { !isPostalSet && postal.length === 4 ? (
                        <FormControl isInvalid={isHouseNumberSet} padding={3}>
                            <FormLabel>House Number</FormLabel>
                            <Input value={houseNumber} onChange={handleHouseNumber} type='number' disabled={ notHaveHouseNumber ? true : false } placeholder='House Number' />
                            {!isHouseNumberSet ? (
                                <></>
                            ):(
                                <>
                                    <FormErrorMessage visibility={ notHaveHouseNumber ? 'hidden' : 'visible' }>Please Enter House Number To Continue.</FormErrorMessage>
                                    <FormControl marginTop={notHaveHouseNumber ? 0 : 5 } display='flex' alignItems='center'>
                                        <FormLabel htmlFor='house-number-available' mb='0'>
                                            Don't have house number?
                                        </FormLabel>
                                        <Switch onChange={handleHaveHouseNumber} id='house-number-available' />
                                    </FormControl>
                                </>
                            )}
                        </FormControl>
                    ):(
                        <></>
                    ) }

                    { !isPostalSet && postal.length === 4 && notHaveHouseNumber ? (
                        <FormControl isInvalid={isLotNumberSet} padding={3}>
                            <FormLabel>Lot Number</FormLabel>
                            <Input value={lotNumber} onChange={handleLotNumber} type='text' placeholder='Lot Number' />
                            {!isLotNumberSet ? (
                                <></>
                            ):(
                                <>
                                    <FormErrorMessage>Please Enter Lot Number To Continue.</FormErrorMessage>
                                </>
                            )}
                        </FormControl>
                    ):(
                        <></>
                    ) }

                    {
                        !isHouseNumberSet || !isLotNumberSet ? (
                            dataAvailability ? (
                                <FormControl isInvalid={isStreetName} padding={3}>
                                    <Button onClick={() => checkDataAvailability()} colorScheme='teal' size='md'>
                                        Check Data Availability
                                    </Button>
                                </FormControl>
                            ) : (
                                results.length == 0 ? (
                                    <FormControl padding={3}>
                                        <Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='blue.500'
                                            size='xl'
                                        />
                                    </FormControl>
                                ) : (
                                    <FormControl isInvalid={isCitySet} padding={3}>
                                        <FormLabel>City</FormLabel>
                                        <Input value={city} onChange={handleCity} type='text' placeholder='City' />
                                        <ul>
                                            {city.length > 1 ? (
                                                uniqueCities.map((cityName, index) => (
                                                    <Button marginTop={2} marginRight={2} key={index} size='xs' onClick={() => handleCitySet(cityName)} colorScheme='blue'>{cityName}</Button>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </ul>
                                        {!isCitySet ? (
                                            <></>
                                        ):(
                                            <FormErrorMessage>Please Enter City To Continue.</FormErrorMessage>
                                        )}
                                    </FormControl>
                                ) 
                            )
                        ) : (
                            <></>
                        )
                    }

                    { !isCitySet && results.length != 0 ? (
                        <FormControl isInvalid={isStreetName} padding={3}>
                            <FormLabel>Street Name</FormLabel>
                            <Input value={streetName} onChange={handleStreetName} type='text' placeholder='Street Name' />
                            <ul>
                                {streetName.length > 1 ? (
                                    uniqueStreetForMirn.map((item, index) => (
                                        <Button marginTop={2} marginRight={2} key={index} size='xs' onClick={() => handleStreetSet(item)} colorScheme='blue'>{item.streetname.toLowerCase()}</Button>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </ul>
                            {!isStreetName ? (
                                <></>
                            ):(
                                <FormErrorMessage>Please Enter Street Name To Get Your MIRN Id.</FormErrorMessage>
                            )}
                        </FormControl>
                    ) : (
                        <></>
                    ) }
                
            </Box>
            <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>MIRN ID is {mirn}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <DataTable data={mirnSet}/>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
  }