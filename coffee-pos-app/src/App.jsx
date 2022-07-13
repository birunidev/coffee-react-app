import { ProtectedRoute } from "components";
import { Menus } from "modules/Dashboard/screens";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const CashierRoutes = React.lazy(() =>
  import("modules/Cashier/infrastructure/routes")
);
const DashboardRoutes = React.lazy(() =>
  import("modules/Dashboard/infrastructure/routes")
);

const AuthRoutes = React.lazy(() =>
  import("modules/Auth/infrastructure/routes")
);

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="absolute left-0 font-bold top-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center">
            Please Wait...
          </div>
        }
      >
        <Router>
          <Switch>
            <Route path="/cashier" component={CashierRoutes} />
            <Route path="/cp-admin" component={DashboardRoutes} />
            <Route path="/" component={AuthRoutes} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
