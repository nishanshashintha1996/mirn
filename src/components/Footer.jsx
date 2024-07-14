import {
  Box,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'

export default function Footer() {
    
  return (
    <>
      <Box 
            as="footer"
            position="fixed"
            left="0"
            bottom="0"
            width="100%"
            bg={useColorModeValue('gray.300', 'gray.700')}
            px={4}
        >
        <Flex h={16} alignItems={'center'} justifyContent={'center'}>
        <p>All rights reserved by Satneel</p>
        </Flex>
      </Box>
    </>
  )

}