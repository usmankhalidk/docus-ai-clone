export type EditType = 'age' | 'height' | 'weight';

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: EditType;
}

export interface ProfileData {
  age: string;
  height: string;
  weight: string;
  ethnicity: string;
  sex: string;
  completion: number;
}