import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Button, Text, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const descopeProjectId = "P2ye8kHs7bFOGwwvFOAWTqfO4Oc0";
const flowId = "sign-up-or-in";
const descopeUrl = `https://auth.descope.io/${descopeProjectId}?flow=${flowId}`;

export default function LoginScreen() {
    const [userInfo, setUserInfo] = React.useState(null);

    // Determine if we're in development (Expo Go) or production
    const isExpoGo = Constants.executionEnvironment === "storeClient";

    // Use the correct redirect URI based on environment
    const redirectUri = isExpoGo
        ? AuthSession.makeRedirectUri({ useProxy: true })
        : AuthSession.makeRedirectUri({ native: "sightreadpro://redirect" });

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: descopeProjectId,
            scopes: ["openid", "email", "profile"],
            redirectUri: redirectUri, // Use the exact same URI we printed
            responseType: AuthSession.ResponseType.Code,
            prompt: AuthSession.Prompt.Login,
        },
        {
            authorizationEndpoint: descopeUrl, // Use the hosted flow URL
        }
    );

    React.useEffect(() => {
        console.log("Response", response);
        if (response?.type === "success") {
            console.log("Success! Code:", response.params.code);
            // Exchange the code for tokens using response.params.code
            // Fetch user info and set with setUserInfo
        } else if (response?.type === "error") {
            console.error("Auth error:", response.error);
        }
    }, [response]);

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <Text style={{ marginBottom: 20, textAlign: "center" }}>
                Redirect URI: {redirectUri}
            </Text>
            {userInfo ? (
                <>
                    <Text>Email: {userInfo.email}</Text>
                    <Button title="Logout" onPress={() => setUserInfo(null)} />
                </>
            ) : (
                <>
                    <Text
                        style={{
                            fontSize: 24,
                            textAlign: "center",
                            marginBottom: 20,
                        }}
                    >
                        LOGIN PAGE
                    </Text>
                    <Button
                        disabled={!request}
                        title="Login with Descope"
                        onPress={() => promptAsync && promptAsync()}
                    />
                </>
            )}
        </View>
    );
}
