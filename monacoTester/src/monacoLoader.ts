import { JSLoader } from "quick-shrimp/lib/interfaces/Helpers/JSLoader";


export class monacoLoader {
    private static monacoHandle: any;
    constructor() {

    }

    public load({ success, fail }: { success?: (monaco: any) => void, fail?: () => void }) {
        if (monacoLoader.monacoHandle){
            success?.(monacoLoader.monacoHandle);
            return;
        }
        
        new JSLoader("https://cdn.softtech.com.tr/ngsp-quick/nemo/dev/js/monaco-editor/min/vs/loader.min.js",
            () => {
                (window as any).require.config({ paths: { 'vs': 'https://cdn.softtech.com.tr/ngsp-quick/nemo/dev/js/monaco-editor/min/vs' } });
                (window as any).require(['vs/editor/editor.main'], (monaco: any) => { 
                    monacoLoader.monacoHandle = monaco;
                    success?.(monaco);
                });
            },
            () => {
                console.log("Error on loading monaco-editor cdn");
                fail?.();
            },
            5).LoadJS();
    }
}