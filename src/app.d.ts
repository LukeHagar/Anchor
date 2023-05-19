// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare type Status = {
	page: Page;
	status: Status2;
};

declare type Page = {
	id: string;
	name: string;
	url: string;
	time_zone: string;
	updated_at: string;
};

declare type Status2 = {
	indicator: string;
	description: string;
};

declare type IdnSession = {
	tenant: string;
	authType: string;
	baseUrl: string;
	logoutUrl: string;
	accessToken: string;
	refreshIn: number;
	pollUrl: string;
	strongAuth: boolean;
	strongAuthUrl: string;
	csrfToken: string;
	expiration: date;
};

declare type HostingData = {
	org: string;
	pod: string;
	publicPod: string;
	layer: string;
	region: string;
};

declare type TenantData = {
	id: string;
	alias: string;
	uid: string;
	name: string;
	displayName: string;
	uuid: string;
	encryptionKey: null;
	encryptionCheck: null;
	status: string;
	pending: boolean;
	passwordResetSinceLastLogin: boolean;
	usageCertAttested: null;
	userFlags: Meta;
	enabled: boolean;
	altAuthVia: string;
	altAuthViaIntegrationData: null;
	kbaAnswers: number;
	disablePasswordReset: boolean;
	ptaSourceId: null;
	supportsPasswordPush: boolean;
	attributes: Attributes;
	externalId: string;
	role: string[];
	phone: null;
	email: string;
	personalEmail: null;
	employeeNumber: null;
	riskScore: number;
	featureFlags: { [key: string]: boolean };
	feature: string[];
	orgEncryptionKey: string;
	orgEncryptionKeyId: string;
	meta: any;
	org: Org;
	stepUpAuth: boolean;
	bxInstallPrompted: boolean;
	federatedLogin: boolean;
	auth: Auth;
	onNetwork: boolean;
	onTrustedGeo: boolean;
	loginUrl: string;
};

declare type Attributes = {
	lastLoginTimestamp: number;
	uid: string;
	firstname: string;
	cloudAuthoritativeSource: string;
	cloudStatus: string;
	displayName: string;
	internalCloudStatus: string;
	lastSyncDate: string;
	workPhone: string;
	email: string;
	lastname: string;
};

declare type Auth = {
	service: string;
	encryption: string;
};

declare type Org = {
	name: string;
	scriptName: string;
	mode: string;
	numQuestions: number;
	status: string;
	maxRegisteredUsers: number;
	pod: string;
	pwdResetPersonalPhone: boolean;
	pwdResetPersonalEmail: boolean;
	pwdResetKba: boolean;
	pwdResetEmail: boolean;
	pwdResetDuo: boolean;
	pwdResetPhoneMask: boolean;
	authErrorText: null;
	strongAuthKba: boolean;
	strongAuthPersonalPhone: boolean;
	strongAuthPersonalEmail: boolean;
	integrations: any[];
	productName: string;
	kbaReqForAuthn: number;
	kbaReqAnswers: number;
	lockoutAttemptThreshold: number;
	lockoutTimeMinutes: number;
	usageCertRequired: boolean;
	adminStrongAuthRequired: boolean;
	enableExternalPasswordChange: boolean;
	enablePasswordReplay: boolean;
	enableAutomaticPasswordReplay: boolean;
	notifyAuthenticationSettingChange: boolean;
	netmasks: null;
	countryCodes: null;
	whiteList: boolean;
	usernameEmptyText: null;
	usernameLabel: null;
	enableAutomationGeneration: boolean;
	emailTestMode: boolean;
	emailTestAddress: string;
	orgType: string;
	passwordReplayState: string;
	systemNotificationConfig: string;
	maxClusterDebugHours: string;
	brandName: string;
	logo: null;
	emailFromAddress: string;
	standardLogoUrl: null;
	narrowLogoUrl: null;
	actionButtonColor: string;
	activeLinkColor: string;
	navigationColor: string;
};
