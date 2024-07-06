import React from 'react';
import { 
    Table, 
    Thead, 
    Tbody, 
    Tr, 
    Th, 
    Td, 
    TableContainer 
} from '@chakra-ui/react';

interface ObjectTableProps {
    data: { [key: string]: any };
}

const ObjectTable: React.FC<ObjectTableProps> = ({ data }) => {
    return (
        <TableContainer>
            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th>Param</Th>
                        <Th>Value</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Object.entries(data).map(([key, value]) => 
                        key != '_id' ? (
                            <Tr key={key}>
                                <Td>{key}</Td>
                                <Td>{value.toString()}</Td>
                            </Tr>
                        ) : (
                            <></>
                        )
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default ObjectTable;
