import { monacoLoader } from "./src/monacoLoader";
import { LazyLoader } from "quick-shrimp/lib/interfaces/Helpers/LazyLoader";
import { Logger, LogType } from "quick-shrimp/lib/interfaces/Helpers/Logger";
import { data } from "./src/shims/nemoInterfaces";

///<reference path="./src/shims/monaco.d.ts" />
///<reference path="./src/shims/typescriptServices.d.ts" />
declare type IMonaco = typeof monaco;

interface ILangDTS {
    body?: string,
    error?: string
};
interface GlobalManager {

}
class LanguageManager {
    public static GenerateIntelliInterfaces(): Record<string, string> {
        const gm: GlobalManager = {};
        const intelliDict: Record<string, (gm: GlobalManager) => string> = {
            "nemoInterfaces.d.ts": (gm) => data,
            "components.d.ts": gm => "",
            "globals.d.ts": gm => "",
            "additional.d.ts": gm => "",
            "parameters.d.ts": gm => "",
        };

        return Object.keys(intelliDict).reduce((prev, cur) => { prev[cur] = intelliDict[cur](gm); return prev; }, <Record<string, string>>{});
    }

    private static loadedDTSs: Record<string, ILangDTS | undefined> = {};
    public static async LoadAndCacheDTSs() {
        const items = ["cdn/js/typescript/lib/lib.es5.d.ts"];
        const leftItems = items.filter(item => !LanguageManager.loadedDTSs[item] || LanguageManager.loadedDTSs[item]?.error);
        const proms = leftItems.map(item => LazyLoader.FetchModuleBody(item));
        const files = await Promise.all(proms);
        files.forEach((file, i) => {
            LanguageManager.loadedDTSs[leftItems[i]] = (file.status == 200 && file.body) ? { body: file.body } : { error: file.status.toString() };
            if (file.status != 200) { new Logger().Log({ logMessage: `file load failed ${leftItems[i]}: ${file.status}`, logType: LogType.Error }) };
        });
        return this.loadedDTSs;
    }
}

