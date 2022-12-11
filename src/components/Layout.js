import Head from "./Head";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

function Layout({ children, user, repos }) {

    return (
        <>
            <Head user={user}  />
            <Sidebar user={user} repos={repos}/>
            <main>
                <Container fluid>
                    {children}
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default Layout;
