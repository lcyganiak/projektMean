import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  AfterViewInit,
  HostListener,
  SimpleChange,
  AfterViewChecked
} from '@angular/core';

@Directive({
  selector: '[appContenteditable]'
})
export class ContenteditableDirective implements AfterViewInit {
  @Input() text;
  button: any = null;
  divContent: any;
  discryptionBook: any;
  constructor(
    private el: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.button = {
      controllerButton: {
        bold: () => this.bold(),
        italic: () => this.italic(),
        underline: () => this.underline(),
        smail: () => this.smail(),
        sad: () => this.sad(),
        delete: () => this.delete()
      },
      $implicit: this.divContent
    };
    this.viewContainer.createEmbeddedView(this.templateRef, this.button);
    this.divContent = document.querySelector('.contenteditable').innerHTML;
    this.button.$implicit = this.divContent;
  }

  bold() {
    document.execCommand('bold', false, null);
  }

  italic() {
    document.execCommand('italic', false, null);
  }

  underline() {
    document.execCommand('underline', false, null);
  }

  smail() {
    document.execCommand(
      'insertImage',
      false,
      'http://localhost:4000/images/emotic/favicon.ico'
    );
  }
  sad() {
    document.execCommand(
      'insertImage',
      false,
      'http://localhost:4000/images/emotic/sadFace.ico'
    );
  }
  delete() {
    document.execCommand('delete', false, null);
  }

  ngAfterViewInit() {
    const then = this;
    Promise.resolve(null).then(
      () =>
        (this.button.$implicit = document.querySelector(
          '.contenteditable'
        ).innerHTML)
    );
    document
      .querySelector('.contenteditable')
      .addEventListener('input', function() {
        then.divContent = this.innerHTML;

        then.button.$implicit = this.innerHTML;
      });
  }
}
