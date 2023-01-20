import React from 'react';
import Container from '@mui/material/Container';

interface Props {
    children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return(
        <Container maxWidth='xl'>
            {children}
        </Container>
    )
}

export default Layout;