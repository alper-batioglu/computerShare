const data = `//node_modules\\quick-shrimp\\lib\\interfaces\\ComponentInterfaces\\IExternalProp
interface IExternalProp {
    name: string;
}
//# sourceMappingURL=IExternalProp.d.ts.map
//./node_modules/quick-shrimp/lib/interfaces/ComponentInterfaces/IExternalEvents.d.ts

interface IExternalEvents {
    name: string;
    params: Array<string | IExternalProp>;
}
//# sourceMappingURL=IExternalEvents.d.ts.map
//./node_modules/quick-shrimp/lib/interfaces/ComponentInterfaces/VuetifyTypes.d.ts
declare type IVDataTableCompareFunction<T = any> = (a: T, b: T) => number;
interface IVDataTableHeader<T extends any = any> {
    text: string;
    value: string;
    align?: 'start' | 'center' | 'end';
    sortable?: boolean;
    filterable?: boolean;
    groupable?: boolean;
    divider?: boolean;
    class?: string | string[];
    width?: string | number;
    filter?: (value: any, search: string | null, item: any) => boolean;
    sort?: IVDataTableCompareFunction<T>;
}
interface IVDataTableRow {
    expand: (value: boolean) => void;
    headers: IVDataTableHeader[];
    isExpanded: boolean;
    isMobile: boolean;
    isSelected: boolean;
    item: any;
    select: (value: boolean) => void;
}
//# sourceMappingURL=VuetifyTypes.d.ts.map
//node_modules\\quick-shrimp\\lib\\interfaces\\quick\\IEditorInstance
interface IEditorInstance {
    dmEnabled: boolean;
}
interface IEditorScrollHeights {
    leftArea: Number;
    renderArea: Number;
    rightArea: Number;
}
//# sourceMappingURL=IEditorInstance.d.ts.map
//node_modules\\quick-shrimp\\lib\\interfaces\\ComponentInterfaces\\ElementLocation
declare enum ElementLocation {
    Before = "Before",
    After = "After",
    Default = "Default"
}
//# sourceMappingURL=ElementLocation.d.ts.map
//node_modules\\quick-shrimp\\lib\\interfaces\\IDictionary
interface IDictionary<TValue> {
    [key: string]: TValue;
}
//# sourceMappingURL=IDictionary.d.ts.map
//node_modules\\quick-shrimp\\lib\\interfaces\\NetworkInterfaces\\IRequest

interface IRequest extends IBaseRequest {
    responseField: string | null;
    onSuccess: string | null;
    onFail: string | null;
    blockRender: boolean;
    showSuccessMessage?: boolean;
    showErrorMessage?: boolean;
    args?: IDictionary<any>;
    headers?: IDictionary<string>;
}
interface IBaseRequest {
    url: string;
    http: "GET" | "get" | "POST" | "post" | "MULTIPART" | "multipart" | "PUT" | "put" | "POSTBLOB" | "postblob" | "DELETE" | "delete" | "PATCH" | "patch";
    data: any;
}
interface IDownloadRequest extends IBaseRequest {
}
//# sourceMappingURL=IRequest.d.ts.map
//node_modules\\quick-shrimp\\lib\\interfaces\\ComponentInterfaces\\IAlert
declare enum ErrorSource {
    Page = "Page",
    Network = "Network",
    Validation = "Validation"
}
declare enum AlertType {
    Warning = "Warning",
    Info = "Info",
    Success = "Success",
    Error = "Error"
}
declare enum AlertButtonType {
    Confirm = "Confirm",
    Cancel = "Cancel"
}
interface IActionButton {
    name?: string;
    type: AlertButtonType;
    clickEventName?: string;
}
//# sourceMappingURL=IAlert.d.ts.map
//node_modules\\quick-shrimp\\lib\\interfaces\\quick\\ISettingsYaml
interface ISettingsYaml {
    urlprefix?: string;
    assetprefi?: string;
    csspath?: Array<string> | Record<string, Array<string>>;
    rootqjson?: string;
    alertqjson?: string;
    FormattingDefinition?: IFormattingDefinition;
    DomainModuleList?: Record<string, string>;
    RegionalDefinition?: IRegionalDefinition;
    qjsonDirectPath?: boolean;
}
interface IRegionalDefinition {
    region: string;
    FormattingDefinition: IFormattingDefinition;
    length: any;
    filter: any;
}
interface IFormattingDefinition {
    groupSeperator: IFormattingGroupSeperatorValue;
    radixPoint: IFormattingRadixPointValue;
    digits: IFormattingDigitValue;
    enforceDigitsOnBlur: IFormattingEnforceDigitsOnBlurValue;
    longDateFormat: IFormattingValue;
    shortDateFormat: IFormattingValue;
    longTimeFormat: IFormattingValue;
    shortTimeFormat: IFormattingValue;
    moneyFormat: IFormattingValue;
    serviceDateFormat: IFormattingValue;
    displayDateFormat: IFormattingValue;
}
interface IFormattingValue {
    overwrite: boolean;
    value: string;
}
interface IFormattingGroupSeperatorValue extends IFormattingValue {
}
interface IFormattingRadixPointValue extends IFormattingValue {
}
interface IFormattingDigitValue extends IFormattingValue {
}
interface IFormattingEnforceDigitsOnBlurValue extends IFormattingValue {
}
//# sourceMappingURL=ISettingsYaml.d.ts.map
//./node_modules/quick-shrimp/lib/interfaces/Scripting/IGlobals.d.ts

interface IGlobals_Request {
    async(requestObject: IRequest): void;
    download(requestObject: IDownloadRequest): void;
}
interface IGlobals_MM {
    get(propertyName: string): void;
    set(propertyName: string, propertyValue: object): void;
    trigger(eventName: string, parameters?: Array<any>): null | undefined;
    delay(eventName: string, parameters?: Array<any>): any;
    clearTimeout(timer: any): void;
}
interface IGlobals_Math {
    floor: (x: number) => number;
    random: (min: number, max: number) => number;
    findIndex: (array: Object[], searchKey: string, seacrhString: string) => number;
    round(roundNumber: number, indexToSplit: number): number;
}
interface IGlobals_EM {
    trace: (traceMessage: any) => void;
}
interface IGlobals_Quick {
    region: {
        setRegion: (regionName: string) => void;
        getRegionList: () => Array<string> | undefined;
        getCurrentRegion: () => string | undefined;
        getFormattingDefinitionByCurrentRegion: () => IFormattingDefinition | undefined;
    };
    theme: {
        setTheme: (themeName: string) => void;
        getThemeList: () => Array<string> | undefined;
    };
    redirect: (url: string) => void;
    performance: () => any;
    back: (...args: any[]) => any;
    go: (qjsonPath: string) => any;
    copy(object: Object): any;
    download: (responseFile: any) => void;
    isObject: (obj: any) => boolean;
    validation: {
        required: (message?: any) => (value: any) => any;
        minLength: (minLenght: any, message?: any) => (value: any) => any;
        maxLength: (maxLenght: any, message?: any) => (value: any) => any;
        email: (message?: any) => (value: any) => any;
        iban: (message?: any) => (value: any) => any;
        regex: (regexVal: any, message?: any) => (value: any) => any;
        tckn: (message?: any) => (value: any) => any;
        vkn: (message?: any) => (value: any) => any;
    };
    validate: (compEID: string, displayAlertBox: boolean, displayError: boolean) => true | undefined;
    validateAll: (displayAlertBox: boolean, displayError: boolean) => true | undefined;
    resetValidation: (compEID: string) => void;
    reset: (compEID: string) => void;
    createComponent: ({ templateCompQID, newCompQID, dataSource, place, placeQID }: {
        templateCompQID: string;
        newCompQID: string;
        dataSource?: any;
        place?: ElementLocation;
        placeQID?: string;
    }) => IComponent | undefined | null;
    findCreateComponentRelative: (sourceComp: IComponent, targetCompID: string) => IComponent | undefined;
    createChildren: ({ parentCompQId, childName }: {
        parentCompQId: string;
        childName: string;
    }) => void;
    deleteComponent: (componentInstance: IComponent) => void;
    bind: ({ bindedObject, fields }: {
        bindedObject: string | undefined;
        fields: Array<string> | object | undefined;
    }) => void;
    setLanguage: (LRType: string) => any;
    getLanguage: () => string;
    updateComponent: (Comp?: IComponent) => any;
    exportToXlsx: ({ fileName, items, headers }: {
        fileName: string;
        items: Array<object>;
        headers: Array<object>;
    }) => void;
    toLongDate: (date: Date, formatType?: string) => string;
    toShortDate: (date: Date, formatType?: string) => string;
    toLongTime: (date: Date, formatType?: string) => string;
    toShortTime: (date: Date, formatType?: string) => string;
    toDate: (dateString: string, formatType: string) => Date;
    toMoney: (number: Number, formatType?: string) => string;
    setComponentClass: (componentInstance: IComponent, classes: Array<string>) => void;
    dm: object;
    getEditor: () => IEditorInstance | undefined;
    alert?: (options: {
        title?: string | undefined;
        text?: string | undefined;
        category?: AlertType | undefined;
        actionButtons?: IActionButton[] | undefined;
        error?: {
            errorMessage?: string | undefined;
            errorCode?: string | undefined;
            errorSource?: ErrorSource | undefined;
        } | undefined;
    }) => void;
}
interface IGlobals_store {
    set: (name: string, value: any) => void;
    get: (name: any) => any;
    getAll: (name: any) => any;
    delete: (name: any) => void;
}
interface IGlobals_cookie {
    set: (name: string, value: any) => void;
    get: (name: any) => any;
    getAll: (name: any) => any;
    delete: (name: any) => void;
}
interface IGlobals_Date {
    parse: (value: string | number, month: number | null) => Date;
    now: () => Date;
    time: () => number;
    compare: (first: string | Date, second: string | Date) => boolean | "Equal";
    getTimezoneOffset: (date: Date) => number;
    ISOString: () => string;
    differenceInDays(first: Date, second: Date): number;
    differenceInMonths(first: Date, second: Date): number;
}
interface IGlobals_Number {
    parse: (value: string) => number;
    parseFloat: (value: string) => number;
    mod: (firstValue: number, secondValue: number) => number;
}
interface IGlobals_Json {
    parse: (jsonString: string) => any;
}
interface IGlobals_parent {
    /**
     * Properties defined in Messaging P: ExternalProps
     */
    props: Record<string, any> | undefined;
    /**
     * Events defined in Messaging P: ExternalEvents
     */
    events: Record<string, Function> | undefined;
}
interface IGlobals_string {
    space: string;
    replace: (string: string, searchValue: string, replaceValue: string) => string;
}
interface IGlobals_Url {
    resolve: ({ url }: {
        url: string;
    }) => string;
    getDeepLinkParams?: () => Record<string, string | undefined>;
    getUrl?: () => (string | undefined);
}
interface IGlobals_js {
    Object: ObjectConstructor;
    String: StringConstructor;
    Math: Math;
    Date: DateConstructor;
    Number: NumberConstructor;
}
interface IGlobals_sso {
    start: ({ clientId, authorizeEndpoint, redirectUri, scope }: {
        clientId: string;
        authorizeEndpoint: string;
        redirectUri: string;
        scope: string;
    }) => void;
    validate: ({ urlParams, tokenEndpoint, type, onSuccess, onFail }: {
        urlParams: Record<string, string>;
        tokenEndpoint: string;
        type: string;
        onSuccess: string;
        onFail: string;
    }) => void;
}
interface IGlobalsBase {
    Request: IGlobals_Request;
    MM: IGlobals_MM;
    EM: IGlobals_EM;
    LR: (key: string, dataSource?: object | null) => string | null | undefined;
    getRoleBaseView: (key: string) => boolean;
    go: (...args: any[]) => any;
    getComponent(compID: string): IComponent | null | undefined;
    setFormData(compCol: object): void;
    getArrangedNestedData(obj: object, pairChar: string): {};
    getFormData(componentQID?: string): {};
    getArrangedFormData(formData: object, pairChar: string): {};
    Quick: IGlobals_Quick;
    sso: IGlobals_sso;
    store: IGlobals_store;
    cookie: IGlobals_cookie;
    Url: IGlobals_Url;
    findControl: () => void;
    this: IComponent | null | undefined;
    parent: IGlobals_parent;
}
interface IGlobalsTS extends IGlobalsBase {
}
interface IGlobalsQS extends IGlobalsBase {
    Math: IGlobals_Math;
    regex: (value: string) => RegExp;
    typeOf: (value: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    Date: IGlobals_Date;
    Number: IGlobals_Number;
    JSON: IGlobals_Json;
    string: IGlobals_string;
    Object: Object;
    js: IGlobals_js;
    Url: IGlobals_Url;
}
//# sourceMappingURL=IGlobals.d.ts.map
//additionalInlineFile

declare type IComponent = any;
declare type IComponentCollection = any;
`;
 export{data}