import { Auth0Provider } from "@auth0/auth0-react"


export const AuthProviderGoogle = ({ children }) => {

    return (
        <Auth0Provider
            domain="dev-hgj53hof84ujw5bs.us.auth0.com"
            clientId="RcAeuRFm8XDalO5oWiywsBqQsNGLeXec"
            authorizationParams={{
                redirect_uri: window.location.origin,
                connection: 'google-oauth2'
            }}
            cacheLocation="localstorage"
        >
            {children}
        </Auth0Provider>
    )
}