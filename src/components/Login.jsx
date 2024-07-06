import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FormControl,
    FormLabel,
    Box,
    Heading,
    Input,
    Center,
    Stack,
    Button,
    useToast 
} from '@chakra-ui/react';

export default function Login( { setIsAuthenticated } ) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const navigate = useNavigate();

    const toast = useToast();
    const handleSubmit = (event) => {
        event.preventDefault();
        if(email=='nishanshashintha.live@gmail.com' && password =='a'){
            setIsAuthenticated(true);
            navigate('/');
        }else{
            toast({
                title: "Login Faild.",
                description: "Please check email and password again",
                status: "error",
                duration: 1000,
                isClosable: false,
            });
        }
    };
  
    return (
        <Center height="100vh">
            <Box 
                w={{ base: "90%", md: "400px" }} 
                p={6} 
                borderWidth={1} 
                borderRadius="lg" 
                boxShadow="lg"
            >
                <Heading mb={6} textAlign="center">Login</Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                            <Input value={email} onChange={handleEmail} type="email" required />
                        </FormControl>
                        <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                            <Input value={password} onChange={handlePassword} type="password" required />
                        </FormControl>
                        <Button type="submit" colorScheme="blue" width="full">Login</Button>
                    </Stack>
                </form>
            </Box>
        </Center>
    )
  }