import React, { useState, useEffect } from 'react';
import { Link, useToast, Box, Select, Input, Button, FormControl, FormLabel, CloseButton, Table, Thead, Tbody, Tr, Th, Td, VStack, HStack } from '@chakra-ui/react';
import NavBar from './NavBar';
export default function ( {  } ) {
  const [names, setNames] = useState([
    'mirn checksum', 
    'flat or unit type', 
    'flat or unit number', 
    'floor or level type', 
    'floor or level number', 
    'building or property name 1', 
    'building or property name 2', 
    'location descriptor', 
    'house number', 
    'house number suffix', 
    'lot number', 
    'street name', 
    'street type', 
    'street suffix', 
    'site address city', 
    'site address state',
    'site address post code',
    'site address dpid',
    'gas meter number',
    'source fileid',
    'claimed',
    'nsrd',
    'meter type',
    'mirn status',
    'network id',
    'sn'
  ]);
  const toast = useToast();
  const [selectedNames, setSelectedNames] = useState([]);
  const [fieldCount, setFieldCount] = useState(0);
  const [formData, setFormData] = useState([]);
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  const resetForm = () => {
    setSelectedNames([]);
    setFieldCount(0);
    setFormData([]);
    setData([]);
    setCurrentIndex(0);
  }

  const checkDataAvailability = () => {
    searchHandle();
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleChangeValue = (e) => {

    let value = e.target.value;
    if(
        e.target.name === 'lotnumber' || 
        e.target.name === 'housenumber' || 
        e.target.name === 'siteaddresspostcode' || 
        e.target.name === 'sourcefileid' || 
        e.target.name === 'mirnchecksum' ||
        e.target.name === 'sn'
    ){
        value = Number(e.target.value);
    }

    setFormData({
        ...formData,
        [e.target.name]:value,
    });
  }

  const handleSelect = (event) => {
    const selectedName = event.target.value;
    if (selectedName) {
      setSelectedNames([...selectedNames, selectedName]);
      setNames(names.filter(name => name !== selectedName));
    }
    setFormData({
        ...formData,
        [selectedName]: '',
    });
    setFieldCount(fieldCount + 1);
  };

  const handleRemove = (nameToRemove) => {
    setSelectedNames(selectedNames.filter(name => name !== nameToRemove));
    setNames([...names, nameToRemove]);
    // setFormData(formData.filter(flatorunittype => flatorunittype !== nameToRemove));
    setFieldCount(fieldCount - 1);
  };

const searchHandle = async () => {

    toast({
        title: "Running Query",
        description: "Please hold on some time to get responce.",
        status: "info",
        duration: 6000,
        isClosable: false,
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data:formData
      })
    };

    // https://mirn-backend.onrender.com/api/lv2
    // http://localhost:8070/api/lv2
    await fetch(`https://mirn-backend.onrender.com/api/lv2`, requestOptions)
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error));

}; 

useEffect(() => {

    if(data.length > 0){
        toast({
            title: "Found Data",
            description: `Found ${data.length} data with given parameters`,
            status: "success",
            duration: 5000,
            isClosable: false,
        });
    }else{
        if(fieldCount >= 3) {
            toast({
                title: "Not Found Data",
                description: "Not found any data with given parameters. Please check the values.",
                status: "error",
                duration: 5000,
                isClosable: false,
            });    
        }
    }
}, [data]);

  return (
    <>
        <NavBar/>
        <Box p={10}>
            <FormControl marginTop={5}>
                <FormLabel>Select at Least 3 Parameters to Proceed the Query</FormLabel>
                <Select placeholder="Select Parameters" onChange={handleSelect}>
                {names.map((name, index) => (
                    <option key={index} value={name.replace(/ /g,'')}>
                    {name}
                    </option>
                ))}
                </Select>
            </FormControl>
            {selectedNames.map((name, index) => (
                <Box key={index} display="flex" alignItems="center" mt={4}>
                    <FormControl>
                        <FormLabel>{name}</FormLabel>
                        <Input 
                            name={name.replace(/ /g,'')} 
                            placeholder={`Enter ${name}`}
                            onChange={(e) => handleChangeValue(e)}
                            key={index}
                            value={formData.value}
                        />
                    </FormControl>
                </Box>
            ))}
            {fieldCount >= 3 ? (
                <FormControl paddingTop={3}>
                    <Button marginRight={5} onClick={() => checkDataAvailability()} colorScheme='teal' size='md'>
                        Check Data Availability
                    </Button>
                    <Button onClick={() => resetForm()} colorScheme='teal' size='md'>
                        Reset
                    </Button>
                </FormControl>
            ) : (
                <></>
            )}
        </Box>

        { data.length > 0 ? (
            <Box p={5}>
                <VStack spacing={4}>
                <Table size='sm'>
                    <Thead>
                    <Tr>
                        <Th>Field</Th>
                        <Th>Value</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {Object.entries(data[currentIndex]).map(([key, value]) => (
                        key !== "_id" ? (
                            <Tr key={key}>
                                <Td>{key}</Td>
                                <Td>{value}</Td>
                            </Tr>
                        ) : (
                            <></>
                        )
                    ))}
                    </Tbody>
                </Table>
                <HStack>
                    <Button onClick={handlePrevious} isDisabled={currentIndex === 0}>Previous</Button>
                    <Button onClick={handleNext} isDisabled={currentIndex === data.length - 1}>Next</Button>
                </HStack>
                </VStack>
            </Box>
        ) : (
            <></>
        )}
    </>
  );
};

