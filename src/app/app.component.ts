import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as ace from 'ace-builds';
import {CONSTANTS} from '../constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('editorElm') private editorElm: ElementRef<HTMLElement>;
    editor: any;
    isBeautified = false;
    errorToBeautify = false;
    isCopied = false;

    ngAfterViewInit(): void {
        ace.config.set('fontSize', '16px');
        ace.config.set('basePath', CONSTANTS.basePath);
        this.editor = ace.edit(this.editorElm.nativeElement);
        this.editor.setOptions({
            theme: 'ace/theme/github',
            mode: 'ace/mode/json',
            useWrapMode: false,
            tabSize: 4,
            wrap: true
        });
        this.editor.on('change', (data) => {
            this.errorToBeautify = false;
            this.isBeautified = false;
            this.isCopied = false;
        });
    }

    beautify(): void {
        try {
            const actualValue: string = this.editor.getValue();
            this.editor.setValue(JSON.stringify(JSON.parse(actualValue), null, 4));
            this.isBeautified = true;
        } catch (e) {
            this.errorToBeautify = true;
        }
    }

    copyToClipboard(): void {
        this.editor.selectAll();
        this.editor.focus();
        document.execCommand('copy');
        this.isCopied = true;
    }
}
