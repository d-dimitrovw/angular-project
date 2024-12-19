import { Topic } from "./topic"
import { User } from "./user"

export interface Comment {
    likes: string[],
    _id: string,
    text: string,
    userId: User,
    themeId: Topic,
    created_at: string,
    updatedAt: string,
    __v: number
  }