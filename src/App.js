import "./App.css";
import Comments from "./Comments/Comments";
import MainContainer from "./UI/MainContainer";
import CommentsSectionProvider from "./store/CommentsSectionProvider";

function App() {
    return (
        <CommentsSectionProvider>
            <MainContainer>
                <Comments />
            </MainContainer>
        </CommentsSectionProvider>
    );
}

export default App;
