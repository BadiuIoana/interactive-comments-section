import "./App.css";
import { Fragment, useState } from "react";
import Comments from "./Comments/Comments";
import MainContainer from "./UI/MainContainer";

function App() {
    return (
        <Fragment>
            <MainContainer>
                <Comments />
            </MainContainer>
        </Fragment>
    );
}

export default App;
