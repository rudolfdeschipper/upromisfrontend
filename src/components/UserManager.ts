import * as Oidc from 'oidc-client' ;

export class UserManager {

    private static config : Oidc.UserManagerSettings = {
        authority: "http://localhost:5000",
        client_id: "uProMISspa",
        redirect_uri: "http://localhost:3000/callback.html",
        response_type: "code",
        scope: "openid profile api1",
        post_logout_redirect_uri: "http://localhost:3000/home",
    };

    private static mgr : Oidc.UserManager = new Oidc.UserManager(UserManager.config);  

    Login()
    {
        return UserManager.mgr.signinRedirect();  
    }

    Logout()
    {
        return UserManager.mgr.signoutRedirect();  
    }

    GetUser(): Promise<Oidc.User | null>
    {
        return UserManager.mgr.getUser()        
    }
}