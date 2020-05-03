import React, { Component, Suspense } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import nfp from './components/NotFoundPage';
import * as Oidc from 'oidc-client' ;
import { Utils } from './components/Utils';

interface IProps {
}


interface IState {
    _user: any;
}

class App extends React.Component<IProps, IState> {
    static displayName = App.name;

    constructor(props: IProps, state: IState) {
        super(props);
        this.state = {
            _user: null
        };
    }

    componentDidMount()
    {
        let mgr = new Utils();  
        mgr.GetUser().then((user) => {  
            this.setState({  
                _user: user  
            });  
            console.log(user);  
        })  

    }

    render() {
        const contract = React.lazy(() => import("./components/Contract/Contract"));
        const contractdetails = React.lazy(() => import("./components/Contract/ContractDetails"));

        return (
            <Layout User={this.state._user}>
                <Suspense fallback={<div className="page-container">Loading...</div>}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/home' component={Home} />
                        <Route path='/counter' component={Counter} />
                        <Route path='/contract' component={contract} />
                        <Route path='/contractdetails/:id' component={contractdetails} />
                        <Route path='/contractdetails/add' component={contractdetails} />
                        <Route component={nfp} />
                    </Switch>
                </Suspense>
            </Layout>
        );
    }
}


export default App;
