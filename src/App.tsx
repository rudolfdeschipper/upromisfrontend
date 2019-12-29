import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import nfp from './components/NotFoundPage';

class App extends Component {
    static displayName = App.name;

    render() {
        const contract = React.lazy(() => import("./components/Contract/Contract"));
        const contractdetails = React.lazy(() => import("./components/Contract/ContractDetails"));
        return (
            <Layout>
                <Suspense fallback={<div className="page-container">Loading...</div>}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/home' component={Home} />
                        <Route path='/counter' component={Counter} />
                        <Route path='/contract' component={contract} />
                        <Route path='/contractdetails/:id' component={contractdetails} />
                        <Route component={nfp} />
                    </Switch>
                </Suspense>
            </Layout>
        );
    }
}


export default App;
