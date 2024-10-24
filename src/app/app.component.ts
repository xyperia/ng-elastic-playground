import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageInput: string = '';  // Stores input from the user
  userMessages: string[] = [];  // Stores the user's messages
  botMessages: string[] = [];   // Stores the bot's response (token-by-token)
  loading: boolean = false;     // Loading state while waiting for the response

  constructor(private http: HttpClient) {}

  sendMessage() {
    const message = this.messageInput;
    if (!message) return;

    this.userMessages.push(message);  // Add the user message to the array
    this.botMessages.push('');  // Start a new bot message
    this.messageInput = '';     // Clear the input field
    this.loading = true;        // Start loading
    this.getResponseFromServer(message);  // Call server for response
  }

  getResponseFromServer(question: string) {
    const eventSource = new EventSource(`http://localhost:3000/chat?question=${encodeURIComponent(question)}`);

    const currentBotMessageIndex = this.botMessages.length - 1;

    eventSource.onmessage = (event) => {
      this.botMessages[currentBotMessageIndex] += event.data;  // Append token to the current bot message
    };

    eventSource.onerror = (error) => {
      console.error('Error streaming response:', error);
      eventSource.close();
      this.loading = false;
    };

    eventSource.addEventListener('close', () => {
      this.loading = false;  // Stop loading when the stream is closed
    });
  }
}
