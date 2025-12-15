import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Send, AlertTriangle, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Health Assistant. I can help you understand symptoms and provide preliminary health guidance. Please note that this is not a substitute for professional medical advice. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const commonQuestions = [
    "I have a headache and feel tired",
    "What could cause chest pain?",
    "I have a fever and sore throat",
    "When should I see a doctor?",
    "How to manage stress and anxiety?",
    "What are signs of dehydration?"
  ];

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputMessage.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response - in real app, this would call an AI API
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(messageText),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('headache') || lowerInput.includes('tired')) {
      return "Headaches and fatigue can have various causes including dehydration, stress, lack of sleep, or tension. Try drinking water, getting rest, and managing stress. However, if headaches are severe, persistent, or accompanied by other symptoms like vision changes or fever, please consult a healthcare provider immediately.";
    }
    
    if (lowerInput.includes('chest pain')) {
      return "⚠️ Chest pain can be serious and should not be ignored. It could indicate heart problems, muscle strain, anxiety, or other conditions. If you're experiencing severe chest pain, difficulty breathing, or pain radiating to your arm, jaw, or back, seek emergency medical attention immediately. For mild discomfort, monitor symptoms and consult your doctor.";
    }
    
    if (lowerInput.includes('fever') || lowerInput.includes('sore throat')) {
      return "Fever and sore throat often indicate an infection, which could be viral or bacterial. Rest, stay hydrated, and consider over-the-counter pain relievers. See a doctor if fever exceeds 103°F (39.4°C), symptoms worsen after 3-5 days, or you have difficulty swallowing or breathing.";
    }
    
    if (lowerInput.includes('when') && lowerInput.includes('doctor')) {
      return "You should see a doctor if you have: severe or persistent symptoms, high fever (103°F+), difficulty breathing, severe pain, sudden changes in health, symptoms lasting more than a week without improvement, or any symptoms that concern you. When in doubt, it's always better to consult a healthcare professional.";
    }
    
    if (lowerInput.includes('stress') || lowerInput.includes('anxiety')) {
      return "Managing stress and anxiety involves: regular exercise, deep breathing exercises, adequate sleep, healthy eating, limiting caffeine, practicing mindfulness or meditation, staying connected with others, and maintaining routines. If anxiety significantly impacts daily life, consider speaking with a mental health professional.";
    }
    
    if (lowerInput.includes('dehydration')) {
      return "Signs of dehydration include: thirst, dry mouth, decreased urination, dark yellow urine, fatigue, dizziness, and dry skin. Mild dehydration can be treated by drinking water slowly. Severe dehydration (confusion, rapid heartbeat, little to no urination) requires immediate medical attention.";
    }
    
    return "I understand your concern. While I can provide general health information, I recommend discussing specific symptoms with a healthcare provider who can properly evaluate your condition. They can provide personalized medical advice based on your health history and current situation. Is there anything specific about your symptoms you'd like me to help clarify?";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Bot className="h-8 w-8 text-primary" />
            AI Health Assistant
          </h1>
          <p className="text-muted-foreground">Get preliminary health guidance and symptom information</p>
        </div>

        {/* Disclaimer */}
        <Card className="mb-6 border-warning/20 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Medical Disclaimer</p>
                <p className="text-muted-foreground">
                  This AI assistant provides general health information only and is not a substitute for professional medical advice, diagnosis, or treatment. 
                  Always consult your doctor for medical concerns.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Chat with AI Assistant
                </CardTitle>
                <CardDescription>Ask about symptoms, health concerns, or general wellness questions</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/30 rounded-lg">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.sender === 'ai' && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-card border'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      
                      {message.sender === 'user' && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-muted">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-card border p-3 rounded-lg">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your health question..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Questions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Questions</CardTitle>
                <CardDescription>Click to ask quickly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {commonQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3 text-sm"
                    onClick={() => handleSendMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;