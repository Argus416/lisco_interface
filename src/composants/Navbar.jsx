import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Navbar = () => {
    return (
        <AppBar className="navbar" position="static">
            <Container component="header">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
                        LiSco votre temps est précieux, économisez-le !
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                        LiSco
                        {/* votre temps est précieux, économisez-le ! */}
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
