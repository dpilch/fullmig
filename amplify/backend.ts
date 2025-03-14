import { RemovalPolicy, Tags } from "aws-cdk-lib";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { defineBackend } from "@aws-amplify/backend";
import { Duration } from "aws-cdk-lib";
const backend = defineBackend({
    auth,
    data
});
const AMPLIFY_GEN_1_ENV_NAME = process.env.AMPLIFY_GEN_1_ENV_NAME ?? "sandbox";
const cfnUserPool = backend.auth.resources.cfnResources.cfnUserPool;
cfnUserPool.userPoolName = `fullmig0256a938_userpool_0256a938-${AMPLIFY_GEN_1_ENV_NAME}`;
cfnUserPool.usernameAttributes = ["email"];
cfnUserPool.policies = {
    passwordPolicy: {
        minimumLength: 8,
        requireLowercase: false,
        requireNumbers: false,
        requireSymbols: false,
        requireUppercase: false,
        temporaryPasswordValidityDays: 7
    }
};
// cfnUserPool.applyRemovalPolicy(RemovalPolicy.RETAIN, { applyToUpdateReplacePolicy: true })
const cfnIdentityPool = backend.auth.resources.cfnResources.cfnIdentityPool;
cfnIdentityPool.identityPoolName = `fullmig0256a938_identitypool_0256a938__${AMPLIFY_GEN_1_ENV_NAME}`;
cfnIdentityPool.allowUnauthenticatedIdentities = false;
// cfnIdentityPool.applyRemovalPolicy(RemovalPolicy.RETAIN, { applyToUpdateReplacePolicy: true })
const userPool = backend.auth.resources.userPool;
userPool.addClient("NativeAppClient", {
    disableOAuth: true,
    authSessionValidity: Duration.minutes(3),
    userPoolClientName: "fullmi0256a938_app_client",
    enablePropagateAdditionalUserContextData: false,
    enableTokenRevocation: true,
    refreshTokenValidity: Duration.days(30),
    generateSecret: false
});
// Tags.of(backend.stack).add("gen1-migrated-app", "true");
