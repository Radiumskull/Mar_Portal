import { Navbar, Footer } from "../components/layout";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Authentication from "./Authentication/Authentication";

function App() {
  return (
    <div className="page">
      <Navbar />

      <div className="body" style={{ maxWidth: "1440px" }}>
        <Switch>
          <Route path="/login" component={Authentication} />
          <Route path="/register" component={Authentication} />
          <Route path="/" component={Home} />
          <Route render={() => <div>Page not found</div>} />
        </Switch>
      </div>

      <Footer />
    </div>
  );
}

export default App;
