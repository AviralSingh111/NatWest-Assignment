import React from "react";
import "../common/Navbar.css";
import Button from "@material-ui/core/Button";

const NavBar = () => {
    return (
        <>
            <div className="TopArea">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0vh",
                        padding: "3%", 
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around"
                        }}
                    >
                        <a className="underLine2 hide_on_responsive" href="/">
                            <Button variant="text" color="default" href="/">
                               Go To Assignment-1 
                            </Button>
                        </a>
                        <a className="underLine2 hide_on_responsive" href="/state">
                            <Button variant="text" color="default">
                            Go To Assignment-2 
                            </Button>
                        </a>

                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
