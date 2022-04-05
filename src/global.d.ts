import { RootStackParamList } from '@navigation/types/appStackTypes';
declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line
    interface RootParamList extends RootStackParamList {}
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface FormData {
    append(name: string, value: any): void;
    getParts(): Array<FormDataPart>;
  }
}
