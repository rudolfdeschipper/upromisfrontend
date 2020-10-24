import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import nfp from './components/NotFoundPage';
import { UserManager } from './components/UserManager';
import { UserContext } from './context/UserContext';


interface IProps {
}


interface IState {
    _user: Oidc.User | null;
}

class App extends React.Component<IProps, IState> {
    static displayName = App.name;

    constructor(props: IProps, state: IState) {
        super(props);
        this.state = {
            _user: null
        };
    }

    componentDidMount() {
        let mgr = new UserManager();
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
        const request = React.lazy(() => import("./components/Request/Request"));
        const requestdetails = React.lazy(() => import("./components/Request/RequestDetails"));
        const proposal = React.lazy(() => import("./components/Proposal/Proposal"));
        const proposaldetails = React.lazy(() => import("./components/Proposal/ProposalDetails"));

        return (
            <Layout User={this.state._user}>
                <UserContext.Provider value={this.state._user}>
                    <Suspense fallback={<div className="page-container">Loading...</div>}>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/home' component={Home} />
                            <Route path='/counter' component={Counter} />
                            <Route path='/contract' component={!!this.state._user ? contract : nfp} />
                            <Route path='/contractdetails/:id' component={!!this.state._user ? contractdetails : nfp} />
                            <Route path='/contractdetails/add' component={!!this.state._user ? contractdetails : nfp} />
                            <Route path='/proposal' component={!!this.state._user ? proposal : nfp} />
                            <Route path='/proposaldetails/:id' component={!!this.state._user ? proposaldetails : nfp} />
                            <Route path='/proposaldetails/add' component={!!this.state._user ? proposaldetails : nfp} />
                            <Route path='/request' component={!!this.state._user ? request : nfp} />
                            <Route path='/requestdetails/:id' component={!!this.state._user ? requestdetails : nfp} />
                            <Route path='/requeqstdetails/add' component={!!this.state._user ? requestdetails : nfp} />
                            <Route path="*" component={nfp} />
                        </Switch>
                    </Suspense>
                </UserContext.Provider>
            </Layout>
        );
    }
}


export default App;