new monacoLoader().load({
    success: async (monaco: IMonaco) => {
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            // noLib: true,
            target: monaco.languages.typescript.ScriptTarget.ES5,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            allowNonTsExtensions: true,
            strict: true,
            // sourceMap: !this.gm.editMode,
            // inlineSources: false,
            // inlineSourceMap: false
        });

        const dtss = await <Promise<Record<string, ILangDTS>>>LanguageManager.LoadAndCacheDTSs();
        Object.keys(dtss).forEach(dtsKey => monaco.languages.typescript.typescriptDefaults.addExtraLib(dtss[dtsKey].body!, dtsKey));

        let disposables: Array<monaco.IDisposable>;
        const intelliDict = LanguageManager.GenerateIntelliInterfaces();
        disposables = Object.keys(intelliDict).map(fileName => monaco.languages.typescript.typescriptDefaults.addExtraLib(intelliDict[fileName], fileName));

        const options: monaco.editor.IStandaloneEditorConstructionOptions = {
            value: "",
            language: "typescript",
            theme: "vs-dark",
            model: null
        };

        var x = document.createElement("div");
        document.body.appendChild(x);
        var d = document.createElement("div");
        d.style.width = "800px";
        d.style.height = "300px";
        document.body.appendChild(d);

        const mon = (window as any).mon = monaco.editor.create(d, options);


        //#region Go to definition
        const editorService = (mon as any)._codeEditorService;
        const openEditorBase = editorService.openCodeEditor.bind(editorService);
        editorService.openCodeEditor = async (input: {resource: monaco.Uri, options: any}, source: any) => {
            const result = await openEditorBase(input, source);
            if (result === null) {
                console.log("Open definition for:", input);
                console.log("Corresponding model:", monaco.editor.getModel(input.resource));
                source.setModel(monaco.editor.getModel(input.resource));
                x.innerText = input.resource.path;
            }
            return result; // always return the base result
        };
        //#endregion

        const models: Record<string, { model: monaco.editor.ITextModel, text: string, but: HTMLButtonElement, state?: monaco.editor.ICodeEditorViewState | null }> = {};
        let lastModel: typeof models [keyof typeof models] | undefined;
        function createModel(name: string, value: string) {
            // const uri = monaco.Uri.parse("file:///" + name + ".ts");
            const uri = monaco.Uri.file(name + ".ts");
            console.log(uri);
            models[name] = { text: value, model: monaco.editor.createModel(value, "typescript", uri), but: document.createElement("button") };
            const curModel = lastModel = models[name];
            curModel.but.textContent = name;
            curModel.but.onclick = function () {
                if (lastModel){
                    lastModel.state = mon.saveViewState();
                }
                mon.setModel(curModel.model);
                if (curModel.state){
                    mon.restoreViewState(curModel.state);
                }
                x.innerText = uri.path;
                lastModel = curModel;
                setTimeout(() => mon.focus(), 100);
            };
            document.body.appendChild(curModel.but);
            return curModel;
        }

        const definer = createModel("file1", "const helloWorld = () => { return \"Hello World!\"; }; \r\n export {helloWorld};");
        const caller = createModel("file2", "import {helloWorld} from \"./file1\";\r\n helloWorld()");

        monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);



        monaco.languages.registerCompletionItemProvider('typescript', {
            // These characters should trigger our `provideCompletionItems` function
            triggerCharacters: ["'", '"', '.', '/'],
            // Function which returns a list of autocompletion ietems. If we return an empty array, there won't be any autocompletion.
            provideCompletionItems: (model, position) => {
              // Get all the text content before the cursor
              const textUntilPosition = model.getValueInRange({
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
              });
              // Match things like `from "` and `require("`
              if (/(([\s|\n]+from\s+)|(\brequire\b\s*\())["|'][^'^"]*$/.test(textUntilPosition)) {
                // It's probably a `import` statement or `require` call
                if (textUntilPosition.endsWith('.') || textUntilPosition.endsWith('/')) {
                  // User is trying to import a file
                  const props = {files: {"file1": {}, file2: {}}, path: "./"}
                  const items = Object.keys(props.files)
                    .filter(path => path !== props.path)
                    .map(path => {
                      let file = props.path + path;
                      // Only show files that match the prefix typed by user
                      if (file.startsWith(textUntilPosition)) {
                        // Remove typed text from the path so that don't insert it twice
                        // file = file.slice(typed.length);
                        return {
                          // Show the full file path for label
                          label: file,
                          // Don't keep extension for JS files
                          insertText: file.replace(/\.js$/, ''),
                          kind: monaco.languages.CompletionItemKind.File,
                        } as monaco.languages.CompletionItem;
                      }
                      return null;
                    })
                    .filter((item): item is monaco.languages.CompletionItem => {return item != null} );
                    return {suggestions: items};
                } else {
                //   // User is trying to import a dependency
                //   return Object.keys(this.props.dependencies).map(name => ({
                //     label: name,
                //     detail: this.props.dependencies[name],
                //     kind: monaco.languages.CompletionItemKind.Module,
                //   }));
                }
              }
            },
          });



    }, fail: () => { }
});




export default {
    x: 5
}






// interface IWebSDKConfig{
//     val1: string;
//     val2: string;
//     valq3: string;
// }

// function InitWebSdk(config: IWebSDKConfig){
//     InitQShell({
//         valq2: config.val2,
//         valq3: config.valq3,
//         valq8: {
//             a: () => {},
//             b: () => { config.val1 }
//         }
//     })
// }

// interface IQShellConfig{

//     valq8: {
//         a: () => void;
//         b: () => void;
//     };
//     valq2: string;
//     valq3: string

// }


// function InitQShell(config: IQShellConfig){

// }