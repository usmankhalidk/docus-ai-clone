export type Status = 'analyzing' | 'not_interpreted' | 'completed' | 'failed' | 'draft';
export interface Screening {
    id: number;
    title: string;
    status: Status;
    uploadDate: string;
    includedInAI: boolean;
  }