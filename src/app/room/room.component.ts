import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  afterNextRender,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ChatComponent } from '../components/chat/chat.component';
import { ChatInputComponent } from '../components/chat-input/chat-input.component';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '../message.interface';
import { ChatBotService } from '../api/chatbot.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [ChatComponent, ChatInputComponent,HttpClientModule],
  providers: [ChatBotService],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomComponent {
  myId = uuidv4();
  contactId = uuidv4();
  chatComponent = viewChild.required(ChatComponent);
  newMessage = signal<ChatMessage | null>(null);
  newMessageResponse = signal<ChatMessage | null>(null);
  textNewMessageRequest:string = '';
  cdRef = inject(ChangeDetectorRef);
  desabInput:boolean = false;

  newMessageChange = effect(
    () => {
      console.log('newMessage changed', this.newMessage());
      if (!this.newMessage()) {
        return;
      }
      this.desabInput = true;
      this.messages.update((messages) => [...messages, this.newMessage()!]);
      this.cdRef.detectChanges();
      var mensagem  
      this._chatbotService.getMessage().subscribe((data => {
        mensagem = data 
        console.warn(mensagem)
        this.desabInput = false;
      } ));
      
      this._chatbotService.sendMessage(this.textNewMessageRequest).subscribe((data => {
        this.newMessageResponse.set({
            text: data.message,
            id: uuidv4(),
            userId: this.contactId,
            createdAt: Date.now(),
        });
        this.messages.update((messages) => [...messages, this.newMessageResponse()!]);
        
        console.warn(data);
      }));

      
     
      // this.messages.update((messages) => [...messages, this.newMessageResponse()!]);
      this.cdRef.detectChanges();
      this.scrollChatToBottom();
      this.newMessage.set(null);
      this.newMessageResponse.set(null);
      this.textNewMessageRequest = '';
      setTimeout(() => {
        this.desabInput= false;
      }, 5000);
    },
    {
      allowSignalWrites: true,
    }
  );
  messages = signal<ChatMessage[]>([
    // {
    //   text: 'Hey',
    //   userId: this.myId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'How are you doing?',
    //   userId: this.contactId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'Hey',
    //   userId: this.myId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'How are you doing?',
    //   userId: this.contactId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'Hey',
    //   userId: this.myId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'How are you doing?',
    //   userId: this.contactId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'Hey',
    //   userId: this.myId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'How are you doing?',
    //   userId: this.contactId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'Hey',
    //   userId: this.myId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'How are you doing?',
    //   userId: this.contactId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'Hey',
    //   userId: this.myId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'How are you doing?',
    //   userId: this.contactId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'Hey',
    //   userId: this.myId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'How are you doing?',
    //   userId: this.contactId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'Hey',
    //   userId: this.myId,
    //   id: uuidv4(),
    // },
    // {
    //   text: 'How are you doing?',
    //   userId: this.contactId,
    //   id: uuidv4(),
    // },
  ]);

  constructor( private _chatbotService: ChatBotService) {
    afterNextRender(() => {
      this.scrollChatToBottom();
    });
  }

  removeMessage(messageId: string) {
    this.messages.update((messages) =>
      messages.filter((msg) => msg.id !== messageId)
    );
  }

  scrollChatToBottom() {
    const el = this.chatComponent().scrollContainer as HTMLElement;
    el.scrollTo({
      top: el.scrollHeight,
    });
  }
  public ReceberOutput(value: string , tipoOutput:number) {
    switch(tipoOutput){
      case 1:
        this.textNewMessageRequest = value;
        break;
    }
  }
}
