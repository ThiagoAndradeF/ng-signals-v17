import { Component, EventEmitter, Input, Output, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../message.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent {

  
  private _messageText : EventEmitter<string>  = new EventEmitter<string>;;
  public get messageText() : EventEmitter<string> {
    return this._messageText;
  }
  @Output() public set messageText(v : EventEmitter<string>)  {
    this._messageText = v;
  }
  private _desabInput : boolean = false;
  public get desabInput() : boolean {
    return this._desabInput;
  }
  @Input() public set desabInput(v : boolean) {
    this._desabInput = v;
  }
  
  
  
  value = model.required<ChatMessage | null>();
  // valuetw = model.required<ChatMessage | null>();
  myId = input.required<string>();
  inputVal = signal<string>('');

  
  contactId = uuidv4();
  sendMessage(message: string, $event: Event) {
    this.emitValue(message);
    $event.preventDefault();
    this.value.set({
      text: message,
      id: uuidv4(),
      userId: this.myId(),
      createdAt: Date.now(),
    });
    this.inputVal.set('');
  }

  emitValue(v:string){
    this.messageText.emit(v);
  }


}
