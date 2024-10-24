import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messageInput: string = '';  // Store input from the user
  userMessage: string = '';   // Store the user's last message
  botMessage: string = '';    // Store the bot's response (token-by-token)
  loading: boolean = false;   // Loading state while waiting for a response

  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    this.userMessage = message;  // Set the user’s message
    this.botMessage = '';        // Clear the bot's response for a new one
    this.messageInput = '';      // Clear the input field after sending the message
    this.loading = true;         // Set loading to true
    this.getResponseFromServer(message);  // Call the server to get the response
  }

  getResponseFromServer(question: string) {
    // Send POST request to the backend API
    this.http.post('http://localhost:3000/chat', { question }, { responseType: 'text' })
      .subscribe({
        next: (event: any) => {
          this.botMessage += event;  // Append the new token to botMessage
        },
        complete: () => {
          this.loading = false;  // Loading is done when response completes
        },
        error: (err) => {
          console.error('Error fetching response:', err);
          this.loading = false;  // Turn off loading if there's an error
        }
      });
  }
}
