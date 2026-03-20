
export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  price: number;
  description: string;
  careLevel: 'Easy' | 'Intermediate' | 'Expert';
  sunlight: string;
  category: 'Indoor' | 'Outdoor' | 'Succulent' | 'Rare';
  image: string;
}

export interface CartItem extends Plant {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: number;
  imageUrl?: string;
}
