import { IconType } from "react-icons";

export interface Review {
  name: string;
  role: string;
  comment: string;
  rating: number;
  icon: IconType;
}
